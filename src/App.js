import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import TopLayout from '@root/modules/common/TopLayout';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import commonReducers from '@root/modules/common/Reducer'
import financingReducers from '@root/modules/financing/Reducer'

const reducer = combineReducers({ ...commonReducers, ...financingReducers });
const store = createStore(reducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Route path="/" component={TopLayout} />
        </HashRouter>
      </Provider >
    );
  }
}

export default App;
