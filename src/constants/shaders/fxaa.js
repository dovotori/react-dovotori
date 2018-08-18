const fxaa = {
  vertex: `
attribute vec3 Vertice;

varying vec2 fragTexture;

void main() {
  fragTexture = 0.5 + Vertice.xy * 0.5;
  gl_Position = vec4(Vertice, 1.0);
}
  `,
  fragment: `
precision mediump float;

uniform sampler2D tex0;
varying vec2 fragTexture;

vec4 applyFXAA(sampler2D tex, vec2 st) {
	vec2 inverseViewportSize = vec2(1.0 / 1000.0, 1.0 / 600.0);
	float FXAA_REDUCE_MIN = 1.0 / 128.0; // empeche division par zero
	float FXAA_REDUCE_MUL = 1.0 / 8.0; // controle en fonction de la lumina
	float FXAA_SPAN_MAX = 8.0; // limite l'expansion du blur

	vec3 luma = vec3(0.299, 0.587, 0.114); // // reference pour avoir la luminosite d'un pixel
	// on regarde la luminosite sur les pixels en croix autour du pixel
	float lumaTL = dot(luma, texture2D(tex, st + (vec2(-1.0, -1.0) * inverseViewportSize)).xyz);
	float lumaTR = dot(luma, texture2D(tex, st + (vec2(1.0, -1.0) * inverseViewportSize)).xyz);
	float lumaBL = dot(luma, texture2D(tex, st + (vec2(-1.0, 1.0) * inverseViewportSize)).xyz);
	float lumaBR = dot(luma, texture2D(tex, st + (vec2(1.0, 1.0) * inverseViewportSize)).xyz);
	float lumaM = dot(luma, texture2D(tex, st).xyz);

	// edge detection
	vec2 dir;
	dir.x = -((lumaTL + lumaTR) - (lumaBL + lumaBR));
	dir.y = ((lumaTL + lumaBL) - (lumaTR + lumaBR));
	float dirReduce = max((lumaTL + lumaTR + lumaBL + lumaBR) * (FXAA_REDUCE_MUL * 0.25), FXAA_REDUCE_MIN);
	float inverseDirAdjustment = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);
	dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
		max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * inverseDirAdjustment)) * inverseViewportSize;

	// blur
	vec3 result1 = (1.0/2.0) * (
		texture2D(tex, st + (dir * vec2(1.0/3.0 - 0.5))).xyz +
		texture2D(tex, st + (dir * vec2(2.0/3.0 - 0.5))).xyz
  );
	vec3 result2 = result1 * (1.0/2.0) + (1.0/4.0) * (
		texture2D(tex, st + (dir * vec2(0.0/3.0 - 0.5))).xyz +
		texture2D(tex, st + (dir * vec2(3.0/3.0 - 0.5))).xyz
  );
	float lumaMin = min(lumaM, min(min(lumaTL, lumaTR), min(lumaBL, lumaBR)));
	float lumaMax = max(lumaM, max(max(lumaTL, lumaTR), max(lumaBL, lumaBR)));
	float lumaResult2 = dot(luma, result2);

	vec4 color;
  // teste si on est pas parti trop loin
	if(lumaResult2 < lumaMin || lumaResult2 > lumaMax){
		color = vec4(result1, 1.0);
	} else {
		color = vec4(result2, 1.0);
	}
	return color;
}

float getAlpha(vec3 color) {
  float limit = 0.0;
  if (color.x > limit || color.y > limit || color.z > limit) {
    return 1.0;
  } else {
    return 0.0;
  }
}

void main() {
  // vec3 color = applyFXAA(tex0, fragTexture).xyz;
	// gl_FragColor = vec4(color, getAlpha(color));
	gl_FragColor = texture2D(tex0, fragTexture);
}
`
};

export default fxaa;
