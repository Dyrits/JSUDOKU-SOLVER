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

  static regroup(objectsArray, property) {
    return Objects.reduce(function (accumulator, object) {
      var propertyValue = object[property];
      if (!accumulator[propertyValue]) {accumulator[propertyValue] = [];}
      accumulator[propertyValue].push(object);
      return accumulator;
    }, {});
  }

  static count(array, value) {
    return array.reduce(function (accumulator, currentValue) {
      if (currentValue === value) {accumulator ++;}
      return accumulator;
    }, 0);
  }

  static countInArray(array, arrayValues) {
    return array.reduce(function (accumulator, currentValue) {
      if (arrayValues.includes(currentValue)) {
        accumulator[currentValue] ? accumulator[currentValue] ++ : accumulator[currentValue] = 1;
      }
      return accumulator;
    }, {});
  }

  static countAll(array) {
    return array.reduce(function (accumulator, currentValue) {
      accumulator[currentValue] ? accumulator[currentValue] ++ : accumulator[currentValue] = 1;
      return accumulator;
    }, {});
  }

}
