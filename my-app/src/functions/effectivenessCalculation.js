export default function effectivenessCalculation(attackerType, defenderType) {
  let outcome;

  switch (attackerType) {
    case "grass":
      switch (defenderType) {
        case "water":
        case "ground":
        case "rock":
          outcome = 2;
          break;
        case "fire":
        case "flying":
        case "bug":
        case "poison":
        case "steel":
        case "dragon":
        case "grass":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "water":
      switch (defenderType) {
        case "fire":
        case "ground":
        case "rock":
          outcome = 2;
          break;
        case "grass":
        case "dragon":
        case "water":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "fire":
      switch (defenderType) {
        case "grass":
        case "ice":
        case "bug":
        case "steel":
          outcome = 2;
          break;
        case "water":
        case "rock":
        case "fire":
        case "dragon":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "normal":
      switch (defenderType) {
        case "rock":
        case "steel":
          outcome = 0.5;
          break;
        case "ghost":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "electric":
      switch (defenderType) {
        case "water":
        case "flying":
          outcome = 2;
          break;
        case "electric":
        case "grass":
        case "dragon":
          outcome = 0.5;
          break;
        case "ground":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "ice":
      switch (defenderType) {
        case "grass":
        case "ground":
        case "flying":
        case "dragon":
          outcome = 2;
          break;
        case "fire":
        case "water":
        case "ice":
        case "steel":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "fighting":
      switch (defenderType) {
        case "normal":
        case "ice":
        case "rock":
        case "dark":
        case "steel":
          outcome = 2;
          break;
        case "flying":
        case "poison":
        case "bug":
        case "psychic":
        case "fairy":
          outcome = 0.5;
          break;
        case "ghost":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "poison":
      switch (defenderType) {
        case "grass":
        case "fairy":
          outcome = 2;
          break;
        case "poison":
        case "ground":
        case "rock":
        case "ghost":
          outcome = 0.5;
          break;
        case "steel":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "ground":
      switch (defenderType) {
        case "fire":
        case "electric":
        case "poison":
        case "rock":
        case "steel":
          outcome = 2;
          break;
        case "grass":
        case "bug":
          outcome = 0.5;
          break;
        case "flying":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "flying":
      switch (defenderType) {
        case "grass":
        case "fighting":
        case "bug":
          outcome = 2;
          break;
        case "electric":
        case "rock":
        case "steel":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "psychic":
      switch (defenderType) {
        case "fighting":
        case "poison":
          outcome = 2;
          break;
        case "psychic":
        case "steel":
          outcome = 0.5;
          break;
        case "dark":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "bug":
      switch (defenderType) {
        case "grass":
        case "psychic":
        case "dark":
          outcome = 2;
          break;
        case "fire":
        case "fighting":
        case "poison":
        case "flying":
        case "ghost":
        case "steel":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "rock":
      switch (defenderType) {
        case "fire":
        case "ice":
        case "flying":
        case "bug":
          outcome = 2;
          break;
        case "fighting":
        case "ground":
        case "steel":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "ghost":
      switch (defenderType) {
        case "psychic":
        case "ghost":
          outcome = 2;
          break;
        case "dark":
          outcome = 0.5;
          break;
        case "normal":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "dragon":
      switch (defenderType) {
        case "dragon":
          outcome = 2;
          break;
        case "steel":
          outcome = 0.5;
          break;
        case "fairy":
          outcome = 0;
          break;
        default:
          outcome = 1;
      }
      break;

    case "dark":
      switch (defenderType) {
        case "psychic":
        case "ghost":
          outcome = 2;
          break;
        case "fighting":
        case "dark":
        case "fairy":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "steel":
      switch (defenderType) {
        case "ice":
        case "rock":
        case "fairy":
          outcome = 2;
          break;
        case "fire":
        case "water":
        case "electric":
        case "steel":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    case "fairy":
      switch (defenderType) {
        case "fighting":
        case "dragon":
        case "dark":
          outcome = 2;
          break;
        case "fire":
        case "poison":
        case "steel":
          outcome = 0.5;
          break;
        default:
          outcome = 1;
      }
      break;

    default:
      outcome = "outcome error";
  }
  console.log(outcome);
  return outcome;
}
