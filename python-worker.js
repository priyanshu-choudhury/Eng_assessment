let runtime;
self.onmessage = async ({data}) => {
  try {
    if (!runtime) {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.js');
      runtime = await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/'});
      runtime.setStdout({batched:text=>self.postMessage({type:'stdout',text})});
      runtime.setStderr({batched:text=>self.postMessage({type:'stdout',text})});
    }
    self.postMessage({type:'ready'});
    const scope = runtime.toPy({});
    try { await runtime.runPythonAsync(data.code,{globals:scope}); }
    finally { scope.destroy(); }
    self.postMessage({type:'done'});
  } catch(error) { self.postMessage({type:'error',text:String(error)}); }
};
