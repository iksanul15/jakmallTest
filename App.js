/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type {Node} from 'react';
import {
  StyleSheet,
} from "react-native";
import Main from "./src/pages/Main";
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from "./src/state";

const App: () => Node = () => {
  const store = configureStore(window.REDUX_INITIAL_DATA);
  const persistor = persistStore(store);
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>)
};

export const styles = StyleSheet.create({
  textStyle: {
    color: '#fdfdfd'
  },
  accordionChild: {padding: 12, borderTopColor: '#8f8f8f', borderTopWidth: 1}
});

export default App;
