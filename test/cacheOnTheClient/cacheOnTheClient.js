// Вычислительная сложность - O(n), оценка памяти - O(n + m), где n - кол-во облигаций, m - кол-во дат

function memoize(cb) {
  const cache = new Map();

  return async function ({ date, isins }) {
    let result = [];

    if (cache.has(date)) {
      const cacheDate = cache.get(date);
      const isinsForQuery = [];

      for (const isin of isins) {
        if (cacheDate.has(isin)) {
          result.push({ isin, data: cacheDate.get(isin) });
        } else {
          isinsForQuery.push(isin);
        }
      }

      if (isinsForQuery.length > 0) {
        const response = await cb({ date, isins: isinsForQuery });

        for (const el of response) {
          cacheDate.set(el.isin, el.data);
        }

        result = result.concat(response);
      }
    } else {
      const cacheDate = new Map();
      const response = await cb({ date, isins });

      result = response;

      for (const el of response) {
        cacheDate.set(el.isin, el.data);
      }

      cache.set(date, cacheDate);
    }

    return result;
  };
}

const getBondsData = async ({ date, isins }) => {
  const result = await http.post({
    url: `/bonds/${date}`,
    body: isins,
  });
  return result;
};

const memoizedGetBonsData = memoize(getBondsData);
