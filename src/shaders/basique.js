const basique = {
  vertex: `
attribute vec3 Vertice;

uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

void main() {
  gl_Position = projection * view * model * vec4(Vertice, 1.0);
}
  `,
  fragment: `
precision mediump float;

uniform vec4 color;

void main() {
  gl_FragColor = color;
}
  `,
};

export default basique;
