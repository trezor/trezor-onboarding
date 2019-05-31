import { Store, AnyAction, Dispatch } from 'redux';

const logger = (store: Store) => (next: Dispatch) => (action: AnyAction) => {
    console.group(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

export default logger;