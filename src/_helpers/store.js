import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
);

const persistor = persistStore(store);

export { store, persistor };
