const { src, dest, series, watch  } = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const less = require('gulp-less');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
//const autoprefixer = require('gulp-autoprefixer');

const sync = require("browser-sync").create();

const buildPath = './build/';

function cleanBuild() {
  return src(buildPath, {read: false})
    .pipe(clean());
}

function generateJS() {
  return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    //.pipe(dest(buildPath+'/js'))
    .pipe(uglify())
    //.pipe(rename({ extname: '.min.js' }))
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write(''))
    .pipe(dest(buildPath+'/js'))
    .pipe(sync.stream());
}

function generateVendor() {
  return src('./vendor/*.js')
    .pipe(dest(buildPath+'/js'));
}
function copyFavicon() {
  return src('./src/assets/favicon.ico')
    .pipe(dest(buildPath));
}

function generateHTML() {
    const sources = src([buildPath+'/js/*.js', buildPath+'/css/*.css'], {read: false});
    return src("./src/index.ejs")
        .pipe(ejs({
            title: "Gulp simple example",
        }))
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(inject(sources, {ignorePath: 'build', addRootSlash: true}))
        .pipe(dest(buildPath))
        .pipe(sync.stream());
}

function generateCSS() {
    return src('./src/css/*.less')
        .pipe(less())
        //.pipe(autoprefixer({browsers: ['last 2 versions','>5%']}))
        .pipe(dest(buildPath+'/css'))
        .pipe(src('./src/css/*.css'))
        .pipe(dest(buildPath+'/css'))
        .pipe(sync.stream());
}

exports.build = series(cleanBuild, copyFavicon, generateJS, generateVendor, generateCSS, generateHTML);

function watchFiles() {
    watch('./src/index.ejs', generateHTML);
    watch('./src/css/*.less', generateCSS);
    watch('./src/css/*.css', generateCSS);
    watch([ './src/js/*.js', '!node_modules/**'], generateJS);//parallel(runLinter, runTests));
}

exports.watch = watchFiles;

function browserServeSync(cb) {
    sync.init({
        server: {
            baseDir: buildPath
        },
        port: 8030,
        ui: {
            port: 8031
        }
    });

    watch('./src/index.ejs', generateHTML);
    watch('./src/css/*.less', generateCSS);
    watch('./src/css/*.css', generateCSS);
    watch([ './src/js/*.js', '!node_modules/**'], generateJS);
    
    watch([buildPath + "**.html"]).on('change', sync.reload);
}

exports.serve = series(cleanBuild, copyFavicon, generateJS, generateVendor, generateCSS, generateHTML, browserServeSync);

exports.default = function() {
  return src('src/js/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(dest(buildPath))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(buildPath));
}
