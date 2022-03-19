import React from 'react';
import connect from 'react-redux/es/connect/connect';


class ShareBlock extends React.Component {
  render() {
    const { couponNumber, language } = this.props;

    // const linkShare = `https://www.chipper.co.il/${language}/coupon/${couponNumber}`
    // const app_id = '141058034360776';
    // const link = `https://www.facebook.com/dialog/share?app_id=${app_id}&display=popup&href=${linkShare}&redirect_uri=${linkShare}`

    return (
      <div className="modal_share ShareBlock">
        <div className="ShareBlock__List">
          <a
            href={
              `https://www.facebook.com/sharer/sharer.php?u=${
                process.env.REACT_APP_DOMAIN_URL
              }/social-share/${
                language
              }?coupon=${
                couponNumber}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <img src={`../assets/images/social/face.svg`} />
          </a>
          <a
            href={
              `https://api.whatsapp.com/send?text=${
                process.env.REACT_APP_DOMAIN_URL
              }/social-share/${
                language
              }?coupon=${
                couponNumber}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`../assets/images/social/whatsu.svg`}
            />
          </a>
          <a
            href={
              `https://telegram.me/share/url?url=${
                process.env.REACT_APP_DOMAIN_URL
              }/social-share/${
                language
              }?coupon=${
                couponNumber}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`../assets/images/social/telegram.svg`}
            />
          </a>
        </div>

        {/* <div className="mt-6 col-12 mb-7"> */}
        {/*    <form className="wid-100 form "> */}
        {/*        <div className="copy-block position-relative"> */}
        {/*            <input type="text" value={process.env.REACT_APP_DOMAIN_URL+"/social-share?coupon="+couponNumber} className="wid-100 share dir-ltr"/> */}
        {/*            <button className="btn btn-primary text-uppercase">copy</button> */}
        {/*            <span/> */}
        {/*        </div> */}

        {/*    </form> */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(ShareBlock);
