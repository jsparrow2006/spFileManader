import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './containers/main/Main';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers';
import './styles/main.css';
import { HashRouter as Router, Route } from "react-router-dom";
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {dark} from './Themes/Themes'

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        window.localStorage.setItem('workPanels', JSON.stringify(getState().main));
        return result;
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk, localStorageMiddleware)));

const theme = createMuiTheme(dark)

render(
    <Provider store={store}>
      <MuiThemeProvider theme = { theme }>
        <div>
            <Router>
                <Route exact path='/' component={Main}/>
            </Router>
        </div>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
