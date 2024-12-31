import "./view.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const WordToPDF = React.lazy(() => import("/src/tools/word to pdf/converter.jsx"));
const YtToMp3 = React.lazy(() => import("/src/tools/youtube to mp3/converter.jsx"));
const NotFound = React.lazy(() => import("/src/view/404.jsx"));

function MobileView() {
  return (
    <>
      <div className="title">
        <h3>Converter</h3>
      </div>
      <main>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/yt/to/mp3" element={<YtToMp3/>} />
              <Route path="/" element={<WordToPDF />} />
              {/* 404 not found*/}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </main>
    </>
  );
}

export default MobileView;
