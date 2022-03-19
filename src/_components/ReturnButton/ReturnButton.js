import React from 'react';

import TranslationContainer from '../TranslationContainer';

import './ReturnButton.scss';
import { useHistory } from 'react-router-dom';

function ReturnButton({}) {
  const history = useHistory();

  // const backHistory = () => {
  //    history.goBack()
  // };

  return (
    <div className="ReturnButton">
      <img src={`../assets/images/arrow-left.svg`} />

      <a className="text-primary" onClick={() => backHistory()}>
        <TranslationContainer translationKey="prev_page" />
      </a>
    </div>
  );
}
export default ReturnButton;
