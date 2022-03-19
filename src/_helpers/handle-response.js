import { userConstants } from '../_constants';
import { logout } from '../_actions';
import { store } from '.';

export function handleResponse(response) {
  return response.text().then((text) => {
    let data;
    try {
      data = text && JSON.parse(text);
    } catch (e) {
      data = text;
    }

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;

      if (response.status === 401) {
        store.dispatch(logout('he'));

        return false;
      }

      return Promise.reject(error);
    }

    return data;
  });
}
