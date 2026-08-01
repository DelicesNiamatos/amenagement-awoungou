import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const DATA = window.D;
const err = (msg) => {
  const e = document.getElementById('error');
  const l = document.getElementById('loading');
  const u = document.getElementById('ui');
  if (e) { e.style.display = 'block'; e.innerHTML = `<strong>Erreur 3D</strong><br>${msg}`; }
  if (l) l.style.display = 'none';
  if (u) u.style.display = 'none';
  console.error(msg);
};
const ok = () => {
  const l = document.getElementById('loading');
  const u = document.getElementById('ui');
  if (l) l.style.display = 'none';
  if (u) u.style.display = 'block';
};

try {
  if (!DATA) throw new Error('data.js non chargé : window.D est indéfini.');

  const canvas = document.getElementById('c');
  if (!canvas) throw new Error('Canvas #c introuvable.');

  const scene = new T.Scene();
  scene.background = new T.Color(0xe8e6e1);
  scene.fog = new T.Fog(0xe8e6e1, 15, 60);

  const camera = new T.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(18, 14, 18);

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false });
  if (!renderer) throw new Error('WebGL non disponible sur ce navigateur.');
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.2;
  controls.minDistance = 5;
  controls.maxDistance = 40;
  controls.target.set(0, 0, 0);

  const light = new T.DirectionalLight(0xffffff, 1.2);
  light.position.set(10, 20, 8);
  light.castShadow = true;
  scene.add(light);
  scene.add(new T.AmbientLight(0xffffff, 0.5));

  const ground = new T.Mesh(new T.PlaneGeometry(30, 30), new T.MeshStandardMaterial({ color: 0xd6d2c8, roughness: 0.9 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new T.GridHelper(30, 30, 0x999999, 0xbbbbbb);
  grid.position.y = 0.01;
  scene.add(grid);

  const zones = [];
  function addZone(id, x, z, W, depth, H) {
    const d = DATA[id];
    const group = new T.Group();
    group.position.set(x, H / 2, z);
    const box = new T.Mesh(
      new T.BoxGeometry(W, H, depth),
      new T.MeshStandardMaterial({ color: d.c, transparent: true, opacity: 0.85, roughness: 0.7 })
    );
    box.castShadow = true;
    box.receiveShadow = true;
    box.userData = { id };
    group.add(box);
    zones.push({ group, id, box, H });
    const edges = new T.EdgesGeometry(new T.BoxGeometry(W, H, depth));
    group.add(new T.LineSegments(edges, new T.LineBasicMaterial({ color: 0x333333 })));
    scene.add(group);
  }
  addZone('A', -6, 3, 4, 5, 0.2);
  addZone('B', 3, 2, 8, 6, 0.2);
  addZone('C', -5, -5, 6, 6, 0.2);
  addZone('D', 4, -5, 7, 6, 0.2);
  addZone('E', 0, 8, 6, 4, 0.2);

  const items = {};
  const cone = new T.ConeGeometry(0.25, 1, 6);
  const box = new T.BoxGeometry(0.4, 0.4, 0.4);
  function placeItems(id, n, ht, geom) {
    const a = [];
    const zone = zones.find(z => z.id === id);
    for (let i = 0; i < n; i++) {
      const m = new T.Mesh(geom, new T.MeshStandardMaterial({ color: 0x228b22 }));
      m.castShadow = true;
      m.position.set(
        zone.group.position.x + (Math.random() - 0.5) * zone.box.geometry.parameters.width * 0.8,
        ht / 2 + zone.H / 2,
        zone.group.position.z + (Math.random() - 0.5) * zone.box.geometry.parameters.depth * 0.8
      );
      m.scale.set(0.6, 0.6, 0.6);
      m.visible = false;
      scene.add(m);
      a.push(m);
    }
    items[id] = a;
  }
  placeItems('A', 12, 0.5, cone);
  placeItems('B', 18, 1.2, cone);
  placeItems('C', 10, 0.8, cone);
  placeItems('D', 14, 1, cone);
  placeItems('E', 1, 1.5, box);

  function setPhase(p) {
    document.querySelectorAll('#ph button').forEach(b => b.classList.toggle('on', +b.dataset.p === p));
    Object.keys(items).forEach(k => items[k].forEach(m => m.visible = p >= DATA[k].p));
  }
  setPhase(0);

  const ray = new T.Raycaster();
  const mouse = new T.Vector2();
  window.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || e.target.closest('.p')) return;
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObjects(zones.map(z => z.box));
    if (hits.length) {
      const z = DATA[hits[0].object.userData.id];
      let html = `<h3 style="color:${z.c}">● Zone ${hits[0].object.userData.id} — ${z.n}</h3>`;
      html += `<p><b>Surface:</b> ${z.s} | <b>Phase:</b> ${z.p}</p>`;
      html += `<p><b>Items:</b> ${z.i}</p>`;
      html += `<p><b>Budget:</b> ${z.b}</p>`;
      html += `<p><b>Clés:</b> ${z.k}</p>`;
      html += `<p><b>Points à vérifier:</b></p><ul>${z.w.split(',').map(x => `<li>${x.trim()}</li>`).join('')}</ul>`;
      document.getElementById('ib').innerHTML = html;
      document.getElementById('info').classList.add('on');
    }
  });

  window.hide = function () { document.getElementById('info').classList.remove('on'); };
  window.rv = function () { camera.position.set(18, 14, 18); controls.target.set(0, 0, 0); controls.update(); };
  window.tv = function () { camera.position.set(0, 25, 0); controls.target.set(0, 0, 0); controls.update(); };
  document.querySelectorAll('#ph button').forEach(b => b.onclick = () => setPhase(+b.dataset.p));
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  function animate() { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }
  animate();
  ok();
} catch (e) {
  err(e.message);
}
