import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import store from './store';
=======
import store from './store';
import { Provider } from 'react-redux'
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
<<<<<<< HEAD
, document.getElementById('root'));
=======
    , document.getElementById('root'));
>>>>>>> 888188e2cac2819545d5afd70db5cafbf7cdf340
