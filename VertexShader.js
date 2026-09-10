#version 300 es
  in vec3 aPosition;
  in vec3 aColor;

  uniform float uTime; //time in sec
  out vec3 vColor;

  mat4x4 identity();
  mat4x4 scale(in float sx, in float sy);
  mat4x4 rotate(in float angle);
  mat4x4 translate(in float tx, in float ty);
  mat4x4 skew(in float shx, in float shy);
  mat4x4 mirror(in float angle);


  void main() {
    mat4x4 tMat = identity();
    tMat = tMat *scale(0.4,0.4) * translate(0.6,0.0)*rotate(uTime+sin(uTime)+3.1415);
    gl_Position = tMat * vec4(aPosition, 1.0);
    if (mod(uTime,12.566) > 6.28318) {
    vColor = aColor * 2.0 * vec3(sin(uTime+(2.0*float(gl_VertexID))),sin(uTime+(2.0*float(gl_VertexID-1))),sin(uTime+(2.0*float(gl_VertexID-2))));
    } else {
    vColor = 5.0*vec3(sin(uTime/2.0),sin(uTime/2.0),sin(uTime/2.0)) * vec3(sin(uTime+(2.0*float(gl_VertexID))),sin(uTime+(2.0*float(gl_VertexID-1))),sin(uTime+(2.0*float(gl_VertexID-2))));
    }
  }


  mat4x4 identity(){
    return mat4x4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }


  mat4x4 scale(in float sx, in float sy){
    return mat4x4(
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }

  mat4x4 rotate(in float angle){
      return mat4x4(
      cos(angle), sin(angle), 0, 0,
      -sin(angle), cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }
 
  //doesn't work?
  mat4x4 translate(in float tx, in float ty){
    return mat4x4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, 0, 1
    );
  }

  mat4x4 skew(in float shx, in float shy){
    return mat4x4(
      1, shy, 0, 0,
      shx, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }

  mat4x4 mirror(in float angle){
      return mat4x4(
      cos(2.0*angle), sin(2.0*angle), 0, 0,
      sin(2.0*angle), -cos(2.0*angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }
  