import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore,applyMiddleware,compose } from "redux";

import App from './components/App'
import reducers from './reducers'

// This is for adding dev tools 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}> 
        <App/>
    </Provider>
    ,document.querySelector('#root'))


// Q.1 Why exact keyword is added in Route?
// Ans. 20 -> vid 7

//Q.2 Why Should we not use <a> tag in a component?
// Ans. 20-> vid 8 || refreshes every thing loads a completely new page with all the data lost. So, instead of anchor tag we use Link component and instead of "href" we use "to" 

// 20 sept 2021

// if deploying this app change the url in google authorization to the url of the given url by heroku or other hosts. Watch 21 -> 3

// Steps
//
// 1. Setting up routers for streams 
// 2. Setting up OAuth google authorization
// 3. Integrating redux-
//          Creating action, reducer 
// 4. As all component need to know if the user is logged in or not we create a authReducer app which keeps that tracked. Using that auth reducer we show on the right corner the signin or sign out button depending upon the user is signed in or not
// 
// 5. Setting up the redux form
// 6. Setting up the json-server which strictly follows the restful conventions
// Problems faced
// User authentication it was my time using OAuth so it was a little confusing at first 
// 
// 
// 
// 
// 
