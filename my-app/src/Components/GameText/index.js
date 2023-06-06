import "./style.css";

export default function GameText(props) {
  return (
    <div id="gametext-container">
      <p id="p1">{props.p1}</p>
      <p id="p2">{props.p2}</p>
      <p id="p3">{props.p3}</p>
    </div>
  );
}
