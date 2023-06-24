import PkmnImg from "../PkmnImg";
import GameText from "../GameText";
import "./style.css"

export default function PkmnImgsGameText(props) {
  return (
    <div id="pkmnimgs-gametext">
      <PkmnImg
        id="PkmnImg--player"
        alt={props.playerPkmnName}
        src={props.playerPkmnImg}
      />
      <GameText p1={props.p1} p2={props.p2} p3={props.p3} />
      <PkmnImg
        id="PkmnImg--rival"
        alt={props.rivalPkmnName}
        src={props.rivalPkmnImg}
      />
    </div>
  );
}
