import React, { useState } from 'react';
import Slider from 'react-slick';
import connect from 'react-redux/es/connect/connect';

import Zoom from 'react-img-zoom';
import { useWindowWidth } from '../../_hook/userWindowWidth.hook';
import './GalleryCarousel.scss';

function GalleryCarousel({
  wishlistIcon,
  className,
  images = [],
  quickModalSliver,
}) {
  const [selectedImage, setSelectedImage] = useState();

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: true,
    vertical: false,
    initialSlide: false,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          arrows: false,
          slidesToShow: images.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const settingsThumb = {
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: true,
    vertical: !quickModalSliver,
    infinite: images.length > 3,
    initialSlide: 0,
  };

  const moreq14 = window.innerWidth > 1280;
  const less14 = window.innerWidth < 1280;

  const thumbsHiding = useWindowWidth(1180);
  const getImagePath = (img) => process.env.REACT_APP_URL_IMG + img;

  console.log(selectedImage, 'selectedImage');

  const gallerySettings = images?.map((img, index) => {
    const imagePath = getImagePath(img);
    const selectedImagePath = getImagePath(selectedImage);

    return (
      <div className="Slide-Main" key={index}>
        <div
          className={
            className || ` slide d-flex justify-content-center ${
              settingsThumb && 'slide-sm'
            }`
          }
          key={`${index}_slide`}
        >
          {less14 || quickModalSliver ? (
            <img src={imagePath} alt="coupon" />
          ) : (
            <div className="zoomSlide test">
              <Zoom
                img={selectedImage ? selectedImagePath : imagePath}
                zoomScale={2.4}
                width={moreq14 ? 428 : 304}
                height={moreq14 ? 428 : 304}
                transitionTime={0.5}
                key={selectedImage ? selectedImagePath : imagePath}
              />
            </div>
          )}
        </div>
        {wishlistIcon}
      </div>
    );
  });

  return (
    <div
      className={`GalleryCarousel ${
        quickModalSliver && 'GalleryCarousel-Vertical'
      }`}
    >
      <Slider {...settings} className="GalleryCarousel-Main">
        {images.length ? (
          gallerySettings
        ) : (
          <div className="No-Image">
            <div
              className={
                  className || ` slide d-flex justify-content-center ${
                    settingsThumb && 'slide-sm'
                  }`
                }
            >
              <img
                src={`../assets/images/no-coupon.svg`}
                alt="No-coupon"
              />
            </div>

            {wishlistIcon}
          </div>
        )}
      </Slider>

      {thumbsHiding && images?.length > 1 && (
        <Slider
          {...settingsThumb}
          className={`GalleryCarousel-Thumbs  ${images.length <= 1 && 'wid-0'}`}
        >
          {images?.length ? (
            images.map((img, index) => {
              const imagePath = getImagePath(img);

              return (
                <div onClick={() => setSelectedImage(img)} className="Slide-Main" key={index}>
                  <div
                    className={` slide ${settingsThumb && 'slide-sm'}`}
                    key={`${index}_slide`}
                  >
                    <img src={`${imagePath}`} alt="coupon" />
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div className="slide-sm">
                <img
                  src={`../assets/images/no-coupon.svg`}
                  alt="No-coupon"
                />
              </div>
            </div>
          )}
        </Slider>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(GalleryCarousel);
