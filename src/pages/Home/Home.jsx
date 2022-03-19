import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { userService } from '../../_services/user.service';
import CouponCard from '../../_components/CouponCard/CouponCard';
import ContainerCoupons from '../../_components/ContainerCoupons';
import TranslationContainer from '../../_components/TranslationContainer';
import {
  getApplicationStatus,
  getCategories,
  addToFavourite,
  getCoupons,
  toggleQuickViewHide,
  getFavoriteCoupons,
  getCouponsFooter,
  closeQuickViewModal,
} from '../../_actions';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import './Home.scss';

class Home extends PureComponent {
  state = {
    sorted: JSON.parse(sessionStorage.getItem('sorted') || '[]'),
    upBanner: null,
    bottomBanner: null,
  };

  componentDidMount() {
    const { getCategories, getCouponsFooter, history } = this.props;

    getCategories();
    getCouponsFooter();
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

    try {
      this.dataUserServices();
    } catch (e) {
      console.log('error getting content', e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, status } = this.props;

    if (
      JSON.stringify(prevState.sorted) !== JSON.stringify(this.state.sorted)
    ) {
      sessionStorage.setItem('sorted', JSON.stringify(this.state.sorted));
    }

    if (status === 'mobile' && !!user?._id) {
      window.ReactNativeWebView.postMessage('hasGeolocationPermission');
    }
  }

  dataUserServices = async () => {
    const upBanner = await userService.upBanner();
    const bottomBanner = await userService.bottomBanner();

    this.setState({ upBanner, bottomBanner });
  };

  handleCoupons = ({ page } = {}) => {
    const { user } = this.props;
    const userToken = user.remember_token;
    const args = { page, userToken };
    if (this.state.sorted.length > 0) {
      args.categoryId = this.state.sorted;
    }
    this.props.getCoupons(args);
  };

  handleCategorySelect = (id, exist) => {
    if (exist) {
      this.setState(
        (prevState) => ({
          sorted: prevState.sorted.filter(
            (categoryBlock) => id !== categoryBlock,
          ),
        }),
        () => this.handleCoupons(),
      );
    }

    this.setState(
      (prevState) => ({ sorted: [...prevState.sorted, id] }),
      () => this.handleCoupons(),
    );
  };

  render() {
    const {
      coupons,
      loadingHotCoupons,
      extraCoupons,
      categories,
      language,
    } = this.props;

    const { sorted, upBanner, bottomBanner } = this.state;

    const isHebrew = language === 'he';

    const showSliderSettings = window.innerWidth > 1440
      ? 8
      : window.innerWidth > 1024
        ? 6
        : window.innerWidth > 480
          ? 4
          : 3;
    const settingsSlider = {
      arrows: false,
      dots: true,
      centerPadding: '0',
      autoplay: true,
      autoplaySpeed: 4000,
      swipeToSlide: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: true,
      initialSlide: 0,
    };

    const settingsSliderCategories = {
      dots: true,
      infinite: false,
      initialSlide: isHebrew ? window.innerWidth > 480 ? showSliderSettings - 1 : 0 : 0,
      rtl: isHebrew,
      responsive: [
        {
          breakpoint: 4000,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
          },
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 479,
          settings: {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };

    return (
      <main className="Home">
        <div className="Home-ExtraCoupon">
          <div className="Home-ExtraCoupon__Row">
            <div className="Home-ExtraCoupon__Row-Title ruTitle">
              <h2>
                {' '}
                <TranslationContainer translationKey="spec_deals" />
                {' '}
              </h2>
            </div>
            <div className="Home-ExtraCoupon__Row-SpecialDeals">
              {extraCoupons
                && extraCoupons.map((coupon) => (
                  <CouponCard
                    key={coupon._id}
                    coupon={coupon}
                    extra
                    inSlider
                    specialCoupon
                  />
                ))}
            </div>
          </div>
        </div>
        <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
        {upBanner && (
          <div className="Home-BannerSlider">
            <Slider {...settingsSlider}>
              {upBanner.map(
                (slide, index) => slide.URL !== null && (
                  <div key={slide.URL + index}>
                    <img
                      className="wid-100 Banner-Slide"
                      src={process.env.REACT_APP_DOMAIN_URL + slide.URL}
                      alt="upBanner"
                    />
                  </div>
                ),
              )}
            </Slider>
          </div>
        )}

        <div className="Home-Top_Categories">
          <div className="Home-Top_Categories__Row">
            <div className="Home-Top_Categories__Row-Info">
              <div className="Title">
                <TranslationContainer translationKey="top_categories" />
              </div>
              <div className="ViewAll">
                <Link to={`/${language}/categories`}>
                  <TranslationContainer translationKey="view_all_cat" />
                </Link>
              </div>
            </div>

            <div className="categories categories-suitable Home-Top_Categories__Row-Category mb-6">
              <div className="categories_block List">
                <div className="categories_block_nowrap List-Category sliderCat">
                  {categories && (
                    <Slider
                      {...settingsSliderCategories}
                      ref={(slider) => { this.slider = slider; }}
                    >
                      {categories.map((category, key) => {
                        const exist = sorted.length > 0
                          && sorted.some(
                            (categoryBlock) => category._id === categoryBlock,
                          );

                        return (
                          <div
                            key={key}
                            className="category-item Categories-Item"
                            onClick={() => { this.handleCategorySelect(category._id, exist); }}
                            role="button"
                          >
                            <div
                              className={
                                `category${
                                  exist ? ' checked' : ' no_checked'}`
                              }
                            >
                              <div>
                                <img
                                  src={`${process.env.REACT_APP_URL_IMG}${category.imgPath}`}
                                  alt="categories-item"
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
                    </Slider>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {coupons?.data && (
          <ContainerCoupons
            coupons={coupons}
            isLoading={loadingHotCoupons}
            handleCoupons={this.handleCoupons}
          />
        )}

        {bottomBanner && (
          <div className="Home-BannerSlider">
            <Slider {...settingsSlider}>
              {bottomBanner.map(
                (slide, index) => slide.URL !== null && (
                <div key={slide.URL + index}>
                  <img
                    alt="Banner-Slide"
                    className="wid-100 Banner-Slide"
                    src={process.env.REACT_APP_DOMAIN_URL + slide.URL}
                  />
                </div>
                ),
              )}
            </Slider>
          </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = ({
  mainReducer, couponReducer, branchReducer, auth, applicationsReducer,
}) => ({
  language: mainReducer.locale,
  loadingHotCoupons: couponReducer.loadingHotCoupons,
  coupons: couponReducer.coupons,
  isLogged: auth.isLoggedIn,
  user: auth.user,
  extraCoupons: couponReducer.extraCoupons,
  categories: branchReducer.categories,
  selected: couponReducer.selected,
  status: applicationsReducer.status,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getApplicationStatus,
    getCoupons,
    getCategories,
    getFavoriteCoupons,
    addToFavourite,
    toggleQuickViewHide,
    getCouponsFooter,
    closeQuickViewModal,
  },
  dispatch,
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
