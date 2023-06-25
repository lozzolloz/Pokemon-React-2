import "./style.css";

export default function ScoresAndShinies(props) {
  return (
    <div id="scores-and-shinies">
      <div id="scores-and-shinies--player">
        <p id="score-label--player">Your score</p>
        <p id="score--player">{props.playerScore}</p>

        <p
          id="shiny-label--player"
          className={"showshiny-" + props.showShinyCountPlayer}
        >
          Shinies
        </p>
        <p
          id="shiny-score--player"
          className={"showshiny-" + props.showShinyCountPlayer}
        >
          {props.playerShinyCount}
        </p>
        <p
          id="shiny-descripsh--player"
          className={"showshiny-" + props.showShinyCountPlayer}
        >
          Pokémon have<br></br>a 1 in 100 chance of being shiny!
        </p>
      </div>

      <div id="scores-and-shinies--rival">
        <p
          id="shiny-label--rival"
          className={"showshiny-" + props.showShinyCountRival}
        >
          Shinies
        </p>
        <p
          id="shiny-score--rival"
          className={"showshiny-" + props.showShinyCountRival}
        >
          {props.rivalShinyCount}
        </p>
        <p
          id="shiny-descripsh--rival"
          className={"showshiny-" + props.showShinyCountRival}
        >
          Pokémon have<br></br>a 1 in 100 chance of being shiny!
        </p>

        <p id="score-label--rival">Rival score</p>
        <p id="score--rival">{props.rivalScore}</p>
      </div>
    </div>
  );
}
