import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import TranslationContainer from './TranslationContainer';
import {
  getExtraCoupons,
  getFavoriteCoupons,
  getFavouriteCategories,
  isLoggedIn,
  loginUser,
  logout,
  removeAllCoupons,
} from '../_actions';

class SidebarAccount extends Component {
  state = {
    opened: false,
  };

  render() {
    const {
      user,
      favouriteCoupons,
      language,
      favouriteCategories,
      logout,
      categories,
      notifications,
    } = this.props;
    const { opened } = this.state;

    return (
      <div className="Sidebar SidebarAccount ">
        <div className="info_block d-flex align-items-center">
          <div className="icon-user">
            <img
              src={
                user.imageUser
                  ? user.imageUser
                  : user.imageUrl
                    ? user.imageUrl
                    : `../assets/images/user.svg`
              }
              className={
                user.imageUser || user.imageUrl ? 'existed-img' : 'no-img'
              }
            />
          </div>
          <div className="d-name">
            <p className="p-x-large">
              {user.firstName ? (
                `${user.firstName} ${user.lastName}`
              ) : (
                <TranslationContainer translationKey="account" />
              )}
            </p>
            <Link to={`/${language}/profile`}>
              <p className="p-small">{user.email}</p>
            </Link>
          </div>
          <div className={`opener-block ${opened ? 'active' : ''}`}>
            <div
              className="opener"
              onClick={() => this.setState({ opened: !opened })}
            >
              <img src={`../assets/images/chevron-up.svg`} />
            </div>
          </div>
        </div>
        <div
          className={
            `profile_block ${opened ? 'profile_active' : 'profile_none'}`
          }
        >
          <Link
            to={`/${language}/profile`}
            className={
              this.props.match.url === `/${language}/profile` ? 'active' : ''
            }
          >
            <img src={`../assets/images/user-grey.svg`} />
            <p className="p-large">
              <TranslationContainer translationKey="profile_menu_1" />
            </p>
          </Link>
          <Link
            to={`/${language}/notifications`}
            className={
              this.props.match.url === `/${language}/notifications`
                ? 'active'
                : ''
            }
          >
            <img src={`../assets/images/alert-grey.svg`} />
            <p className="p-large">
              <TranslationContainer translationKey="notifications" />
            </p>
            {notifications
              && notifications.filter((item) => item.readAt === null).length
                > 0 && (
                <span>
                  {notifications.filter((item) => item.readAt === null).length}
                </span>
            )}
          </Link>
          <Link
            to={`/${language}/preffered_categories`}
            className={
              this.props.match.url === `/${language}/preffered_categories`
                ? 'active'
                : ''
            }
          >
            <img
              src={`../assets/images/check-circle-grey.svg`}
            />
            <p className="p-large">
              <TranslationContainer translationKey="profile_menu_2" />
            </p>

            {favouriteCategories && favouriteCategories.length > 0 && (
              <span>{favouriteCategories.length}</span>
            )}
          </Link>
          <Link
            to={`/${language}/saved-coupons`}
            className={
              this.props.match.url === `/${language}/saved-coupons`
                ? 'active'
                : ''
            }
          >
            <img src={`../assets/images/heart-grey.svg`} />
            <p className="p-large">
              <TranslationContainer translationKey="profile_menu_3" />
            </p>
            {favouriteCoupons && favouriteCoupons.length > 0 && (
              <span>{favouriteCoupons.length}</span>
            )}
          </Link>
          {/* <Link
            to={'/' + language + '/payment-transactions'}
            className={
              this.props.match.url === `/${language}/payment-transactions`
                ? 'active'
                : ''
            }
          >
            <img
              src={`../assets/images/payment&Transactions.svg`}
            />
            <p className="p-large">
              <TranslationContainer translationKey="profile_menu_6" />
            </p>
          </Link> */}
          <hr />
          {/* <Link to={'/' + language + '/settings'} className={'/' + language + '/settings' === this.props.match.url && 'active'}>
                        <img src={`../assets/images/user-grey.svg`}/>
                        <p className="p-large">
                            <TranslationContainer translationKey="profile_menu_4"/>
                        </p>
                    </Link> */}
          <a
            onClick={() => logout(language)}
            // onClick={ () => this.logOut() }
          >
            <img src={`../assets/images/logout.svg`} />
            <p className="p-large">
              <TranslationContainer translationKey="profile_menu_5" />
            </p>
          </a>
        </div>
      </div>
    );
  }

  // logOut = () => {
  //     const {language, removeAllCoupons, favouriteCoupons, showModal} = this.props;
  //
  //     logout(language);
  //
  //     removeAllCoupons(favouriteCoupons).then(() => showModal());
  //
  //
  // }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
  categories: state.branchReducer.categories,
  favouriteCoupons: state.couponReducer.favouriteCoupons,
  favouriteCategories: state.branchReducer.favouriteCategories,
  notifications: state.userReducer.notifications,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // removeAllCoupons,
      logout,
    },
    dispatch,
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SidebarAccount),
);
