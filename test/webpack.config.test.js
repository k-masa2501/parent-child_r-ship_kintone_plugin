const webpack = require('webpack');
// vue-loader@15����K�v
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
                test: /\.vue$/, // �t�@�C����.vue�ŏI����...
                loader: 'vue-loader' // vue-loader���g��
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
