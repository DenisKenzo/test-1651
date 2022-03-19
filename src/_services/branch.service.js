
import { handleResponse } from '../_helpers';
import { authHeader } from '../_helpers/auth-header';

export const branchService = {
  getBranches,
  getCategories,
  getFavouriteCategories,
  handleCategorySelect,
  getCompanyById,
  getBranchesForMap,
  getHelpData,
  getCompanyPictures,
};

function getBranches(id) {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getCouponBranches?coupon=${id}`, requestOptions).then(handleResponse);
}

function getBranchesForMap(data) {
  const requestOptions = {
    method: 'POST',
    crossDomain: true,
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(`${process.env.REACT_APP_API_URL}getBranchesForMap`, requestOptions).then(handleResponse);
}

function getCategories() {
  const requestOptions = {
    method: 'GET',
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getCategories`, requestOptions).then(handleResponse);
}

function getCompanyById(id) {
  const requestOptions = {
    method: 'GET',
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getCompanyDetails?id=${id}`, requestOptions).then(handleResponse);
}

function getFavouriteCategories() {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}getUserCategories`, requestOptions).then(handleResponse);
}

function handleCategorySelect(id) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
    body: JSON.stringify({ categoryID: id }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}updateUserCategories`, requestOptions).then(handleResponse);
}

function getHelpData() {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}helpContentSite`, requestOptions).then(handleResponse);
}

function getCompanyPictures(companyID) {
  const requestOptions = {
    method: 'GET',
    crossDomain: true,
  };

  return fetch(`${process.env.REACT_APP_API_URL}companies/${companyID}/pictures`, requestOptions).then(handleResponse);
}
