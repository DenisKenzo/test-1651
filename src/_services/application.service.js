
import { authHeader } from '../_helpers/auth-header';
import { handleResponse } from '../_helpers';

export const applicationService = {
  settingsApplications,
};

function settingsApplications(app) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}settingsApplication`, requestOptions).then(handleResponse);
}
