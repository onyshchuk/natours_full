import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import reduxThunk from 'redux-thunk'

import rootReducer from './store/reducers/index'
import Routes from './routes/routes'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(promiseMiddleware, reduxThunk))
)

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <Routes />
      </BrowserRouter>
   </Provider>,
   document.querySelector('#root')
)
