import "./styles.css";
export default function TypeButton(props) {
  return (
    <button type={props.type} id={props.type} onClick={props.onClick}>
      {props.type.toUpperCase()}
    </button>
  );
}
