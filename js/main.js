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

  // Encabezado: sombra suave al desplazarse
  const top = document.querySelector('.top');
  let ticking = false;
  const onScroll = ()=>{ top.classList.toggle('scrolled', window.scrollY > 8); ticking = false; };
  window.addEventListener('scroll', ()=>{ if (!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, { passive:true });
  onScroll();

  if (!('IntersectionObserver' in window)) return;

  // Menú: resalta la sección visible
  const links = [...document.querySelectorAll('.nav a')];
  const spy = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if (!en.isIntersecting) return;
      links.forEach(a=> a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  links.forEach(a=>{ const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

  // Aparición suave de tarjetas y listas (se omite con "reducir movimiento")
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const items = document.querySelectorAll('.cards li, .req-list li, .details li, .open-call, .join-card, .ig-card');
  const reveal = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      const done = e=>{
        if (e.target !== el) return;
        el.classList.remove('reveal', 'in'); el.style.removeProperty('--d');
        el.removeEventListener('transitionend', done);
      };
      el.addEventListener('transitionend', done);
      reveal.unobserve(el);
    });
  }, { rootMargin:'0px 0px -8% 0px' });
  items.forEach(el=>{
    const i = [...el.parentElement.children].indexOf(el);
    el.style.setProperty('--d', Math.min(i, 5) * 60 + 'ms');
    el.classList.add('reveal');
    reveal.observe(el);
  });
})();
