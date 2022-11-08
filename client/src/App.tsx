import React from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useBearStore from "./store/useBearStore";

function App(): JSX.Element {
  const [bearCnt, increaseBear] = useBearStore((state) => [
    state.bears,
    state.increase,
  ]);
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => increaseBear(3)}>count is {bearCnt}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
