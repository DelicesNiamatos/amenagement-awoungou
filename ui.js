window.DNA = window.DNA || {};
var D = DNA;
D.initUI = function() {
  const zonesEl = document.getElementById('zones');
  if (!zonesEl) return;
  Object.entries(D.ZONES).forEach(([key, z]) => {
    const div = document.createElement('div'); div.className = 'zone-item';
    div.innerHTML = `<span class="zone-dot" style="background:#${z.color.toString(16).padStart(6,'0')}"></span><span><strong>${z.name}</strong><br><span style="color:#7d7a75;font-size:10px">${z.area} • Phase ${z.phase}</span></span>`;
    div.onclick = () => D.showInfo(key); zonesEl.appendChild(div);
  });
  document.querySelectorAll('#phases button').forEach(btn => {
    btn.addEventListener('click', () => D.setPhase(+btn.dataset.p));
  });
  D.setPhase(4);
  D.canvas.addEventListener('pointermove', e => {
    const rect = D.canvas.getBoundingClientRect();
    D.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    D.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    D.raycaster.setFromCamera(D.mouse, D.camera);
    const hits = D.raycaster.intersectObjects(D.clickable, true);
    const hit = hits.find(h => h.object.userData && h.object.userData.id);
    const tooltip = document.getElementById('tooltip');
    if (hit && tooltip) {
      D.canvas.style.cursor = 'pointer'; tooltip.style.display = 'block'; tooltip.style.left = (e.clientX + 12) + 'px'; tooltip.style.top = (e.clientY + 12) + 'px'; tooltip.textContent = hit.object.userData.data.name; D.hovered = hit.object.userData.id;
    } else {
      D.canvas.style.cursor = 'default'; if (tooltip) tooltip.style.display = 'none'; D.hovered = null;
    }
  });
  D.canvas.addEventListener('click', e => {
    const rect = D.canvas.getBoundingClientRect();
    D.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    D.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    D.raycaster.setFromCamera(D.mouse, D.camera);
    const hits = D.raycaster.intersectObjects(D.clickable, true);
    const hit = hits.find(h => h.object.userData && h.object.userData.id);
    if (hit) D.showInfo(hit.object.userData.id);
  });
  window.addEventListener('resize', () => {
    D.camera.aspect = window.innerWidth / window.innerHeight; D.camera.updateProjectionMatrix(); D.renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
D.showInfo = function(id) {
  const z = D.ZONES[id]; if (!z) return;
  const content = document.getElementById('info-content');
  const hex = '#' + z.color.toString(16).padStart(6, '0');
  content.innerHTML = `<h3 style="color:${hex}">● ${z.name}</h3><p><strong>Surface :</strong> ${z.area}</p><p><strong>Phase :</strong> ${z.phase}</p><p><strong>Items :</strong> ${z.items}</p><p><strong>Budget :</strong> ${z.budget}</p><p><strong>Description :</strong> ${z.info}</p>`;
  document.getElementById('info').classList.add('on');
};
