/*
Fragment shader - shader que dona color
entren coses del frag shader
i dels uniforms
*/

uniform vec4 uColor;
uniform float uTest;

in vec2 uUV;

void main() {
  gl_FragColor = vec4(
    abs(sin(uUV.x * uTest)),
   uUV.y, 0,
   uColor.w
  );
}