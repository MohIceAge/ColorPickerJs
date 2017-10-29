/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const ColorPicker = __webpack_require__ (1)

new ColorPicker (document.getElementById('colorpicker'), {
  width: 640,
  height: 360,
  onchange: e => console.log(e)
})

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const html = __webpack_require__ (2)
const linearGradient = str => ["", "-webkit-","-moz-","-o-"].map (e => `${e}linear-gradient(${str})`)

__webpack_require__ (3)

module.exports = class {
  constructor(element, options) {
    this.element = element
    this.width = options.width > 0 ? options.width : 300
    this.height = options.height > 0 ? options.height : 200
    this.onchange = options.onchange != null ? options.onchange : e=>e
    this.cursorColor = "#ff0000"
    this.color = "#ff0000"
    this.doc = element.ownerDocument
    const callbackSlide = e => this.slide(e.clientX)
    const callbackColor = e => this.selectColor(e.clientX, e.clientY)
    
    const { object, elements } = html({
      style: {
        width:this.width+"px", height:this.height+"px"
      },
      children: [
        {
          style: {
            width: "100%", height: "95%",
            position: "relative"
          },
          onclick: callbackColor,
          onmousedown: e => {
            const rel = e => {
              this.doc.removeEventListener ("mousemove", callbackColor)
              this.doc.removeEventListener ("mouseup", rel)
            }
            this.doc.addEventListener ("mousemove", callbackColor)
            this.doc.addEventListener ("mouseup", rel)
          },
          children: [
            {
              id: "circle",
              style: {
                position: "absolute",
                width: "10px", height: "10px",
                zIndex: "1", left: "100%", 
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    background: "rgba(224,224,224,.5)",
                    border: "solid 1px #202020",
                    top:"-5px",
                    left:"-5px",
                    borderRadius: "10px"
                  }
                }
              ]
            },
            {
              id: "gradient",
              style: {
                background: linearGradient ("left, white 0%, #f00 100%"),
                position: "absolute",
                width: "100%", height: "100%"
              },
            },
            {
              style: {
                background: linearGradient ("bottom, #000 0%, transparent 100%"),
                position: "absolute",
                width: "100%", height: "100%"
              },
            },
          ]
        },
        {
          style: {
            background: linearGradient ("left, #f00 0%, #ff0 16.666%, #0f0 33.333%, #0ff 50%, #00f 66.666%, #f0f 83.333%, #f00 100%"),
            width: "100%", height: "5%",position: "relative"     
          },
          onmousedown: e => {
            const rel = e => {
              this.doc.removeEventListener ("mousemove", callbackSlide)
              this.doc.removeEventListener ("mouseup", rel)
            }
            this.doc.addEventListener ("mousemove", callbackSlide)
            this.doc.addEventListener ("mouseup", rel)
          },
          onclick: callbackSlide, id: "alt",
          children: [
            {
              id: "cursor",
              style: {
                height: "calc(100% + 5px)",
                width: "3px",
                background: "#202020",
                position: "absolute",
                left: "0"
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    width: "16px",
                    height: "16px",
                    borderRadius: "7px",
                    border: "solid 3px #202020",
                    backgroundColor: "red",
                    top: "calc(100% - 5px)",
                    left: "-9px",
                  }
                }
              ]
            }
          ]
        },
      ],
    }, this.doc)
    
    this.element.appendChild(object)
    this.els = elements
    
  }
  slide (cx) {
    const x = cx > 0 ? (cx < this.width ? cx : this.width) : 0
    const table = [[0xff,0x00,0x00],[0xff,0xff,0x00],[0x00,0xff,0x00],[0x00,0xff,0xff],[0x00,0x00,0xff],[0xff,0x00,0xff],[0xff,0x00,0x00]]
    const X = x*6/this.width
    const [r, t] = [Math.floor (X), X - Math.floor (X)]
    const bgd = table[r].map ((v, i) => v + t*(table[r+1][i]-v))
      .map (e=>Math.floor(e).toString(16).padStart(2, "0")) .join('')

    this.cursorColor = "#" + bgd
    this.els["cursor"].style.left = x+"px"
    
    this.els["cursor"].children[0].style.backgroundColor = this.cursorColor
    
    this.els["gradient"].style.background = this.els["gradient"].style.background.replace(/0%, .* 100%/, `0%, ${this.cursorColor} 100%`)
    this.updateColor()
  }
  selectColor (cx, cy) {
    const h = this.height * 19/20
    const x = cx > 0 ? (cx < this.width ? cx : this.width) : 0
    const y = cy > 0 ? (cy < h ? cy : h) : 0
    this.els["circle"].style.top =  y + "px"
    this.els["circle"].style.left = x + "px"
    console.log(x,y)
    this.updateColor()
  }
  updateColor() {
    const h = this.height * 19/20    
    const y = this.els["circle"].style.top.slice(0,-2)-0
    const x = this.els["circle"].style.left.slice(0,-2)-0
    
    const tx = x/this.width
    const ty = y/h
    let color = this.cursorColor.slice(1)
    color = [color.slice(0,2), color.slice(2,4), color.slice(-2)].map(e => parseInt(e, 16))
      .map(e => (1-ty)*(255*(1-tx)+ tx*e))
      .map(Math.floor)
      .map(e => e.toString(16).padStart(2, "0"))
      .join('')
      .padStart(7, "#000000")
    console.log(tx, ty,color)
    this.color = color
    this.onchange(color)
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

const html = function(obj, doc = document) {
  const ret = doc.createElement(obj.name || 'div')
  const elements = {}
  const children = obj.children || []
  for ( let i in obj.style ) {
    if (typeof (obj.style[i]) === "string"){
      ret.style[i] = obj.style[i]
    } else if (Array.isArray (obj.style[i])) {
      let nstyle = obj.style[i].map (v => `${i}:${v}`).join (';')
      nstyle += ret.getAttribute("style") || ''
      ret.setAttribute("style", nstyle)
    }
  }

  children.forEach(e => {
    const temp = html (e)
    for (let i in temp.elements) elements[i] = temp.elements[i]
    ret.appendChild (temp.object)
  })

  delete obj.style
  delete obj.children
  delete obj.name

  for ( let prop in obj ) {
    if (prop.slice(0,2) == "on")
      ret.addEventListener (prop.slice(2), obj[prop])
    else ret.setAttribute(prop, obj[prop])
  }

  if (typeof obj.id === "string") {
    elements[obj.id] = ret
  }

  return { object:ret, elements }
}

module.exports = html


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/repeat
if (!String.prototype.padStart) {
    String.prototype.padStart = function (count, str) {
      return (str || ' ').repeat(count - this.length).substr(0,count) + this;
    };
  }

/***/ })
/******/ ]);