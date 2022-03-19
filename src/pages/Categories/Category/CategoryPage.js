import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';
import BreadCrumb from '../../../_components/BreadCrumb/BreadCrumb';
import {
  getCategories,
  getCoupons,
  closeQuickViewModal,
} from '../../../_actions';
import ContainerCoupons from '../../../_components/ContainerCoupons';
import TranslationContainer from '../../../_components/TranslationContainer';

class Category extends PureComponent {
  componentDidMount() {
    const { history } = this.props;
    this.props.getCategories();
    if (history.location.state?.details) {
      history.replace({
        ...history.location,
        state: {
          details: false,
          initialScrollY: history.location.state.initialScrollY,
          page: undefined,
        },
      });
      window.scrollTo({
        top: history.location.state.initialScrollY,
        behavior: 'smooth',
      });
    } else {
      this.handleCoupons();
    }
  }

  handleCoupons = ({ page } = {}) => {
    this.props.getCoupons({
      page,
      categoryId: [this.props.match.params.id],
      userToken: this.props.user.remember_token,
    });
  };

  backHistory = () => {
    this.props.history.goBack();
  };

  render() {
    const { coupons, categories, language } = this.props;

    return (
      <div className="container">
        <div className="mt-4 mb-5 d-md-none d-sm-flex align-items-center justify-content-between leftPosition">
          <button
            onClick={this.backHistory}
            className="btn btn-outline-primary img-btn-left btn-blocked text-capitalize align-items-center d-flex"
          >
            <img src={`../assets/images/arrow-left.svg`} />
            <TranslationContainer translationKey="back" />
          </button>

          <div className="results">
            <p>
              <span className="text-primary">{coupons?.total}</span>
              {' '}
              <TranslationContainer translationKey="results" />
            </p>
          </div>
        </div>
        {categories
          && categories.length > 0
          && categories
            .filter((category) => category._id === this.props.match.params.id)
            .map(
              (category) => category._id === this.props.match.params.id && (
              <BreadCrumb
                key={category._id}
                titleOwn={category.name[language]}
                img={`${process.env.REACT_APP_URL_IMG}${category.imgPath}`}
                json={[
                  {
                    title: 'home',
                    status: 'parent',
                    url: '/',
                  },
                  {
                    title: 'categories',
                    status: 'parent',
                    url: '/categories',
                  },
                  {
                    titleOwn: category.name[language],
                    status: 'current',
                  },
                ]}
              />
              ),
            )}

        <div>
          {coupons?.data && (
            <ContainerCoupons
              coupons={coupons}
              handleCoupons={this.handleCoupons}
            />
          )}
        </div>
      </div>
    );
  }

  addToFavouriteFromModal = (coupon) => {
    // addToFavourite(coupon, language)
  };

  backHistory = () => {
    this.props.history.goBack();
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  categories: state.branchReducer.categories,
  coupons: state.couponReducer.coupons,
  user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getCategories, getCoupons, closeQuickViewModal },
    dispatch,
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category),
);
