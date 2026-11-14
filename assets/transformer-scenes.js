/* Presenter-controlled transformer diagrams. Values and attention weights are illustrative. */
(() => {
  'use strict';
  const C = { ink:'#20252a', muted:'#68727b', border:'#d6dde2', blue:'#245d86', bluePale:'#eaf2f8', rust:'#a65335', rustPale:'#faeee7', white:'#ffffff' };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = (x,y,value,o={}) => `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" font-size="${o.size || 26}" fill="${o.color || C.ink}"${o.weight ? ` font-weight="${o.weight}"` : ''}>${esc(value)}</text>`;
  const box = (x,y,w,h,o={}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 3}" fill="${o.fill || C.white}" stroke="${o.stroke || C.border}" stroke-width="${o.width || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
  const line = (x1,y1,x2,y2,o={}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.color || C.border}" stroke-width="${o.width || 2}"/>`;
  const path = (name,d,o={}) => `<path d="${d}" fill="none" stroke="${o.color || C.border}" stroke-width="${o.width || 3}" stroke-linecap="round" stroke-linejoin="round"${o.arrow ? ` marker-end="url(#${name}-${o.arrow})"` : ''}${o.signal ? ' pathLength="1" class="signal-path"' : ''}${o.delay ? ` style="animation-delay:${o.delay}ms"` : ''}/>`;
  const dot = (x,y,color=C.blue,r=5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
  function vector(x,y,w,h,color,seed=0,outline=true) {
    const opacities = [[.24,.7,.42,.9],[.65,.2,.82,.4],[.45,.85,.3,.6],[.8,.45,.65,.24]][seed % 4];
    const gap=5, inset=6, cw=(w-inset*2-gap*3)/4;
    return (outline ? box(x,y,w,h,{stroke:color,fill:C.white}) : '') + opacities.map((opacity,i) => `<rect x="${x+inset+i*(cw+gap)}" y="${y+inset}" width="${cw}" height="${h-inset*2}" fill="${color}" opacity="${opacity}"/>`).join('');
  }
  function svg(name,step,body) {
    const info=scenes[name];
    const markers=['blue','rust','muted','border'].map(c => `<marker id="${name}-${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 1 L9 5 L0 9 Z" fill="${C[c]}"/></marker>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 480" role="img" aria-labelledby="${name}-title ${name}-desc" font-family="Arial,Helvetica,sans-serif" style="width:100%;height:100%;display:block"><title id="${name}-title">${esc(info.title)}</title><desc id="${name}-desc">${esc(info.label[step])}</desc><defs>${markers}</defs>${body}</svg>`;
  }

  // The same bottom-to-top order is retained in the layer-flow diagram.
  function transformer(step) {
    const x=390,w=340,cx=x+w/2;
    let s = box(cx-60,422,120,46,{stroke:C.blue,fill:C.bluePale}) + text(cx,453,'it',{size:29,color:C.blue});
    s += text(325,451,'Token + position',{anchor:'end',size:24,color:C.muted});
    const rows=[320,210,100];
    rows.forEach((y,i) => {
      const done=step>i, active=step===i+1;
      const stroke=done?C.blue:C.border;
      s += text(325,y+45,`Layer ${i+1}`,{anchor:'end',size:25,color:done?C.ink:C.muted});
      s += box(x,y,w,74,{stroke,fill:active?C.bluePale:C.white,width:active?3:2});
      s += line(x,y+37,x+w,y+37,{color:stroke});
      s += text(cx,y+27,'Transformation',{size:24,color:done?C.ink:C.muted});
      s += text(cx,y+64,'Attention',{size:24,color:done?C.ink:C.muted});
      const inputY=i===0?422:rows[i-1];
      s += path('transformer',`M${cx} ${inputY-3} V${y+78}`,{color:done?C.blue:C.border,arrow:done?'blue':'border',width:done?4:2,signal:active});
    });
    s += path('transformer',`M${cx} 96 V57`,{color:step===4?C.blue:C.border,arrow:step===4?'blue':'border',width:step===4?4:2,signal:step===4});
    s += text(cx,32,'Next-token probabilities',{size:28,color:step===4?C.blue:C.muted});
    return s;
  }

  function attention(step) {
    const words=['The','key','fits','it'];
    const ys=[160,230,300,370];
    const weights=[.10,.60,.20,.10];
    let s=text(40,41,'Query Q from “it”',{anchor:'start',size:26,color:C.blue});
    s += vector(300,10,110,46,C.blue,3);
    s += text(100,108,'Token',{size:24,color:C.muted});
    s += text(355,108,'Key K',{size:24,color:C.muted});
    s += text(594,108,'Weight',{size:24,color:C.muted});
    s += text(805,108,'Value V',{size:24,color:C.muted});
    s += line(40,124,890,124);
    // A query is compared separately with every available key, including its own.
    if(step>=1) {
      const color=step===1?C.blue:C.border;
      s += path('attention','M410 33 H468 V370',{color,width:2.5,signal:step===1});
      ys.forEach(y => {s+=path('attention',`M468 ${y} H417`,{color,arrow:step===1?'blue':'border',width:2.5,signal:step===1});});
    }
    words.forEach((word,i) => {
      const y=ys[i];
      s += text(100,y+9,word,{size:28,color:i===3?C.blue:C.ink});
      s += vector(300,y-23,110,46,step===1?C.blue:C.muted,i);
      if(step>=2) {
        s += text(563,y+9,weights[i].toFixed(2),{size:28,color:C.rust});
        s += `<rect x="607" y="${y-11}" width="${weights[i]*110}" height="22" fill="${C.rust}"/>`;
      }
      s += vector(750,y-23,110,46,step>=3?C.rust:C.muted,(i+2)%4);
      if(step===3) {
        s += text(704,y+9,'×',{size:26,color:C.rust});
        s += path('attention',`M866 ${y} L978 265`,{color:C.rust,width:2+weights[i]*7,signal:true});
      }
      if(i<3) s += line(40,y+35,890,y+35,{color:'#edf0f2',width:1});
    });
    if(step>=2) s += text(592,444,'Σ = 1',{size:25,color:C.rust});
    if(step===3) {
      s += text(1031,215,'Sum',{size:25,color:C.rust});
      s += vector(982,242,98,46,C.rust,0);
    }
    return s;
  }

  function flow(step) {
    const xs=[200,380,560];
    const rows=[315,190,65];
    const cx=895;
    let s=text(39,43,'Layer',{size:23,color:C.muted});
    xs.forEach((x,i)=>{s+=text(x,465,['The','key','fits'][i],{size:28});});
    s += box(cx-47,432,94,42,{stroke:C.blue,fill:C.bluePale})+text(cx,462,'it',{size:28,color:C.blue});
    s += text(380,42,'Cached K,V',{size:25,color:C.muted});
    rows.forEach((y,i)=>{
      const done=step>=i+1, active=step===i+1;
      const attentionY=y+59;
      const cacheTop=y+40;
      const busY=y+100;
      const inputY=y+105;
      const cacheColor=active?C.rust:done?C.muted:C.border;
      s += text(39,attentionY+9,String(i+1),{size:27,color:done?C.ink:C.muted});
      xs.forEach(x=>{
        s += box(x-55,cacheTop,110,40,{stroke:active?C.rust:C.border,fill:active?C.rustPale:C.white});
        s += text(x,cacheTop+28,'K,V',{size:25,color:active?C.rust:C.muted});
        if(done) s+=path('flow',`M${x} ${cacheTop+44} V${busY}`,{color:cacheColor,width:2.5,signal:active});
      });
      if(done) s += path('flow',`M200 ${busY} H765 V${attentionY} H786`,{color:cacheColor,arrow:active?'rust':'muted',width:active?3.5:2.5,signal:active});
      // Attention occupies the lower half because computation moves upwards.
      s += box(790,y,210,80,{stroke:done?C.blue:C.border,fill:active?C.bluePale:C.white,width:active?3:2});
      s += line(790,y+40,1000,y+40,{color:done?C.blue:C.border});
      s += text(cx,y+28,'Transformation',{size:22,color:done?C.ink:C.muted});
      s += text(cx,y+68,'Attention',{size:23,color:active?C.rust:done?C.ink:C.muted});
      const startY=i===0?431:rows[i-1]-4;
      s += path('flow',`M${cx} ${startY} V${y+84}`,{color:done?C.blue:C.border,arrow:done?'blue':'border',width:done?4:2,signal:active});
      if(done) {
        // The current position's K,V are projected from this layer's INPUT.
        s += dot(cx,inputY,C.blue,4);
        s += path('flow',`M${cx} ${inputY} H1070 V${y+83}`,{color:active?C.blue:C.border,arrow:active?'blue':'border',width:2.5,signal:active});
        s += box(1035,y+40,70,40,{stroke:active?C.rust:C.border,fill:active?C.rustPale:C.white});
        s += text(1070,y+68,'K,V',{size:23,color:active?C.rust:C.muted});
        s += path('flow',`M1031 ${attentionY} H1004`,{color:cacheColor,arrow:active?'rust':'muted',width:2.5,signal:active});
      }
    });
    s += path('flow',`M${cx} 61 V35`,{color:step===4?C.blue:C.border,arrow:step===4?'blue':'border',width:step===4?4:2,signal:step===4});
    s += text(cx,22,'Next-token probabilities',{size:23,color:step===4?C.blue:C.muted});
    return s;
  }

  function cache(step) {
    const xs=[260,480,700,920];
    const ys=[335,215,95];
    let s='';
    ys.forEach((y,i)=>{
      s+=text(45,y+38,`Layer ${i+1}`,{anchor:'start',size:25,color:C.muted});
      xs.forEach((x,j)=>{
        const available=j<3||step>=i+1;
        const active=j===3&&step===i+1;
        s+=box(x-70,y,140,62,{stroke:active?C.blue:C.border,fill:active?C.bluePale:C.white,dash:available?undefined:'5 5',width:active?3:2});
        if(available) s+=text(x,y+41,'K,V',{size:28,color:active?C.blue:C.muted});
      });
    });
    xs.forEach((x,i)=>{s+=text(x,452,['The','key','fits','it'][i],{size:29,color:i===3?C.blue:C.ink});});
    s+=line(150,421,1030,421,{color:C.border});
    if(step>=1) {
      const targetY=ys[step-1]+31;
      s+=path('cache',`M1085 ${targetY} H997`,{color:C.blue,arrow:'blue',width:3.5,signal:true});
    }
    return s;
  }

  const scenes={
    transformer:{title:'Transformer layers',steps:4,label:[
      'The observed token it and its position form an input representation. Three layers are shown above it.',
      'The representation enters layer one: attention, followed by a transformation at this position.',
      'The updated representation enters layer two.',
      'Layer three produces the final representation.',
      'The final representation produces probabilities for the following token.'
    ]},
    attention:{title:'Attention',steps:3,label:[
      'A query is made from the current token it. Every available token has a key and a value.',
      'The same query is compared with each key, including the key of the current position.',
      'The comparison scores are normalized into weights summing to one: 0.10, 0.60, 0.20 and 0.10.',
      'The values are multiplied by those weights and summed. The key token contributes the largest share in this illustrative head.'
    ]},
    flow:{title:'Information flow through a transformer',steps:4,label:[
      'Earlier tokens have a separate cached key and value at every layer. The current observed token it begins at the bottom of the stack.',
      'Layer one reads the cached keys and values from earlier positions and its own key and value, then updates the current representation.',
      'The representation moves upwards into layer two, which reads its own row of cached keys and values.',
      'Layer three reads its row of cached keys and values. Keys and values are made from the input to their corresponding layer; they do not propagate vertically between layers.',
      'The final representation produces the next-token distribution. Blue shows the current position through layers, and rust shows the active read from keys and values.'
    ]},
    cache:{title:'The key-value cache',steps:3,label:[
      'The three earlier tokens have cached keys and values at all three layers. The current token it has an empty column.',
      'The current token adds its layer-one key and value.',
      'Its layer-two key and value are added.',
      'Its layer-three key and value complete the new cache column. Earlier columns have been reused.'
    ]}
  };
  const renderers={transformer,attention,flow,cache};
  window.LLMTransformerScenes={scenes,render(name,step=0){
    if(!scenes[name]) throw new Error(`Unknown transformer scene: ${name}`);
    const bounded=Math.max(0,Math.min(scenes[name].steps,Number(step)||0));
    return svg(name,bounded,renderers[name](bounded));
  }};
})();
