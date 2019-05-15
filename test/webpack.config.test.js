const webpack = require('webpack');
// vue-loader@15から必要
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'production',
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery/dist/jquery.min.js',
            Vue: 'vue/dist/vue.min.js'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {   test: /\_template.html$/,
                loader: 'html-loader' 
            }
            ,{
                test: /\.vue$/, // ファイルが.vueで終われば...
                loader: 'vue-loader' // vue-loaderを使う
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    }
};
