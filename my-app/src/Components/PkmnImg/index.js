import "./style.css";

export default function PkmnImg(props) {
  return <img id={props.id} src={props.src} alt={props.alt} />;
}
