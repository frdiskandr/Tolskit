import "./App.css";
import Nav from "./components/navbar/navbar.jsx";
import {WordToPDF} from './tools/word to pdf/converter.jsx';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <div className="title">
        <h3>Converter</h3>
      </div>
      <main>
        <WordToPDF />
      </main>
      <div className="navbar">
        <Nav />
      </div>
    </>
  );
}

export default App;
