import React from 'react';
import TranslationContainer from '../TranslationContainer';

function SuccessBlock({ successFunction }) {
  return (
    <div className="block_registered">
      <div className="d-flex justify-content-center mb-6">
        <img
          className="img-success"
          src={`../assets/images/success.svg`}
        />
      </div>
      <h2 className="text-uppercase text-center ">
        <TranslationContainer translationKey="thanks" />
      </h2>
      <div className="mt-2 ml-3 mr-3 text-center">
        <p>
          <TranslationContainer translationKey="sent_success" />
        </p>
      </div>
      <div className="mt-2 ml-3 mr-3 text-center">
        <p>
          <TranslationContainer translationKey="contact_soon" />
        </p>
      </div>
      <div className="mt-4 ml-3 mr-3 d-flex justify-content-center ">
        <button
          type="submit"
          className="btn btn-primary btn-lg wid-50"
          onClick={() => successFunction()}
        >
          <TranslationContainer translationKey="ok" />
        </button>
      </div>
    </div>
  );
}

export default SuccessBlock;
