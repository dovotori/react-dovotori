const glitch3 = {
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
uniform float time;

float getAlpha(vec4 color) {
  float limit = 0.0;
  if (color.x > limit || color.y > limit || color.z > limit) {
    return 1.0;
  } else {
    return 0.0;
  }
}

void main( ) {
  vec2 position = fragTexture;

  float temp = 0.01;
  float temp2 = 0.02;
  temp *= sin(time * 0.09) * 0.3;
  temp2 *= sin(time * 0.09) * 0.3;
  vec4 color = vec4(
    texture2D(tex0, vec2(position.x + temp, position.y - temp)).x,
    texture2D(tex0, vec2(position.x - temp2, position.y + temp2)).y,
    texture2D(tex0, vec2(position.x - temp, position.y + temp)).z,
    1.0
  );

  gl_FragColor = vec4(color.xyz, getAlpha(color));
}
  `,
};

export default glitch3;
