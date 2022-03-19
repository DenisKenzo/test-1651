import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import CouponCard from './CouponCard/CouponCard';
import TranslationContainer from './TranslationContainer';
import { getCouponsFooter } from '../_actions';
import './Footer.scss';

class Footer extends React.Component {
  state = {
    language: this.props.language,
    isSlider: true,
    key: 0,
  };

  // static getDerivedStateFromProps(props, state) {
  //     if (props.language !==  state.language) {
  //         return {
  //             language: props.language
  //         }
  //     }
  //
  //     return null;
  // }
  componentDidMount() {
    this.props.getCouponsFooter();
  }

  render() {
    const { language } = this.state;
    const {
      couponsFooter,
      showModal,
      isLogged,
      user,
      coupons,
      status,
    } = this.props;

    const userAgent = status === 'mobile';
    // const userAgent = coupons && null && coupons.data[0].isApp === 'react-native-app'

    // user.user_agent === 'react-native-app' // we displayed some content just for application

    const hebrew = language === 'he';

    const currCupons = couponsFooter ? hebrew ? [...couponsFooter].reverse() : couponsFooter : [];

    const settingsSlide = {
      arrows: true,
      dots: true,
      centerMode: true,
      centerPadding: '32px',
      variableWidth: true,
      swipeToSlide: true,
      slidesToScroll: 3,
      infinite: currCupons.length !== 1,
      rtl: hebrew,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1919,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
          },
        },
        {
          breakpoint: 1439,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
          },
        },
      ],
    };

    return (
      <div className="mt-11">
        {couponsFooter && couponsFooter.length > 0 && (
          <div className="pb-9 pt-11 bg-primary-5 slider-footer-parent">
            <div className="text-center text-uppercase mb-4">
              <h2>
                <TranslationContainer translationKey="interesting_deals" />
              </h2>
            </div>

            <div key={`slider${hebrew}`} className={`${currCupons.length === 1 ? hebrew ? 'one-item-he' : 'one-item-en' : ''}`}>
              <Slider
                {...settingsSlide}
                className="slider-footer"
                dir={hebrew ? 'rtl' : 'ltr'}
                key={this.state.key}
              >
                {currCupons.map((coupon) => (
                  <div
                    className={`item active ${coupon._id}`}
                    key={coupon._id}
                  >
                    <CouponCard
                      coupon={coupon}
                      inSlider={this.state.isSlider}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
        <div className="container-fluid footer">
          <div className="d-flex justify-content-around footer-block">
            <div className="block-item logo-footer pt-lg-5">
              <img
                src={`../assets/images/logo-footer.svg`}
              />
            </div>
            <div className="block-item menu">
              <h3 className="mb-3 text-uppercase">
                <TranslationContainer translationKey="title_menu_1" />
              </h3>
              <div className="item">
                <Link to={`/${language}/`}>
                  <p>
                    <TranslationContainer translationKey="menu_1" />
                  </p>
                </Link>
              </div>

              <div className="item">
                <Link
                  to={`/${language}/suitable_for_me`}
                  onClick={(e) => !isLogged && showModal(e)}
                >
                  <p>
                    <TranslationContainer translationKey="menu_13" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link
                  to={`/${language}/nearby`}
                  onClick={(e) => !isLogged && showModal(e)}
                >
                  <p>
                    <TranslationContainer translationKey="menu_3" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link to={`/${language}/categories`}>
                  <p>
                    <TranslationContainer translationKey="menu_2" />
                  </p>
                </Link>
              </div>
            </div>
            <div className="block-item menu">
              <h3 className="mb-3 text-uppercase">
                <TranslationContainer translationKey="title_menu_2" />
              </h3>
              <div className="item">
                <Link
                  to={`/${language}/profile`}
                  onClick={(e) => !isLogged && showModal(e)}
                >
                  <p>
                    <TranslationContainer translationKey="menu_5" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link
                  to={`/${language}/preffered_categories`}
                  onClick={(e) => !isLogged && showModal(e)}
                >
                  <p>
                    <TranslationContainer translationKey="menu_6" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link
                  to={`/${language}/saved-coupons`}
                  onClick={(e) => !isLogged && showModal(e)}
                >
                  <p>
                    <TranslationContainer translationKey="saved_coupons" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link
                  to={`/${language}/settings`}
                  onClick={(e) => !isLogged && showModal(e)}
                >
                  <p>
                    <TranslationContainer translationKey="menu_7" />
                  </p>
                </Link>
              </div>
            </div>
            <div className="block-item menu">
              <h3 className="mb-3 text-uppercase">
                <TranslationContainer translationKey="title_menu_3" />
              </h3>
              <div className="item">
                <Link to={`/${language}/about`}>
                  <p>
                    <TranslationContainer translationKey="menu_8" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link to={`/${language}/qr`}>
                  <p>
                    <TranslationContainer translationKey="menu_15" />
                  </p>
                </Link>
              </div>

              <div className="item">
                <Link to={`/${language}/register_as_manufacturer`}>
                  <p>
                    <TranslationContainer translationKey="menu_9" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link to={`/${language}/help`}>
                  <p>
                    <TranslationContainer translationKey="menu_10" />
                  </p>
                </Link>
              </div>
              <div className="item">
                <Link to={`/${language}/contact`}>
                  <p>
                    <TranslationContainer translationKey="menu_11" />
                  </p>
                </Link>
              </div>
            </div>
            <div className="block-item menu item_links">
              <h3 className="mb-3 text-uppercase">
                <TranslationContainer translationKey="look_online" />
              </h3>
              <div className="d-flex">
                <div className="soc">
                  <img
                    src={`../assets/images/footer/fa-brands_pinterest-p.svg`}
                  />
                </div>
                <div className="soc">
                  <img
                    src={`../assets/images/footer/fa-brands_twitter.svg`}
                  />
                </div>
                <div className="soc">
                  <img
                    src={`../assets/images/footer/fa-brands_linkedin-in.svg`}
                  />
                </div>
                <div className="soc">
                  <img
                    src={`../assets/images/footer/fa-brands_facebook-f.svg`}
                  />
                </div>
                <div className="soc">
                  <img
                    src={`../assets/images/footer/inst.svg`}
                  />
                </div>
              </div>

              {!userAgent && (
                <div className="Download-App">
                  <h3 className="mb-3 text-uppercase mt-5">
                    <TranslationContainer translationKey="download_app" />
                  </h3>
                  <div className="Download-App__Row">
                    <div className="Download-App__Row-Item">
                      <a
                        href="https://apps.apple.com/us/app/chipper/id1538769004"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="Item-Content">
                          <img
                            src={`../assets/images/footer/cib_apple.svg`}
                          />
                          <div>
                            <div className="Title">
                              <TranslationContainer translationKey="download_on" />
                            </div>
                            <div className="Desc">App Store</div>
                          </div>
                        </div>
                        <img
                          src={`../assets/images/qr/foot-app-qr.svg`}
                          className="Qr-Foot"
                        />
                      </a>
                    </div>

                    <div className="Download-App__Row-Item">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.chipper"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="Item-Content">
                          <img
                            src={`../assets/images/footer/logos_google-play-icon.svg`}
                          />
                          <div>
                            <div className="Title">
                              <TranslationContainer translationKey="download_on" />
                            </div>
                            <div className="Desc">Google Play</div>
                          </div>
                          {/* <img src={`../assets/images/qr/foot-google-qr.svg`} className="Qr-Foot"/> */}
                        </div>
                        <img
                          src={`../assets/images/qr/foot-google-qr.svg`}
                          className="Qr-Foot"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid footer-2">
          <div className="container row-fluid py-3 justify-content-between">
            <div className="menu">
              <p>
                <TranslationContainer translationKey="rights_reserved" />
              </p>
            </div>
            <div className="menu">
              <Link to={`/${language}/privacy`}>
                <p>
                  <TranslationContainer translationKey="privacy_policy" />
                </p>
              </Link>
              <Link to={`/${language}/terms_of_use`}>
                <p className="terms">
                  <TranslationContainer translationKey="terms" />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
  couponsFooter: state.couponReducer.couponsFooter,
  isLogged: state.auth.isLoggedIn,
  coupons: state.couponReducer.coupons,
  status: state.applicationsReducer.status,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCouponsFooter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
