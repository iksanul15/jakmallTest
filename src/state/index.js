import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './modules';
import { apiService, createLogger } from './middlewares';

export default function configureStore(initialState) {
  const appReducer = combineReducers(reducers);
  const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['OpenedFile'],
    transforms: [
      // Create a transformer by passing the reducer key and configuration. Values
      // shown below are the available configurations with default values
      // expireReducer('', {
      //     expireSeconds: 3600,
      // })
    ],
  };

  const rootReducer = (state, action) => {
    // if (action.type === LOGOUT) {
    //     state = undefined
    // }
    return appReducer(state, action);
  };

  const persist = persistReducer(rootPersistConfig, rootReducer);

  return createStore(
    persist,
    initialState,
    applyMiddleware(apiService, thunkMiddleware, createLogger(true)),
  );
}
