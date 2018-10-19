export function arrayToMap(arr, fn) {
    return arr.reduce((ac, cv) => {
      const obj = fn(cv);
      const value = { value: obj.value };
      const mergeValue = Object.assign({}, value, {key: obj.key });
      return Object.assign({}, ac, { [obj.key]: mergeValue });
    }, {});
  }