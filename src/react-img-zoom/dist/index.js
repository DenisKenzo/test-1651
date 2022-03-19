function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex.default : ex;
}

const React = require('react');

const React__default = _interopDefault(React);
const PropTypes = _interopDefault(require('prop-types'));

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  const { insertAt } = ref;

  if (!css || typeof document === 'undefined') {
    return;
  }

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

const css = '._zoomImg_1094d_1 {\n  will-change: transform;\n}\n';
styleInject(css);

const classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
};

const createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}());

const _extends = Object.assign
  || function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

const inherits = function (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      `Super expression must either be null or a function, not ${
        typeof superClass}`,
    );
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
  }
};

const possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
};

/* eslint jsx-a11y/mouse-events-have-key-events: 0 */

const Zoom = (function (_Component) {
  inherits(Zoom, _Component);

  function Zoom(props) {
    classCallCheck(this, Zoom);

    const _this = possibleConstructorReturn(
      this,
      (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this, props),
    );

    _this.state = {
      zoom: false,
      mouseX: null,
      mouseY: null,
    };

    const { height } = props;
    const { img } = props;
    const { transitionTime } = props;
    const { width } = props;

    _this.outerDivStyle = {
      height: `${height}px`,
      width: `${width}px`,
      overflow: 'hidden',
    };

    _this.innerDivStyle = {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // cursor: 'zoom-in',
      backgroundSize: 'contain',
      transition: `transform ${transitionTime}s ease-out`,
      backgroundImage: `url('${img}')`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: `${100}%`,
      height: `${100}%`,
      // margin: '56' + 'px',
    };

    _this.imageRef = React.createRef();

    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    _this.handleMouseOut = _this.handleMouseOut.bind(_this);
    _this.handleMouseMovement = _this.handleMouseMovement.bind(_this);
    return _this;
  }

  createClass(Zoom, [
    {
      key: 'handleMouseOver',
      value: function handleMouseOver() {
        this.setState({
          zoom: true,
        });
      },
    },
    {
      key: 'handleMouseOut',
      value: function handleMouseOut() {
        this.setState({
          zoom: false,
        });
      },
    },
    {
      key: 'handleMouseMovement',
      value: function handleMouseMovement(e) {
        const _imageRef$current$get = this.imageRef.current.getBoundingClientRect();
        const offsetLeft = _imageRef$current$get.left;
        const offsetTop = _imageRef$current$get.top;

        const _imageRef$current$sty = this.imageRef.current.style;
        const { height } = _imageRef$current$sty;
        const { width } = _imageRef$current$sty;

        const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
        const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;

        this.setState({
          mouseX: x,
          mouseY: y,
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        const _state = this.state;
        const { mouseX } = _state;
        const { mouseY } = _state;
        const { zoom } = _state;
        const { zoomScale } = this.props;

        const transform = {
          transformOrigin: `${mouseX}% ${mouseY}%`,
        };

        return React__default.createElement(
          'div',
          {
            style: this.outerDivStyle,
            onMouseOver: this.handleMouseOver,
            onMouseOut: this.handleMouseOut,
            onMouseMove: this.handleMouseMovement,
            ref: this.imageRef,
          },
          React__default.createElement('div', {
            style: {
              ...transform, ...this.innerDivStyle, transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
              // backgroundSize: 'contain',
            },
            className: css.zoomImg,
          }),
        );
      },
    },
  ]);
  return Zoom;
}(React.Component));

Zoom.propTypes = {
  /** The path to the image. It can be a url. */
  img: PropTypes.string.isRequired,
  /** The zoom scale. */
  zoomScale: PropTypes.number.isRequired,
  /** The height of the image in pixels */
  height: PropTypes.number.isRequired,
  /** The width of the image in pixels */
  width: PropTypes.number.isRequired,
  /** The time (in seconds) that will take to scale your image. */
  transitionTime: PropTypes.number,
};

Zoom.defaultProps = {
  transitionTime: 0.1,
};

module.exports = Zoom;
