window.DNA = window.DNA || {};
const D = DNA;
D.canvas = document.getElementById('canvas');
D.scene = new THREE.Scene();
D.scene.background = new THREE.Color(0xf9f8f7);
D.scene.fog = new THREE.Fog(0xf9f8f7, 40, 120);
D.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
D.camera.position.set(35, 25, 45);
D.renderer = new THREE.WebGLRenderer({ canvas: D.canvas, antialias: true, alpha: true });
D.renderer.setSize(window.innerWidth, window.innerHeight);
D.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
D.renderer.shadowMap.enabled = true;
D.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
D.controls = new THREE.OrbitControls(D.camera, D.renderer.domElement);
D.controls.enableDamping = true;
D.controls.dampingFactor = 0.08;
D.controls.maxPolarAngle = Math.PI / 2 - 0.02;
D.controls.target.set(0, 2, 0);
D.controls.update();
D.scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const sun = new THREE.DirectionalLight(0xfff7e6, 0.9);
sun.position.set(25, 40, 20);
sun.castShadow = true;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 120;
sun.shadow.camera.left = -35; sun.shadow.camera.right = 35; sun.shadow.camera.top = -35; sun.shadow.camera.bottom = 35;
D.scene.add(sun);
D.scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f6b, 0.35));
D.raycaster = new THREE.Raycaster();
D.mouse = new THREE.Vector2();
D.hovered = null;
D.clickable = [];
D.phaseGroups = { 0: [], 1: [], 2: [], 3: [], 4: [] };
D.materials = {
  foam: new THREE.MeshStandardMaterial({ color: D.COLORS.foam, roughness: 0.9, metalness: 0.0 }),
  steel: new THREE.MeshStandardMaterial({ color: D.COLORS.steel, roughness: 0.4, metalness: 0.6 }),
  wood: new THREE.MeshStandardMaterial({ color: D.COLORS.wood, roughness: 0.8 }),
  woodLight: new THREE.MeshStandardMaterial({ color: D.COLORS.woodLight, roughness: 0.8 }),
  glass: new THREE.MeshStandardMaterial({ color: D.COLORS.glass, transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.1 }),
  concrete: new THREE.MeshStandardMaterial({ color: D.COLORS.concrete, roughness: 0.9 }),
  roof: new THREE.MeshStandardMaterial({ color: D.COLORS.roof, roughness: 0.6 }),
  polycarbonate: new THREE.MeshStandardMaterial({ color: D.COLORS.polycarbonate, transparent: true, opacity: 0.6, roughness: 0.2, metalness: 0.1 }),
  solar: new THREE.MeshStandardMaterial({ color: D.COLORS.solar, roughness: 0.3, metalness: 0.4 }),
  water: new THREE.MeshStandardMaterial({ color: D.COLORS.water, transparent: true, opacity: 0.8 }),
  shade: new THREE.MeshStandardMaterial({ color: D.COLORS.shade, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
};
D.register = function(g, p) { D.phaseGroups[p].push(g); };
D.addMesh = function(m) { D.scene.add(m); return m; };
D.makeBox = function(w, h, d, mat, x, y, z) {
  const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  g.position.set(x, y, z); g.castShadow = true; g.receiveShadow = true;
  return D.addMesh(g);
};
D.makeCylinder = function(rt, rb, h, mat, x, y, z) {
  const g = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 16), mat);
  g.position.set(x, y, z); g.castShadow = true; g.receiveShadow = true;
  return D.addMesh(g);
};
D.makePlane = function(w, d, mat, x, y, z, rx) {
  const g = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
  g.rotation.x = rx || 0; g.position.set(x, y, z); g.receiveShadow = true;
  return D.addMesh(g);
};
D.label = function(text, x, y, z, size) {
  try {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    if (ctx.roundRect) { ctx.roundRect(10, 10, 492, 108, 16); ctx.fill(); }
    else { ctx.fillRect(10, 10, 492, 108); }
    ctx.fillStyle = '#2c2c2b';
    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 64);
    const tex = new THREE.CanvasTexture(c);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    sprite.position.set(x, y, z);
    sprite.scale.set((size || 0.6) * 4, size || 0.6, 1);
    D.scene.add(sprite);
    return sprite;
  } catch (e) { console.warn('Label error', e); return null; }
};
D.clickableZone = function(id, data, mesh) { mesh.userData = { id, data }; D.clickable.push(mesh); };
D.createTerrain = function() {
  D.makePlane(D.W, D.L, new THREE.MeshStandardMaterial({ color: D.COLORS.terrain, roughness: 1 }), 0, 0, 0, -Math.PI / 2);
  const grid = new THREE.GridHelper(Math.max(D.W, D.L), Math.max(D.W, D.L), 0x999999, 0xc2b9a8);
  grid.position.y = 0.01; D.scene.add(grid);
  const wallGroup = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: D.COLORS.wall, roughness: 0.9 });
  const wall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, D.L), wallMat);
  wall.position.set(-D.W/2 + 0.15, 0.7, 0); wall.castShadow = true; wall.receiveShadow = true;
  wallGroup.add(wall); D.scene.add(wallGroup); D.register(wallGroup, 0);
  const fenceGroup = new THREE.Group();
  const postMat = new THREE.MeshStandardMaterial({ color: D.COLORS.fencePost, roughness: 0.8 });
  const hedgeMat = new THREE.MeshStandardMaterial({ color: D.COLORS.hedge, roughness: 0.95 });
  const sides = [
    { x: D.W/2 - 0.15, z: 0, w: 0.3, d: D.L },
    { x: 0, z: -D.L/2 + 0.15, w: D.W, d: 0.3 },
    { x: 0, z: D.L/2 - 0.15, w: D.W, d: 0.3 }
  ];
  sides.forEach(s => {
    const len = Math.max(s.w, s.d);
    const postCount = Math.floor(len / 2.5);
    for (let j = 0; j <= postCount; j++) {
      const t = j / postCount;
      const px = s.w > s.d ? -s.w/2 + s.w * t : s.x;
      const pz = s.d > s.w ? -s.d/2 + s.d * t : s.z;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.8, 8), postMat);
      post.position.set(px, 0.9, pz); post.castShadow = true; fenceGroup.add(post);
    }
    const wire = new THREE.Mesh(new THREE.BoxGeometry(s.w, 1.2, s.d), new THREE.MeshStandardMaterial({ color: D.COLORS.fenceWire, transparent: true, opacity: 0.25, wireframe: true }));
    wire.position.set(s.x, 1.0, s.z); fenceGroup.add(wire);
    const hedgeH = 1.2;
    const hedge = new THREE.Mesh(new THREE.BoxGeometry(s.w > s.d ? s.w - 0.6 : 0.8, hedgeH, s.w > s.d ? 0.8 : s.d - 0.6), hedgeMat);
    const hedgeX = s.x > 0 ? s.x - 0.5 : (s.x < 0 ? s.x + 0.5 : s.x);
    const hedgeZ = s.z > 0 ? s.z - 0.5 : (s.z < 0 ? s.z + 0.5 : s.z);
    hedge.position.set(hedgeX, hedgeH/2, hedgeZ); hedge.castShadow =