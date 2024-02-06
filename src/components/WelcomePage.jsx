/* eslint-disable react/no-unescaped-entities */
// import logo from "../assets/International_Pokémon_logo.svg.png";
import pikachu from "../assets/pikachu-home.svg";
export const WelcomePage = () => {
  return (
    <section className="content-home">
      <article className="box1-home">
        <h2 className="inter-bold">Let's catch them all!</h2>
        <p className="inter-medium p-welcome">
          Pokémon is a media franchise that originally started out as an RPG
          video game, but due to its popularity has managed to expand to other
          media entertainment such as TV series, movies, card games, clothes,
          among others, becoming a brand that is recognized in the world market.
        </p>
        <a className="inter-bold btn-home" href="/login">
          <span>Explore Pokedex</span>
          <svg
            className="w-6 h-6"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </article>
      <article className="box2-home">
        <img src={pikachu} alt="Hi Pikachu" />
      </article>
    </section>
  );
};
