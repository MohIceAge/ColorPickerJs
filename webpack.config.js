const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

 module.exports = {
     entry: './app.js',
     output: {
         path: __dirname,
         filename: 'bundle.js'
     },
     plugins: [
        //new UglifyJSPlugin()
     ]
 };