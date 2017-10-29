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
