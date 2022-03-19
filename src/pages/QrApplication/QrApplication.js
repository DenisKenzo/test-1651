import React from 'react';
import './QrApplication.scss';
import TranslationContainer from '../../_components/TranslationContainer';

function QrApplication() {
  return (
    <main className="QrApplication">
      <div className="QrApplication-Row">
        <div className="QrApplication-Row__QR">
          <div className="Title"><TranslationContainer translationKey="qr_app_title" /></div>
          <div className="Desc"><TranslationContainer translationKey="qr_app_desc" /></div>

          <div className="QrApplication-Row__QR-List">
            <div className="QR-Item">
              <img src={`../assets/images/qr/app-qr.svg`} />

              <a href="https://apps.apple.com/us/app/chipper/id1538769004" target="_blank" className="QR-Item__Link" rel="noreferrer">
                <div className="QR-Item__Link-Item App-Item">
                  <img src={`../assets/images/footer/cib_apple.svg`} />
                  <div>
                    <div className="Download"><TranslationContainer translationKey="download_on" /></div>
                    <div className="Name">App Store</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="QR-Item">
              <img src={`../assets/images/qr/google-qr.svg`} />
              <a href="https://play.google.com/store/apps/details?id=com.chipper" target="_blank" className="QR-Item__Link" rel="noreferrer">
                <div className="QR-Item__Link-Item">
                  <img src={`../assets/images/footer/logos_google-play-icon.svg`} />
                  <div>
                    <div className="Download"><TranslationContainer translationKey="download_on" /></div>
                    <div className="Name">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="QrApplication-Row__App">
          <img src={`../assets/images/qr/main-bg.png`} />
        </div>

      </div>
    </main>
  );
}

export default QrApplication;
