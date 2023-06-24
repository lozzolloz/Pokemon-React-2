import "./style.css";

export default function AttackMode(props) {
  return (
    <div id="mode-buttons">
      <button
        disabled
        className="mode-button"
        id={props.attackMode ? "active-mode" : "inactive-mode"}
      >
        Attack
      </button>
      <button
        disabled
        className="mode-button"
        id={props.attackMode ? "inactive-mode" : "active-mode"}
      >
        Defend
      </button>
    </div>
  );
}
