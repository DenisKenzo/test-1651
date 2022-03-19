import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import mainReducer from './main.reducer';
import { couponReducer } from './coupon.reducer';
import { branchReducer } from './branch.reducer';
import { authReducer } from './auth.reducer';
import { alertsReducer } from './alerts.reducer';
import { userReducer } from './user.reducer';
import modalReducer from './modals.reducer';
import { applicationsReducer } from './applications.reducer';

const persistConfig = {
  key: 'auth',
  storage: localforage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  modalReducer,
  mainReducer,
  couponReducer,
  branchReducer,
  alertsReducer,
  userReducer,
  applicationsReducer,
  auth: persistReducer(persistConfig, authReducer),
});

export default rootReducer;
