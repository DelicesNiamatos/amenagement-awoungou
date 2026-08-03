window.DNA = window.DNA || {};
var D = DNA;
D.createHabitat = function() {
  const h = new THREE.Group();
  const c = D.HABITAT;
  const floorY = c.groundClearance;
  const roofY = floorY + c.c20.h;
  const cx = D.ZONES.habitat.x;
  const cz = D.ZONES.habitat.z - 1;
  const leftCX = cx - (c.c20.w + c.gap/2);
  const rightCX = cx + (c.c20.w + c.gap/2);
  const contZ = cz;
  function container(x, z) {
    const grp = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(c.c20.l, c.c20.h, c.c20.w), D.materials.foam);
    body.position.set(0, floorY + c.c20.h/2, 0); body.castShadow = true; body.receiveShadow = true; grp.add(body);
    const topFrame = new THREE.Mesh(new THREE.BoxGeometry(c.c20.l, 0.12, c.c20.w + 0.04), D.materials.steel);
    topFrame.position.set(0, floorY + c.c20.h, 0); grp.add(topFrame);
    const bottomFrame = new THREE.Mesh(new THREE.BoxGeometry(c.c20.l, 0.08, c.c20.w + 0.04), D.materials.steel);
    bottomFrame.position.set(0, floorY, 0); grp.add(bottomFrame);
    [[-c.c20.l/2, -c.c20.w/2], [-c.c20.l/2, c.c20.w/2], [c.c20.l/2, -c.c20.w/2], [c.c20.l/2, c.c20.w/2]].forEach(([dx, dz]) => {
      const cc = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), D.materials.steel);
      cc.position.set(dx, floorY, dz); grp.add(cc);
    });
    grp.position.set(x, 0, z); return grp;
  }
  const leftCont = container(leftCX, contZ); const rightCont = container(rightCX, contZ); h.add(leftCont, rightCont);
  const padPositions = [[-c.c20.l/2, -c.c20.w/2], [-c.c20.l/2, c.c20.w/2], [c.c20.l/2, -c.c20.w/2], [c.c20.l/2, c.c20.w/2]];
  [...padPositions, ...padPositions].forEach(([dx, dz], idx) => {
    const baseX = idx < 4 ? leftCX : rightCX; const px = baseX + dx; const pz = contZ + dz;
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.5), D.materials.concrete); pad.position.set(px, 0.1, pz); h.add(pad);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, floorY, 12), D.materials.steel); post.position.set(px, floorY/2, pz); post.castShadow = true; h.add(post);
  });
  const centralDX = [-1.5, -1.5, 1.5, 1.5];
  const centralDZ = [-c.c20.w/2, c.c20.w/2, -c.c20.w/2, c.c20.w/2];
  for (let i = 0; i < 4; i++) {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.5), D.materials.concrete); pad.position.set(cx + centralDX[i], 0.1, contZ + centralDZ[i]); h.add(pad);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, roofY, 12), D.materials.steel); post.position.set(cx + centralDX[i], roofY/2, contZ + centralDZ[i]); post.castShadow = true; h.add(post);
  }
  const salonW = c.gap, salonD = c.c20.w, salonH = c.c20.h;
  const salonFloor = new THREE.Mesh(new THREE.BoxGeometry(salonW, 0.12, salonD), D.materials.wood); salonFloor.position.set(cx, floorY, contZ); salonFloor.receiveShadow = true; salonFloor.castShadow = true; h.add(salonFloor);
  const salonRoof = new THREE.Mesh(new THREE.BoxGeometry(salonW + 0.1, 0.12, salonD + 0.1), D.materials.foam); salonRoof.position.set(cx, roofY, contZ); h.add(salonRoof);
  [[cx - salonW/2 + 0.06, contZ - salonD/2 + 0.06], [cx + salonW/2 - 0.06, contZ - salonD/2 + 0.06], [cx - salonW/2 + 0.06, contZ + salonD/2 - 0.06], [cx + salonW/2 - 0.06, contZ + salonD/2 - 0.06]].forEach(([px, pz]) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.12, salonH, 0.12), D.materials.steel); p.position.set(px, floorY + salonH/2, pz); h.add(p);
  });
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(salonW, 0.2, salonD), D.materials.steel); topBeam.position.set(cx, roofY - 0.1, contZ); h.add(topBeam);
  const glassFront = new THREE.Mesh(new THREE.BoxGeometry(0.04, salonH - 0.4, salonD - 0.2), D.materials.glass); glassFront.position.set(cx - salonW/2 + 0.02, floorY + salonH/2, contZ); h.add(glassFront);
  const glassBack = new THREE.Mesh(new THREE.BoxGeometry(0.04, salonH - 0.4, salonD - 0.2), D.materials.glass); glassBack.position.set(cx + salonW/2 - 0.02, floorY + salonH/2, contZ); h.add(glassBack);
  const upperZ = contZ - c.c20.w/2 - c.upperW/2 + 0.2;
  const upper = new THREE.Mesh(new THREE.BoxGeometry(c.upperL, c.upperH, c.upperW), D.materials.foam); upper.position.set(cx, roofY + c.upperH/2, upperZ); upper.castShadow = true; upper.receiveShadow = true; h.add(upper);
  const upperTop = new THREE.Mesh(new THREE.BoxGeometry(c.upperL, 0.12, c.upperW + 0.04), D.materials.steel); upperTop.position.set(cx, roofY + c.upperH, upperZ); h.add(upperTop);
  const upperBottom = new THREE.Mesh(new THREE.BoxGeometry(c.upperL, 0.08, c.upperW + 0.04), D.materials.steel); upperBottom.position.set(cx, roofY, upperZ); h.add(upperBottom);
  const win1 = new THREE.Mesh(new THREE.BoxGeometry(c.upperL - 0.4, 0.8, 0.05), D.materials.glass); win1.position.set(cx, roofY + c.upperH/2 + 0.2, upperZ + c.upperW/2 + 0.01); h.add(win1);
  const win2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, c.upperW - 0.4), D.materials.glass); win2.position.set(cx - c.upperL/2 - 0.01, roofY + c.upperH/2 + 0.2, upperZ); h.add(win2);
  const terraceZ = contZ + c.c20.w/2 + c.terraceW/2 - 0.2;
  const terrace = new THREE.Mesh(new THREE.BoxGeometry(c.terraceL, 0.12, c.terraceW), D.materials.wood); terrace.position.set(cx, roofY, terraceZ); terrace.receiveShadow = true; terrace.castShadow = true; h.add(terrace);
  const canopy = new THREE.Group();
  for (let i = 0; i <= 6; i++) {
    const tx = -c.terraceL/2 + i * (c.terraceL/6); const beam = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 0.08), D.materials.steel); beam.position.set(tx, 1.2, 0); canopy.add(beam);
  }
  for (let i = 0; i < 5; i++) {
    const tx = -c.terraceL/2 + 0.7 + i * 1.6; const strip = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.3, c.terraceW + 0.6), D.materials.shade); strip.position.set(tx, 1.2, 0); canopy.add(strip);
  }
  canopy.position.set(cx, roofY + 2.4, terraceZ); h.add(canopy);
  const railingH = 1.1;
  const railPositions = [{x:0,z:-c.terraceW/2-0.04,w:c.terraceL,d:0.04},{x:0,z:c.terraceW/2+0.04,w:c.terraceL,d:0.04},{x:-c.terraceL/2-0.04,z:0,w:0.04,d:c.terraceW},{x:c.terraceL/2+0.04,z:0,w:0.04,d:c.terraceW}];
  railPositions.forEach(r => { const rail = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.08, r.d), D.materials.steel); rail.position.set(cx + r.x, roofY + railingH, terraceZ + r.z); h.add(rail); });
  for (let i = 0; i <= 6; i++) {
    const tx = -c.terraceL/2 + i * (c.terraceL/6);
    const rp1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, railingH, 8), D.materials.steel); rp1.position.set(cx + tx, roofY + railingH/2, terraceZ - c.terraceW/2 + 0.04); h.add(rp1);
    const rp2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, railingH, 8), D.materials.steel); rp2.position.set(cx + tx, roofY + railingH/2, terraceZ + c.terraceW/2 - 0.04); h.add(rp2);
  }
  const underZ = contZ + c.c20.w/2 + 1.2;
  const kitchen = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1.6), new THREE.MeshStandardMaterial({color:0x9ca3af})); kitchen.position.set(leftCX + 1, 0.45, underZ); kitchen.castShadow = true; h.add(kitchen);
  const sink = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.4), D.materials.water); sink.position.set(leftCX + 1, 0.95, underZ - 0.3); h.add(sink);
  const pantry = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.5, 1.5), D.materials.woodLight); pantry.position.set(cx, 0.75, underZ); pantry.castShadow = true; h.add(pantry);
  const pantryRoof = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.7), D.materials.roof); pantryRoof.position.set(cx, 1.55, underZ); pantryRoof.rotation.z = 0.1; h.add(pantryRoof);
  const shower = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.9, 1.6), new THREE.MeshStandardMaterial({color:0x6b7280})); shower.position.set(rightCX - 1, 0.95, underZ); shower.castShadow = true; h.add(shower);
  const showerDoor = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.5, 0.05), new THREE.MeshStandardMaterial({color:0x4b5563})); showerDoor.position.set(rightCX - 1, 0.75, underZ + 0.82); h.add(showerDoor);
  const courtyard = new THREE.Mesh(new THREE.PlaneGeometry(c.c20.l * 2 + c.gap + 1, c.c20.w + 2), new THREE.MeshStandardMaterial({color:D.COLORS.path})); courtyard.rotation.x = -Math.PI/2; courtyard.position.set(cx, 0.02, contZ); courtyard.receiveShadow = true; h.add(courtyard);
  const suv = new THREE.Group();
  const suvBody = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.4, 1.9), new THREE.MeshStandardMaterial({color:D.COLORS.suv})); suvBody.position.set(0, 1.0, 0); suvBody.castShadow = true; suv.add(suvBody);
  const suvCabin = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 1.7), new THREE.MeshStandardMaterial({color:0x1d4ed8})); suvCabin.position.set(-0.3, 2.0, 0); suv.add(suvCabin);
  const wheelMat = new THREE.MeshStandardMaterial({color:0x1f2937});
  [[-1.6,-0.9],[1.6,-0.9],[-1.6,0.9],[1.6,0.9]].forEach(([dx,dz]) => { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.35,0.35,0.25,16), wheelMat); w.rotation.x = Math.PI/2; w.position.set(dx,0.35,dz); suv.add(w); });
  suv.position.set(cx, 0, contZ); h.add(suv);
  D.scene.add(h); D.clickableZone('habitat', D.ZONES.habitat, h); D.register(h, 4); D.label('Habitat conteneurs', cx, 6.5, contZ, 1.0);
};
