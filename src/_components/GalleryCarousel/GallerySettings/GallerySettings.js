import React from 'react';


function GallerySettings({ images, wishlistIcon }) {
  return (
    <>
      {images.map((img, key) => {
        let imagePath = '';
        if (img) {
          imagePath = process.env.REACT_APP_URL_IMG + img;
        } else {
          imagePath = `../assets/images/no-coupon.svg`;
        }
        return (
          <div>
            <div className="slide" key={`${key}_slide`}>
              <img src={`${imagePath}`} alt="coupon" />
            </div>
            {wishlistIcon}
          </div>
        );
      })}
    </>
  );
}

export default GallerySettings;
