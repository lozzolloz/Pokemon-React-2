import "./style.css";

export default function PkmnImg(props) {
  return <img classname={props.src} id={props.id} src={props.src} alt="" />;
  //was using alt={props.alt} but don't like how it shows before image loads
}
