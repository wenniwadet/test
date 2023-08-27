// Вычислительная сложность - O(n), оценка памяти - O(n)

function convertPartToPercent(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("The argument is not an array");
  }

  if (arr.length > 5000000) {
    throw new Error("The length of the array should not exceed 5e6");
  }

  const sumPart = arr.reduce((acc, part) => {
    if (typeof part === "string" || typeof part === "number") {
      if (!isNaN(part) && Number(part) >= 0) {
        return acc + Number(part);
      }
    }

    throw new Error("The array contains unexpected data");
  }, 0);

  if (arr.length < 2) {
    return ["100.000"];
  }

  return arr.map((value) => ((Number(value) * 100) / sumPart).toFixed(3));
}

module.exports = convertPartToPercent;
