const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");
const base64 = require("gulp-base64-inline");
const textTransformation = require("gulp-text-simple");
const prettier = require("prettier");

function moveLine(s) {
  const formatted = prettier.format(s, { parser: "html" });
  const lines = formatted.split("\n");
  const scriptIndex = lines.findIndex((line) => line.trim().startsWith("<script"));
  const scriptLine = lines.splice(scriptIndex, 1);
  lines.splice(scriptIndex + 6, 0, scriptLine);
  return lines.join("\n");
}

const moveLineTransform = textTransformation(moveLine);

gulp.task("default", () => {
  return gulp
    .src("./build/index.html")
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(replace('href="/img/', 'href="inline(/img/'))
    .pipe(replace('.png"/>', '.png)"/>'))
    .pipe(replace('.svg"/>', '.svg)"/>'))
    .pipe(moveLineTransform())
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
