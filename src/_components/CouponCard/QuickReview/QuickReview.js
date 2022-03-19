import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import quicReviewSvg from '../../../assets/images/quickReview.svg'

import './QuickReview.scss';
import ReactTooltip from 'react-tooltip';
import AgeModal from '../../../_modals/AgeModal';
import TranslationContainer from '../../TranslationContainer';

function QuickReview({ toggleQuickView, coupon, language }) {
  return (
    <>
      <ReactTooltip
        id={`tooltip-id${coupon._id}`}
        place={language === 'he' ? 'right' : 'left'}
        type="dark"
        effect="solid"
        className="tooltip-element-custom"
      >
        <p style={{ color: 'white' }}>
          <TranslationContainer translationKey="quick_view" />
        </p>
      </ReactTooltip>

      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (coupon.alcoholAndTobaco[0].value !== 0) {
            AgeModal.confirm({
              coupon,
              language,
              onOk: toggleQuickView,
            });
          } else {
            toggleQuickView();
          }
        }}
        className="QuickReview"
        data-tip
        data-for={`tooltip-id${coupon._id}`}
      >
        <img src={quicReviewSvg} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  quickView: state.modalReducer.quickView,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuickReview);
