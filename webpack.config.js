// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const webpack = require('webpack');
// vue-loader@15から必要
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
    //mode: 'production',
    mode: 'development',
    // エントリーポイントの設定
    entry: {
        index: './js/index.js',
        config: './js/config.js'
    },
    // 出力の設定
    output: {
        // 出力するファイル名
        filename: '[name].js',
        // 出力先のパス（絶対パスを指定する必要がある）
        path: path.join(__dirname, 'public/js')
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery/dist/jquery.min.js',
            Vue: 'vue/dist/vue.min.js'
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /vue|jquery/,
                    name: "vendor",
                    chunks: "initial",
                    enforce: true
                }
            }
        }
    },
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
