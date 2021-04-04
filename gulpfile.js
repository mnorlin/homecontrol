const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");
const base64 = require("gulp-base64-inline");

gulp.task("default", () => {
  return gulp
    .src("./build/index.html")
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(replace('href="/img/', 'href="inline(/img/'))
    .pipe(replace('.png"/>', '.png)"/>'))
    .pipe(replace('.svg"/>', '.svg)"/>'))
    .pipe(
      base64("../public", {
        prefix: "",
        suffix: "",
      })
    )
    .pipe(
      inlinesource({
        compress: false,
        ignore: ["png"],
      })
    )
    .pipe(gulp.dest("./release"));
});
