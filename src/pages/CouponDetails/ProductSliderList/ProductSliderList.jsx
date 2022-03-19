import ReactTooltip from 'react-tooltip';
import React from 'react';
import Slider from 'react-slick';

import TranslationContainer from '../../../_components/TranslationContainer';

import './ProductSliderList.scss';

function ProductSliderList({ coupon, isHerb }) {
  const formattInitSlide = () => {
    if (isHerb) {
      if (window.innerWidth > 476 && window.innerWidth < 1279) {
        return 1;
      }

      if (window.innerWidth > 1279 && window.innerWidth < 1900) {
        return 2;
      }

      if (window.innerWidth > 1900) {
        return 3;
      }

      return 0;
    }

    return 0;
  };

  const sliderSettings = {
    slidesToShow: 4,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: formattInitSlide(),
    rtl: isHerb,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 428,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      {coupon?.products.length > 0 && (
        <div className="Products">
          <Slider
            {...sliderSettings}
            className={`slider-products ${isHerb && 'he-lang'}`}
            key="slider-products"
          >
            {coupon?.products.map((product, index) => (
              <div data-for={`tooltip-id${product._id}`} data-tip className="mt-5 prodWrap" key={index}>
                <div className="product-block d-flex">
                  {product.img.length ? (
                    <div
                      style={{
                        backgroundImage:
                            `url('${
                              process.env.REACT_APP_URL_IMG
                            }/${
                              product.img[0].URL
                            }')`,
                        width: '88px',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundImage:
                            'url('
                            + `../assets/images/no-coupon.svg`
                            + ')',
                        width: '50px',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}
                  <div className="product-text">
                    <div className="width-prodname">
                      <ReactTooltip
                        id={`tooltip-id${product._id}`}
                        place="top"
                        type="dark"
                        effect="solid"
                        className="tooltip-element-custom"
                      >
                        <p className="tooltip-text">
                          {product.name}
                        </p>
                      </ReactTooltip>
                      <p className="product-prodname p-large font-weight-bold">
                        {product.name}
                      </p>
                    </div>
                    <div className="text-primary font-weight-bold">
                      <p className="text-number">
                        <TranslationContainer translationKey="sku" />
                      </p>
                      <p className="font-weight-bold">
                          &nbsp;
                        {product.productNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}

export default ProductSliderList;
