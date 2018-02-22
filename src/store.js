import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/reducers/users';
// import reducer from './ducks/reducers/index';


export default createStore(reducer, applyMiddleware(promiseMiddleware()));

////////////////
// import { createStore, applyMiddleware } from 'redux';
// import base_reducer from './reducers/base';
// import promiseMiddleware from 'redux-promise-middleware';

// let createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware()
// )(createStore);

// let store = createStoreWithMiddleware(base_reducer);

// export default store;