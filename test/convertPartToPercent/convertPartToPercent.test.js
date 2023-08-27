const convertPartToPercent = require("./convertPartToPercent");

describe("convertPartToPercent", () => {
  it("Проверка на некорректный аргумент функции", () => {
    expect(() => convertPartToPercent({})).toThrow("The argument is not an array");
  });

  it("Проверку на длину массива больше 5е6", () => {
    expect(() => convertPartToPercent(new Array(5000001))).toThrow("The length of the array should not exceed 5e6");
  });

  describe("Проверка с некорректными данными в массиве", () => {
    it("object", () => {
      expect(() => convertPartToPercent([{}, "1", "2"])).toThrow("The array contains unexpected data");
    });
    it("function", () => {
      expect(() => convertPartToPercent([() => {}, "1", "2"])).toThrow("The array contains unexpected data");
    });
    it("null", () => {
      expect(() => convertPartToPercent([null, "1", "2"])).toThrow("The array contains unexpected data");
    });
    it("undefined", () => {
      expect(() => convertPartToPercent([undefined, "1", "2"])).toThrow("The array contains unexpected data");
    });
    it("boolean", () => {
      expect(() => convertPartToPercent([false, "1", "2"])).toThrow("The array contains unexpected data");
    });
    it("string contains more than just numbers", () => {
      expect(() => convertPartToPercent(["31aaaa", "1", "2"])).toThrow("The array contains unexpected data");
    });
  });

  describe("Проверка с корректными данными в массиве", () => {
    it("Массив из одного элемента", () => {
      expect(convertPartToPercent(["1"])).toEqual(["100.000"]);
    });
    it("Массив строк", () => {
      expect(convertPartToPercent(["1.5", "3", "6", "1.5"])).toEqual(["12.500", "25.000", "50.000", "12.500"]);
    });
    it("Массив чисел", () => {
      expect(convertPartToPercent([1, 1, 1])).toEqual(["33.333", "33.333", "33.333"]);
    });
  });
});
