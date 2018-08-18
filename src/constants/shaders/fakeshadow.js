const fakeshadow = {
  vertex: `
attribute vec3 Vertice;

uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

void main() {
  vec3 flatten = Vertice;
  flatten.y = 0.0;
  gl_Position = projection * view * model * vec4(flatten, 1.0);
}
  `,
  fragment: `
precision mediump float;

uniform vec4 color;

void main() {
  gl_FragColor = color;
}
  `
};

export default fakeshadow;
