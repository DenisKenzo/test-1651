import { alertsConstants } from '../_constants';

export function alertCall(alert) {
  return (dispatch) => {
    const _id = `_${Math.random().toString(36).substr(2, 9)}`;

    dispatch(showAlerts({ [_id]: [true, alert] }));

    setTimeout(() => dispatch(hideAlerts([false, alert], _id)), 5000);
  };

  function showAlerts(alert) {
    return { type: alertsConstants.ADD_ALERTS, alert };
  }
  function hideAlerts(alert, _id) {
    return { type: alertsConstants.HIDE_ALERTS, alert, _id };
  }
}

export function hideAlert(alert, _id) {
  return (dispatch) => {
    dispatch(hideAlerts([false, alert], _id));
  };

  function hideAlerts(alert, _id) {
    return { type: alertsConstants.HIDE_ALERTS, alert, _id };
  }
}
