import capitaliseName from "./capitaliseName";

test("capitalises single word name", () => {
  expect(capitaliseName("bulbasaur")).toBe("Bulbasaur");
});

test("capitalises hyphenated name", () => {
  expect(capitaliseName("ho-oh")).toBe("Ho-Oh");
});

test("only capitalises first word of Komo-o", () => {
  expect(capitaliseName("komo-o")).toBe("Komo-o");
});

test("removes form suffixes", () => {
  expect(capitaliseName("diglett-alola")).toBe("Diglett");
});

test("convert mr-mime to Mr. Mime", () => {
  expect(capitaliseName("mr-mime")).toBe("Mr. Mime");
});

test("convert mr-mime-galar to Mr. Mime", () => {
  expect(capitaliseName("mr-mime-galar")).toBe("Mr. Mime");
});

test("convert tapu-lele to Tapu Lele", () => {
  expect(capitaliseName("tapu-lele")).toBe("Tapu Lele");
});

test("convert nidoran-m to Nidoran♂", () => {
  expect(capitaliseName("nidoran-m")).toBe("Nidoran♂");
});
