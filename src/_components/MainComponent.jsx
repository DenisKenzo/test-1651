import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import LazyLoad from 'react-lazyload';
import TranslationContainer from './TranslationContainer';
import LangSwitchContainer from './LangSwitchContainer';
import burgerSvg from '../assets/images/Burger.svg';
import userSvg from '../assets/images/user.svg';
import closeSvg from '../assets/images/close.svg';
import homeSvg from '../assets/images/menu_mobile/home.svg';
import listSvg from '../assets/images/menu_mobile/list.svg';
import keySvg from '../assets/images/menu_mobile/key.svg'
import checkCircleGreySvg from '../assets/images/check-circle-grey.svg'
import infoSvg from '../assets/images/menu_mobile/info.svg';
import helpCircleSvg from '../assets/images/menu_mobile/help-circle.svg';
import mailSvg from '../assets/images/menu_mobile/mail.svg'
import smartPhoneSvg from '../assets/images/menu_mobile/smartphone.svg'
import langIconSvg from '../assets/images/lang/icon.svg'
import logoSvg from '../assets/images/logo.svg';
import alertSvg from '../assets/images/alert.svg';
import heartSvg from '../assets/images/heart.svg';
import arrowSvg from '../assets/images/arrow.svg';
import userGreySvg from '../assets/images/user-grey.svg';
import heartGreySvg from '../assets/images/heart-grey.svg';
import logoutSvg from '../assets/images/logout.svg';
import notificationSvg from '../assets/images/notification.svg';
import zoomWhiteSvg from '../assets/images/zoom-white.svg';
import arrowUpSvg from '../assets/images/arrow_up.svg';
import homeStr from '../assets/images/menu_mobile/home-str.svg'
import targetSvg from '../assets/images/menu_mobile/target.svg'
import ncrSvg from '../assets/images/ncr.svg'

import Footer from './Footer';
import LoginModal from '../_modals/LoginModal/LoginModal';
import ModalForgot from '../_modals/ModalForgot/ModalForgot';
import SearchBar from './SearchBar';
import {
  // getApplicationStatus,
  getExtraCoupons,
  getFavoriteCoupons,
  getFavouriteCategories,
  loginUser,
  logout,
  toggleAgreeModalLoginIn,
} from '../_actions';
import Alerts from './Alerts';
import LoginModalContext from '../_contexts/loginModalContext';
import SearchBarContext from '../_contexts/searchBarContext';
import { LANG_NAMES } from '../_constants';
import Notifications from './Notifications';
import {
  getUserDetails,
  getUserNotifications,
  getUserTransactions,
} from '../_actions';
import ModalPos from '../_modals/ModalPos';
import { userService } from '../_services/user.service';
import AgreeModal from '../_modals/AgreeModal';

class MainComponent extends React.Component {
  state = {
    modalLogin: false,
    modalForgot: false,
    mobileSearch: false,
    languageSelect: false,
    notifications: {},
    modalPos: false,
    posNumber: null,
    modalAddress: false,
    visibleButton: false,
  };

  componentDidMount() {
    const {
      isLogged,
      getExtraCoupons,
      getUserDetails,
      user,
      getApplicationStatus,
    } = this.props;

    if (isLogged) {
      this.getAuthItems();
      user && getUserDetails(user._id);
    }
    getExtraCoupons();
    // getApplicationStatus()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { isLogged } = this.props;

    if (isLogged !== nextProps.isLogged && nextProps.isLogged) {
      this.getAuthItems();
    }
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      this.setState({ visibleButton: true });
    } else {
      this.setState({ visibleButton: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    window.addEventListener('scroll', this.toggleVisibility);

    return () => window.removeEventListener('scroll', this.toggleVisibility);
  }

  getAuthItems() {
    const {
      getFavoriteCoupons,
      getFavouriteCategories,
      getUserNotifications,
      getUserTransactions,
    } = this.props;

    getFavoriteCoupons();
    getFavouriteCategories();
    getUserNotifications();
    getUserTransactions();
  }

  render() {
    const {
      status,
      coupons,
      triggerSorted,
      isLogged,
      logout,
      user,
      favouriteCoupons,
      alerts,
      language,
      notifications,
      agreeModal,
      toggleAgreeModalLoginIn,
    } = this.props;
    const {
      modalAddress,
      modalLogin,
      modalForgot,
      mobileSearch,
      languageSelect,
      modalPos,
      posNumber,
    } = this.state;

    const hebrew = language === 'he';
    const ru = language === 'ru';

    const userAgent = status === 'mobile';
    // coupons && coupons.data[0].isApp && null
    // user.user_agent === 'react-native-app' // we displayed some content just for application

    return (
      <LoginModalContext.Provider
        value={{
          modalLogin,
          modalForgot,
          modalAddress,
          showModal: this.showModal,
          showModalForgot: this.showModalForgot,
          openLogin: this.openLogin,
        }}
      >
        <SearchBarContext.Provider
          value={{ mobileSearch, toggleMobileSearch: this.toggleMobileSearch }}
        >
          <div
            className={hebrew ? 'rtl-class' : 'ltr-class'}
            style={{ direction: hebrew ? 'rtl' : 'ltr' }}
            id="page-content"
          >
            <div className={`main-component ${isLogged ? 'auth' : ''}`}>
              <div className="container-fluid header">
                <div className="row ul-block">
                  <div className="d-flex m-4 d-mobile">
                    <input
                      type="checkbox"
                      id="drawer-toggle"
                      name="drawer-toggle"
                      ref="drawer-toggle"
                    />
                    <label htmlFor="drawer-toggle">
                      <img
                        src={burgerSvg}
                      />
                    </label>
                    <label htmlFor="drawer-toggle" id="drawer-toggle-label" />
                    <nav id="drawer">
                      <div className="drawer-header  bg-primary d-flex justify-content-between">
                        {isLogged ? (
                          <div className="info_block d-flex align-items-center">
                            <div className="icon-user">
                              <img
                                src={
                                  user.imageUser
                                    ? user.imageUser
                                    : user.imageUrl
                                      ? user.imageUrl
                                      : userSvg
                                }
                                className={
                                  user.imageUser || user.imageUrl
                                    ? 'existed-img'
                                    : 'no-img'
                                }
                              />
                            </div>
                            <div className="d-user-info ">
                              <div>
                                <p className="p-x-large text-uppercase fs">
                                  {`${user.firstName} ${user.lastName}`}
                                </p>
                              </div>
                              <div>
                                <Link to={`/${language}/profile`}>
                                  <p className="p-x-large fs">{user.email}</p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="info_block d-flex align-items-center not_loggedin">
                            <div className="icon-user no-img-user">
                              <img
                                src={userSvg}
                              />
                            </div>
                            <div className="d-user-info">
                              <div>
                                <label
                                  htmlFor="drawer-toggle"
                                  id="drawer-toggle-label"
                                >
                                  <p>
                                    <span
                                      onClick={(e) => {
                                        this.unCheck();
                                        this.showModal(e);
                                      }}
                                    >
                                      <TranslationContainer translationKey="sign_in" />
                                    </span>
                                    {' '}
                                    <TranslationContainer translationKey="or" />
                                    {' '}
                                    <span
                                      onClick={(e) => {
                                        this.unCheck();
                                        this.showModal(e);
                                      }}
                                    >
                                      <TranslationContainer translationKey="sign_up" />
                                    </span>
                                  </p>
                                </label>
                              </div>
                              <div>
                                <p>
                                  <TranslationContainer translationKey="to_continue" />
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <label
                            htmlFor="drawer-toggle"
                            id="drawer-toggle-label"
                          >
                            <img
                              src={closeSvg}
                            />
                          </label>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link
                            to={`/${language}/`}
                            className={
                              `/${language}/`
                              === this.props.location.pathname
                                ? 'active_mobile'
                                : ''
                            }
                            onClick={() => {
                              this.unCheck();
                              triggerSorted();
                            }}
                          >
                            <img
                              src={homeSvg}
                            />
                            <p>
                              <TranslationContainer translationKey="menu_1" />
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/${language}/categories`}
                            className={
                              `/${language}/categories`
                              === this.props.location.pathname
                                ? 'active_mobile'
                                : ''
                            }
                            onClick={() => this.unCheck()}
                          >
                            <img
                              src={listSvg}
                            />
                            <p>
                              <TranslationContainer translationKey="menu_2" />
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/${language}/register_as_manufacturer`}
                            className={
                              `/${language}/register_as_manufacturer`
                              === this.props.location.pathname
                                ? 'active_mobile'
                                : ''
                            }
                            onClick={() => this.unCheck()}
                          >
                            <img
                              src={keySvg}
                            />
                            <p>
                              <TranslationContainer translationKey="companies" />
                            </p>
                          </Link>
                        </li>
                        {isLogged && (
                          <li>
                            <Link
                              to={`/${language}/suitable_for_me`}
                              className={
                                `/${language}/suitable_for_me`
                                === this.props.location.pathname
                                  ? 'active_mobile'
                                  : ''
                              }
                              onClick={() => this.unCheck()}
                            >
                              <img
                                src={checkCircleGreySvg}
                              />
                              <p>
                                <TranslationContainer translationKey="menu_13" />
                              </p>
                            </Link>
                          </li>
                        )}

                        <li>
                          <Link
                            to={`/${language}/about`}
                            className={
                              `/${language}/about`
                              === this.props.location.pathname
                                ? 'active_mobile'
                                : ''
                            }
                            onClick={() => this.unCheck()}
                          >
                            <img
                              src={infoSvg}
                            />
                            <p>
                              <TranslationContainer translationKey="menu_8" />
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/${language}/help`}
                            className={
                              `/${language}/help`
                              === this.props.location.pathname
                                ? 'active_mobile'
                                : ''
                            }
                            onClick={() => this.unCheck()}
                          >
                            <img
                              src={helpCircleSvg}
                            />
                            <p>
                              <TranslationContainer translationKey="menu_10" />
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={`/${language}/contact`}
                            className={
                              `/${language}/contact`
                              === this.props.location.pathname
                                ? 'active_mobile'
                                : ''
                            }
                            onClick={() => this.unCheck()}
                          >
                            <img
                              src={mailSvg}
                            />
                            <p>
                              <TranslationContainer translationKey="menu_11" />
                            </p>
                          </Link>
                        </li>

                        {!userAgent && (
                          <li>
                            <Link
                              to={`/${language}/qr`}
                              className={
                                `/${language}/qr`
                                === this.props.location.pathname
                                  ? 'active_mobile'
                                  : ''
                              }
                              onClick={() => this.unCheck()}
                            >
                              <img
                                src={smartPhoneSvg}
                              />
                              <p>
                                <TranslationContainer translationKey="get_you_app" />
                              </p>
                            </Link>
                          </li>
                        )}

                        <li className="lang_li">
                          <a
                            className="lang_wrap"
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                languageSelect: !this.state.languageSelect,
                              });
                            }}
                          >
                            <div>
                              <img
                                src={`../assets/images/lang/${language}.svg`}
                              />
                              {LANG_NAMES.map((lang, i_) => {
                                if (lang.locale === language) { return <p key={i_}>{lang.name}</p>; }
                              })}
                            </div>
                            {this.props.locale === language.locale && (
                              <img
                                src={langIconSvg}
                              />
                            )}
                          </a>
                        </li>
                        {languageSelect ? (
                          <LangSwitchContainer
                            isMobile
                            closeSelectProp={() => {
                              this.setState({
                                ...this.state,
                                languageSelect: false,
                              });
                            }}
                          />
                        ) : null}
                      </ul>

                      <div className="footer-menu">
                        <div
                          className={
                            ru
                              ? 'd-flex mt-3 justify-content-between addView'
                              : 'd-flex mt-3 justify-content-between'
                          }
                        >
                          <div>
                            <p>Chipper © 2020</p>
                          </div>
                          <div>
                            <Link
                              to={`/${language}/privacy`}
                              onClick={() => this.unCheck()}
                            >
                              <p>
                                <TranslationContainer translationKey="privacy_policy" />
                              </p>
                            </Link>
                          </div>
                          <div>
                            <Link
                              to={`/${language}/terms_of_use`}
                              onClick={() => this.unCheck()}
                            >
                              <p className="terms">
                                <TranslationContainer translationKey="terms" />
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>

                  <div
                    className={
                      `d-flex align-items-center ${
                        hebrew ? 'pl-lg-5' : 'pr-lg-5'}`
                    }
                  >
                    <Link to={`/${language}/`} onClick={triggerSorted}>
                      <img
                        src={logoSvg}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ulstyle">
                    <ul>
                      <Link
                        to={`/${language}/`}
                        className={
                          `/${language}/` === this.props.location.pathname
                            ? 'active'
                            : ''
                        }
                        onClick={triggerSorted}
                      >
                        <li className="text-uppercase">
                          <p>
                            <TranslationContainer translationKey="menu_1" />
                          </p>
                        </li>
                      </Link>
                      <Link
                        to={`/${language}/categories`}
                        className={
                          `/${language}/categories`
                          === this.props.location.pathname
                            ? 'active'
                            : ''
                        }
                      >
                        <li className="text-uppercase">
                          <p>
                            <TranslationContainer translationKey="menu_2" />
                          </p>
                        </li>
                      </Link>
                      <Link
                        to={`/${language}/help`}
                        className={
                          `/${language}/help`
                          === this.props.location.pathname
                            ? 'active'
                            : ''
                        }
                      >
                        <li className="text-uppercase">
                          <p>
                            <TranslationContainer translationKey="menu_14" />
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <SearchBar />

                  {isLogged && (
                    <div className="d-flex system-icon-container menu_dropdown">
                      <img
                        src={alertSvg}
                      />
                      {notifications.filter((item) => item.readAt === null)
                        .length > 0 && (
                        <div className="alert-icon">
                          {
                            notifications.filter((item) => item.readAt === null)
                              .length
                          }
                        </div>
                      )}
                      <Notifications />
                    </div>
                  )}
                  {isLogged && (
                    <div className="d-flex system-icon-container">
                      <Link to={`/${language}/saved-coupons`}>
                        <img
                          src={heartSvg}
                        />
                        {favouriteCoupons && favouriteCoupons.length > 0 && (
                          <div className="alert-icon">
                            {favouriteCoupons.length}
                          </div>
                        )}
                      </Link>
                    </div>
                  )}

                  {isLogged && (
                    <div className="d-flex system-icon-container icon-user">
                      <img
                        src={
                          user.imageUser
                            ? user.imageUser
                            : user.imageUrl
                              ? user.imageUrl
                              : userSvg
                        }
                        className={
                          user.imageUser || user.imageUrl
                            ? 'existed-img'
                            : 'no-img'
                        }
                      />
                    </div>
                  )}
                  {isLogged && (
                    <div className="d-flex d-name profile">
                      <p>
                        {user.firstName ? (
                          `${user.firstName} ${user.lastName}`
                        ) : (
                          <TranslationContainer translationKey="account" />
                        )}
                      </p>
                      &nbsp;
                      <img
                        src={arrowSvg}
                      />
                      <div className="profile_block">
                        <Link
                          to={`/${language}/profile`}
                          className={
                            `/${language}/profile`
                            === this.props.location.pathname
                              ? 'active'
                              : ''
                          }
                        >
                          <img src={userGreySvg} />
                          <p>
                            <TranslationContainer translationKey="profile_menu_1" />
                          </p>
                        </Link>
                        <Link
                          to={`/${language}/preffered_categories`}
                          className={
                            `/${language}/preffered_categories`
                            === this.props.location.pathname
                              ? 'active'
                              : ''
                          }
                        >
                          <img src={checkCircleGreySvg} />
                          <p>
                            <TranslationContainer translationKey="profile_menu_2" />
                          </p>
                        </Link>
                        <Link
                          to={`/${language}/saved-coupons`}
                          className={
                            `/${language}/saved-coupons`
                            === this.props.location.pathname
                              ? 'active'
                              : ''
                          }
                        >
                          <img src={heartGreySvg} />
                          <p>
                            <TranslationContainer translationKey="profile_menu_3" />
                          </p>
                        </Link>
                        <hr />
                        <a onClick={() => logout(language)}>
                          <img
                            src={logoutSvg}
                          />
                          <p>
                            <TranslationContainer translationKey="profile_menu_5" />
                          </p>
                        </a>
                      </div>
                    </div>
                  )}
                  {!isLogged && (
                    <div
                      className="d-flex system-icon-container icon-user"
                      onClick={(e) => this.showModal(e)}
                    >
                      <img
                        src={userSvg}
                        className="no-img"
                      />
                    </div>
                  )}
                  {!isLogged && (
                    <div
                      className="d-flex d-name profile"
                      onClick={(e) => this.showModal(e)}
                    >
                      <p>
                        <TranslationContainer translationKey="login" />
                      </p>
                    </div>
                  )}
                  <div className="d-flex button-container ml-3 mr-3">
                    <Link to={`/${language}/register_as_manufacturer`}>
                      <p>
                        <TranslationContainer translationKey="companies" />
                      </p>
                    </Link>
                  </div>
                  <div className="d-flex system-icon-container lang">
                    <img
                      src={`../assets/images/lang/${language}.svg`}
                    />
                    <LangSwitchContainer isMobile={false} />
                  </div>
                  <div className="d-flex m-4 d-mobile icon_block">
                    <div className="position-absolute d-flex alerts-parent">
                      {isLogged && (
                        <div className="mr-4 ml-4">
                          <Link
                            to={`/${language}/notifications`}
                            onClick={(e) => !isLogged && this.showModal(e)}
                          >
                            <div className="d-flex justify-content-center">
                              <div className="position-relative w-auto">
                                <img
                                  src={notificationSvg}
                                />
                                {notifications.filter(
                                  (item) => item.readAt === null,
                                ).length > 0 && (
                                  <div className="alert-icon  mobile-badge">
                                    {
                                      notifications.filter(
                                        (item) => item.readAt === null,
                                      ).length
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      )}
                      <div>
                        <img
                          onClick={() => this.toggleMobileSearch()}
                          src={zoomWhiteSvg}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {isLogged && (
                  <div className="row auth_menu">
                    <ul>
                      <Link
                        to={`/${language}/nearby`}
                        className={
                          `/${language}/nearby`
                          === this.props.location.pathname
                            ? 'active'
                            : ''
                        }
                      >
                        <li>
                          <p>
                            <TranslationContainer translationKey="menu_3" />
                          </p>
                        </li>
                      </Link>
                      <Link
                        to={`/${language}/preffered_categories`}
                        className={
                          `/${language}/preffered_categories`
                          === this.props.location.pathname
                            ? 'active'
                            : ''
                        }
                      >
                        <li>
                          <p>
                            <TranslationContainer translationKey="menu_12" />
                          </p>
                        </li>
                      </Link>
                      <Link
                        to={`/${language}/suitable_for_me`}
                        className={
                          `/${language}/suitable_for_me`
                          === this.props.location.pathname
                            ? 'active'
                            : ''
                        }
                      >
                        <li>
                          <p>
                            <TranslationContainer translationKey="menu_13" />
                          </p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {alerts && <Alerts />}

            {this.props.children}

            <LazyLoad>
              <Footer showModal={this.showModal} />
            </LazyLoad>
            {!isLogged && (
              <LoginModal
                showModal={this.showModal}
                modalLogin={modalLogin}
                forgotPassword={this.showModalForgot}
              />
            )}
            {modalForgot && !isLogged && (
              <ModalForgot
                showModal={this.showModalForgot}
                modalForgot={modalForgot}
                openLogin={this.openLogin}
              />
            )}

            <ModalPos
              modalPos={modalPos}
              showModalPos={this.showModalPos}
              posNumber={posNumber}
            />
            {/* {agreeModal && !isLogged && (
              <AgreeModal
                modal={agreeModal}
                showModal={toggleAgreeModalLoginIn(false, true)}
              />
            )} */}
            <div className="scroll-to-top">
              {this.state.visibleButton && (
                <div className="arrowWrap" onClick={this.scrollToTop}>
                  <img
                    src={arrowUpSvg}
                  />
                </div>
              )}
            </div>
            <div className="mobile-fixed-menu position-fixed text-center justify-content-around">
              <div>
                <Link to={`/${language}/`} onClick={triggerSorted}>
                  <div>
                    <img
                      src={homeStr}
                    />
                  </div>
                  <div className="mt-1">
                    <p>
                      <TranslationContainer translationKey="home" />
                    </p>
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  to={`/${language}/nearby`}
                  onClick={(e) => !isLogged && this.showModal(e)}
                >
                  {/* <Link to={"/"+language+"/nearby"} onClick={ (e) => !isLogged  ? this.openLogin()
                              : user.agree1 ? this.showModalPos(e) : toggleAgreeModalLoginIn(false, true) }> */}

                  <div>
                    <img
                      src={targetSvg}
                    />
                  </div>
                  <div className="mt-1">
                    <p>
                      <TranslationContainer translationKey="menu_3" />
                    </p>
                  </div>
                </Link>
              </div>
              <div>
                <div
                  className="pos-terminal-parent"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const action = () => {
                      !isLogged
                        ? this.openLogin()
                        : user.agree1
                          ? this.showModalPos(e)
                          : toggleAgreeModalLoginIn(false, true);
                    };
                    if (!user.agree1) {
                      AgreeModal.confirm({
                        language,
                        user,
                        isLogged,
                        onOk: toggleAgreeModalLoginIn(true, false),
                      });
                    } else {
                      action();
                    }
                  }}
                >
                  <div className="d-flex justify-content-center pos-terminal">
                    <div className="position-relative w-auto">
                      <img
                        src={ncrSvg}
                      />
                    </div>
                  </div>
                  <div className="mt-1">
                    <p>
                      <TranslationContainer translationKey="pos_terminal" />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Link
                  to={`/${language}/saved-coupons`}
                  onClick={(e) => !isLogged && this.showModal(e)}
                >
                  <div className="d-flex justify-content-center">
                    <div className="position-relative w-auto">
                      <img
                        src={heartSvg}
                      />
                      {favouriteCoupons
                        && favouriteCoupons.length > 0
                        && isLogged && (
                          <div className="alert-icon">
                            {favouriteCoupons.length}
                          </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p>
                      <TranslationContainer translationKey="wishlist" />
                    </p>
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  to={`/${language}/profile`}
                  onClick={(e) => !isLogged && this.showModal(e)}
                >
                  <div>
                    <img
                      src={userSvg}
                    />
                  </div>
                  <div className="mt-1">
                    <p>
                      <TranslationContainer translationKey="profile" />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SearchBarContext.Provider>
      </LoginModalContext.Provider>
    );
  }

  showModal = (e) => {
    e && e.preventDefault();
    this.setState({ ...this.state, modalLogin: !this.state.modalLogin });
  };

  showAddress = () => {
    this.setState({ ...this.state, modalAddress: !this.state.modalAddress });
  };

  showModalPos = (e) => {
    if (this.state.modalPos) {
      this.setState({ ...this.state, modalPos: !this.state.modalPos });
    } else {
      userService.getPosNumber().then((response) => this.setState({
        ...this.state,
        posNumber: response,
        modalPos: !this.state.modalPos,
      }));
    }
  };

  unCheck = () => {
    this.refs['drawer-toggle'].checked = !this.refs['drawer-toggle'].checked;
  };

  showModalForgot = () => {
    this.setState({
      ...this.state,
      modalLogin: false,
      modalForgot: !this.state.modalForgot,
    });
  };

  openLogin = () => {
    this.setState({ ...this.state, modalLogin: true, modalForgot: false });
  };

  toggleMobileSearch = () => {
    this.setState({ ...this.state, mobileSearch: !this.state.mobileSearch });
  };
}

MainComponent.prototypes = {
  showModal: PropTypes.function,
};

const mapStateToProps = (state) => ({
  agreeModal: state.modalReducer.agreeModal,
  language: state.mainReducer.locale,
  isLogged: state.auth.isLoggedIn,
  user: state.auth.user,
  favouriteCoupons: state.couponReducer.favouriteCoupons,
  alerts: state.alertsReducer.alerts,
  notifications: state.userReducer.notifications,
  coupons: state.couponReducer.coupons,
  status: state.applicationsReducer.status,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleAgreeModalLoginIn,
      loginUser,
      logout,
      getFavoriteCoupons,
      getFavouriteCategories,
      getExtraCoupons,
      getUserNotifications,
      getUserTransactions,
      getUserDetails,
    },
    dispatch,
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

