const basique = {
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

void main() {
  gl_FragColor = texture2D(tex0, fragTexture);
}
  `
};

export default basique;
