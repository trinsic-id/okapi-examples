import logo from "./logo.svg";
import "./App.css";
import { DIDKey, GenerateKeyRequest } from "@trinsic/okapi-web";

function App() {
  DIDKey.generate(GenerateKeyRequest.fromPartial({})).then((response) => {
    console.log(response.didDocument);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <p className="smaller">(open developer console to see output)</p>
      </header>
    </div>
  );
}

export default App;
