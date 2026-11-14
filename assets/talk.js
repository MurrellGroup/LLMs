(() => {
  'use strict';
  const {slides, sources} = window.LLMTalk;
  const diagrams = window.LLMDiagrams;
  const $ = id => document.getElementById(id);
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = seconds => `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`;
  const params = new URLSearchParams(location.search);
  const handout = params.has('handout');
  const presenter = params.has('presenter');
  const maxStep = slide => slide.scene ? diagrams.scenes[slide.scene].steps : (slide.steps || 0);
  const starts = slides.map((_, i) => slides.slice(0,i).reduce((n,s) => n+s.duration,0));
  let current = 0, step = 0, printing = false;
  let timerRunning = false, timerStart = 0, timerElapsed = 0;
  let channel;
  try { channel = new BroadcastChannel('murrellgroup-llms-presentation'); } catch (_) { /* Offline presentation still works. */ }

  $('stage').innerHTML = slides.map((s,i) => {
    const title = s.className === 'title-slide' ? '' : `<h2>${escape(s.title)}</h2>`;
    const body = s.scene ? `<div class="diagram" data-scene="${escape(s.scene)}"></div><p class="caption">${escape(s.caption || '')}</p>` : s.html;
    const citations = (s.sources || []).map(key => `<a href="${escape(sources[key].url)}" target="_blank" rel="noopener noreferrer">${escape(sources[key].label)}</a>`).join(' · ');
    return `<section class="slide ${s.className || ''} ${s.scene ? 'diagram-slide' : ''}" id="${escape(s.id)}" data-index="${i}" role="group" aria-roledescription="slide" aria-label="${i+1} of ${slides.length}: ${escape(s.title)}" aria-hidden="true" inert>${title}<div class="body">${body}</div><p class="citation">${citations}</p></section>`;
  }).join('');
  const sections = [...document.querySelectorAll('.slide')];

  $('slide-index').innerHTML = slides.map((s,i) => `<li><button data-slide="${i}" title="${fmt(starts[i])}–${fmt(starts[i]+s.duration)}">${escape(s.title)}</button></li>`).join('');
  $('source-list').innerHTML = Object.values(sources).map(s => `<li><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)}</a><p>${escape(s.label)}. ${escape(s.note)}</p></li>`).join('');

  function renderBuild(index, build) {
    const el = sections[index], slide = slides[index];
    el.dataset.step = String(build);
    el.querySelectorAll('[data-reveal]').forEach(node => {
      const show = Number(node.dataset.reveal) <= build;
      node.classList.toggle('shown', show);
      node.setAttribute('aria-hidden', String(!show));
    });
    el.querySelectorAll('[data-until]').forEach(node => { node.hidden = build >= Number(node.dataset.until); });
    el.querySelectorAll('[data-width-step]').forEach(node => {
      node.style.width = build >= Number(node.dataset.widthStep) ? node.dataset.widthAfter : node.dataset.widthBefore;
    });
    if (slide.scene) el.querySelector('.diagram').innerHTML = diagrams.render(slide.scene, build);
  }

  function resize() {
    if (handout) return;
    const bounds = $('viewport').getBoundingClientRect();
    document.documentElement.style.setProperty('--scale', String(Math.max(.1, Math.min(bounds.width/1280, bounds.height/720))));
  }

  function updateNotes() {
    const slide = slides[current];
    $('notes-title').textContent = `${current+1}. ${slide.title}`;
    $('notes-time').textContent = `${fmt(starts[current])}–${fmt(starts[current]+slide.duration)} planned · ${fmt(slide.duration)} on this slide`;
    const sourceLinks = (slide.sources || []).map(k => `<a href="${escape(sources[k].url)}" target="_blank" rel="noopener noreferrer">${escape(sources[k].label)}</a>`).join('<br>');
    $('notes-content').innerHTML = slide.notes + (sourceLinks ? `<p class="note-sources">${sourceLinks}</p>` : '');
    $('next-cue').textContent = step < maxStep(slide)
      ? `Next: ${slide.scene ? diagrams.scenes[slide.scene].label[step+1] : `reveal ${step+1} of ${maxStep(slide)}`}`
      : (current < slides.length-1 ? `Next slide: ${slides[current+1].title}` : 'End of talk. Questions.');
  }

  function navigate(index, build=0, broadcast=true, writeHash=true) {
    current = Math.max(0,Math.min(slides.length-1,index));
    step = Math.max(0,Math.min(maxStep(slides[current]),build));
    sections.forEach((el,i) => {
      const active = i === current || handout;
      el.classList.toggle('active',active);
      el.setAttribute('aria-hidden',String(!active));
      el.inert = !active;
    });
    if (!handout) renderBuild(current,step);
    const max = maxStep(slides[current]);
    $('slide-counter').textContent = `${current+1} / ${slides.length}`;
    $('build-status').textContent = '●'.repeat(step) + '○'.repeat(max-step);
    $('previous').disabled = current === 0 && step === 0;
    $('next').disabled = current === slides.length-1 && step === max;
    document.querySelectorAll('[data-slide]').forEach(b => b.setAttribute('aria-current', String(Number(b.dataset.slide) === current)));
    document.title = `${current+1}. ${slides[current].title} · Large language models`;
    if (writeHash && !handout) history.replaceState(null,'',`#${current+1}.${step}`);
    updateNotes();
    $('announcement').textContent = `${current+1} of ${slides.length}. ${slides[current].title}. ${slides[current].scene ? diagrams.scenes[slides[current].scene].label[step] : `Step ${step} of ${max}.`}`;
    if (broadcast && channel && !handout) channel.postMessage({type:'slide',current,step});
  }

  function next() {
    if (step < maxStep(slides[current])) navigate(current,step+1);
    else if (current < slides.length-1) navigate(current+1,0);
  }
  function previous() {
    if (step > 0) navigate(current,step-1);
    else if (current > 0) navigate(current-1,maxStep(slides[current-1]));
  }
  function notes(show) {
    if (presenter) show = true;
    $('notes-panel').hidden = !show;
    document.body.classList.toggle('with-notes',show);
    $('notes-button').setAttribute('aria-pressed',String(show));
    resize();
  }
  function showDialog(id) {
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
    $(id).showModal();
  }
  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(()=>{});
    else document.documentElement.requestFullscreen?.().catch(()=>{});
  }
  function openPresenter() {
    const url = new URL(location.href);
    url.searchParams.delete('handout');
    url.searchParams.set('presenter','1');
    const popup = window.open(url.href,'llm-talk-presenter','width=1500,height=850');
    if (!popup) { notes(true); $('announcement').textContent = 'Pop-up blocked. Speaker notes are open here instead.'; }
  }
  function elapsedNow() { return timerElapsed + (timerRunning ? (Date.now()-timerStart)/1000 : 0); }
  function paintTimer() { $('timer').textContent = fmt(elapsedNow()); }
  function toggleTimer(reset=false) {
    if (reset) { timerElapsed = 0; timerStart = Date.now(); }
    else if (timerRunning) { timerElapsed = elapsedNow(); timerRunning = false; }
    else { timerStart = Date.now(); timerRunning = true; }
    $('timer').hidden = false;
    paintTimer();
    if (channel) channel.postMessage({type:'timer',timerElapsed,timerRunning,timerStart});
  }
  function readHash() {
    if (location.hash === '#controls') return;
    const match = location.hash.match(/^#(\d+)(?:\.(\d+))?$/);
    if (match) navigate(Number(match[1])-1,Number(match[2]||0),false,false);
    else {
      const i = slides.findIndex(s => `#${s.id}` === location.hash);
      navigate(i>=0 ? i : 0,0,false,false);
    }
  }

  $('next').addEventListener('click',next);
  $('previous').addEventListener('click',previous);
  $('slide-counter').addEventListener('click',()=>showDialog('index-dialog'));
  $('notes-button').addEventListener('click',()=>notes($('notes-panel').hidden));
  $('close-notes').addEventListener('click',()=>notes(false));
  $('presenter-button').addEventListener('click',openPresenter);
  $('fullscreen-button').addEventListener('click',fullscreen);
  $('help-button').addEventListener('click',()=>showDialog('help-dialog'));
  $('sources-button').addEventListener('click',()=>showDialog('sources-dialog'));
  $('print-button').addEventListener('click',()=>{ $('help-dialog').close(); window.print(); });
  $('blank-screen').addEventListener('click',()=>{ $('blank-screen').hidden=true; });
  document.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>{
    navigate(Number(button.dataset.slide),0); $('index-dialog').close();
  }));

  document.addEventListener('keydown',event=>{
    if (event.ctrlKey || event.metaKey || event.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (!$('blank-screen').hidden) { $('blank-screen').hidden=true; event.preventDefault(); return; }
    if (document.querySelector('dialog[open]')) return;
    if (handout) return;
    const key = event.key;
    if (['ArrowRight','ArrowDown','PageDown',' '].includes(key)) {
      if (key === ' ' && event.target.closest('button,a')) return;
      event.preventDefault();
      if (event.shiftKey) { if (current < slides.length-1) navigate(current+1,0); } else next();
    } else if (['ArrowLeft','ArrowUp','PageUp'].includes(key)) {
      event.preventDefault();
      if (event.shiftKey) { if (current > 0) navigate(current-1,0); } else previous();
    } else if (key==='Home') { event.preventDefault(); navigate(0,0); }
    else if (key==='End') { event.preventDefault(); navigate(slides.length-1,0); }
    else if (key.toLowerCase()==='r') navigate(current,0);
    else if (key.toLowerCase()==='n') notes($('notes-panel').hidden);
    else if (key.toLowerCase()==='p') openPresenter();
    else if (key.toLowerCase()==='o') showDialog('index-dialog');
    else if (key.toLowerCase()==='f') fullscreen();
    else if (key.toLowerCase()==='t') toggleTimer(event.shiftKey);
    else if (key.toLowerCase()==='b') $('blank-screen').hidden=false;
    else if (key==='?') showDialog('help-dialog');
    else if (key==='Escape') notes(false);
  });

  window.addEventListener('resize',resize);
  window.addEventListener('hashchange',readHash);
  window.addEventListener('beforeprint',()=>{
    printing=true;
    slides.forEach((s,i)=>renderBuild(i,maxStep(s)));
  });
  window.addEventListener('afterprint',()=>{
    printing=false;
    if (!handout) navigate(current,step,false);
  });
  if (channel) channel.onmessage = ({data}) => {
    if (handout || printing) return;
    if (data.type==='slide' && Number.isInteger(data.current) && Number.isInteger(data.step)) navigate(data.current,data.step,false);
    if (data.type==='request' && !presenter) {
      channel.postMessage({type:'slide',current,step});
      channel.postMessage({type:'timer',timerElapsed,timerRunning,timerStart});
    }
    if (data.type==='timer') {
      timerElapsed = Number(data.timerElapsed)||0;
      timerStart = Number(data.timerStart)||Date.now();
      timerRunning = Boolean(data.timerRunning);
      $('timer').hidden=false; paintTimer();
    }
  };
  setInterval(paintTimer,1000);
  if (handout) {
    document.documentElement.classList.add('handout');
    document.body.classList.add('handout');
    slides.forEach((s,i)=>renderBuild(i,maxStep(s)));
  }
  if (presenter) {
    document.body.classList.add('presenter');
    $('timer').hidden=false;
    notes(true);
  }
  readHash();
  resize();
  if (presenter && channel) channel.postMessage({type:'request'});
})();
