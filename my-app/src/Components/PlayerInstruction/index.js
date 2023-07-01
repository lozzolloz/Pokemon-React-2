import "./style.css";

export default function PlayerInstruction(props) {
  let instructionText;

  if (props.gamePlay === true) {
    instructionText = "Choose your Pokémon type!";
  } else {
    instructionText = "...";
  }
  return <p id="instruction-text">{instructionText}</p>;
}
