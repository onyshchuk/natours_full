const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = (env, options) => {
   const isProduction = options.mode === 'production'

   return {
      entry: './src/index.js',
      output: {
         path: path.join(__dirname, 'public', 'dist'),
         filename: 'bundle.js',
      },
      module: {
         rules: [
            {
               loader: 'babel-loader',
               test: /\.js$/,
               exclude: /node_modules/,
            },
            {
               test: /\.s?css$/,
               use: [
                  MiniCssExtractPlugin.loader,
                  {
                     loader: 'css-loader',
                     options: { sourceMap: true },
                  },
                  {
                     loader: 'postcss-loader',
                     options: {
                        plugins: [autoprefixer],
                     },
                  },
                  {
                     loader: 'sass-loader',
                     options: { sourceMap: true },
                  },
               ],
            },
            {
               test: /\.(png|woff|woff2|eot|ttf|svg)$/,
               exclude: [/\.inline\.svg$/],
               loader: 'file-loader',
               options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
               },
            },
         ],
      },
      optimization: {
         minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
      plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
      devtool: isProduction ? 'source-map' : 'inline-source-map',
      devServer: {
         overlay: true,
         contentBase: path.join(__dirname, 'public'),
         historyApiFallback: true,
         publicPath: '/dist/',
      },
   }
}
