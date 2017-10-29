// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/repeat
if (!String.prototype.padStart) {
    String.prototype.padStart = function (count, str) {
      return (str || ' ').repeat(count - this.length).substr(0,count) + this;
    };
  }