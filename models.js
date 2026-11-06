function createCube() {
  const positions = new Float32Array([
    -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1,   // front
     1, -1, -1,  -1, -1, -1,  -1,  1, -1,   1,  1, -1,   // back
    -1,  1,  1,   1,  1,  1,   1,  1, -1,  -1,  1, -1,   // top
    -1, -1, -1,   1, -1, -1,   1, -1,  1,  -1, -1,  1,   // bottom
     1, -1,  1,   1, -1, -1,   1,  1, -1,   1,  1,  1,   // right
    -1, -1, -1,  -1, -1,  1,  -1,  1,  1,  -1,  1, -1    // left
  ]);
  const faceNormals = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
  const normals = new Float32Array(faceNormals.flatMap(n => [...n, ...n, ...n, ...n]));

  // Tangent; bitangent = cross(N, T)
  const faceTangents = [[1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1]];
  const tangents = new Float32Array(faceTangents.flatMap(t => [...t, ...t, ...t, ...t]));

  const texCoords = new Float32Array(faceNormals.flatMap(() => [0, 0, 1, 0, 1, 1, 0, 1]));

  const indices = new Uint16Array([
     0,  1,  2,   0,  2,  3,   // front
     4,  5,  6,   4,  6,  7,   // back
     8,  9, 10,   8, 10, 11,   // top
    12, 13, 14,  12, 14, 15,   // bottom
    16, 17, 18,  16, 18, 19,   // right
    20, 21, 22,  20, 22, 23    // left
  ]);
  return { positions, normals, tangents, texCoords, indices };
}


function createCylinder(segments = 64, uRepeat = 3) {
  const positions = [], normals = [], tangents = [], texCoords = [], indices = [];

  // Side: theta grows with u, so T points along the circle and B = cross(N, T) points up
  for (let i = 0; i <= segments; i++) {
    const u = i / segments, theta = 2 * Math.PI * u;
    const s = Math.sin(theta), c = Math.cos(theta);
    for (const y of [-1, 1]) {
      positions.push(s, y, c);
      normals.push(s, 0, c);
      tangents.push(c, 0, -s);
      texCoords.push(u * uRepeat, (y + 1) / 2);
    }
  }
  for (let i = 0; i < segments; i++) {
    const k = 2 * i;
    indices.push(k, k + 2, k + 3, k, k + 3, k + 1);
  }

  // Caps: planar mapping of x, z into the texture, T = +x on both
  for (const y of [1, -1]) {
    const center = positions.length / 3;
    positions.push(0, y, 0);
    normals.push(0, y, 0);
    tangents.push(1, 0, 0);
    texCoords.push(0.5, 0.5);
    for (let i = 0; i <= segments; i++) {
      const theta = 2 * Math.PI * i / segments;
      const s = Math.sin(theta), c = Math.cos(theta);
      positions.push(s, y, c);
      normals.push(0, y, 0);
      tangents.push(1, 0, 0);
      texCoords.push(0.5 + 0.5 * s, 0.5 - 0.5 * y * c);  // keeps cross(N, T) along +v
    }
    for (let i = 0; i < segments; i++) {
      const a = center + 1 + i, b = a + 1;
      if (y > 0) indices.push(center, a, b);
      else indices.push(center, b, a);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    tangents: new Float32Array(tangents),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices)
  };
}

function createTorus(r, R ,uSteps, vSteps){
    var pos = new Array();
    var nrm = new Array();
    var tan = new Array();
    var tex = new Array();
    var idx = new Array();
    for(let i = 0; i <= vSteps; i++){
        v = i * 2 * (Math.PI / vSteps); 
        for(let j = 0; j <= uSteps; j++){
            u = j * 2 * (Math.PI / uSteps); 
            const x = (R + r*Math.cos(v)) * Math.cos(u);
            const y = (R + r*Math.cos(v)) * Math.sin(u);
            const z = r * Math.sin(v);

            const xt = -Math.sin(u);
            const yt =  Math.cos(u);
            const zt = 0;

            const xn = Math.cos(v) * Math.cos(u);
            const yn = Math.cos(v) * Math.sin(u);
            const zn = Math.sin(v);

            pos.push(x, y, z);
            tan.push(xt,yt,zt);

            nrm.push(xn,yn,zn);

            const tu = j/uSteps;
            const tv = i/vSteps;

            tex.push(tu,tv);
        }
    }

    for (let i = 0; i < vSteps; i++) {
        for (let j = 0; j < uSteps; j++) {
            const k1 = (i * (uSteps + 1)) + j;
            const k2 = k1 + uSteps + 1;
            idx.push(k1, k2, k1 + 1);
            idx.push(k2, k2 + 1, k1 + 1);
        }
    }

    return {
    positions: new Float32Array(pos),
    normals: new Float32Array(nrm),
    tangents: new Float32Array(tan),
    texCoords: new Float32Array(tex),
    indices: new Uint16Array(idx)
  };
} 

function createSphere(uSteps, vSteps){
    var pos = new Array();
    var nrm = new Array();
    var tan = new Array();
    var tex = new Array();
    var idx = new Array();
    for(let i = 0; i <= vSteps; i++){
        v = i * (Math.PI / vSteps); 
        for(let j = 0; j <= uSteps; j++){
            u = j * 2 * (Math.PI / uSteps); 
            const x = Math.cos(u) * Math.sin(v);
            const y = Math.cos(v)
            const z = Math.sin(u) * Math.sin(v);
            pos.push(x, y, z);
            nrm.push(x, y, z);

            const tx = Math.cos(v);
            const ty = -Math.sin(v);
            const tz = Math.cos(v);

            tan.push(tx,ty,tz); 
          
            const tu =(Math.atan2(y,x)/(2*Math.PI)) + 0.5;
            const tv = (Math.asin(z)/Math.PI) + 0.5;

            tex.push(tu,tv);
        }
    }

    for (let i = 0; i < vSteps; i++) {
        for (let j = 0; j < uSteps; j++) {
            const k1 = (i * (uSteps + 1)) + j;
            const k2 = k1 + uSteps + 1;
            idx.push(k1, k2, k1 + 1);
            idx.push(k2, k2 + 1, k1 + 1);
        }
    }

    return {
    positions: new Float32Array(pos),
    normals: new Float32Array(nrm),
    tangents: new Float32Array(tan),
    texCoords: new Float32Array(tex),
    indices: new Uint16Array(idx)
  };
} 

function createCone(r, h, uSteps, vSteps){
    var pos = new Array();
    var nrm = new Array();
    var tan = new Array();
    var tex = new Array();
    var idx = new Array();
    for(let i = 0; i <= vSteps; i++){
        v = i * (1 / vSteps); 
        for(let j = 0; j <= uSteps; j++){
            u = j * 2 * (Math.PI / uSteps); 
            const x = r * (1-v) * Math.cos(u);
            const y = r * (1-v) * Math.sin(u);
            const z = h*v;
            pos.push(x, y, z);
            const nx = h * Math.cos(u);
            const ny = h * Math.sin(u);
            const nz = r;
            const nc = r*(1-v);

            tan.push(-r*v,-r*v,h);
            
           
            nrm.push(nc*nx,nc*ny,nc*nz);

            const tu = j/uSteps;
            const tv = i/h;

            tex.push(tu,tv);
        }
    }
    end = pos.length/3;
    for (let i = 0; i < vSteps; i++) {
        for (let j = 0; j < uSteps; j++) {
            const k1 = (i * (uSteps + 1)) + j;
            const k2 = k1 + uSteps + 1;
            idx.push(k1, k2, k1 + 1);
            idx.push(k2, k2 + 1, k1 + 1);
        }
    }
    
    pos.push(0,0,0);
    nrm.push(0,0,1);
    tan.push(1,0,0);
    tex.push(0.5, 0.5);


    for (let i = 0; i <= uSteps; i++){
        idx.push(end,i,i+1);
        nrm.push(0,0,1);
    }
        
    return {
    positions: new Float32Array(pos),
    normals: new Float32Array(nrm),
    tangents: new Float32Array(tan),
    texCoords: new Float32Array(tex),
    indices: new Uint16Array(idx)
  };
} 
