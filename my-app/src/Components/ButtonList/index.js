import TypeButton from "../TypeButton";

export default function ButtonList(props) {
  function handleClick(type) {
    props.onClick(type);
  }

  return (
    <div>
      <TypeButton type="grass" onClick={() => handleClick("grass")} />
      <TypeButton type="water" onClick={() => handleClick("water")} />
      <TypeButton type="fire" onClick={() => handleClick("fire")} />
    </div>
  );
}
