import { SET_LANGUAGE } from '../_constants';

export function setLanguage(locale) {
  return {
    type: SET_LANGUAGE,
    locale,
  };
}
