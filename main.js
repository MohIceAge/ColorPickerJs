const html = require ('./html')
const linearGradient = str => ["", "-webkit-","-moz-","-o-"].map (e => `${e}linear-gradient(${str})`)

require ("./polyfill")

module.exports = class {
  constructor(element, options) {
    this._element = element
    this._width = options.width > 0 ? options.width : 300
    this._height = options.height > 0 ? options.height : 200
    this._onchange = options.onchange != null ? options.onchange : e=>e
    this._cursorColor = "#ff0000"
    this._color = "#ff0000"
    this._doc = element.ownerDocument
    const getLocalCoords = (e, target = e.target) => {
      const {top, left} = target.getBoundingClientRect()
      console.log(e,{top,left}, target.getBoundingClientRect())
      return [e.x-left, e.y-top]
    }
    const callbackSlide = e => this._slide      .apply(this, getLocalCoords(e, this.els.slider))
    const callbackColor = e => this._selectColor.apply(this, getLocalCoords(e, this.els.grid))
    
    const { object, elements } = html({
      style: {
        width:this._width+"px", height:this._height+"px", position: "relative"
      },
      children: [
        {
          id: "grid",
          style: {
            width: "100%", height: "95%",
            position: "relative"
          },
          onclick: callbackColor,
          onmousedown: e => {
            const rel = e => {
              this._doc.removeEventListener ("mousemove", callbackColor)
              this._doc.removeEventListener ("mouseup", rel)
            }
            this._doc.addEventListener ("mousemove", callbackColor)
            this._doc.addEventListener ("mouseup", rel)
          },
          children: [
            {
              id: "circle",
              style: {
                position: "absolute",
                width: "16px", height: "16px",
                zIndex: "1", left: "100%", top: "0",
                pointerEvents: "none",
              },
              children: [
                {
                  style: {
                    position: "absolute",
                    height: "10px",
                    width: "10px",
                    background: "rgba(224,224,224,.5)",
                    border: "solid 3px #202020",
                    top:"-8px",
                    left:"-8px",
                    borderRadius: "8px"
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
          id: "slider",
          style: {
            background: linearGradient ("left, #f00 0%, #ff0 16.666%, #0f0 33.333%, #0ff 50%, #00f 66.666%, #f0f 83.333%, #f00 100%"),
            width: "100%", height: "5%",position: "relative"     
          },
          onmousedown: e => {
            const rel = e => {
              this._doc.removeEventListener ("mousemove", callbackSlide)
              this._doc.removeEventListener ("mouseup", rel)
            }
            this._doc.addEventListener ("mousemove", callbackSlide)
            this._doc.addEventListener ("mouseup", rel)
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
                pointerEvents: "none",
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
                    pointerEvents: "auto",
                  }
                }
              ]
            }
          ]
        },
      ],
    }, this._doc)
    
    this._element.appendChild(object)
    this.els = elements
    
  }
  _slide (cx) {
    const x = cx > 0 ? (cx < this._width ? cx : this._width) : 0
    const table = [[0xff,0x00,0x00],[0xff,0xff,0x00],[0x00,0xff,0x00],[0x00,0xff,0xff],[0x00,0x00,0xff],[0xff,0x00,0xff],[0xff,0x00,0x00]]
    const X = x*6/this._width
    const [r, t] = [Math.floor (X), X - Math.floor (X)]
    const bgd = table[r].map ((v, i) => v + t*(table[r+1][i]-v))
      .map (e=>Math.floor(e).toString(16).padStart(2, "0")) .join('')

    this._cursorColor = "#" + bgd
    this.els["cursor"].style.left = x+"px"
    
    this.els["cursor"].children[0].style.backgroundColor = this._cursorColor
    
    this.els["gradient"].style.background = this.els["gradient"].style.background.replace(/0%, .* 100%/, `0%, ${this._cursorColor} 100%`)
    this._updateColor()
  }
  _selectColor (cx, cy) {
    const h = this._height * 19/20
    const x = cx > 0 ? (cx < this._width ? cx : this._width) : 0
    console.log (cx, x)
    const y = cy > 0 ? (cy < h ? cy : h) : 0
    this.els["circle"].style.top =  y + "px"
    this.els["circle"].style.left = x + "px"
    
    this._updateColor()
  }
  _updateColor() {
    const h = this._height * 19/20    
    const y = this.els["circle"].style.top.slice(0,-2)-0
    const x = this.els["circle"].style.left.slice(0,-2)-0
    
    const tx = x/this._width
    const ty = y/h
    let color = this._cursorColor.slice(1)
    color = [color.slice(0,2), color.slice(2,4), color.slice(-2)].map(e => parseInt(e, 16))
      .map(e => (1-ty)*(255*(1-tx)+ tx*e))
      .map(Math.floor)
      .map(e => e.toString(16).padStart(2, "0"))
      .join('')
      .padStart(7, "#000000")
      
    this.els["circle"].children[0].style.background = this._color = color
    this._onchange(this.color)
  }
  get color() {return this._color.toUpperCase()}
}