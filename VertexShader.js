#version 300 es
  in vec3 aPosition;
  in vec3 aColor;

  uniform float uTime; //time in sec
  out vec3 vColor;

  vec3 scale(in vec3 position, in float scaleX, in float scaleY);

  vec3 mPosition;

  void main() {
    mPosition = scale(aPosition, 1.0, 0.5);
    gl_Position = vec4(mPosition, 1.0);
    if (mod(uTime,12.566) > 6.28318) {
    vColor = aColor * 2.0 * vec3(sin(uTime+(2.0*float(gl_VertexID))),sin(uTime+(2.0*float(gl_VertexID-1))),sin(uTime+(2.0*float(gl_VertexID-2))));
    } else {
    vColor = 5.0*vec3(sin(uTime/2.0),sin(uTime/2.0),sin(uTime/2.0)) * vec3(sin(uTime+(2.0*float(gl_VertexID))),sin(uTime+(2.0*float(gl_VertexID-1))),sin(uTime+(2.0*float(gl_VertexID-2))));
    }
  }

  vec3 scale(in vec3 position, in float scaleX, in float scaleY){
    return mat3x3(
      scaleX, 0, 0,
      0, scaleY, 0,
      0, 0,      1
    ) * position;
  }
