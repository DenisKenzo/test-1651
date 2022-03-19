import { alertsConstants } from '../_constants';

export function alertsReducer(state = { location: 'ok' }, action) {
  switch (action.type) {
    case alertsConstants.ADD_ALERTS:

      const alerts = state.alerts ? state.alerts : {};

      const alertsArray = { ...alerts, ...action.alert };

      return {
        ...state,
        alerts: alertsArray,
      };
    case alertsConstants.HIDE_ALERTS:
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action._id]: action.alert,
        },
      };
    case alertsConstants.REMOVE_ALERTS:
      return {
        ...state,
        alerts: [],
      };
    case alertsConstants.LOCATION:
      return {
        ...state,
        location: action.data,
      };
    default:
      return state;
  }
}
