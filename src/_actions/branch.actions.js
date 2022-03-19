import { branchConstants, couponConstants, TRANSLATIONS } from '../_constants';
import { branchService, couponService } from '../_services';
import { alertCall } from './alerts.actions';

export function getBranches(id) {
  return (dispatch) => {
    branchService.getBranches(id)
      .then(
        (data) => {
          dispatch(success(data));
        },
        (error) => {
          dispatch(alertCall({ type: 'danger', text: error.toString() }));
        },
      );
  };

  function success(data) { return { type: branchConstants.GET_SUCCESS_BRANCH, data }; }
  // function failure(error) { return { type: branchConstants.GET_FAILURE, error } }
}

export function getBranchesForMap(data) {
  return (dispatch) => {
    branchService.getBranchesForMap(data)
      .then(
        (data) => {
          dispatch(success(data));
        },
        (error) => {
          dispatch(alertCall({ type: 'danger', text: error.toString() }));
        },
      );
  };

  function success(data) { return { type: branchConstants.GET_SUCCESS_BRANCHES_FOR_MAP, data }; }
  // function failure(error) { return { type: branchConstants.GET_FAILURE, error } }
}

export function getCategories() {
  return (dispatch) => {
    branchService.getCategories()
      .then(
        (data) => {
          dispatch(success(data));
        },
        (error) => {
          dispatch(alertCall({ type: 'danger', text: error.toString() }));
        },
      );
  };

  function success(data) { return { type: branchConstants.GET_SUCCESS_CATEGORIES, data }; }
  // function failure(error) { return { type: branchConstants.GET_FAILURE, error } }
}

export function getFavouriteCategories() {
  return (dispatch) => {
    branchService.getFavouriteCategories()
      .then(
        (data) => {
          dispatch(success(data));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertCall({ type: 'danger', text: error.toString() }));
        },
      );
  };

  function success(data) { return { type: branchConstants.GET_SUCCESS_CATEGORIES_FAVOURITE, data }; }
  function failure(error) { return { type: branchConstants.GET_FAILURE_CATEGORIES_FAVOURITE, error }; }
}

export function handleCategoryRemove(category, language) {
  return (dispatch) => {
    dispatch(request(category._id));

    branchService.handleCategorySelect(category._id)
      .then(
        () => {
          dispatch(alertCall({ type: 'info', text: TRANSLATIONS[language].category_removed }));
        },
        (error) => {
          dispatch(failure(category));
          dispatch(alertCall([{ type: 'danger', text: error.toString() }]));
        },
      );
  };

  function request(data) { return { type: branchConstants.REMOVE_REQUEST_CATEGORIES_FAVOURITE, data }; }
  function failure(data) { return { type: branchConstants.REMOVE_FAILURE_CATEGORIES_FAVOURITE, data }; }
}

export function handleCategorySelect(category, language) {
  return (dispatch) => {
    dispatch(request(category));

    branchService.handleCategorySelect(category._id)
      .then(
        () => {
          dispatch(alertCall({ type: 'success', text: TRANSLATIONS[language].category_added }));
        },
        (error) => {
          dispatch(failure(category._id));
          dispatch(alertCall({ type: 'danger', text: error.toString() }));
        },
      );
  };

  function request(data) { return { type: branchConstants.ADD_REQUEST_CATEGORIES_FAVOURITE, data }; }
  function failure(data) { return { type: branchConstants.ADD_FAILURE_CATEGORIES_FAVOURITE, data }; }
}

export function getCompanyById(id) {
  return (dispatch) => {
    branchService.getCompanyById(id)
      .then(
        (data) => {
          dispatch(success({ ...data }));
        },
        (error) => {
          dispatch(alertCall({
            type: 'danger',
            text: error.toString(),
          }));
        },
      );
  };

  function success(data) { return { type: branchConstants.GET_SUCCESS_COMPANY_BY_ID, data }; }
}

export function getHelpData() {
  return (dispatch) => {
    branchService.getHelpData()
      .then(
        (data) => {
          dispatch(success(data));
        },
        (error) => {
          dispatch(alertCall({ type: 'danger', text: error.toString() }));
        },
      );
  };

  function success(data) { return { type: branchConstants.GET_SUCCESS_HELP_DATA, data }; }
}
