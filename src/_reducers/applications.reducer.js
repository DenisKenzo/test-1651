import { applicationsConstants } from '../_constants';

const INITIAL_STATE = {
  status: '',
};

export function applicationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case applicationsConstants.SET_APPLICATIONS_STATUS:
      return {
        ...state, status: action.status,
      };
    default:
      return state;
  }
}
