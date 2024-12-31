import "./style.css";

function Nav() {
  const handleClick = () => {
    const background = document.querySelector(".background");
    background.classList.toggle("blur");
    background.style.display = "block";
  };

  return (
    <>
      <nav className="nav">
        <div className="sidemenu-left"></div>
        <div className="menu">
          <input
            id="menu"
            type="checkbox"
            defaultChecked={false}
            onClick={handleClick}
          />
          <label htmlFor="menu">Menu</label>

          <div className="background" style={{ display: "none" }}></div>
          <ul className="menu">
            <li>
              <a href="/yt/to/mp3">
                <span>Yt to Mp3</span>
                <i className="fas fa-address-card" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <span>Projects</span>
                <i className="fas fa-tasks" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <span>Clients</span>
                <i className="fas fa-users" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <span>Word to Pdf</span>
                <i className="fas fa-envelope-open-text" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
          <div className="bottom-nav"></div>
        </div>
        <div className="sidemenu-right"></div>
      </nav>

      {/* <p className="notification">Click on the Menu</p> */}
    </>
  );
}

export default Nav;
