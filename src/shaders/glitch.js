const glitch = {
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

varying vec2 fragTexture;

uniform sampler2D tex0;
uniform sampler2D tex1;
uniform float time;
uniform float amplitude;

#define SPEED 1.0

vec4 rgbShift(vec2 p , vec4 shift) {
  shift *= 2.0 * shift.w - 1.0;
  vec2 rs = vec2(shift.x, -shift.y);
  vec2 gs = vec2(shift.y, -shift.z);
  vec2 bs = vec2(shift.z, -shift.x);

  return vec4(
    texture2D(tex0, p + rs).x,
    texture2D(tex0, p + gs).y,
    texture2D(tex0, p + bs).z,
    1.0
  );
}

float getAlpha(vec4 color) {
  float limit = 0.0;
  if (color.x > limit || color.y > limit || color.z > limit) {
    return 1.0;
  } else {
    return 0.0;
  }
}

vec4 noise(vec2 p) {
  return texture2D(tex1, p);
}

vec4 vec4pow(vec4 v, float p) {
  // Don't touch alpha (w), we use it to choose the direction of the shift and we don't want it to go in one direction more often than the other
  return vec4(pow(v.x, p), pow(v.y, p), pow(v.z, p), v.w);
}

void main( ) {
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

  // Elevating shift values to some high power (between 8 and 16 looks good) helps make the stuttering look more sudden
  vec4 shift = vec4pow(
      noise(
        vec2(
          SPEED * time,
          2.0 * SPEED * time / 25.0
        )
      ), 16.0
    ) * vec4(amplitude, amplitude, amplitude, 1.0);

  color += rgbShift(fragTexture, shift);
	gl_FragColor = vec4(color.xyz, getAlpha(color));
}
  `,
};

export default glitch;
