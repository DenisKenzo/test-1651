import { couponConstants } from '../_constants';

const INITIAL_STATE = {
  favouriteCoupons: [],
  сoupons: [],
};

export function couponReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Coupon by id
    case couponConstants.GET_SUCCESS_COUPON:
      return {
        ...state,
        coupon: action.data,
      };
    case couponConstants.CLEAR_COUPON:
      return {
        ...state,
        coupon: null,
      };
      // Coupons footer, extra, favourite
    case couponConstants.GET_SUCCESS_COUPON_FOOTER:
      return {
        ...state,
        couponsFooter: action.data,
      };
    case couponConstants.SUCCESS_EXTRACOUPONS_REQUEST:
      return {
        ...state,
        extraCoupons: action.data,
      };
    case couponConstants.GET_SUCCESS_COUPONS_FAVOURITE:
      return {
        ...state,
        favouriteCoupons: action.data,
      };
      // Coupons with filter
    case couponConstants.REQUEST_COUPONS_REQUEST:
      return {
        ...state,
        isCouponsLoading: true,
      };
    case couponConstants.SUCCESS_COUPONS_REQUEST:

      const data = state.coupons && state.coupons.data && action.data.current_page > 1
        ? { ...action.data, data: [...state.coupons.data, ...action.data.data] }
        : action.data;
      return {
        ...state,
        isCouponsLoading: false,
        coupons: data,
      };
    case couponConstants.FAILURE_COUPONS_REQUEST:
      return {
        ...state,
        isCouponsLoading: false,
      };

      // Add to favourite
    case couponConstants.ADD_SUCCESS_COUPON_FAVOURITE:
      return {
        ...state,
        favouriteCoupons:
                    state.favouriteCoupons
                      ? [...state.favouriteCoupons, action.coupon]
                      : [...action.coupon],
      };
      // Remove from favourite
    case couponConstants.REMOVE_SUCCESS_COUPON_FAVOURITE:
      return {
        ...state,
        favouriteCoupons: state.favouriteCoupons.filter((coupon) => coupon._id !== action.id),
      };

    case couponConstants.REMOVE_ALL_FAVOURITE_COUPONS_REQUEST:
      return {
        ...state,
        isDeletingWishlist: true,
      };
    case couponConstants.REMOVE_ALL_FAVOURITE_COUPONS_SUCCESS:
      return {
        ...state,
        isDeletingWishlist: false,
        favouriteCoupons: [],
      };
    default:
      return state;
  }
}
