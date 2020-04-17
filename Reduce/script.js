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

}
