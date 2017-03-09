'use strict'
// gulpを使えるように
var gulp = require('gulp');
var sass = require('gulp-sass');
// CSSのminify
var cssmin = require('gulp-cssmin');
// autoprefixerを自動で追加
var autoprefixer = require('gulp-autoprefixer');
// watchを止めないように
var plumber = require('gulp-plumber');
// LiveReload
var browserSync = require('browser-sync').create();

gulp.task('browsersync', function() {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
});

gulp.task('browserSyncReload', function () {
  browserSync.reload();
});

gulp.task( 'copy', function() {
    gulp.src('src/*.html').pipe( gulp.dest('dist') );
} );

gulp.task('sass', function() {
  // gulp.src()実行させたいファイルを指定
  gulp.src('src/style/*.scss')
  // pipe()処理させたいものを記述
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(plumber())
  // gulp.dest()ファイル出力先を指定
  .pipe(gulp.dest('dist/style/'))
  .pipe(browser.reload({stream:true}))
})

//タスク名にdefaultを指定してgulpのみで実行できるように
gulp.task('default',['browsersync'], function() {
  // 実行させる元のファイル指定と、実行タスク
  // build
  gulp.watch('src/*.html', ['copy']);
  gulp.watch('src/style/*.scss', ['sass']);
  // reload
  gulp.watch("src/*.html", ['browserSyncReload']);
  gulp.watch("src/style/*.scss", ['browserSyncReload']);
});
