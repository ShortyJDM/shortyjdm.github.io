#version 300 es
  in vec3 aPosition;
  in vec3 aColor;

  uniform float uTime; //time in sec
  out vec3 vColor;

  vec3 scale(in vec3 position, in float sx, in float sy);
  vec3 rotate(in vec3 position, in float angle);
  vec3 translate(in vec3 position, in float tx, in float ty);
  vec3 skew(in vec3 position, in float shx, in float shy);
  vec3 mirror(in vec3 position, in float angle);

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

  vec3 scale(in vec3 position, in float sx, in float sy){
    return mat3x3(
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1
    ) * position;
  }

  vec3 rotate(in vec3 position, in float angle){
      return mat3x3(
      cos(angle), sin(angle), 0,
      -sin(angle), cos(angle), 0,
      0, 0, 1
    ) * position;
  }

  vec3 translate(in vec3 position, in float tx, in float ty){
    return mat3x3(
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1
    ) * position;
  }

  vec3 skew(in vec3 position, in float shx, in float shy){
    return mat3x3(
      1, shy, 0,
      shx, 1, 0,
      0, 0, 1
    ) * position;
  }

  vec3 mirror(in vec3 position, in float angle){
      return mat3x3(
      cos(2.0*angle), sin(2.0*angle), 0,
      sin(2.0*angle), -cos(2.0*angle), 0,
      0, 0, 1
    ) * position;
  }