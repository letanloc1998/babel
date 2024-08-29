// Copyright (c) 2024 Le Tan Loc. All rights reserved

// import A from "./components/A";

const { useState, useEffect } = React;

// import Lazy from "/Lazy";

const App = () => {
  const [component, setComponent] = useState(null);
  const [module, setModule] = useState(null);

  useEffect(() => {
    const loadModule = async url =>
      await fetch(url)
        .then(response => response.text())
        .then(
          text =>
            Babel.transform(text, {
              // filename: normalizedFilename(url), // global.unknown if no filename
              // filename: new URL(url, window.location.href).href, // only apply baseURL for relative or absolute path
              filename: url,
              // sourceType: "module",
              presets: [[Babel.availablePresets["react"]]],
              plugins: [
                [
                  Babel.availablePlugins["transform-modules-umd"],
                  { exactGlobals: true },
                ],
              ],
            }).code
        )
        .then(code => {
          // console.log("code", code);
          // return `data:text/javascript;base64,${btoa(code)}`;
          

          // var moduleData = "export function hello() { alert('hello'); };";
          // var b64moduleData = "data:text/javascript;base64," + btoa(moduleData);

          // return b64moduleData;

          eval(code);
          setComponent(window.Lazy.default);
          setModule(window.Lazy);
        })
        // .then(async jsModule => {
        //   const m = await import(jsModule);
        //   console.log("m", m);

        //   import(jsModule).then(module => {
        //     console.log("module", module);
        //     console.log("module.default", module.default);
        //     setComponent(module.default);
        //   });
        // });

    loadModule("/Lazy.jsx");
  }, []);

  return (
    <>
      <h1>App</h1>
      {/* <A /> */}
      {component}
    </>
  );
};

export default App;
