import { couponConstants, TRANSLATIONS } from '../_constants';
import { couponService } from '../_services';
import { alertCall } from './alerts.actions';

import 'regenerator-runtime/runtime';

export function getCoupon(id) {
  return (dispatch) => {
    couponService.getCoupon(id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: couponConstants.GET_SUCCESS_COUPON, data };
  }
  // function failure(error) { return { type: couponConstants.GET_FAILURE, error } }
}

export function clearCoupon(id) {
  return (dispatch) => {
    dispatch(success());
  };

  function success() {
    return { type: couponConstants.CLEAR_COUPON };
  }
}

export function getCouponsFooter(id) {
  return (dispatch) => {
    couponService.getCouponsFooter(id).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: couponConstants.GET_SUCCESS_COUPON_FOOTER, data };
  }
}
export function getFavoriteCoupons() {
  return (dispatch) => {
    couponService.getFavoriteCoupons().then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(data) {
    return { type: couponConstants.GET_SUCCESS_COUPONS_FAVOURITE, data };
  }
  function failure(error) {
    return { type: couponConstants.GET_FAILURE_COUPONS_FAVOURITE, error };
  }
}

export function getCoupons(d, filterID) {
  const currentFilterID = filterID || JSON.parse(sessionStorage.getItem('filterID')) || 3;

  const data = {
    ...(filterID !== 0 && { filterID: currentFilterID }),
    ...d,
    page: d.page || 1,
    user: d.user,
  };
  return (dispatch) => {
    dispatch(request());

    couponService.getCoupons(data).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: couponConstants.REQUEST_COUPONS_REQUEST };
  }
  function success(data) {
    return { type: couponConstants.SUCCESS_COUPONS_REQUEST, data };
  }
  function failure(error) {
    return { type: couponConstants.FAILURE_COUPONS_REQUEST, error };
  }
}

export function searchCoupons(d) {
  const data = {
    ...d,
    filterID: JSON.parse(sessionStorage.getItem('filterID') || '3'),
    page: d.page || 1,
  };
  return (dispatch) => {
    dispatch(request());

    couponService.searchCoupons(data).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: couponConstants.REQUEST_COUPONS_REQUEST };
  }
  function success(data) {
    return { type: couponConstants.SUCCESS_COUPONS_REQUEST, data };
  }
  function failure(error) {
    return { type: couponConstants.FAILURE_COUPONS_REQUEST, error };
  }
}

export function getExtraCoupons(data) {
  return (dispatch) => {
    couponService.getExtraCoupons(data).then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };
  function success(data) {
    return { type: couponConstants.SUCCESS_EXTRACOUPONS_REQUEST, data };
  }
}

export function addToFavourite(coupon, language) {
  return (dispatch) => {
    couponService.addToFavourite(coupon._id).then(
      () => {
        dispatch(success(coupon));
        dispatch(
          alertCall({
            type: 'success',
            text: TRANSLATIONS[language].has_been_added,
          }),
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(coupon) {
    return { type: couponConstants.ADD_SUCCESS_COUPON_FAVOURITE, coupon };
  }
  function failure(error) {
    return { type: couponConstants.ADD_FAILURE_COUPON_FAVOURITE, error };
  }
}

export function removeFromFavourite(id, language) {
  return (dispatch) => {
    couponService.removeFromFavourite(id).then(
      () => {
        dispatch(success(id));
        dispatch(
          alertCall({
            type: 'info',
            text: TRANSLATIONS[language].has_been_removed,
          }),
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function success(id) {
    return { type: couponConstants.REMOVE_SUCCESS_COUPON_FAVOURITE, id };
  }
  function failure(error) {
    return { type: couponConstants.REMOVE_FAILURE_COUPON_FAVOURITE, error };
  }
}

export function removeAllCoupons(ids) {
  return async (dispatch) => {
    dispatch(request());

    const coupons = [];

    ids.map((coupon) => coupons.push(coupon._id));

    await couponService.removeAllCoupons(coupons).then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertCall({ type: 'danger', text: error.toString() }));
      },
    );
  };

  function request() {
    return { type: couponConstants.REMOVE_ALL_FAVOURITE_COUPONS_REQUEST };
  }
  function success() {
    return { type: couponConstants.REMOVE_ALL_FAVOURITE_COUPONS_SUCCESS };
  }
  function failure(error) {
    return { type: couponConstants.REMOVE_ALL_FAVOURITE_COUPONS_FAILURE, error };
  }
}
