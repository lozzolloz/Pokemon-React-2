export default async function getPkmnPlayer(type) {
    let pkmnName;
    let pkmnSprite;
    let pkmnSpriteShiny;
    let pkmnInfoData;

    while (!pkmnSprite || !pkmnSpriteShiny) {
      pkmnName = null;
      pkmnSprite = null;
      pkmnSpriteShiny = null;
      let pkmnNameResponse = await fetch(
        `https://pokeapi.co/api/v2/type/${type}?limit=1`
      );
      let pkmnNameData = await pkmnNameResponse.json();
      let randomNo = Math.floor(Math.random() * pkmnNameData.pokemon.length);
      pkmnName = pkmnNameData.pokemon[randomNo].pokemon.name;

      let pkmnInfoResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pkmnName}`
      );
      pkmnInfoData = await pkmnInfoResponse.json();
      pkmnSprite = pkmnInfoData.sprites.back_default;
      pkmnSpriteShiny = pkmnInfoData.sprites.back_shiny;
    }
    let pkmnType1 = pkmnInfoData.types[0].type.name;
    let pkmnType2 =
      pkmnInfoData.types.length > 1 ? pkmnInfoData.types[1].type.name : null;

    return {
      pkmnName: pkmnName,
      pkmnSprite: pkmnSprite,
      pkmnSpriteShiny: pkmnSpriteShiny,
      pkmnType1: pkmnType1,
      pkmnType2: pkmnType2,
    };
  }