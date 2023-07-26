import "./style.css";

export default function GameText(props) {
  return (
    <div id="gametext" data-testid="gametext">
      <p id="p1" data-testid="p1">
        {props.p1}
      </p>
      <p id="p2" data-testid="p2">
        {props.p2}
      </p>
      <p id="p3" data-testid="p3">
        {props.p3}
      </p>
    </div>
  );
}
