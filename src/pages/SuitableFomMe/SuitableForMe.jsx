import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import ScrollBar from 'react-scrollbars-custom';

import { Link } from 'react-router-dom';
import CouponCard from '../../_components/CouponCard/CouponCard';
import ContainerCoupons from '../../_components/ContainerCoupons';
import { getCategories, getCoupons } from '../../_actions';
import TranslationContainer from '../../_components/TranslationContainer';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import './SuitableForMe.scss';

class SuitableForMe extends PureComponent {
  state = {
    sorted: [],
    arrayCategories: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      JSON.stringify(props.favouriteCategories)
      !== JSON.stringify(state.arrayCategories)
    ) {
      const { getCoupons } = props;

      const categoryBlock = props.favouriteCategories && props.favouriteCategories.length > 0
        ? {
          categoryId: props.favouriteCategories.map(
            (category) => category._id,
          ),
        }
        : {};
      getCoupons({
        page: 1,
        filterID: JSON.parse(sessionStorage.getItem('filterID') || '3'),
        userToken: props.user.remember_token,
        ...categoryBlock,
      });

      return {
        arrayCategories: props.favouriteCategories,
      };
    }

    return null;
  }

  handleCoupons = ({ page } = {}) => {
    const categoryBlock = this.state.sorted && this.state.sorted.length > 0
      ? {
        categoryId: this.state.sorted,
      }
      : {
        categoryId: this.props.favouriteCategories.map(
          (category) => category._id,
        ),
      };
    this.props.getCoupons({
      page,
      filterID: JSON.parse(sessionStorage.getItem('filterID') || '3'),
      userToken: this.props.user.remember_token,
      ...categoryBlock,
    });
  };

  handleCategorySelect = (id, exist) => {
    const { sorted, arrayCategories } = this.state;
    sorted.length === 1 && exist
      ? this.setState({ ...this.state, sorted: [] }, () => this.handleCoupons(arrayCategories.map((category) => category._id)))
      : exist
        ? this.setState(
          {
            ...this.state,
            sorted: sorted.filter((categoryBlock) => id !== categoryBlock),
          },
          () => this.handleCoupons(),
        )
        : this.setState({ ...this.state, sorted: [...sorted, id] }, () => this.handleCoupons());
  };

  render() {
    const {
      coupons,
      loadingHotCoupons,
      favouriteCategories,
      language,
    } = this.props;
    const { sorted } = this.state;

    const hebrew = language === 'he';

    return (
      <div className="suitable">
        <BreadCrumb
          title="menu_13"
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'menu_13',
              status: 'current',
            },
          ]}
        />
        <div className="breadcrumbs-title align-items-center mobileBread">
          <h1 className="mt-4">
            <TranslationContainer translationKey="menu_13" />
          </h1>
        </div>
        {hebrew ? (
          <div className="d-flex custom-margin suitableCategory wrapBtnTxt">
            <div className="d-flex mb-4">
              <div>
                <span>
                  <Link to={`/${language}/preffered_categories`}>
                    <button className="btn btn-outline-primary btnSize">
                      <TranslationContainer translationKey="change_categories" />
                    </button>
                  </Link>
                </span>
              </div>
            </div>
            <div className="d-flex mb-4">
              {favouriteCategories && favouriteCategories.length > 0 ? (
                <p>
                  <span className="text-primary">
                    {coupons && coupons.total}
                  </span>
                  &nbsp;
                  <TranslationContainer translationKey="your_list" />
                  <Link
                    to={`/${language}/preffered_categories`}
                    className="text-primary"
                  >
                    &nbsp;
                    <TranslationContainer translationKey="favourite_categories_list" />
                  </Link>
                </p>
              ) : (
                <p className="text-initial">
                  <TranslationContainer translationKey="no_categories_1" />
                  <br />
                  <TranslationContainer translationKey="no_categories_2" />
                  {' '}
                  <Link
                    to={`/${language}/preffered_categories`}
                    className="text-primary"
                  >
                    &nbsp;
                    <TranslationContainer translationKey="favourite_categories_list" />
                  </Link>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center custom-margin suitableCategory">
            <div className="d-flex mb-4">
              {favouriteCategories && favouriteCategories.length > 0 ? (
                <p>
                  <span className="text-primary">
                    {coupons && coupons.total}
                  </span>
                  &nbsp;
                  <TranslationContainer translationKey="your_list" />
                  <Link
                    to={`/${language}/preffered_categories`}
                    className="text-primary"
                  >
                    &nbsp;
                    <TranslationContainer translationKey="favourite_categories_list" />
                  </Link>
                </p>
              ) : (
                <p className="text-initial">
                  <TranslationContainer translationKey="no_categories_1" />
                  <br />
                  <TranslationContainer translationKey="no_categories_2" />
                  {' '}
                  <Link
                    to={`/${language}/preffered_categories`}
                    className="text-primary"
                  >
                    &nbsp;
                    <TranslationContainer translationKey="favourite_categories_list" />
                  </Link>
                </p>
              )}
            </div>
            <div className="d-flex mb-4">
              <div>
                <span>
                  <Link to={`/${language}/preffered_categories`}>
                    <button className="btn btn-outline-primary btnSize">
                      <TranslationContainer translationKey="change_categories" />
                    </button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
        {favouriteCategories && favouriteCategories.length > 0 && (
          <div className="position-relative categories categories-suitable-for-me mb-6">
            <div className={`categories_block  ${language === 'he' ? 'he-category' : 'en-category'}`}>
              <ScrollBar
                style={{
                  position: '',
                  direction: 'ltr',
                  height: '170px',
                }}
                autoHide
                noScrollY
                rtl={hebrew}
              >
                <div className={`categories_block_nowrap  ${language === 'he' ? 'he-category' : 'en-category'}`}>
                  {favouriteCategories.map((category, key) => {
                    const exist = sorted.length > 0
                      && sorted.some(
                        (categoryBlock) => category._id === categoryBlock,
                      );

                    return (
                      <div
                        key={`category${key}`}
                        className="category-item"
                        onClick={() => this.handleCategorySelect(category._id, exist)}
                      >
                        <div className={`suitable-category category ${exist ? 'checked' : 'no_checked'} ${language === 'ru' && 'height-ru'}`}>
                          <div>
                            <img
                              src={`${process.env.REACT_APP_URL_IMG}${category.imgPath}`}
                            />
                          </div>
                          <div className="p-category">
                            <p>
                              {category.name[language]
                                && category.name[language]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollBar>
            </div>
          </div>
        )}
        {favouriteCategories
          && favouriteCategories.length > 0
          && coupons
          && coupons.data && (
            <ContainerCoupons
              coupons={coupons}
              isLoading={loadingHotCoupons}
              handleCoupons={this.handleCoupons}
            />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  loadingHotCoupons: state.couponReducer.loadingHotCoupons,
  coupons: state.couponReducer.coupons,
  user: state.auth.user,
  favouriteCategories: state.branchReducer.favouriteCategories,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCoupons, getCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuitableForMe);
