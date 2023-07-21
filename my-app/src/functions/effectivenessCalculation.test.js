import effectivenessCalculation from "./effectivenessCalculation";

test("water is super effective against fire", () => {
  expect(effectivenessCalculation("water", "fire")).toBe(2);
});

test("fighting is not very effective against flying", () => {
  expect(effectivenessCalculation("fighting", "flying")).toBe(0.5);
});

test('ghost has no effect against normal', ()=>{
    expect(effectivenessCalculation('ghost','normal')).toBe(0)
})

test('dragon has normal effectiveness against psychic',()=>{
expect(effectivenessCalculation('dragon', 'psychic')).toBe(1)
})

test('if defender type = null, outcome = 1', ()=>{
    expect(effectivenessCalculation('dark', null)).toBe(1)
})