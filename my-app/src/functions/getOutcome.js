export default function getOutcome(playerType, rivalType, playerPkmnName) {
  let outcome;

  switch (playerType) {
    case "grass":
      switch (rivalType) {
        case "water":
          outcome = 2;
          break;
        case "fire":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "water":
      switch (rivalType) {
        case "fire":
          outcome = 2;
          break;
        case "grass":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "fire":
      switch (rivalType) {
        case "grass":
          outcome = 2;
          break;
        case "water":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    default:
      outcome = 1;
  }
  console.log(outcome);
  return outcome;
}
