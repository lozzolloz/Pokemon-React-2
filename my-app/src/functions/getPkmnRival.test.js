import getPkmnRival from "./getPkmnRival";

test("returns valid pokemon object if sprites are present", async () => {
  const pkmnNameData = {
    pokemon: [
      {
        pokemon: {
          name: "bulbasaur",
        },
      },
    ],
  };
  const pkmnInfoData = {
    sprites: {
      front_default: "default_front_sprite",
      front_shiny: "shiny_front_sprite",
    },
    types: [
      { slot: 1, type: { name: "grass" } },
      { slot: 2, type: { name: "poison" } },
    ],
  };

  const mockFetch = jest.fn();
  mockFetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnNameData) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnInfoData) });
  global.fetch = mockFetch;

  expect(await getPkmnRival("grass")).toEqual({
    pkmnName: "bulbasaur",
    pkmnSprite: "default_front_sprite",
    pkmnSpriteShiny: "shiny_front_sprite",
    pkmnType1: "grass",
    pkmnType2: "poison",
  });
});

test("runs fetches again if sprites are missing", async () => {
  const pkmnNameData1 = {
    pokemon: [
      {
        pokemon: {
          name: "iron-leaves",
        },
      },
    ],
  };
  const pkmnInfoData1 = {
    sprites: {
      front_default: null,
      front_shiny: null,
    },
    types: [
      { slot: 1, type: { name: "grass" } },
      { slot: 2, type: { name: "psychic" } },
    ],
  };

  const pkmnNameData2 = {
    pokemon: [
      {
        pokemon: {
          name: "bulbasaur",
        },
      },
    ],
  };
  const pkmnInfoData2 = {
    sprites: {
      front_default: "default_front_sprite",
      front_shiny: "shiny_front_sprite",
    },
    types: [
      { slot: 1, type: { name: "grass" } },
      { slot: 2, type: { name: "poison" } },
    ],
  };

  const mockFetch = jest.fn();
  mockFetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnNameData1) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnInfoData1) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnNameData2) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnInfoData2) });
  global.fetch = mockFetch;

  const result = await getPkmnRival("grass");

  expect(mockFetch).toHaveBeenCalledTimes(4);
  expect(result).toEqual({
    pkmnName: "bulbasaur",
    pkmnSprite: "default_front_sprite",
    pkmnSpriteShiny: "shiny_front_sprite",
    pkmnType1: "grass",
    pkmnType2: "poison",
  });
});

test("selects pokemon based on Math.random", async () => {
  const pkmnNameData = {
    pokemon: [
      { pokemon: { name: "bulbasaur" } },
      { pokemon: { name: "ivysaur" } },
      { pokemon: { name: "venusaur" } },
      { pokemon: { name: "oddish" } },
    ],
  };

  const pkmnInfoData = {
    sprites: {
      front_default: "default_front_sprite",
      front_shiny: "shiny_front_sprite",
    },
    types: [
      { slot: 1, type: { name: "grass" } },
      { slot: 2, type: { name: "poison" } },
    ],
  };

  const mockMathRandom = jest.spyOn(global.Math, "random");
  mockMathRandom.mockReturnValue(0.5);
  //pkmn name should be 0.5 * array length = 0.5 * 4 = 2
  //this corresponds to venusaur

  const mockFetch = jest.fn();
  mockFetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnNameData) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(pkmnInfoData) });
  global.fetch = mockFetch;


  const result = await getPkmnRival("grass");
  expect(result.pkmnName).toEqual("venusaur");
  mockMathRandom.mockRestore();
});
