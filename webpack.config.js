var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        react: "./src/js/main.js"
    },
    output: {
        /*
        Note that the webpack-dev-server requires output.path to be an absolute path, at least when run through
        Gulp:  see http://stackoverflow.com/questions/34371029/cannot-start-webpack-dev-server-with-gulp.

        The dev server will work with an absolute value like /build/js, because, apparently, the dev server
        takes the "/" to be the server's document root.  However, the webpack build process will throw
        an "access denied" error (at least on the Mac), apparently taking the "/" to be the file system root.

        The value below works for the build task, but not the dev-server task.
         */
        path: './build/js',
        publicPath: "/js",
        filename: "reactjs-example.js"
    },
    module: {
        loaders: [
            { test: /\.js$/,   loader: "babel",  exclude: /(node_modules|bower_components)/ },
            { test: /\.jsx$/,   loader: "babel",  exclude: /(node_modules|bower_components)/ }
        ]
    }

};
