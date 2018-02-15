<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/reducers/users';

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
=======
import { createStore } from 'redux';
import reducer from './ducks/reducers/test';

export default createStore(reducer)
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340
