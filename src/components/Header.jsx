import logo from "../assets/Pokédex_logo.png";

const Header = () => (
  <header className="backg-color">
    <a href="/" className="content-logo">
      <img src={logo} alt="Logo Pokemon" />
    </a>
  </header>
);

export default Header;
