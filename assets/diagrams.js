/* Common entry point for the presentation's SVG scenes. */
(() => {
  const groups = [window.LLMFoundationScenes, window.LLMTransformerScenes];
  window.LLMDiagrams = {
    scenes: Object.assign({}, ...groups.map(group => group.scenes)),
    render(name, step, options = {}) {
      const group = groups.find(candidate => candidate.scenes[name]);
      if (!group) throw new Error(`Unknown diagram: ${name}`);
      window.LLMStaticDiagrams = options.motion === false;
      try { return group.render(name, step); }
      finally { window.LLMStaticDiagrams = false; }
    }
  };
})();
