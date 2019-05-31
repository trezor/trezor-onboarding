import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from 'reducers/middleware/logger';
import rootReducer from 'reducers';

const configureStore = () => {
    const middlewares = [
        thunkMiddleware,
        loggerMiddleware,
    ];
    // const middlewareEnhancer = applyMiddleware(...middlewares);

    // const enhancers = [middlewareEnhancer];
    // const composedEnhancers = compose(...enhancers);

    // todo typescript as any what?
    const store = createStore(rootReducer, applyMiddleware(...middlewares));
    // const store = createStore(rootReducer, applyMiddleware(...middlewares));

    return store;
};

const store = configureStore();

export default store;