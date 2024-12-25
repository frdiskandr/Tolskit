import "./style.css";

function NavBar() {
  return (
    <>
      <nav className="nav">
        <input id="menu" type="checkbox" />
        <label id="menu">Menu</label>
        <ul className="menu">
          <li>
            <a href="#0">
              <span>About</span>
              <i className="fas fa-address-card" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#0">
              <span>Projects</span>
              <i className="fas fa-tasks" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#0">
              <span>Clients</span>
              <i className="fas fa-users" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#0">
              <span>Contact</span>
              <i className="fas fa-envelope-open-text" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>

      <p className="notification">Click on the Menu</p>
    </>
  );
}

export default NavBar;
