import TypeButton from "../TypeButton";

export default function ButtonList(props) {
  function handleClick(type) {
    props.onClick(type);
  }

  return (
    <div>
      <TypeButton type="normal" onClick={() => handleClick("normal")} />
      <TypeButton type="fire" onClick={() => handleClick("fire")} />
      <TypeButton type="water" onClick={() => handleClick("water")} />
      <TypeButton type="electric" onClick={() => handleClick("electric")} />
      <TypeButton type="grass" onClick={() => handleClick("grass")} />
      <TypeButton type="ice" onClick={() => handleClick("ice")} />
      <TypeButton type="fighting" onClick={() => handleClick("fighting")} />
      <TypeButton type="poison" onClick={() => handleClick("poison")} />
      <TypeButton type="ground" onClick={() => handleClick("ground")} />
      <TypeButton type="flying" onClick={() => handleClick("flying")} />
      <TypeButton type="psychic" onClick={() => handleClick("psychic")} />
      <TypeButton type="bug" onClick={() => handleClick("bug")} />
      <TypeButton type="rock" onClick={() => handleClick("rock")} />
      <TypeButton type="ghost" onClick={() => handleClick("ghost")} />
      <TypeButton type="dragon" onClick={() => handleClick("dragon")} />
      <TypeButton type="dark" onClick={() => handleClick("dark")} />
      <TypeButton type="steel" onClick={() => handleClick("steel")} />
      <TypeButton type="fairy" onClick={() => handleClick("fairy")} />
    </div>
  );
}
