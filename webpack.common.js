const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: {
          app: './src/main.js',
           },
        module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
        },
    plugins: [
         new HtmlWebpackPlugin({
               title: "Notes.app",
             favicon: "./src/assets/favicon.ico",
             template: "./src/index.html",
             inject: "body"
         }),
   ],
   output: {
        filename: '[name].bundle.js',
             path: path.resolve(__dirname, 'dist'),
             clean: true,
           },
 };
