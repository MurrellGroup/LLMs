/* Click-controlled teaching diagrams. All probabilities and attention weights are illustrative. */
(() => {
  'use strict';
  const C = { ink: '#20242a', blue: '#2864a0', rust: '#ac5b36', gray: '#d3d8dd', muted: '#68727c', pale: '#f3f5f7', white: '#ffffff' };
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const text = (x, y, s, options = {}) => `<text x="${x}" y="${y}" fill="${options.color || C.ink}" font-size="${options.size || 26}" text-anchor="${options.anchor || 'middle'}"${options.weight ? ` font-weight="${options.weight}"` : ''}${options.opacity !== undefined ? ` opacity="${options.opacity}"` : ''}>${esc(s)}</text>`;
  const rect = (x, y, w, h, options = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${options.radius === undefined ? 3 : options.radius}" fill="${options.fill || C.white}" stroke="${options.stroke || C.gray}" stroke-width="${options.width || 2}"${options.opacity !== undefined ? ` opacity="${options.opacity}"` : ''}/>`;
  const line = (x1, y1, x2, y2, options = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${options.color || C.gray}" stroke-width="${options.width || 2.5}"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}${options.marker ? ` marker-end="url(#${options.marker})"` : ''}${options.opacity !== undefined ? ` opacity="${options.opacity}"` : ''}/>`;
  const path = (d, options = {}) => `<path d="${d}" fill="none" stroke="${options.color || C.gray}" stroke-width="${options.width || 2.5}" stroke-linecap="round" stroke-linejoin="round"${options.marker ? ` marker-end="url(#${options.marker})"` : ''}${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}${options.opacity !== undefined ? ` opacity="${options.opacity}"` : ''}/>`;
  const circle = (x, y, r, fill, stroke = fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const arrow = (name, x1, y1, x2, y2, color = 'blue', width = 3) => line(x1, y1, x2, y2, { color: C[color], width, marker: `${name}-${color}` });
  const reveal = content => `<g class="llm-diagram-reveal">${content}</g>`;
  const group = (content, opacity) => `<g opacity="${opacity}">${content}</g>`;
  function token(x, y, label, active = false, w = 120) {
    return rect(x, y, w, 60, { fill: active ? '#eaf1f8' : C.white, stroke: active ? C.blue : C.gray }) + text(x + w / 2, y + 39, label, { size: 28, color: active ? C.blue : C.ink });
  }
  function svg(name, step, content) {
    const scene = scenes[name];
    const description = scene.label[step] || scene.label[scene.label.length - 1];
    const markers = ['blue', 'rust', 'muted', 'gray', 'ink'].map(color => `<marker id="${name}-${color}" viewBox="0 0 10 10" refX="8.8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9 z" fill="${C[color]}"/></marker>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 480" role="img" aria-labelledby="${name}-title ${name}-description" font-family="Arial,Helvetica,sans-serif" style="width:100%;height:100%;display:block"><title id="${name}-title">${esc(scene.title)}</title><desc id="${name}-description">${esc(description)}</desc><defs>${markers}<style>@keyframes llm-diagram-enter{from{opacity:0}to{opacity:1}}.llm-diagram-reveal{animation:llm-diagram-enter 380ms ease-out both}@media(prefers-reduced-motion:reduce){.llm-diagram-reveal{animation:none}}</style></defs>${content}</svg>`;
  }

  function blackbox(step) {
    let s = text(135, 244, 'The sky is', { size: 31 });
    s += arrow('blackbox', 245, 233, 345, 233, 'muted');
    s += rect(355, 120, 340, 225, { fill: C.ink, stroke: C.ink });
    s += text(525, 177, 'neural network', { size: 29, color: C.white });
    if (step >= 1) {
      s += reveal(text(525, 226, 'parameters θ', { color: C.white, size: 26 }) + text(525, 281, '0.17   −0.42   0.08   …', { color: '#cbd5df', size: 24 }));
    }
    if (step >= 2) {
      s += reveal(arrow('blackbox', 710, 233, 790, 233, 'blue') + text(952, 127, 'next token', { size: 26 }) + bars(810, 177, [['blue', .6], ['grey', .25], ['dark', .15]], 0));
    }
    return s;
  }

  function bars(x, y, rows, selected = -1) {
    return rows.map(([word, p], i) => text(x, y + i * 68, word, { anchor: 'start', color: i === selected ? C.blue : C.ink, size: 25 }) + rect(x + 80, y - 21 + i * 68, p * 240, 27, { fill: i === selected ? C.blue : C.gray, stroke: i === selected ? C.blue : C.gray, radius: 0 }) + text(x + 282, y + i * 68, p.toFixed(2), { color: i === selected ? C.blue : C.muted, size: 23 })).join('');
  }

  function optimization(step) {
    const xs = [-3, -1.8, -1.08, -.648, -.3888];
    const theta = xs[step];
    const px = t => 420 + t * 90;
    const py = t => 400 - .5 * t * t * 60;
    let curve = '';
    for (let i = 0; i <= 100; i++) { const a = -3.3 + i * .066; curve += `${i ? 'L' : 'M'}${px(a).toFixed(2)},${py(a).toFixed(2)} `; }
    let s = arrow('optimization', 105, 400, 750, 400, 'muted', 2) + arrow('optimization', 105, 400, 105, 56, 'muted', 2);
    s += text(59, 76, 'loss', { size: 25 }) + text(430, 476, 'one parameter θ', { size: 24 });
    s += path(curve, { color: C.ink, width: 3 });
    [-3, -2, -1, 0, 1, 2, 3].forEach(n => { s += line(px(n), 400, px(n), 407, { color: C.muted, width: 1.5 }) + text(px(n), 433, String(n), { size: 22, color: C.muted }); });
    xs.slice(0, step).forEach(t => { s += circle(px(t), py(t), 5, C.gray); });
    const tangent = .55;
    const tangentY = t => py(theta) - theta * 60 * (t - theta);
    s += reveal(line(px(theta - tangent), tangentY(theta - tangent), px(theta + tangent), tangentY(theta + tangent), { color: C.rust, width: 3, dash: '7 6' }) + circle(px(theta), py(theta), 10, C.blue));
    s += reveal(arrow('optimization', px(theta), 445, px(theta) + 90 * (-.4 * theta), 445, 'rust', 3));
    s += text(929, 122, 'loss = θ² / 2', { size: 29 });
    s += text(929, 185, 'θ ← θ − 0.4 × gradient', { size: 24 });
    s += text(929, 272, `θ = ${theta.toFixed(2)}`, { color: C.blue, size: 29 });
    s += text(929, 320, `gradient = ${theta.toFixed(2)}`, { color: C.rust, size: 25 });
    s += text(929, 368, `loss = ${(.5 * theta * theta).toFixed(2)}`, { size: 25 });
    return s;
  }

  function autoregression(step) {
    const words = ['The', 'sky', 'is'];
    if (step >= 2) words.push('blue');
    if (step >= 3) words.push('.');
    let s = text(90, 62, 'context', { anchor: 'start', size: 25, color: C.muted });
    words.forEach((word, i) => { s += token(90 + i * 145, 91, word, i === words.length - 1); });
    const contextEnd = 210 + (words.length - 1) * 145;
    const contextCenter = (90 + contextEnd) / 2;
    s += path(`M90 164 V181 H${contextEnd} V164`, { color: C.blue, width: 2.5 });
    s += path(`M${contextCenter} 181 V215 H477 V242`, { color: C.blue, width: 3, marker: 'autoregression-blue' });
    s += rect(330, 252, 294, 100, { fill: C.ink, stroke: C.ink }) + text(477, 312, 'same model', { size: 28, color: C.white });
    s += arrow('autoregression', 638, 302, 755, 302, 'blue');
    s += text(932, 211, 'next token', { size: 25 });
    const distribution = step < 2 ? [['blue', .6], ['grey', .25], ['dark', .15]] : step === 2 ? [['.', .7], [',', .2], ['and', .1]] : [['The', .45], ['It', .35], ['end', .2]];
    s += bars(786, 265, distribution, step === 0 ? -1 : 0);
    if (step === 1) s += reveal(path('M 864 239 V 184 H 584 V 156', { color: C.blue, width: 3, marker: 'autoregression-blue' }) + group(token(525, 91, 'blue', true), .6));
    if (step >= 2) s += reveal(text(477, 424, 'Append the token. Predict again.', { size: 27 }));
    return s;
  }

  function transformer(step) {
    let s = token(500, 400, 'it', true);
    s += text(560, 470, 'token + position', { size: 22, color: C.muted });
    const ys = [296, 196, 96];
    ys.forEach((y, i) => {
      const on = step > i;
      s += text(279, y + 42, `layer ${i + 1}`, { size: 24, color: on ? C.ink : C.muted });
      s += rect(360, y, 400, 76, { fill: on ? '#eef4fa' : C.white, stroke: on ? C.blue : C.gray });
      s += text(560, y + 31, 'attention', { size: 27, color: on ? C.ink : C.muted });
      s += text(560, y + 60, 'local transformation', { size: 23, color: on ? C.ink : C.muted });
      const bottom = i === 0 ? 399 : ys[i - 1];
      s += arrow('transformer', 560, bottom - 5, 560, y + 82, on ? 'blue' : 'gray', on ? 4 : 2);
    });
    s += step >= 3 ? reveal(arrow('transformer', 560, 89, 560, 55, 'blue', 4) + text(560, 32, 'next-token probabilities', { size: 28, color: C.blue })) : text(560, 32, 'next-token probabilities', { size: 28, color: C.muted, opacity: .45 });
    if (step >= 1) s += text(855, 337, 'updated state', { size: 24, anchor: 'start', color: C.blue });
    return s;
  }

  function attention(step) {
    const centers = [140, 360, 580, 800];
    const words = ['The', 'key', 'fits', 'it'];
    const weights = [.1, .6, .2, .1];
    let s = '';
    centers.forEach((x, i) => {
      s += text(x, 42, words[i], { size: 29, color: i === 3 ? C.blue : C.ink });
      s += rect(x - 52, 90, 104, 49, { stroke: step >= 1 ? C.rust : C.gray, fill: C.white });
      s += text(x, 123, 'K', { size: 27, color: step >= 1 ? C.rust : C.muted });
      if (step >= 2) s += reveal(text(x, 207, weights[i].toFixed(1), { color: C.rust, size: 28 }));
      s += group(rect(x - 52, 245, 104, 53, { stroke: step >= 3 ? C.rust : C.gray, fill: C.white }) + text(x, 280, 'V', { size: 27, color: step >= 3 ? C.rust : C.muted }), step >= 2 ? 1 : .38);
    });
    s += text(991, 42, 'query', { size: 25, color: C.blue });
    s += rect(936, 90, 110, 49, { stroke: C.blue, fill: '#eaf1f8' }) + text(991, 123, 'Q', { size: 27, color: C.blue });
    s += path('M 824 49 H991 V81', { color: C.blue, width: 2, marker: 'attention-blue' });
    if (step >= 1) {
      s += reveal(path('M991 148 V164 H140', { color: C.rust, width: 2.5 }));
      centers.forEach(x => { s += reveal(arrow('attention', x, 164, x, 143, 'rust', 2.5)); });
    }
    if (step >= 2) {
      s += text(991, 210, 'weights', { size: 24, color: C.rust });
      s += text(991, 246, 'sum to 1', { size: 22, color: C.muted });
    }
    if (step >= 3) {
      centers.forEach((x, i) => { s += reveal(path(`M${x} 306 V338 H560 V363`, { color: C.rust, width: 2 + weights[i] * 7, opacity: .55 + weights[i] * .6 })); });
      s += reveal(rect(347, 369, 426, 64, { stroke: C.rust, fill: '#fcf6f2' }) + text(560, 410, 'weighted sum of values', { size: 27 }));
    }
    s += text(45, 413, 'K: key', { anchor: 'start', size: 23, color: C.muted }) + text(45, 451, 'V: value', { anchor: 'start', size: 23, color: C.muted });
    return s;
  }

  function flow(step) {
    const past = [155, 355, 555];
    const current = 912;
    const layers = [
      { y: 344, input: 405, next: 294 },
      { y: 234, input: 295, next: 184 },
      { y: 124, input: 185, next: 74 }
    ];
    let s = '';
    // Grey rails depict earlier token representations, not K/V being propagated upward.
    past.forEach((x, i) => {
      s += line(x, 421, x, 64, { color: C.gray, width: 3 });
      s += text(x + 33, 462, ['The', 'key', 'fits'][i], { size: 28 });
      layers.forEach(layer => { s += circle(x, layer.input, 5, C.muted); });
    });
    s += text(current, 462, 'it', { color: C.blue, size: 29 });
    s += circle(current, 420, 6, C.blue);
    layers.forEach((layer, i) => {
      const on = step >= i + 2;
      const col = on ? C.rust : C.gray;
      s += text(41, layer.y + 8, `${i + 1}`, { size: 24, color: C.muted });
      // Each K,V is a projection of the state at this layer's INPUT (the dot below it).
      past.forEach(x => {
        s += path(`M${x} ${layer.input - 7} H${x + 34} V${layer.y + 25}`, { color: col, width: on ? 2.5 : 1.8, marker: `flow-${on ? 'rust' : 'gray'}` });
        s += rect(x + 4, layer.y - 20, 70, 40, { stroke: col, fill: on ? '#fcf6f2' : C.white });
        s += text(x + 39, layer.y + 8, 'K,V', { size: 22, color: on ? C.rust : C.muted });
      });
      // Lateral messages use a shared bus above the K,V boxes, with a side entry to attention.
      if (on) {
        let bus = path(`M${past[0] + 39} ${layer.y - 25} V${layer.y - 38} H785 V${layer.y} H819`, { color: C.rust, width: 3.2, marker: 'flow-rust' });
        past.slice(1).forEach(x => { bus += line(x + 39, layer.y - 25, x + 39, layer.y - 38, { color: C.rust, width: 3.2 }); });
        s += reveal(bus);
      }
      // The vertical blue arrow is the current token's state moving between successive layers.
      const fromY = i === 0 ? 414 : layers[i - 1].y - 34;
      s += step === 1
        ? line(current, fromY, current, layer.y + 36, { color: C.blue, width: 2, dash: '5 5', marker: 'flow-blue', opacity: .7 })
        : arrow('flow', current, fromY, current, layer.y + 36, on ? 'blue' : 'gray', on ? 4 : 2);
      s += rect(829, layer.y - 30, 166, 60, { stroke: on ? C.blue : C.gray, fill: on ? '#eef4fa' : C.white });
      s += text(current, layer.y - 5, 'attention', { size: 23, color: on ? C.ink : C.muted });
      s += text(current, layer.y + 21, '+ transform', { size: 22, color: on ? C.ink : C.muted });
      // Causal attention includes the current position's own key and value too.
      s += circle(current, layer.input, 4, on ? C.blue : C.gray);
      s += path(`M${current + 6} ${layer.input} H1059 V${layer.y + 25}`, { color: col, width: on ? 2.5 : 1.8, marker: `flow-${on ? 'rust' : 'gray'}` });
      s += rect(1024, layer.y - 20, 70, 40, { stroke: col, fill: on ? '#fcf6f2' : C.white });
      s += text(1059, layer.y + 8, 'K,V', { size: 22, color: on ? C.rust : C.muted });
      if (on) s += arrow('flow', 1019, layer.y, 1002, layer.y, 'rust', 2.5);
    });
    s += text(45, 45, 'layer', { anchor: 'middle', size: 23, color: C.muted });
    s += text(390, 43, 'earlier positions', { size: 25, color: C.muted });
    s += text(current, 43, step >= 4 ? 'next-token probabilities' : 'current position', { size: step >= 4 ? 22 : 25, color: C.blue });
    if (step >= 4) s += reveal(arrow('flow', current, 88, current, 64, 'blue', 4));
    return s;
  }

  function cache(step) {
    const labels = ['The', 'sky', 'is', 'blue'];
    const xs = [170, 380, 590, 800];
    const current = step < 2 ? 2 : 3;
    let s = text(170, 55, 'stored K,V', { size: 26, color: C.muted, anchor: 'start' });
    [0, 1, 2].forEach(layer => {
      const y = 110 + layer * 72;
      s += text(73, y + 36, `${3 - layer}`, { size: 22, color: C.muted });
      xs.forEach((x, i) => {
        if (i > current) return;
        const active = i === current;
        s += rect(x, y, 126, 49, { fill: active ? '#eaf1f8' : C.pale, stroke: active ? C.blue : C.gray });
        s += text(x + 63, y + 33, 'K,V', { size: 25, color: active ? C.blue : C.muted });
      });
    });
    xs.forEach((x, i) => { if (i <= current) s += text(x + 63, 355, labels[i], { size: 29, color: i === current ? C.blue : C.ink }); });
    s += text(73, 55, 'layer', { size: 22, color: C.muted });
    if (step === 0) s += text(654, 420, 'compute this position', { color: C.blue, size: 27 });
    if (step === 1) {
      s += reveal(path('M 706 346 H808', { color: C.blue, width: 3, marker: 'cache-blue' }) + text(863, 355, 'blue', { size: 29, color: C.blue }));
      s += text(654, 420, 'choose the next token', { color: C.blue, size: 27 });
    }
    if (step === 2) s += reveal(text(550, 420, 'Reuse earlier K,V. Compute the new position.', { size: 27 }));
    return s;
  }

  const scenes = {
    blackbox: { title: 'A neural network with many adjustable parameters', steps: 2, label: ['Text enters a neural network.', 'The model contains many numerical parameters, represented by theta.', 'The same model maps the context to a probability distribution over possible next tokens. These numbers are illustrative.'] },
    optimization: { title: 'Gradient descent on an illustrative one-dimensional loss', steps: 4, label: ['The current parameter has high loss and a negative local slope.', 'Move the parameter opposite the gradient. The loss decreases.', 'Calculate the new gradient and move again.', 'The gradient becomes smaller near the minimum.', 'Further updates approach the minimum. Real models optimize many parameters together.'] },
    autoregression: { title: 'Generate a sequence by predicting one token at a time', steps: 3, label: ['The context is The sky is. The model predicts an illustrative next-token distribution.', 'Choose the token blue from the distribution.', 'Append blue to the context and run the same model again. The next distribution now favors a full stop.', 'Append a full stop. Each chosen token becomes context for later predictions.'] },
    transformer: { title: 'Information moves upward through transformer layers', steps: 3, label: ['A token and its position become a numerical representation.', 'The first layer combines attention with a local transformation of the current state.', 'The second layer transforms the updated representation again.', 'The final layer produces a state used to calculate next-token probabilities.'] },
    attention: { title: 'A query matches keys to weight values', steps: 3, label: ['Each available position supplies a key and a value. The current position also supplies a query.', 'Match the current query against the keys of earlier positions and its own position.', 'Normalize the match scores to weights that sum to one. The weights shown are illustrative.', 'Mix the values using these weights. The result contributes to the current token representation.'] },
    flow: { title: 'Vertical state updates and lateral attention within each layer', steps: 4, label: ['Earlier positions have fixed layer-input activations. Each layer derives its own keys and values from those inputs.', 'Highlight the vertical route (not execution yet).', 'At layer one, earlier keys and values feed laterally into the current attention operation.', 'At layer two, a different set of keys and values contributes to the updated current state.', 'At layer three, attention again reads that layer’s keys and values. Earlier positions remain unchanged.'] },
    cache: { title: 'Reuse the keys and values of earlier tokens', steps: 2, label: ['Earlier positions already have cached keys and values at every layer. Compute the current position.', 'Use the current output to choose the next token, blue.', 'Store the previous position’s keys and values, then compute only the new position while reusing the earlier cache.'] }
  };
  const renderers = { blackbox, optimization, autoregression, transformer, attention, flow, cache };
  window.LLMDiagrams = Object.freeze({
    scenes,
    render(name, step = 0) {
      if (!Object.prototype.hasOwnProperty.call(scenes, name)) throw new Error(`Unknown diagram scene: ${name}`);
      const n = Math.max(0, Math.min(scenes[name].steps, Number.isFinite(Number(step)) ? Math.trunc(Number(step)) : 0));
      return svg(name, n, renderers[name](n));
    }
  });
})();
