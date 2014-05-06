var gulp = require('gulp'),
  sass = require('gulp-sass'),
  refresh = require('gulp-livereload'),
  concat = require('gulp-concat'),
  lr = require('tiny-lr')(),
  ecstatic = require('ecstatic'),
  http = require('http'),
  lrport = 35729,
  devport = 1337;

gulp.task('sass', function(){
  gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css/'))
    .pipe(refresh(lr));;
});

gulp.task('watch', function() {
  http.createServer(
    ecstatic({
      root: __dirname + '/',
      autoIndex: true
    })
  ).listen(devport);
  lr.listen(lrport, function(err) {
    if(err) return console.log(err);

    gulp.watch('sass/*.scss', function() {
      gulp.run('sass');
    });

    gulp.watch(['index.html'], function (e) {
      lr.changed({body: {files: e.path}});
    })

  })
});