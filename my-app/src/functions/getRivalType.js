export default function getRivalType() {
  const types = ["grass", "fire", "water"];
  const randomNo = Math.floor(Math.random() * types.length);
  let rivalType = types[randomNo];
  return rivalType;
}
