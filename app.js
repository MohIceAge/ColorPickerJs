const ColorPicker = require ('./main')
const ColorValueDiv = document.getElementById('color-value')

const picker = new ColorPicker (document.getElementById('colorpicker'), {
  width: 640,
  height: 360,
  onchange: e => {
      ColorValueDiv.style.backgroundColor = ColorValueDiv.innerText = e
      const [red, green, blue] = [e.slice(-6,-4),e.slice(-4,-2),e.slice(-2)]
        .map (e=>parseInt(e, 16))
      let gray = (red * 0.3 + green * 0.59 + blue * 0.11)/255
      if (gray > 0.5) ColorValueDiv.style.color = "black"
      else ColorValueDiv.style.color = "white"
    }
})

picker.color = "#9E593B"