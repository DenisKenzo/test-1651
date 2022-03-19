import { SET_GOOGLE_MAP_LOADED } from '../_constants';

export * from './coupon.actions';
export * from './branch.actions';
export * from './user.actions';
export * from './modals.actions';
export * from './application.action';

export function setGoogleMapLoaded(loaded = false) {
  return {
    type: SET_GOOGLE_MAP_LOADED,
    loaded,
  };
}
