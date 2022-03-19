import { userConstants } from '../_constants';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: [],
};

export function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLogging: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        // isLoggedIn: !!action.userDetails?.agree1,
        isLoggedIn: true,
        isLogging: false,
        user: action.userDetails,
      };
    case userConstants.USER_UPDATE:
      return {
        ...state,
        user: action.userDetails,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLogging: false,
        isLoggedIn: false,
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      const us = state.user;

      return {
        ...state,
        isUpdatingUser: false,
        isLoggedIn: true,
        user: { ...us, ...action.userDetails },
      };
    case userConstants.UPDATE_USER_ADDRESS: {
      const us = state.user;
      return {
        ...state,
        isUpdatingUser: false,
        isLoggedIn: true,
        user: { ...us, ...action.userDetails, address: action.address },
      };
    }
    case userConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        isUpdatingUser: false,
        isLoggedIn: false,
        isLogging: false,
        user: {},
      };
    default:
      return state;
  }
}
