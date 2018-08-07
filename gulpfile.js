const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const errorHandler = require('gulp-error-handle');

gulp.task('sass', () => {

  return gulp.src('./frontend/scss/main.scss') 
  .pipe(errorHandler()) 
    .pipe(sourcemaps.init()) 
    .pipe(sass({outputStyle: 'compressed'})) 
    .pipe(sourcemaps.write()) 
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })) 


    .pipe(gulp.dest('./frontend/css')) 
    .pipe(browserSync.stream()); 

});

gulp.task('serve', ['sass'], () => {

  browserSync.init({
    server: "./frontend"
  }); 

  gulp.watch("frontend/scss/**/*.scss", ['sass']); 
  gulp.watch("*.html").on('change', browserSync.reload); 
});

gulp.task('watch', () => {
  gulp.watch('./frontend/scss/**/*', ['sass']);
});