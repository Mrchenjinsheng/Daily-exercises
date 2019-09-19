const path = require('path')
const htmlWebapckPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebapckPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    devServer:{
        open:true,
        hot:true,
        port:5000,
        contentBase:'./src',
        // host:'192.168.1.103'
    },
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.sass$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
            {test:/\.(jpg|png|gif|jpeg|gfig)$/,use:'url-loader?name=[hash:8]-[name].[ext]'}
        ]
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }
}