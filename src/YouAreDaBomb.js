function YouAreDaBomb({ object, method }) {
  const obj = {
    before: (adviceFunction) => {
      object[method] = (function() {
        let fn = object[method];
        return function() {
          let args = [].slice.call(arguments, 0);
          adviceFunction.apply(null, args);
          return fn.apply(object, args);
        };
      })();
      return obj;
    },
    after: (adviceFunction) => {
      object[method] = (function() {
        let fn = object[method];
        return function() {
          let args = [].slice.call(arguments, 0);
          let result = fn.apply(object, args);
          adviceFunction.apply(null, args);
          return result;
        };
      })();
      return obj;
    }
  };

  return obj;
}

export default YouAreDaBomb;

