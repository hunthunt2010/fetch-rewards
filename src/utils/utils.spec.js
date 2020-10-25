import formatData from "./";

describe("formattingData", () => {
  test("should filter out empty names", () => {
    const results = formatData([
      { listId: 1, name: "" },
      { listId: 1, name: null },
      { listId: 1, name: "123" },
    ]);
    expect(results).toEqual({ 1: [{ listId: 1, name: "123" }] });
  });

  test("should group by listId", () => {
    const results = formatData([
      { listId: 2, name: "itemId1" },
      { listId: 1, name: "itemId2" },
      { listId: 1, name: "itemId3" },
    ]);
    expect(results).toEqual({
      1: [
        { listId: 1, name: "itemId2" },
        { listId: 1, name: "itemId3" },
      ],
      2: [{ listId: 2, name: "itemId1" }],
    });
  });
});
