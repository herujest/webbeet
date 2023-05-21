import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, PersistState, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import app from './reducers';

const mergedReducer = combineReducers({...app});

export type RootState = ReturnType<typeof mergedReducer> & {
  _persist: PersistState;
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewares = [
  thunk,
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['main', 'theme', 'product'],
  timeout: 0,
};

const pReducers = persistReducer<RootState>(persistConfig, mergedReducer);

const store = createStore(
  pReducers,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);

export {store, persistor};
