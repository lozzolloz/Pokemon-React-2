import getRivalType from "./getRivalType";

test("returns a valid type", () => {
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
  const rivalType = getRivalType();
  expect(types).toContain(rivalType);
});

test("selects type by Math.random", () => {
  const mockMathRandom = jest.spyOn(global.Math, "random");
  //mock Math.random to always return 0.5 for testing purposes
  mockMathRandom.mockReturnValue(0.5);
  //the function should select the type at index 0.5 * types.length = 0.5 * 17 = 8.5
  //as index must be an integer this will round down to 8, which corresponds to 'flying'
  const rivalType = getRivalType();
  expect(rivalType).toBe("flying");
  //restore Math.random after test
  mockMathRandom.mockRestore();
});
