export default function getRivalType() {
  const types = [
    "grass",
    "fire",
    "water",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];
  const randomNo = Math.floor(Math.random() * types.length);
  let rivalType = types[randomNo];
  return rivalType;
}
