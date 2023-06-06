//make name start with capital letter
//detect - in name and replace first - with (
//add ) to end of string if there is an -
//if multiple - replace further with ' '
export default function capitaliseName(input) {
  if (input === "nidoran-m") {
    return "Nidoran♂";
  } else if (input === "nidoran-f") {
    return "Nidoran♀";
  } else if (input === "farfetchd") {
    return "Farfetch'd";
  } else if (input === "sirfetchd") {
    return "Sirfetch'd";
  } else if (input === "mr-mime") {
    return "Mr. Mime";
  } else if (input === "mime-jr") {
    return "Mime Jr.";
  } else if (input === "mr-rime") {
    return "Mr. Rime";
  } else if (input === "type-null") {
    return "Type: Null";
  } else if (input === "flabebe") {
    return "Flabébé";
  } else if (
    input === "tapu-koko" ||
    input === "tapu-lele" ||
    input === "tapu-bulu" ||
    input === "tapu-fini" ||
    input === "great-tusk" ||
    input === "scream-tail" ||
    input === "brute-bonnet" ||
    input === "flutter-mane" ||
    input === "slither-wing" ||
    input === "sandy-shocks" ||
    input === "iron-treads" ||
    input === "iron-bundle" ||
    input === "iron-hands" ||
    input === "iron-jugulis" ||
    input === "iron-moth" ||
    input === "iron-thorns" ||
    input === "roaring-moon" ||
    input === "iron-valiant" ||
    input === "walking-wake" ||
    input === "iron-leaves"
  ) {
    let words = input.replace(/-/g, " ").split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
  } else if (
    input === "ho-oh" ||
    input === "porygon-z" ||
    input === "ting-lu" ||
    input === "chien-pao" ||
    input === "wo-chien" ||
    input === "chi-yu"
  ) {
    let words = input.split("-");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join("-");
  } else if (
    input === "jangmo-o" ||
    input === "hakamo-o" ||
    input === "kommo-o"
  ) {
    return input.charAt(0).toUpperCase();
  } else {
    let output = input.charAt(0).toUpperCase() + input.slice(1);

    // If the string contains a hyphen, remove it and any characters that come after it
    if (output.includes("-")) {
      output = output.split("-")[0];
    }

    return output;
  }
}
