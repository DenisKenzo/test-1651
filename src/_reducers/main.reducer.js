import { SET_LANGUAGE, SET_GOOGLE_MAP_LOADED } from '../_constants';

const INITIAL_STATE = {
  locale: window.location.pathname.split('/')[1]
    ? window.location.pathname.split('/')[1]
    : 'he',
  googleMapScriptLoaded: false,
};

export default function mainReducer(state = INITIAL_STATE, action) {
  if (window.location.hash) {
    // https://oauth2.googleapis.com/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NDZiMTM3NzM3Yjk3MzczOGU1Mjg2YzIwOGI2NmU3YTM5ZWU3YzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzc2ODI5MjQzNTg3LWE4dmRmYWRwaGdiY25vdWFhYXE4MWtxZ2dncWhibDRmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzc2ODI5MjQzNTg3LWE4dmRmYWRwaGdiY25vdWFhYXE4MWtxZ2dncWhibDRmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNjU0NzkyNTcyNzI1MzEyODczIiwiZW1haWwiOiJzYXNoYXUwODdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlhdCI6MTYwNTI1OTY4MCwiZXhwIjoxNjA1MjYzMjgwLCJqdGkiOiI4ZWVmNTY1M2MwOGVkOGJjOWMyNGNlNDQ1ZjQyMDA0ZGMyZTQ1YWM1In0.Ps8dd2AXrMA2JI2a1zBOgvMgSpXqeq5bxqu9dfLg5k7HtOYfYnHvvYbztnUB8hWx3DOhGbzUYcKiSGp8PiohNE2QswUrRuiqBzPN53E_sZ5uy-jJdJ65kDqRwGZcCOemutQKtyqzbVA2ZS51ojK5dvWYxtdIjvIFKaqe-9ChrrhTCJSANCS8wavEROH32K_CXL5oj7wJfowfrSDHGL6SrqxdxFxkiJqBd5yxiuZE8S0rUTEcGmsHwJq6WTTRM8cmF-fb_r2S3a3Lf2ZUpc5mywQbSG6jn2Gs0wo8qu7RHff6Pe8137rYRZY24gdkFDVp_n6OCAFc5EcA7LDQxdjFxQ
    window.history.pushState(
      'data',
      'Title',
      `/${state.locale}/${window.location.hash}`,
    );
  } else if (!window.location.pathname.split('/')[1]) {
    window.history.pushState('data', 'Title', `/${state.locale}/`);
  }

  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, locale: action.locale };
    case SET_GOOGLE_MAP_LOADED:
      return { ...state, googleMapScriptLoaded: action.loaded };
    default:
      return state;
  }
}
