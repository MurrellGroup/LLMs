/* Presenter-controlled diagrams for the numerical example and text generation. */
(() => {
  'use strict';
  const C = { ink:'#20252a', muted:'#68727b', border:'#d6dde2', blue:'#245d86', bluePale:'#eaf2f8', rust:'#a65335', rustPale:'#faeee7', white:'#ffffff' };
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const text = (x, y, value, options={}) => `<text x="${x}" y="${y}" font-size="${options.size || 28}" fill="${options.fill || C.ink}" text-anchor="${options.anchor || 'middle'}"${options.weight ? ` font-weight="${options.weight}"` : ''}>${esc(value)}</text>`;
  const rect = (x,y,w,h,fill=C.white,stroke=C.border,r=3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const path = (d, color=C.border, width=2, extra='') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const arrow = (name,d,color='blue',animate=false,width=3) => path(d,C[color],width,`marker-end="url(#foundation-${name}-${color})"${animate ? ' pathLength="1" class="signal-path"' : ''}`);
  const circle = (x,y,r,fill,inside='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}">${inside}</circle>`;
  const hasMotion = () => !window.LLMStaticDiagrams && typeof window.matchMedia === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = (d,duration='.8s') => hasMotion() ? `<animateMotion path="${d}" dur="${duration}" begin="0s" fill="freeze" calcMode="paced"/>` : '';
  const fmt = value => Number(value.toFixed(3)).toString().replace('-', '−');

  const scenes = {
    blackbox: {
      title:'Neural networks', steps:2,
      label:[
        'A numerical input, x equals 2, enters a neural network.',
        'The network contains many adjustable parameters, represented by theta.',
        'For this input and these parameters, the network predicts y hat equals 3.'
      ]
    },
    loss: {
      title:'Squared error', steps:2,
      label:[
        'The same network predicts 3 from input 2.',
        'The observed value is 5. The prediction error is 3 minus 5, or minus 2.',
        'The squared error is L equals 3 minus 5 squared, which is 4.'
      ]
    },
    optimization: {
      title:'Gradient descent', steps:4,
      label:[
        'A one-parameter loss curve, L of theta equals theta minus 5 squared. The starting parameter is 3 and the loss is 4.',
        'The tangent has slope minus 4. A learning rate of 0.2 gives an update from 3 to 3.8.',
        'The parameter moves to 3.8, reducing the loss to 1.44.',
        'Another gradient update moves the parameter to 4.28, reducing the loss to 0.5184.',
        'The next update moves the parameter to 4.568, reducing the loss to approximately 0.187.'
      ]
    },
    autoregression: {
      title:'Autoregressive prediction', steps:3,
      label:[
        'The context is The sky is. The model assigns illustrative probabilities to the next tokens blue, grey, and dark.',
        'The token blue is selected and added after the existing context.',
        'The expanded context, The sky is blue, enters the model. It now predicts punctuation and other possible next tokens.',
        'A full stop is selected and appended, giving The sky is blue full stop.'
      ]
    }
  };

  function svg(name,step,body) {
    const markers = ['blue','rust','muted'].map(color => `<marker id="foundation-${name}-${color}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 1 L 9 5 L 0 9 Z" fill="${C[color]}"/></marker>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 480" role="img" aria-labelledby="foundation-${name}-title foundation-${name}-desc" font-family="Arial,Helvetica,sans-serif" style="width:100%;height:100%;display:block"><title id="foundation-${name}-title">${esc(scenes[name].title)}</title><desc id="foundation-${name}-desc">${esc(scenes[name].label[step])}</desc><defs>${markers}</defs>${body}</svg>`;
  }

  // The input, box and prediction occupy exactly the same positions on both slides.
  function network(name,showParameters,showOutput,animateOutput=false) {
    let body = text(120,160,'Input',{size:25,fill:C.muted}) + text(120,246,'x = 2',{size:42});
    body += arrow(name,'M 215 233 H 322','blue',false);
    body += rect(340,130,360,210,C.ink,C.ink,3);
    body += text(520,181,'Neural network',{size:29,fill:C.white});
    if (showParameters) {
      body += text(520,238,'Parameters θ',{size:25,fill:C.white});
      body += text(520,289,'0.17   −0.42   0.08   …',{size:23,fill:'#cbd5df'});
    }
    if (showOutput) {
      body += arrow(name,'M 718 233 H 848','blue',animateOutput);
      body += text(950,160,'Prediction',{size:25,fill:C.muted}) + text(950,246,'ŷ = 3',{size:42,fill:C.blue});
    }
    return body;
  }

  function blackbox(step) {
    return network('blackbox',step>=1,step>=2,step===2);
  }

  function loss(step) {
    let body = network('loss',true,true);
    if (step>=1) {
      body += text(950,322,'Observed',{size:25,fill:C.muted});
      body += text(950,373,'y = 5',{size:42,fill:C.rust});
      body += path('M 1068 233 H 1083 V 360 H 1068',C.rust,2);
      body += text(1048,307,'−2',{size:25,fill:C.rust});
    }
    if (step>=2) body += text(930,450,'L = (3 − 5)² = 4',{size:30});
    return body;
  }

  function optimization(step) {
    const values = [3,3,3.8,4.28,4.568];
    const theta = values[step];
    const previous = values[Math.max(0,step-1)];
    const lossValue = t => (t-5)**2;
    const px = t => 100+(t-2.5)*122;
    const py = t => 405-lossValue(t)*48;
    let curve = '';
    for (let i=0;i<=100;i++) {
      const t=2.5+i*.05;
      curve += `${i?'L':'M'} ${px(t).toFixed(2)} ${py(t).toFixed(2)} `;
    }
    let body = arrow('optimization','M 100 405 H 735','muted',false,2);
    body += arrow('optimization','M 100 405 V 68','muted',false,2);
    body += text(44,86,'Loss',{size:24});
    body += text(738,444,'θ',{size:27});
    [0,2,4,6].forEach(y => {
      const sy=405-y*48;
      body += path(`M 94 ${sy} H 100`,C.muted,1.5);
      body += text(78,sy+8,String(y),{size:22,fill:C.muted,anchor:'end'});
    });
    [3,4,5,6,7].forEach(t => {
      body += path(`M ${px(t)} 405 V 412`,C.muted,1.5);
      body += text(px(t),441,String(t),{size:23,fill:C.muted});
    });
    body += path(curve,C.ink,3);
    body += text(940,90,'L(θ) = (θ − 5)²',{size:30});
    body += text(810,175,'θ',{size:27,anchor:'start'});
    body += text(1075,175,fmt(theta),{size:32,fill:C.blue,anchor:'end'});
    body += text(810,231,'Loss',{size:25,anchor:'start'});
    body += text(1075,231,fmt(lossValue(theta)),{size:29,anchor:'end'});
    if (step>=1) {
      const gradient=2*(theta-5);
      const tangentY=t=>py(theta)-gradient*48*(t-theta);
      body += path(`M ${px(theta-.52)} ${tangentY(theta-.52)} L ${px(theta+.52)} ${tangentY(theta+.52)}`,C.rust,2.5,'stroke-dasharray="7 6"');
      body += text(810,287,'Gradient',{size:25,anchor:'start'});
      body += text(1075,287,fmt(gradient),{size:29,fill:C.rust,anchor:'end'});
      body += text(940,371,'θ ← θ − η × gradient',{size:25});
      body += text(940,417,'η = 0.2',{size:25,fill:C.muted});
      const from=step===1 ? 3 : previous;
      const to=step===1 ? 3.8 : theta;
      body += arrow('optimization',`M ${px(from)} 463 H ${px(to)}`,'blue',true,3);
    }
    if (step>=2) {
      const history=[3,3.8,4.28].slice(0,step-1);
      history.forEach(t => {body += circle(px(t),py(t),5,C.border);});
      let relativePath='';
      let visiblePath='';
      for(let i=0;i<=24;i++) {
        const t=previous+(theta-previous)*i/24;
        relativePath += `${i?'L':'M'} ${px(t)-px(theta)} ${py(t)-py(theta)} `;
        visiblePath += `${i?'L':'M'} ${px(t)} ${py(t)} `;
      }
      body += path(visiblePath,C.blue,4,'pathLength="1" class="signal-path"');
      body += circle(px(theta),py(theta),9,C.blue,motion(relativePath));
    } else {
      body += circle(px(theta),py(theta),9,C.blue);
    }
    return body;
  }

  function token(x,y,label,active=false,inside='') {
    return `<g transform="translate(${x} ${y})">${rect(0,0,110,58,active?C.bluePale:C.white,active?C.blue:C.border)}${text(55,38,label,{size:29,fill:active?C.blue:C.ink})}${inside}</g>`;
  }

  function autoregression(step) {
    let body=text(60,42,'Context',{size:25,fill:C.muted,anchor:'start'});
    ['The','sky','is'].forEach((word,i)=>{body+=token(60+128*i,72,word);});
    const rows=step<2 ? [['blue',.60],['grey',.25],['dark',.15]] : [['.',.70],[',',.20],['and',.10]];
    // A selection is appended on steps 1 and 3. The expanded prefix is used on step 2.
    if(step>=1) {
      const travel=step===1 ? motion('M 346 158 V 88 H 0 V 0') : '';
      body+=token(444,72,'blue',true,travel);
    }
    if(step>=3) body+=token(572,72,'.',true,motion('M 218 158 V 88 H 0 V 0'));
    const contextEnd=step<2 ? 426 : 554;
    body+=path(`M 60 147 V 163 H ${contextEnd} V 147`,C.blue,2);
    body+=arrow('autoregression','M 150 163 V 328 H 331','blue',step===0||step===2);
    body+=rect(350,278,300,100,C.ink,C.ink);
    body+=text(500,340,'Language model',{size:29,fill:C.white});
    body+=arrow('autoregression','M 669 328 H 748','blue',step===0||step===2);
    body+=text(945,205,'Next token',{size:25,fill:C.muted});
    rows.forEach(([word,p],i)=>{
      const y=260+i*64;
      const chosen=i===0&&(step===1||step===3);
      body+=text(790,y,word,{size:28,anchor:'start',fill:chosen?C.blue:C.ink});
      body+=rect(877,y-24,p*230,28,chosen?C.blue:C.border,chosen?C.blue:C.border,0);
      body+=text(1090,y,p.toFixed(2),{size:24,fill:chosen?C.blue:C.muted,anchor:'end'});
    });
    if(step===1||step===3) {
      const target=step===1?499:627;
      body+=arrow('autoregression',`M 840 231 V 177 H ${target} V 140`,'blue',true,2.5);
    }
    return body;
  }

  const renderers={blackbox,loss,optimization,autoregression};
  window.LLMFoundationScenes={
    scenes,
    render(name,step=0) {
      if(!scenes[name]) throw new Error(`Unknown foundation scene: ${name}`);
      const build=Math.max(0,Math.min(scenes[name].steps,Number(step)||0));
      return svg(name,build,renderers[name](build));
    }
  };
})();
