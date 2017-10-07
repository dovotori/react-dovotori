const glitch1and2 = {
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

float getAlpha(vec3 color) {
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

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  // i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  // i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0 * a0 + h * h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0 * a0 + h * h );

  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float rand(vec2 co) {
   return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

vec4 glitchRVB() {
  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

  // Elevating shift values to some high power (between 8 and 16 looks good) helps make the stuttering look more sudden
  vec4 shift = vec4pow(
      noise(
        vec2(
          SPEED * time,
          2.0 * SPEED * time / 25.0
        )
      ), 16.0
    ) * vec4(vec3(amplitude * 0.4), 1.0);

  color += rgbShift(fragTexture, shift);
  return color;
}

vec4 glitchDeform() {
  float noise = max(0.0, snoise(vec2(time, fragTexture.y * 0.3)) - 0.3) * (1.0 / 0.7);

  noise = noise + (snoise(vec2(time * 10.0, fragTexture.y * 2.4)) - 0.5) * 0.15;

  // Apply the noise as x displacement for every line
  float xpos = fragTexture.x - noise * noise * (amplitude * -2.0);
  float ypos = fragTexture.y - noise * noise * (amplitude * -2.0);
  vec4 color = texture2D(tex0, vec2(xpos, ypos));

  // Mix in some random interference for lines
  // color.xyz = mix(color.xyz, vec3(rand(vec2(fragTexture.y * time))), noise * 0.3).xyz;
  return color;
}

void main( ) {
  vec4 color;

  if (amplitude == 0.0) {
    color = texture2D(tex0, fragTexture);
  } else if (amplitude > 0.0) {
    color = glitchRVB();
  } else {
    color = glitchDeform();
  }

	gl_FragColor = vec4(color.xyz, getAlpha(color.xyz));
}
  `
};

export default glitch1and2;
