export default function capitaliseName(input) {
  switch (input) {
    case "nidoran-m":
      return "Nidoran♂";
    case "nidoran-f":
      return "Nidoran♀";
    case "farfetchd":
      return "Farfetch'd";
    case "sirfetchd":
      return "Sirfetch'd";
    case "mr-mime":
      return "Mr. Mime";
    case "mime-jr":
      return "Mime Jr.";
    case "mr-rime":
      return "Mr. Rime";
    case "type-null":
      return "Type: Null";
    case "flabebe":
      return "Flabébé";
    case "tapu-koko":
    case "tapu-lele":
    case "tapu-bulu":
    case "tapu-fini":
    case "great-tusk":
    case "scream-tail":
    case "brute-bonnet":
    case "flutter-mane":
    case "slither-wing":
    case "sandy-shocks":
    case "iron-treads":
    case "iron-bundle":
    case "iron-hands":
    case "iron-jugulis":
    case "iron-moth":
    case "iron-thorns":
    case "roaring-moon":
    case "iron-valiant":
    case "walking-wake":
    case "iron-leaves": {
      let words = input.replace(/-/g, " ").split(" ");

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }

      return words.join(" ");
    }
    case "ho-oh":
    case "porygon-z":
    case "ting-lu":
    case "chien-pao":
    case "wo-chien":
    case "chi-yu": {
      let words = input.split("-");

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }

      return words.join("-");
    }
    case "komo-o":
    case "jangmo-o":
    case "hakamo-o":
      return input.charAt(0).toUpperCase() + input.slice(1);
    default: {
      let output = input.charAt(0).toUpperCase() + input.slice(1);

      if (output.includes("-")) {
        output = output.split("-")[0];
      }

      return output;
    }
  }
}
