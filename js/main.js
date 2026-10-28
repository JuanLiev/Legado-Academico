/* Lógica de la página. Los datos editables están en js/config.js */
(function(){
  document.querySelectorAll('[data-field]').forEach(el=>{
    const k = el.dataset.field; if (!(k in LEGADO)) return;
    const v = (LEGADO[k]||"").trim();
    if (/Nota$/.test(k)){ el.hidden = !v; el.textContent = v; return; }
    el.textContent = v;
  });
  document.querySelectorAll('[data-optional]').forEach(li=>{ li.hidden = !(LEGADO[li.dataset.optional]||"").trim(); });

  const ins = document.getElementById('btnInscripcion');
  if (LEGADO.inscripcionUrl.trim()){
    ins.href = LEGADO.inscripcionUrl; ins.target = "_blank"; ins.rel = "noopener";
    ins.removeAttribute('aria-disabled'); ins.removeAttribute('role');
    ins.textContent = "Inscribirme ahora";
    document.getElementById('estadoInscripcion').textContent = "Inscripciones abiertas";
    document.querySelector('[data-field="inscripcionTexto"]').textContent = LEGADO.inscripcionTextoAbierta;
  }
  const igUrl = LEGADO.instagramUrl.trim(), igUser = LEGADO.instagramUsuario.trim();
  if (igUrl){
    document.querySelectorAll('a[href*="instagram.com"]').forEach(a=> a.href = igUrl);
    if (igUser) document.getElementById('igHandle').textContent = igUser;
  }
  const toast = document.getElementById('toast');
  const say = m => { toast.textContent = m; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'), 2400); };
  document.getElementById('btnShare').addEventListener('click', async ()=>{
    const data = { title:"XXII Legado Académico", text:"El XXII Legado Académico está abierto a estudiantes de medicina e internos de cualquier universidad. Conócelo aquí:", url: location.href };
    try{
      if (navigator.share){ await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href); say("Enlace copiado");
    }catch(e){ if (e && e.name !== 'AbortError') say("Copia el enlace desde la barra del navegador"); }
  });
})();
