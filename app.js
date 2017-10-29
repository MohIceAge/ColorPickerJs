const ColorPicker = require ('./main')

new ColorPicker (document.getElementById('colorpicker'), {
  width: 640,
  height: 360,
  onchange: e => console.log(e)
})