import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';

import loggerMiddleware from 'reducers/middleware/logger';
import rootReducer from 'reducers';

const configureStore = (preloadedState) => {
    const middlewares = [
        thunkMiddleware,
        loggerMiddleware,
        save(),
    ];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);

    const store = createStore(rootReducer, load(), composedEnhancers);
    return store;
};

const store = configureStore();

export default store;