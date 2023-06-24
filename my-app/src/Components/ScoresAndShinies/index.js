import "./style.css";

export default function ScoresAndShinies(props) {
  return (
    <div id="scores-and-shinies">
      <div className="scores-and-shinies">
        <p id="player-score">{props.playerScore}</p>
        <div className="shinies-and-text">
          <p id="player-shinies-heading">
            <br></br>Shinies
          </p>
          <p id="player-shinies">{props.playerShinyCount}</p>
          <p id="player-shinies-explantion">
            Pokémon have a 1 in 100<br></br>chance of being shiny
          </p>
        </div>
      </div>
      <div className="scores-and-shinies">
        <div className="shinies-and-text">
          <p id="rival-shinies-heading">
            <br></br>Shinies
          </p>
          <p id="rival-shinies">{props.rivalShinyCount}</p>
          <p id="rival-shinies-explantion">
            Pokémon have a 1 in 100<br></br>chance of being shiny
          </p>
        </div>
        <p id="rival-score">{props.rivalScore}</p>
      </div>
    </div>
  );
}
