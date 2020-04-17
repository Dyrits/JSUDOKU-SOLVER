class Reduce {
  static sum(array) {
    return array.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  }

  static flat(array) {
    return array.reduce(function (accumulator, currentValue) {
      return accumulator.concat(currentValue);
    }, []);
  }
  
}

