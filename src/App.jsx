import DesktopView from "./view/destop.jsx";
import MobileView from "./view/mobile.jsx";
import { useState } from "react";

function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth < 650);
  });

  return (
    <>
     {isMobile ? <MobileView /> : <DesktopView />} 
     <iframe src="http://localhost:3000" sandbox="allow-scripts allow-same-origin allow-downloads"></iframe>
    </>
  );
}

export default App;
