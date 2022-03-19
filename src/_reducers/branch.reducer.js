import { branchConstants } from '../_constants';

export function branchReducer(state = {}, action) {
  switch (action.type) {
    case branchConstants.GET_SUCCESS_BRANCH:
      return {
        ...state,
        branch: action.data,
      };
    case branchConstants.GET_SUCCESS_BRANCHES_FOR_MAP:
      return {
        ...state,
        branchesForMap: action.data,
      };
    case branchConstants.GET_SUCCESS_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    case branchConstants.GET_SUCCESS_COMPANY_BY_ID:
      return {
        ...state,
        company: action.data,
      };
    case branchConstants.GET_SUCCESS_CATEGORIES_FAVOURITE:
      return {
        ...state,
        favouriteCategories: action.data,
      };
    case branchConstants.REMOVE_REQUEST_CATEGORIES_FAVOURITE:
      return {
        ...state,
        favouriteCategories: state.favouriteCategories.filter((category) => category._id !== action.data),
      };
    case branchConstants.ADD_REQUEST_CATEGORIES_FAVOURITE:
      return {
        ...state,
        favouriteCategories: [
          ...state.favouriteCategories,
          action.data,
        ],
      };
    case branchConstants.REMOVE_FAILURE_CATEGORIES_FAVOURITE:
      return {
        ...state,
        favouriteCategories: [...state.favouriteCategories, action.data],

      };
    case branchConstants.ADD_FAILURE_CATEGORIES_FAVOURITE:
      return {
        ...state,
        favouriteCategories: state.favouriteCategories.filter((category) => category._id !== action.data),
      };
    case branchConstants.GET_SUCCESS_HELP_DATA:
      return {
        ...state,
        helpData: action.data,
      };
    default:
      return state;
  }
}
