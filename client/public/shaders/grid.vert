/*
Vert shader - shader dels vertex
Entren coses dels uniforms i surten coses al frag shader.

Aqui he fet guarrada perque la grid tingui mida completa de tot,
suposo que la resta d'objectes calcularé la seva posició des de fora
i utilitzarien un altre vert shader
*/

in vec2 aPosition;

out vec2 uUV;

void main() {
    gl_Position = vec4( aPosition.x * 2.0 - 1.0, aPosition.y * 2.0 - 1.0, 1, 1);
    uUV = vec2(aPosition.x, aPosition.y);
}