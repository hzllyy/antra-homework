import carReducer from "../slices/CarSlice";
import { useEffect, useState } from 'react';

// const store = createStore(carReducer);
const store = myCreateStore(carReducer);

function myCreateStore(reducer, preloadedState) {
  const callbackFns = [];
  const store = {
    state: preloadedState,
  };

  store.getState = () => {
    return store.state;
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);
    callbackFns.forEach((cb) => cb());
  };

  store.subscribe = (cb) => {
    callbackFns.push(cb);

    // unsubscribe
    return () => {
      callbackFns.filter((fn) => cb !== fn);
    };
  };

  store.dispatch({ type: "@@INIT" });

  return store;
}

// my dispatch function: trigger actions
export function myUseDispatch() {
    return store.dispatch;
}

// my use selector: read from store and rerender on change
export function MyUseSelector(selector) {
    const [state, setState] = useState(() => 
        selector(store.getState())
    );

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.getState()));
        });
        return unsubscribe;
    }, [selector]);

    return state;
}

export default store;
