import { WordToPDF } from "/src/tools/word to pdf/converter.jsx";
import "./view.css";

function MobileView() {
  return (
    <>
      <div className="title">
        <h3>Converter</h3>
      </div>
      <main>
        <WordToPDF />
      </main>
      
    </>
  );
}

export default MobileView;
