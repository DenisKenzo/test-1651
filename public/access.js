!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports['./dist'] = t())
    : (e['./dist'] = t())
})(window, function (e) {
  return (function (e) {
    var t = {}
    function i(n) {
      if (t[n]) return t[n].exports
      var s = (t[n] = { i: n, l: !1, exports: {} })
      return e[n].call(s.exports, s, s.exports, i), (s.l = !0), s.exports
    }
    return (
      (i.m = e),
      (i.c = t),
      (i.d = function (e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
      }),
      (i.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (i.t = function (e, t) {
        if ((1 & t && (e = i(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        var n = Object.create(null)
        if (
          (i.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var s in e)
            i.d(
              n,
              s,
              function (t) {
                return e[t]
              }.bind(null, s),
            )
        return n
      }),
      (i.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return i.d(t, 'a', t), t
      }),
      (i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (i.p = ''),
      i((i.s = 0))
    )
  })([
    function (e, t, i) {
      'use strict'
      i.r(t)
      let n = document.body || document.getElementsByTagName('body')[0],
        s = new Map(),
        o = {
          jsonToHtml: (e, t) => {
            let i = document.createElement(e.type)
            for (let n in e.attrs)
              0 === n.indexOf('#') && t
                ? i.setAttribute(e.attrs[n], t[n.substring(1)])
                : i.setAttribute(n, e.attrs[n])
            for (let n in e.children) {
              let s = null
              ;(((s =
                '#text' == e.children[n].type
                  ? 0 == e.children[n].text.indexOf('#')
                    ? document.createTextNode(
                        t[e.children[n].text.substring(1)],
                      )
                    : document.createTextNode(e.children[n].text)
                  : o.jsonToHtml(e.children[n], t)) &&
                s.tagName &&
                'undefined' !== s.tagName.toLowerCase()) ||
                3 == s.nodeType) &&
                i.appendChild(s)
            }
            return i
          },
          injectStyle: (e, t = {}) => {
            let i = document.createElement('style')
            return (
              i.appendChild(document.createTextNode(e)),
              t.className && i.classList.add(t.className),
              n.appendChild(i),
              i
            )
          },
          getFormattedDim: (e) => {
            if (!e) return null
            let t = function (e, t) {
              return { size: e.substring(0, e.indexOf(t)), sufix: t }
            }
            return (e = String(e)).indexOf('%') > -1
              ? t(e, '%')
              : e.indexOf('px') > -1
              ? t(e, 'px')
              : e.indexOf('em') > -1
              ? t(e, 'em')
              : e.indexOf('rem') > -1
              ? t(e, 'rem')
              : e.indexOf('pt') > -1
              ? t(e, 'pt')
              : 'auto' == e
              ? t(e, '')
              : void 0
          },
          extend: (e, t) => {
            for (let i in e)
              'object' == typeof e[i]
                ? t && t[i] && (e[i] = o.extend(e[i], t[i]))
                : 'object' == typeof t && void 0 !== t[i] && (e[i] = t[i])
            return e
          },
          injectIconsCss() {
            let e = document.getElementsByTagName('head')[0],
              t = document.createElement('link')
            ;(t.type = 'text/css'),
              (t.rel = 'stylesheet'),
              (t.href =
                'https://fonts.googleapis.com/icon?family=Material+Icons'),
              (t.className = '_adafirst-material-icons'),
              o.deployedObjects.set('.' + t.className, !0),
              e.appendChild(t)
          },
          warn(e) {
            console.warn
              ? console.warn('Accessibility: ' + e)
              : console.log('Accessibility: ' + e)
          },
          deployedObjects: {
            get: (e) => s.get(e),
            contains: (e) => s.has(e),
            set: (e, t) => {
              s.set(e, t)
            },
            remove: (e) => {
              s.delete(e)
            },
            getAll: () => s,
          },
        }
      var a = o,
        l = {
          has: (e) => window.localStorage.hasOwnProperty(e),
          set(e, t) {
            window.localStorage.setItem(e, JSON.stringify(t))
          },
          get(e) {
            let t = window.localStorage.getItem(e)
            try {
              return JSON.parse(t)
            } catch (e) {
              return t
            }
          },
          clear() {
            window.localStorage.clear()
          },
          remove(e) {
            window.localStorage.removeItem(e)
          },
          isSupported() {
            try {
              return (
                localStorage.setItem('_test', '_test'),
                localStorage.removeItem('_test'),
                !0
              )
            } catch (e) {
              return !1
            }
          },
        }
      a.injectIconsCss()
      let c = {
          icon: {
            position: {
              bottom: { size: 50, units: 'px' },
              right: { size: 0, units: 'px' },
              type: 'fixed',
            },
            dimensions: {
              width: { size: 50, units: 'px' },
              height: { size: 50, units: 'px' },
            },
            cornerRadius: {
              topLeft: { size: 5, units: 'px' },
              topRight: { size: 0, units: 'px' },
              bottomLeft: { size: 5, units: 'px' },
              bottomRight: { size: 0, units: 'px' },
            },
            boxShadow: {
              horizontalOffset: { size: 1, units: 'px' },
              verticalOffset: { size: 1, units: 'px' },
              blur: { size: 3, units: 'px' },
              spread: { size: 0, units: 'px' },
              color: { red: 0, green: 0, blue: 0, alpha: 0.7 },
            },
            zIndex: '9999',
            backgroundColor: '#1c3de3',
            color: '#fff',
            img: 'accessible',
            circular: !1,
          },
          hotkeys: {
            enabled: !0,
            helpTitles: !0,
            keys: {
              toggleMenu: ['ctrlKey', 'altKey', 65],
              invertColors: ['ctrlKey', 'altKey', 73],
              grayHues: ['ctrlKey', 'altKey', 71],
              underlineLinks: ['ctrlKey', 'altKey', 85],
              bigCursor: ['ctrlKey', 'altKey', 67],
              readingGuide: ['ctrlKey', 'altKey', 82],
              textToSpeech: ['ctrlKey', 'altKey', 84],
              speechToText: ['ctrlKey', 'altKey', 83],
            },
          },
          buttons: { font: { size: 18, units: 'px' } },
          guide: { cBorder: '#20ff69', cBackground: '#000000', height: '12px' },
          menu: {
            dimensions: {
              width: { size: 25, units: 'vw' },
              height: { size: 'auto', units: '' },
            },
            fontFamily: 'sans-serif',
          },
          labels: {
            resetTitle: 'Reset',
            closeTitle: 'Close',
            menuTitle: 'Accessibility',
            increaseText: 'increase text size',
            decreaseText: 'decrease text size',
            increaseTextSpacing: 'increase text spacing',
            decreaseTextSpacing: 'decrease text spacing',
            invertColors: 'invert colors',
            grayHues: 'gray hues',
            bigCursor: 'big cursor',
            readingGuide: 'reading guide',
            underlineLinks: 'underline links',
            textToSpeech: 'text to speech',
            speechToText: 'speech to text',
          },
          textToSpeechLang: 'en-US',
          speechToTextLang: 'en-US',
          textPixelMode: !1,
          animations: { buttons: !0 },
          modules: {
            increaseText: !0,
            decreaseText: !0,
            increaseTextSpacing: !0,
            decreaseTextSpacing: !0,
            invertColors: !0,
            grayHues: !0,
            bigCursor: !0,
            readingGuide: !0,
            underlineLinks: !0,
            textToSpeech: !0,
            speechToText: !0,
          },
          session: { persistent: !0 },
        },
        r = {
          icon: {
            position: {
              bottom: { size: 50, units: 'px' },
              right: { size: 0, units: 'px' },
              type: 'fixed',
            },
            dimensions: {
              width: { size: 50, units: 'px' },
              height: { size: 50, units: 'px' },
            },
            cornerRadius: {
              topLeft: { size: 5, units: 'px' },
              topRight: { size: 0, units: 'px' },
              bottomLeft: { size: 5, units: 'px' },
              bottomRight: { size: 0, units: 'px' },
            },
            boxShadow: {
              horizontalOffset: { size: 1, units: 'px' },
              verticalOffset: { size: 1, units: 'px' },
              blur: { size: 3, units: 'px' },
              spread: { size: 0, units: 'px' },
              color: { red: 0, green: 0, blue: 0, alpha: 0.7 },
            },
            zIndex: '9999',
            backgroundColor: '#1c3de3',
            color: '#fff',
            img: 'accessible',
            circular: !1,
          },
          hotkeys: {
            enabled: !0,
            helpTitles: !0,
            keys: {
              toggleMenu: ['ctrlKey', 'altKey', 65],
              invertColors: ['ctrlKey', 'altKey', 73],
              grayHues: ['ctrlKey', 'altKey', 71],
              underlineLinks: ['ctrlKey', 'altKey', 85],
              bigCursor: ['ctrlKey', 'altKey', 67],
              readingGuide: ['ctrlKey', 'altKey', 82],
              textToSpeech: ['ctrlKey', 'altKey', 84],
              speechToText: ['ctrlKey', 'altKey', 83],
            },
          },
          buttons: { font: { size: 18, units: 'px' } },
          guide: { cBorder: '#20ff69', cBackground: '#000000', height: '12px' },
          menu: {
            dimensions: {
              width: { size: 25, units: 'vw' },
              height: { size: 'auto', units: '' },
            },
            fontFamily: 'sans-serif',
          },
          labels: {
            resetTitle: 'Перезагрузить',
            closeTitle: 'Закрыть',
            menuTitle: 'Доступность',
            increaseText: 'Увеличить текст',
            decreaseText: 'Мелкий текст',
            invertColors: 'Высокий контраст',
            grayHues: 'Оттенки серого',
            bigCursor: 'Большой маркер',
            readingGuide: 'Руководство по чтению',
            underlineLinks: 'Выделение ссылок',
            textToSpeech: 'Текст в речь',
            speechToText: 'Речь в текст',
          },
          textToSpeechLang: 'en-US',
          speechToTextLang: 'en-US',
          textPixelMode: !1,
          animations: { buttons: !0 },
          modules: {
            increaseText: !0,
            decreaseText: !0,
            increaseTextSpacing: !0,
            decreaseTextSpacing: !0,
            invertColors: !0,
            grayHues: !0,
            bigCursor: !0,
            readingGuide: !0,
            underlineLinks: !0,
            textToSpeech: !0,
            speechToText: !0,
          },
          session: { persistent: !0 },
        },
        d = {
          icon: {
            position: {
              bottom: { size: 50, units: 'px' },
              right: { size: 0, units: 'px' },
              type: 'fixed',
            },
            dimensions: {
              width: { size: 50, units: 'px' },
              height: { size: 50, units: 'px' },
            },
            cornerRadius: {
              topLeft: { size: 0, units: 'px' },
              topRight: { size: 5, units: 'px' },
              bottomLeft: { size: 0, units: 'px' },
              bottomRight: { size: 5, units: 'px' },
            },
            boxShadow: {
              horizontalOffset: { size: 1, units: 'px' },
              verticalOffset: { size: 1, units: 'px' },
              blur: { size: 3, units: 'px' },
              spread: { size: 0, units: 'px' },
              color: { red: 0, green: 0, blue: 0, alpha: 0.7 },
            },
            zIndex: '9999',
            backgroundColor: '#1c3de3',
            color: '#fff',
            img: 'accessible',
            circular: !1,
          },
          hotkeys: {
            enabled: !0,
            helpTitles: !0,
            keys: {
              toggleMenu: ['ctrlKey', 'altKey', 65],
              invertColors: ['ctrlKey', 'altKey', 73],
              grayHues: ['ctrlKey', 'altKey', 71],
              underlineLinks: ['ctrlKey', 'altKey', 85],
              bigCursor: ['ctrlKey', 'altKey', 67],
              readingGuide: ['ctrlKey', 'altKey', 82],
              textToSpeech: ['ctrlKey', 'altKey', 84],
              speechToText: ['ctrlKey', 'altKey', 83],
            },
          },
          buttons: { font: { size: 18, units: 'px' } },
          guide: { cBorder: '#20ff69', cBackground: '#000000', height: '12px' },
          menu: {
            dimensions: {
              width: { size: 25, units: 'vw' },
              height: { size: 'auto', units: '' },
            },
            fontFamily: 'sans-serif',
          },
          labels: {
            resetTitle: 'איפוס נגישות',
            closeTitle: 'סגור',
            menuTitle: 'נגישות',
            increaseText: 'הגדל טקסט',
            decreaseText: 'הקטן טקסט',
            increaseTextSpacing: 'הגדלת ריווחי הטקסט ',
            decreaseTextSpacing: 'הקטנת ריווחי הטקסט',
            invertColors: 'ניגודיות גבוהה ',
            grayHues: 'גווני אפור',
            bigCursor: 'סמן גדול',
            readingGuide: 'ניווט מקלדת',
            underlineLinks: 'הדגשת קישורים',
            textToSpeech: 'טקסט לדיבור',
            speechToText: 'דיבור לטקסט',
          },
          textToSpeechLang: 'en-US',
          speechToTextLang: 'en-US',
          textPixelMode: !1,
          animations: { buttons: !0 },
          modules: {
            increaseText: !0,
            decreaseText: !0,
            increaseTextSpacing: !0,
            decreaseTextSpacing: !0,
            invertColors: !0,
            grayHues: !0,
            bigCursor: !0,
            readingGuide: !0,
            underlineLinks: !0,
            textToSpeech: !0,
            speechToText: !0,
          },
          session: { persistent: !0 },
        },
        u = null
      class h {
        constructor(e = {}, t) {
          const languages = {
            he: [d, 'rtl'],
            en: [c, 'ltr'],
            ru: [r, 'ltr'],
          }
          this.buildMenu(...languages[t], e)
        }

        buildMenu(buildConfig, languageDirection, e) {
          u = this
          e = this.deleteOppositesIfDefined(e)
          this.options = a.extend(buildConfig, e)
          this.disabledUnsupportedFeatures()
          this.sessionState = {
            textSize: 0,
            textSpace: 0,
            invertColors: !1,
            grayHues: !1,
            underlineLinks: !1,
            bigCursor: !1,
            readingGuide: !1,
          }
          this.build(languageDirection)
          this.options.session.persistent && this.setSessionFromCache()
        }

        deleteOppositesIfDefined(e) {
          return (
            e.icon &&
              e.icon.position &&
              (e.icon.position.left &&
                (delete r.icon.position.right,
                (r.icon.position.left = e.icon.position.left)),
              e.icon.position.top &&
                (delete r.icon.position.bottom,
                (r.icon.position.top = e.icon.position.top))),
            e
          )
        }
        disabledUnsupportedFeatures() {
          ;('webkitSpeechRecognition' in window &&
            'https:' == location.protocol) ||
            (a.warn(
              "speech to text isn't supported in this brouser or in http protocol (https required)",
            ),
            (this.options.modules.speechToText = !1)),
            (window.SpeechSynthesisUtterance && window.speechSynthesis) ||
              (a.warn("text to speech isn't supported in this brouser"),
              (this.options.modules.textToSpeech = !1)),
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1 &&
              (a.warn("grayHues isn't supported in firefox"),
              (this.options.modules.grayHues = !1))
        }
        injectCss(e) {
          let t =
            "\n        ._adafirst-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {\n            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n            background-color: #F5F5F5;\n        }\n        \n        ._adafirst-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {\n            width: 6px;\n            background-color: #F5F5F5;\n        }\n        \n        ._adafirst-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {\n            background-color: #999999;\n        }\n        ._adafirst-icon {\n            position: " +
            this.options.icon.position.type +
            ';\n            background-repeat: no-repeat;\n            background-size: contain;\n            cursor: pointer;\n            opacity: 0;\n            transition-duration: .5s;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            box-shadow: 1px 1px 5px rgba(0,0,0,.5);  \n    background-color: black!important;\n            transform: scale(1);\n        }\n        ._adafirst-icon:hover {\n            box-shadow: 1px 1px 10px rgba(0,0,0,.9);\n            transform: scale(1.1);\n    background-color: black!important;  \n      }\n        .circular._adafirst-icon {\n            border: .5px solid white;\n        }\n        .access_read_guide_bar{\n            box-sizing: border-box;\n            background: ' +
            this.options.guide.cBackground +
            ';\n            width: 100%!important;\n            min-width: 100%!important;\n            position: fixed!important;\n            height: ' +
            this.options.guide.height +
            '!important;\n            border: solid 3px ' +
            this.options.guide.cBorder +
            ';\n            top: 15px;\n            z-index: 2147483647;\n        }\n        .access-high-contrast *{\n            background-color: #000 !important;\n            background-image: none !important;\n            border-color: #fff !important;\n            -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n            color: #fff !important;\n            text-indent: 0 !important;\n            text-shadow: none !important;\n        }\n        ._adafirst-menu {\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            position: fixed;\n            width: ' +
            this.options.menu.dimensions.width.size +
            this.options.menu.dimensions.width.units +
            ';\n            height: ' +
            this.options.menu.dimensions.height.size +
            this.options.menu.dimensions.height.units +
            ';\n            transition-duration: .5s;\n            z-index: ' +
            this.options.icon.zIndex +
            '1;\n            opacity: 1;\n            background-color: #fff;\n            color: #000;\n            border-radius: 3px;\n            border: solid 1px #f1f0f1;\n            font-family: ' +
            this.options.menu.fontFamily +
            ';\n            min-width: 300px;\n            box-shadow: 0px 0px 1px #aaa;\n            max-height: 100vh;\n            ' +
            ('rtl' == getComputedStyle(this.body).direction
              ? 'text-indent: -5px'
              : '') +
            '\n        }\n        ._adafirst-menu.close {\n            z-index: -1;\n            width: 0;\n            opacity: 0;\n            background-color: transparent;\n        }\n        ._adafirst-menu.bottom {\n            bottom: 0;\n        }\n        ._adafirst-menu.top {\n            top: 0;\n        }\n        ._adafirst-menu.left {\n            left: 0;\n        }\n        ._adafirst-menu.close.left {\n            left: -' +
            this.options.menu.dimensions.width.size +
            this.options.menu.dimensions.width.units +
            ';\n        }\n        ._adafirst-menu.right {\n            right: 0;\n        }\n        ._adafirst-menu.close.right {\n            right: -' +
            this.options.menu.dimensions.width.size +
            this.options.menu.dimensions.width.units +
            ';\n        }\n        ._adafirst-menu ._text-center {\n            text-align: center;\n        }\n        ._adafirst-menu h3 {\n            font-size: 24px !important;\n            margin-top: 20px;\n            margin-bottom: 20px;\n            padding: 0;\n            color: rgba(0,0,0,.87);\n            letter-spacing: initial!important;\n            word-spacing: initial!important;\n        }\n        ._adafirst-menu ._menu-close-btn {\n            left: 5px;\n            color: #d63c3c;\n            transition: .3s ease;\n            transform: rotate(0deg);\n        }\n        ._adafirst-menu ._menu-reset-btn:hover,._adafirst-menu ._menu-close-btn:hover {\n            transform: rotate(180deg);\n        }\n        ._adafirst-menu ._menu-reset-btn {\n            right: 5px;\n            color: black;\n            transition: .3s ease;\n            transform: rotate(0deg);\n        }\n        ._adafirst-menu ._menu-btn {\n            position: absolute;\n            top: 5px;\n            cursor: pointer;\n            font-size: 24px !important;\n            font-weight: bold;\n        }\n        ._adafirst-menu ul {\n direction: ' +
            e +
            '; \n            padding: 0;\n            position: relative;\n            font-size: 18px !important;\n            margin: 0;\n            overflow: auto;\n            max-height: calc(100vh - 77px);\n        }\n        html._access_cursor * {\n            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;\n        }\n        ._adafirst-menu ul li {\n            list-style-type: none;\n            cursor: pointer;\n            -ms-user-select: none;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            user-select: none;\n            border: solid 1px #f1f0f1;\n            padding: ' +
            ('rtl' === e ? '10px 30px 10px 0px' : '10px 0 10px 30px') +
            ';\n            margin: 5px;\n            border-radius: 4px;\n            transition-duration: .5s;\n            transition-timing-function: ease-in-out;\n            font-size: ' +
            this.options.buttons.font.size +
            this.options.buttons.font.units +
            ' !important;\n            line-height: ' +
            this.options.buttons.font.size +
            this.options.buttons.font.units +
            " !important;\n            text-indent: 5px;\n            background: #f9f9f9;\n            color: rgba(0,0,0,.6);\n            letter-spacing: initial!important;\n            word-spacing: initial!important;\n   text-align: initial; \n     }\n        ._adafirst-menu ul.before-collapse li {\n            opacity: 0.05;\n        }\n        ._adafirst-menu ul li.active, ._adafirst-menu ul li.active:hover {\n            color: #fff;\n            background-color: #000;\n        }\n        ._adafirst-menu ul li:hover {\n            color: rgba(0,0,0,.8);\n            background-color: #eaeaea;\n        }\n        ._adafirst-menu ul li.not-supported {\n            display: none;\n        }\n        ._adafirst-menu ul li:before {\n            content: ' ';\n            font-family: 'Material Icons';\n            text-rendering: optimizeLegibility;\n            font-feature-settings: \"liga\" 1;\n            font-style: normal;\n            text-transform: none;\n            line-height: 1;\n            font-size: 24px !important;\n            width: 30px;\n            height: 30px;\n            display: inline-block;\n            overflow: hidden;\n            -webkit-font-smoothing: antialiased;\n            left: " +
            ('rtl' === e ? 'unset' : '8px') +
            ';\n            right: ' +
            ('rtl' === e ? '8px' : 'unset') +
            ';\n            position: absolute;\n            color: rgba(0,0,0,.6);\n            direction: ltr;\n        }\n        ._adafirst-menu ul li svg path {\n            fill: rgba(0,0,0,.6);\n        }\n        ._adafirst-menu ul li:hover svg path {\n            fill: rgba(0,0,0,.8);\n        }\n        ._adafirst-menu ul li.active svg path {\n            fill: #fff;\n        }\n        ._adafirst-menu ul li:hover:before {\n            color: rgba(0,0,0,.8);\n        }\n        ._adafirst-menu ul li.active:before {\n            color: #fff;\n        }\n        ._adafirst-menu ul li[data-access-action="increaseText"]:before {\n            content: \'zoom_in\';\n        }\n        ._adafirst-menu ul li[data-access-action="decreaseText"]:before {\n            content: \'zoom_out\';\n        }\n        ._adafirst-menu ul li[data-access-action="increaseTextSpacing"]:before {\n            content: \'unfold_more\';\n            transform: rotate(90deg) translate(-7px, 2px);\n        }\n        ._adafirst-menu ul li[data-access-action="decreaseTextSpacing"]:before {\n            content: \'unfold_less\';\n            transform: rotate(90deg) translate(-7px, 2px);\n        }\n        ._adafirst-menu ul li[data-access-action="invertColors"]:before {\n            content: \'invert_colors\';\n        }\n        ._adafirst-menu ul li[data-access-action="grayHues"]:before {\n            content: \'format_color_reset\';\n        }\n        ._adafirst-menu ul li[data-access-action="underlineLinks"]:before {\n            content: \'format_underlined\';\n        }\n        ._adafirst-menu ul li[data-access-action="bigCursor"]:before {\n            content: \'touch_app\';\n        }\n        ._adafirst-menu ul li[data-access-action="readingGuide"]:before {\n            content: \'border_horizontal\';\n        }\n        ._adafirst-menu ul li[data-access-action="textToSpeech"]:before {\n            content: \'record_voice_over\';\n        }\n        ._adafirst-menu ul li[data-access-action="speechToText"]:before {\n            content: \'mic\';\n        }\n        '
          a.injectStyle(t, { className: '_adafirst-main-css' }),
            a.deployedObjects.set('._adafirst-main-css', !1)
        }
        injectIcon() {
          this.options.icon.dimensions.width.size,
            this.options.icon.dimensions.width.size,
            this.options.icon.dimensions.width.size
          let e =
            'width: ' +
            this.options.icon.dimensions.width.size +
            this.options.icon.dimensions.width.units +
            ';height: ' +
            this.options.icon.dimensions.height.size +
            this.options.icon.dimensions.height.units +
            ';font-size: ' +
            this.options.icon.dimensions.width.size +
            this.options.icon.dimensions.width.units +
            ';background-color: ' +
            this.options.icon.backgroundColor +
            ';color: ' +
            this.options.icon.color +
            ';border-top-left-radius: ' +
            this.options.icon.cornerRadius.topLeft.size +
            this.options.icon.cornerRadius.topLeft.units +
            ';border-top-right-radius: ' +
            this.options.icon.cornerRadius.topRight.size +
            this.options.icon.cornerRadius.topRight.units +
            ';border-bottom-left-radius: ' +
            this.options.icon.cornerRadius.bottomLeft.size +
            this.options.icon.cornerRadius.bottomLeft.units +
            ';border-bottom-right-radius: ' +
            this.options.icon.cornerRadius.bottomRight.size +
            this.options.icon.cornerRadius.bottomRight.units +
            ';box-shadow: ' +
            this.options.icon.boxShadow.horizontalOffset.size +
            this.options.icon.boxShadow.horizontalOffset.units +
            ' ' +
            this.options.icon.boxShadow.verticalOffset.size +
            this.options.icon.boxShadow.verticalOffset.units +
            ' ' +
            this.options.icon.boxShadow.blur.size +
            this.options.icon.boxShadow.blur.units +
            ' ' +
            this.options.icon.boxShadow.spread.size +
            this.options.icon.boxShadow.spread.units +
            ' rgba(' +
            this.options.icon.boxShadow.color.red +
            ', ' +
            this.options.icon.boxShadow.color.blue +
            ', ' +
            this.options.icon.boxShadow.color.green +
            ', ' +
            this.options.icon.boxShadow.color.alpha +
            ')'
          for (let t in this.options.icon.position)
            e +=
              ';' +
              t +
              ':' +
              this.options.icon.position[t].size +
              this.options.icon.position[t].units
          e += ';z-index: ' + this.options.icon.zIndex
          let t =
              '_adafirst-icon material-icons _access' +
              (this.options.icon.circular ? ' circular' : ''),
            i = a.jsonToHtml({
              type: 'i',
              attrs: {
                class: t,
                style: e,
                title: this.options.labels.menuTitle,
              },
              children: [{ type: '#text', text: this.options.icon.img }],
            })
          return (
            this.body.appendChild(i),
            a.deployedObjects.set('._adafirst-icon', !1),
            i
          )
        }
        parseKeys(e) {
          return this.options.hotkeys.enabled && this.options.hotkeys.helpTitles
            ? 'Hotkey: ' +
                e
                  .map(function (e) {
                    return Number.isInteger(e)
                      ? String.fromCharCode(e).toLowerCase()
                      : e.replace('Key', '')
                  })
                  .join('+')
            : ''
        }
        injectMenu() {
          let e = a.jsonToHtml({
            type: 'div',
            attrs: { class: '_adafirst-menu close _access' },
            children: [
              {
                type: 'h3',
                attrs: { class: '_text-center' },
                children: [
                  {
                    type: 'i',
                    attrs: {
                      class: '_menu-close-btn _menu-btn material-icons',
                      title: this.options.labels.closeTitle,
                    },
                    children: [{ type: '#text', text: 'close' }],
                  },
                  { type: '#text', text: this.options.labels.menuTitle },
                  {
                    type: 'i',
                    attrs: {
                      class: '_menu-reset-btn _menu-btn material-icons',
                      title: this.options.labels.resetTitle,
                    },
                    children: [{ type: '#text', text: 'refresh' }],
                  },
                ],
              },
              {
                type: 'ul',
                attrs: {
                  class: this.options.animations.buttons
                    ? 'before-collapse _adafirst-scrollbar'
                    : '_adafirst-scrollbar',
                },
                children: [
                  {
                    type: 'li',
                    attrs: { 'data-access-action': 'increaseText' },
                    children: [
                      { type: '#text', text: this.options.labels.increaseText },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: { 'data-access-action': 'decreaseText' },
                    children: [
                      { type: '#text', text: this.options.labels.decreaseText },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: {
                      'data-access-action': 'invertColors',
                      title: this.parseKeys(
                        this.options.hotkeys.keys.invertColors,
                      ),
                    },
                    children: [
                      { type: '#text', text: this.options.labels.invertColors },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: {
                      'data-access-action': 'grayHues',
                      title: this.parseKeys(this.options.hotkeys.keys.grayHues),
                    },
                    children: [
                      { type: '#text', text: this.options.labels.grayHues },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: {
                      'data-access-action': 'underlineLinks',
                      title: this.parseKeys(
                        this.options.hotkeys.keys.underlineLinks,
                      ),
                    },
                    children: [
                      {
                        type: '#text',
                        text: this.options.labels.underlineLinks,
                      },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: {
                      'data-access-action': 'bigCursor',
                      title: this.parseKeys(
                        this.options.hotkeys.keys.bigCursor,
                      ),
                    },
                    children: [
                      { type: 'div', attrs: { id: 'iconBigCursor' } },
                      { type: '#text', text: this.options.labels.bigCursor },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: {
                      'data-access-action': 'readingGuide',
                      title: this.parseKeys(
                        this.options.hotkeys.keys.readingGuide,
                      ),
                    },
                    children: [
                      { type: '#text', text: this.options.labels.readingGuide },
                    ],
                  },
                  {
                    type: 'li',
                    attrs: { 'data-access-action': 'speechToText' },
                    children: [
                      { type: '#text', text: this.options.labels.speechToText },
                    ],
                  },
                ],
              },
            ],
          })
          for (let t in this.options.icon.position) e.classList.add(t)
          return (
            this.body.appendChild(e),
            setTimeout(function () {
              document.getElementById('iconBigCursor')
            }, 1),
            a.deployedObjects.set('._adafirst-menu', !1),
            document
              .querySelector('._adafirst-menu ._menu-close-btn')
              .addEventListener(
                'click',
                () => {
                  this.toggleMenu()
                },
                !1,
              ),
            document
              .querySelector('._adafirst-menu ._menu-reset-btn')
              .addEventListener(
                'click',
                () => {
                  this.resetAll(), location.reload()
                },
                !1,
              ),
            e
          )
        }
        addListeners() {
          let e = document.querySelectorAll('._adafirst-menu ul li')
          for (let t = 0; t < e.length; t++)
            e[t].addEventListener(
              'click',
              (e) => {
                let t = e || window.event
                this.invoke(t.target.getAttribute('data-access-action'))
              },
              !1,
            )
        }
        disableUnsupportedModules() {
          for (let e in this.options.modules)
            if (!this.options.modules[e]) {
              let t = document.querySelector(
                'li[data-access-action="' + e + '"]',
              )
              t && t.classList.add('not-supported')
            }
        }
        resetAll() {
          ;(this.sessionState.underlineLinks = void 0 === e),
            (this.sessionState.grayHues = void 0 === e),
            (this.sessionState.invertColors = void 0 === e),
            (this.sessionState.bigCursor = void 0 === e),
            (this.sessionState.readingGuide = void 0 === e),
            this.resetTextSize(),
            this.resetTextSpace()
        }
        resetTextSize() {
          this.resetIfDefined(
            this.initialValues.body.fontSize,
            this.body.style,
            'fontSize',
          )
          let e = document.querySelectorAll('[data-init-font-size]')
          for (let t = 0; t < e.length; t++)
            (e[t].style.fontSize = e[t].getAttribute('data-init-font-size')),
              e[t].removeAttribute('data-init-font-size')
          ;(this.sessionState.textSize = 0), this.onChange(!0)
        }
        resetTextSpace() {
          this.resetIfDefined(
            this.initialValues.body.wordSpacing,
            this.body.style,
            'wordSpacing',
          ),
            this.resetIfDefined(
              this.initialValues.body.letterSpacing,
              this.body.style,
              'letterSpacing',
            )
          let e = document.querySelectorAll('[data-init-word-spacing]'),
            t = document.querySelectorAll('[data-init-letter-spacing]')
          for (let t = 0; t < e.length; t++)
            (e[t].style.wordSpacing = e[t].getAttribute(
              'data-init-word-spacing',
            )),
              e[t].removeAttribute('data-init-word-spacing')
          for (let i = 0; i < t.length; i++)
            (e[i].style.letterSpacing = e[i].getAttribute(
              'data-init-letter-spacing',
            )),
              e[i].removeAttribute('data-init-letter-spacing')
          ;(this.sessionState.textSpace = 0), this.onChange(!0)
        }
        alterTextSize(e) {
          ;(this.sessionState.textSize += e ? 1 : -1), this.onChange(!0)
          let t = 2
          if ((e || (t *= -1), this.options.textPixelMode)) {
            let e = document.querySelectorAll('*:not(._access)')
            for (let i = 0; i < e.length; i++) {
              let n = getComputedStyle(e[i]).fontSize
              n &&
                n.indexOf('px') > -1 &&
                (e[i].getAttribute('data-init-font-size') ||
                  e[i].setAttribute('data-init-font-size', n),
                (n = 1 * n.replace('px', '') + t),
                (e[i].style.fontSize = n + 'px'))
            }
          } else {
            let e = a.getFormattedDim(getComputedStyle(this.body).fontSize)
            void 0 === this.initialValues.body.fontSize &&
              (this.initialValues.body.fontSize = e.size + e.sufix),
              e &&
                e.sufix &&
                !isNaN(1 * e.size) &&
                (this.body.style.fontSize = 1 * e.size + t + e.sufix)
          }
        }
        alterTextSpace(e) {
          ;(this.sessionState.textSpace += e ? 1 : -1), this.onChange(!0)
          let t = 1
          if ((e || (t *= -1), this.options.textPixelMode)) {
            let e = document.querySelectorAll('*:not(._access)'),
              i = Array.prototype.slice.call(
                document.querySelectorAll('._adafirst-menu *'),
              )
            for (let n = 0; n < e.length; n++) {
              if (i.includes(e[n])) continue
              let s = e[n].style.wordSpacing
              s && s.indexOf('px') > -1
                ? (e[n].getAttribute('data-init-word-spacing') ||
                    e[n].setAttribute('data-init-word-spacing', s),
                  (s = 1 * s.replace('px', '') + t),
                  (e[n].style.wordSpacing = s + 'px'))
                : (e[n].setAttribute('data-init-word-spacing', s),
                  (e[n].style.wordSpacing = t + 'px'))
              let o = e[n].style.letterSpacing
              o && o.indexOf('px') > -1
                ? (e[n].getAttribute('data-init-letter-spacing') ||
                    e[n].setAttribute('data-init-letter-spacing', o),
                  (o = 1 * o.replace('px', '') + t),
                  (e[n].style.letterSpacing = o + 'px'))
                : (e[n].setAttribute('data-init-letter-spacing', o),
                  (e[n].style.letterSpacing = t + 'px'))
            }
          } else {
            let e = a.getFormattedDim(getComputedStyle(this.body).wordSpacing)
            void 0 === this.initialValues.body.wordSpacing &&
              (this.initialValues.body.wordSpacing = ''),
              e &&
                e.sufix &&
                !isNaN(1 * e.size) &&
                (this.body.style.wordSpacing = 1 * e.size + t + e.sufix)
            let i = a.getFormattedDim(getComputedStyle(this.body).letterSpacing)
            void 0 === this.initialValues.body.letterSpacing &&
              (this.initialValues.body.letterSpacing = ''),
              i &&
                i.sufix &&
                !isNaN(1 * i.size) &&
                (this.body.style.letterSpacing = 1 * i.size + t + i.sufix)
          }
        }
        speechToText() {
          'webkitSpeechRecognition' in window &&
            ((this.recognition = new webkitSpeechRecognition()),
            (this.recognition.continuous = !0),
            (this.recognition.interimResults = !0),
            (this.recognition.onstart = () => {
              this.body.classList.add('_adafirst-listening')
            }),
            (this.recognition.onend = () => {
              this.body.classList.remove('_adafirst-listening')
            }),
            (this.recognition.onresult = (e) => {
              let t = ''
              if (void 0 !== e.results) {
                for (let i = e.resultIndex; i < e.results.length; ++i)
                  e.results[i].isFinal && (t += e.results[i][0].transcript)
                t &&
                  this.speechToTextTarget &&
                  (this.speechToTextTarget.parentElement.classList.remove(
                    '_adafirst-listening',
                  ),
                  'input' == this.speechToTextTarget.tagName.toLowerCase() ||
                  'textarea' == this.speechToTextTarget.tagName.toLowerCase()
                    ? (this.speechToTextTarget.value = t)
                    : null !=
                        this.speechToTextTarget.getAttribute(
                          'contenteditable',
                        ) && (this.speechToTextTarget.innerText = t))
              }
            }),
            (this.recognition.lang = this.options.speechToTextLang),
            this.recognition.start())
        }
        textToSpeech(e) {
          if (!window.SpeechSynthesisUtterance || !window.speechSynthesis)
            return
          let t = new window.SpeechSynthesisUtterance(e)
          t.lang = this.options.textToSpeechLang
          let i = window.speechSynthesis.getVoices(),
            n = !1
          for (let e = 0; e < i.length; e++)
            if (i[e].lang === t.lang) {
              ;(t.voice = i[e]), (n = !0)
              break
            }
          n || a.warn('text to speech language not supported!'),
            window.speechSynthesis.speak(t)
        }
        listen() {
          'object' == typeof u.recognition &&
            'function' == typeof u.recognition.stop &&
            u.recognition.stop(),
            (u.speechToTextTarget = window.event.target),
            u.speechToText(window.event.target.innerText)
        }
        read() {
          window.event.preventDefault(),
            window.event.stopPropagation(),
            u.textToSpeech(window.event.target.innerText)
        }
        runHotkey(e) {
          switch (e) {
            case 'toggleMenu':
              this.toggleMenu()
              break
            default:
              this.menuInterface.hasOwnProperty(e) &&
                this.options.modules[e] &&
                this.menuInterface[e](!1)
          }
        }
        toggleMenu() {
          this.menu.classList.contains('close')
            ? (this.options.animations &&
                this.options.animations.buttons &&
                setTimeout(() => {
                  this.menu
                    .querySelector('ul')
                    .classList.toggle('before-collapse')
                }, 500),
              setTimeout(() => {
                this.menu.classList.toggle('close')
              }, 10))
            : this.options.animations && this.options.animations.buttons
            ? (setTimeout(() => {
                this.menu.classList.toggle('close')
              }, 500),
              setTimeout(() => {
                this.menu
                  .querySelector('ul')
                  .classList.toggle('before-collapse')
              }, 10))
            : this.menu.classList.toggle('close')
        }
        invoke(e) {
          'function' == typeof this.menuInterface[e] && this.menuInterface[e]()
        }
        build(e) {
          ;(this.initialValues = {
            underlineLinks: !1,
            textToSpeech: !1,
            bigCursor: !1,
            readingGuide: !1,
            body: {},
            html: {},
          }),
            (this.body =
              document.body || document.getElementsByTagName('body')[0]),
            (this.html =
              document.documentElement ||
              document.getElementsByTagName('html')[0]),
            this.injectCss(e),
            (this.icon = this.injectIcon()),
            (this.menu = this.injectMenu()),
            this.addListeners(),
            this.disableUnsupportedModules(),
            this.options.hotkeys.enabled &&
              (document.onkeydown = function (e) {
                let t = Object.entries(u.options.hotkeys.keys).find(function (
                  t,
                ) {
                  let i = !0
                  for (var n = 0; n < t[1].length; n++)
                    Number.isInteger(t[1][n])
                      ? e.keyCode != t[1][n] && (i = !1)
                      : (null != e[t[1][n]] && 0 != e[t[1][n]]) || (i = !1)
                  return i
                })
                null != t && u.runHotkey(t[0])
              }),
            this.icon.addEventListener(
              'click',
              () => {
                this.toggleMenu()
              },
              !1,
            ),
            setTimeout(() => {
              this.icon.style.opacity = '1'
            }, 10),
            (this.menuInterface = {
              increaseText: () => {
                this.alterTextSize(!0)
              },
              decreaseText: () => {
                this.alterTextSize(!1)
              },
              increaseTextSpacing: () => {
                this.alterTextSpace(!0)
              },
              decreaseTextSpacing: () => {
                this.alterTextSpace(!1)
              },
              invertColors: (e) => {
                // ;(this.sessionState.underlineLinks = void 0 === e),
                if (
                  (console.log(e),
                  (this.sessionState.invertColors = !this.sessionState
                    .invertColors),
                  this.onChange(!0),
                  void 0 === this.initialValues.html.backgroundColor &&
                    (this.initialValues.html.backgroundColor = getComputedStyle(
                      this.html,
                    ).backgroundColor),
                  void 0 === this.initialValues.html.color &&
                    (this.initialValues.html.color = getComputedStyle(
                      this.html,
                    ).color),
                  e)
                )
                  return (
                    this.resetIfDefined(
                      this.initialValues.html.backgroundColor,
                      this.html.style,
                      'backgroundColor',
                    ),
                    this.resetIfDefined(
                      this.initialValues.html.color,
                      this.html.style,
                      'color',
                    ),
                    document
                      .querySelector(
                        '._adafirst-menu [data-access-action="invertColors"]',
                      )
                      .classList.remove('active'),
                    (this.initialValues.invertColors = !1),
                    void (this.html.style.filter = '')
                  )
                document
                  .querySelector(
                    '._adafirst-menu [data-access-action="invertColors"]',
                  )
                  .classList.toggle('active'),
                  (this.initialValues.invertColors = !this.initialValues
                    .invertColors),
                  this.initialValues.invertColors
                    ? (this.initialValues.grayHues &&
                        this.menuInterface.grayHues(!0),
                      (this.html.style.filter = 'invert(1)'))
                    : (this.html.style.filter = '')
              },
              grayHues: (e) => {
                if (
                  ((this.sessionState.grayHues = !this.sessionState.grayHues),
                  this.onChange(!0),
                  void 0 === this.initialValues.html.filter &&
                    (this.initialValues.html.filter = getComputedStyle(
                      this.html,
                    ).filter),
                  void 0 === this.initialValues.html.webkitFilter &&
                    (this.initialValues.html.webkitFilter = getComputedStyle(
                      this.html,
                    ).webkitFilter),
                  void 0 === this.initialValues.html.mozFilter &&
                    (this.initialValues.html.mozFilter = getComputedStyle(
                      this.html,
                    ).mozFilter),
                  void 0 === this.initialValues.html.msFilter &&
                    (this.initialValues.html.msFilter = getComputedStyle(
                      this.html,
                    ).msFilter),
                  e)
                )
                  return (
                    document
                      .querySelector(
                        '._adafirst-menu [data-access-action="grayHues"]',
                      )
                      .classList.remove('active'),
                    (this.initialValues.grayHues = !1),
                    this.resetIfDefined(
                      this.initialValues.html.filter,
                      this.html.style,
                      'filter',
                    ),
                    this.resetIfDefined(
                      this.initialValues.html.webkitFilter,
                      this.html.style,
                      'webkitFilter',
                    ),
                    this.resetIfDefined(
                      this.initialValues.html.mozFilter,
                      this.html.style,
                      'mozFilter',
                    ),
                    void this.resetIfDefined(
                      this.initialValues.html.msFilter,
                      this.html.style,
                      'msFilter',
                    )
                  )
                let t
                document
                  .querySelector(
                    '._adafirst-menu [data-access-action="grayHues"]',
                  )
                  .classList.toggle('active'),
                  (this.initialValues.grayHues = !this.initialValues.grayHues),
                  this.initialValues.grayHues
                    ? ((t = 'grayscale(1)'),
                      this.initialValues.invertColors &&
                        this.menuInterface.invertColors(!0))
                    : (t = ''),
                  (this.html.style.webkitFilter = t),
                  (this.html.style.mozFilter = t),
                  (this.html.style.msFilter = t),
                  (this.html.style.filter = t)
              },
              underlineLinks: (e) => {
                ;(this.sessionState.underlineLinks = !this.sessionState
                  .underlineLinks),
                  this.onChange(!0)
                let t = '_adafirst-underline',
                  i = () => {
                    let e = document.querySelector('.' + t)
                    e &&
                      (e.parentElement.removeChild(e),
                      a.deployedObjects.remove('.' + t))
                  }
                if (e)
                  return (
                    (this.initialValues.underlineLinks = !1),
                    document
                      .querySelector(
                        '._adafirst-menu [data-access-action="underlineLinks"]',
                      )
                      .classList.remove('active'),
                    i()
                  )
                if (
                  (document
                    .querySelector(
                      '._adafirst-menu [data-access-action="underlineLinks"]',
                    )
                    .classList.toggle('active'),
                  (this.initialValues.underlineLinks = !this.initialValues
                    .underlineLinks),
                  this.initialValues.underlineLinks)
                ) {
                  let e =
                    '\n                    body a {\n                        text-decoration: underline !important; text-decoration-color: currentColor !important;\n                    } \n  body .AdditionalCouponDetails h3:after {display: none !important} \n                '
                  a.injectStyle(e, { className: t }),
                    a.deployedObjects.set('.' + t, !0)
                } else i()
              },
              bigCursor: (e) => {
                if (
                  ((this.sessionState.bigCursor = !this.sessionState.bigCursor),
                  this.onChange(!0),
                  e)
                )
                  return (
                    this.html.classList.remove('_access_cursor'),
                    document
                      .querySelector(
                        '._adafirst-menu [data-access-action="bigCursor"]',
                      )
                      .classList.remove('active'),
                    void (this.initialValues.bigCursor = !1)
                  )
                document
                  .querySelector(
                    '._adafirst-menu [data-access-action="bigCursor"]',
                  )
                  .classList.toggle('active'),
                  (this.initialValues.bigCursor = !this.initialValues
                    .bigCursor),
                  this.html.classList.toggle('_access_cursor')
              },
              readingGuide: (e) => {
                if (
                  ((this.sessionState.readingGuide = !this.sessionState
                    .readingGuide),
                  this.onChange(!0),
                  e)
                )
                  return (
                    null != document.getElementById('access_read_guide_bar') &&
                      document.getElementById('access_read_guide_bar').remove(),
                    document
                      .querySelector(
                        '._adafirst-menu [data-access-action="readingGuide"]',
                      )
                      .classList.remove('active'),
                    (this.initialValues.readingGuide = !1),
                    void (document.body.onmousemove = null)
                  )
                if (
                  (document
                    .querySelector(
                      '._adafirst-menu [data-access-action="readingGuide"]',
                    )
                    .classList.toggle('active'),
                  (this.initialValues.readingGuide = !this.initialValues
                    .readingGuide),
                  this.initialValues.readingGuide)
                ) {
                  let e = document.createElement('div')
                  ;(e.id = 'access_read_guide_bar'),
                    e.classList.add('access_read_guide_bar'),
                    document.body.append(e),
                    (document.body.onmousemove = function (e) {
                      document.getElementById(
                        'access_read_guide_bar',
                      ).style.top =
                        e.y -
                        (parseInt(u.options.guide.height.replace('px')) + 5) +
                        'px'
                    })
                } else
                  null != document.getElementById('access_read_guide_bar') &&
                    document.getElementById('access_read_guide_bar').remove(),
                    (document.body.onmousemove = null)
              },
              speechToText: (e) => {
                this.onChange(!1)
                let t = '_adafirst-speech-to-text',
                  i = () => {
                    this.recognition &&
                      (this.recognition.stop(),
                      this.body.classList.remove('_adafirst-listening'))
                    let e = document.querySelector('.' + t)
                    e &&
                      (e.parentElement.removeChild(e),
                      a.deployedObjects.remove('.' + t))
                    let i = document.querySelectorAll('._adafirst-mic')
                    for (let e = 0; e < i.length; e++)
                      i[e].removeEventListener('focus', this.listen, !1),
                        i[e].classList.remove('_adafirst-mic')
                  }
                if (e)
                  return (
                    document
                      .querySelector(
                        '._adafirst-menu [data-access-action="speechToText"]',
                      )
                      .classList.remove('active'),
                    (this.initialValues.speechToText = !1),
                    i()
                  )
                if (
                  (document
                    .querySelector(
                      '._adafirst-menu [data-access-action="speechToText"]',
                    )
                    .classList.toggle('active'),
                  (this.initialValues.speechToText = !this.initialValues
                    .speechToText),
                  this.initialValues.speechToText)
                ) {
                  let e =
                    "\n                        body:after {\n                            content: 'mic';\n                            font-family: 'Material Icons';\n                            position: fixed;\n                            z-index: 1100;\n                            top: 1vw;\n                            right: 1vw;\n                            width: 36px;\n                            height: 36px;\n                            font-size: 30px;\n                            line-height: 36px;\n                                                       background: rgba(255,255,255,0.7);\n                            display: flex;\n                            justify-content: center;\n                            aling-items: center;\n                        }\n\n                        body._adafirst-listening:after {\n                            animation: _adafirst-listening-animation 2s infinite ease;\n                        }\n\n                        @keyframes _adafirst-listening-animation {\n                            0%  {background-color: transparent;}\n                            50%  {background-color: #EF9A9A;}\n                        }\n                    "
                  a.injectStyle(e, { className: t }),
                    a.deployedObjects.set('.' + t, !0)
                  let i = document.querySelectorAll(
                    'input[type="text"], input[type="search"], textarea, [contenteditable]',
                  )
                  for (let e = 0; e < i.length; e++)
                    i[e].addEventListener(
                      'blur',
                      () => {
                        'object' == typeof this.recognition &&
                          'function' == typeof this.recognition.stop &&
                          this.recognition.stop()
                      },
                      !1,
                    ),
                      i[e].addEventListener('focus', this.listen, !1),
                      i[e].parentElement.classList.add('_adafirst-mic')
                } else i()
              },
            })
        }
        resetIfDefined(e, t, i) {
          void 0 !== e && (t[i] = e)
        }
        onChange(e) {
          e && this.options.session.persistent && this.saveSession()
        }
        saveSession() {
          l.set('_accessState', this.sessionState)
        }
        setSessionFromCache() {
          let e = l.get('_accessState')
          if (e) {
            if (e.textSize) {
              let t = e.textSize
              if (t > 0) for (; t--; ) this.alterTextSize(!0)
              else for (; t++; ) this.alterTextSize(!1)
            }
            if (e.textSpace) {
              let t = e.textSpace
              if (t > 0) for (; t--; ) this.alterTextSpace(!0)
              else for (; t++; ) this.alterTextSpace(!1)
            }
            e.invertColors && this.menuInterface.invertColors(),
              e.grayHues && this.menuInterface.grayHues(),
              e.underlineLinks && this.menuInterface.underlineLinks(),
              e.bigCursor && this.menuInterface.bigCursor(),
              e.readingGuide && this.menuInterface.readingGuide(),
              (this.sessionState = e)
          }
        }
        destroy() {
          let e = a.deployedObjects.getAll()
          for (let t of e) {
            let e = document.querySelector(t)
            e && e.parentElement.removeChild(e)
          }
        }
      }
      h.init = (e) => {
        a.warn(
          '"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead',
        ),
          new h(e)
      }
      var p = h
      window.Accessibility = p
    },
  ])
})
