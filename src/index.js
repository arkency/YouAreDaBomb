import YouAreDaBomb from './YouAreDaBomb';

function API() {
  const obj = {
    Before: (object, method, adviceFunction) => {
      YouAreDaBomb({ object: object, method: method }).before(adviceFunction);
    },
    After: (object, method, adviceFunction) => {
      YouAreDaBomb({ object: object, method: method }).after(adviceFunction);
    },
    Around: (object, method, adviceFunction) => {
      YouAreDaBomb({ object: object, method: method })
        .before(adviceFunction)
        .after(adviceFunction);
    }
  };

  return obj;
}

export default API();
