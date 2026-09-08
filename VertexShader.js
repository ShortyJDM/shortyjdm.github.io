#version 300 es
  in vec3 aPosition;
  in vec3 aColor;

  uniform float uTime; //time in sec
  out vec3 vColor;

  void main() {
    gl_Position = vec4(aPosition, 1.0);
    if (mod(uTime,12.566) > 6.28318) {
    vColor = aColor * 2.0 * vec3(sin(uTime+(2.0*float(gl_VertexID))),sin(uTime+(2.0*float(gl_VertexID-1))),sin(uTime+(2.0*float(gl_VertexID-2))));
    } else {
    vColor = 5.0*vec3(sin(uTime/2.0),sin(uTime/2.0),sin(uTime/2.0)) * vec3(sin(uTime+(2.0*float(gl_VertexID))),sin(uTime+(2.0*float(gl_VertexID-1))),sin(uTime+(2.0*float(gl_VertexID-2))));
    }
  }
