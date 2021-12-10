const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
    },
    entry: {
        index: path.resolve(__dirname, "src", "main.ts") 
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html")
        })
    ]
};
