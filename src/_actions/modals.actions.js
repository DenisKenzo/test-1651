import { modalsConstants } from '../_constants';
import { couponService } from '../_services';

export const toggleAgreeModalLoginIn = (agree, agreeModal) => {
  return (dispatch) => dispatch(toggleAgree(agree, agreeModal));

  function toggleAgree(agree, agreeModal) {
    return { type: modalsConstants.AGREE_MODAL_LOGIN_IN, agree, agreeModal };
  }
};

export const openQuickViewModal = (show) => {
  return (dispatch) => dispatch(toggleQuickView(show));

  function toggleQuickView(show) {
    return { type: modalsConstants.SHOW_QUICKVIEW_MODAL, show };
  }
};

export const closeQuickViewModal = (hide) => {
  return (dispatch) => dispatch(toggleCloseQuickView(hide));

  function toggleCloseQuickView(hide) {
    return { type: modalsConstants.HIDE_QUICKVIEW_MODAL, hide };
  }
};

export const toggleQuickView = (show) => {
  return (dispatch) => {
    dispatch(toggleQuickShow(show));
  };

  function toggleQuickShow(show) {
    return { type: modalsConstants.SHOW_QUICK_VIEW, show };
  }
};

export const toggleQuickViewHide = (hide) => {
  return (dispatch) => dispatch(toggleQuickHide(hide));

  function toggleQuickHide(hide) {
    return { type: modalsConstants.HIDE_QUICK_VIEW, hide };
  }
};

export const toggleShowQrModal = (show) => {
  return (dispatch) => dispatch(toggleQrModal(show));

  function toggleQrModal(show) {
    return { type: modalsConstants.SHOW_QR_MODAL, show };
  }
};
export const toggleHideQrModal = (hide) => {
  return (dispatch) => dispatch(toggleQrModal(hide));

  function toggleQrModal(hide) {
    return { type: modalsConstants.HIDE_QR_MODAL, hide };
  }
};

export const quickViewModalOpen = (previewModal) => {
  return (dispatch) => dispatch(openQuickViewModal(previewModal));

  function openQuickViewModal(previewModal) {
    return { type: modalsConstants.SHOW_QUICKVIEW_MODAL, previewModal };
  }
};
