"use strict"

const{src, dest} = require("gulp")
const gulp = require("gulp")
const autoprefixer = require("gulp-autoprefixer")
const cssbeautify = require("gulp-cssbeautify");
const removecomments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require('sass'));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const { watch } = require("browser-sync");
const browserSync = require("browser-sync").create();

const srcPath = "src/"
const distPath = "dist"

const path = {
    build: {
        html: distPath,
        css: distPath + "css/",
        js: distPath + "js/",
        images: distPath + "img/",
        fonts: distPath + "fonts/",
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "scss/**/*.scss",
        js: srcPath + "js/*.js",
        images: srcPath + "img/**/*.{jpeg, png, svg, webp, ico, webmanifest, json, xml}",
        fonts: srcPath + "fonts/**/*.{eot, woff, woff2, ttf, svg}",
    },
    watch: {
        html: srcPath + "**/*.html",
        css: srcPath + "scss/**/*.scss",
        js: srcPath + "js/**/*.js",
        images: srcPath + "img/**/*.{jpeg, png, svg, webp, ico, webmanifest, json, xml}",
        fonts: srcPath + "fonts/**/*.{eot, woff, woff2, ttf, svg}",
    },
    clean: "./" + distPath
}

function html() {
    return src(path.src.html, {base:srcPath})
    .pipe(dest(path.build.html))
}

function css() {
    return src(path.src.css, {base: srcPath + "scss/**/*.scss"})
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
}

exports.html = html
exports.css = css