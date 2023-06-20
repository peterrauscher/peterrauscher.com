import fs from "fs";
import gulp from "gulp";
import imagemin from "gulp-imagemin";

const THUMBNAIL_DIRECTORY = "posts/thumbnails";
const THUMBNAIL_OUTPUT_DIRECTORY = "src/assets/thumbnails";

if (!fs.existsSync(THUMBNAIL_OUTPUT_DIRECTORY)) {
  fs.mkdirSync(THUMBNAIL_OUTPUT_DIRECTORY, { recursive: true });
}

export default () =>
  gulp
    .src(`${THUMBNAIL_DIRECTORY}/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(THUMBNAIL_OUTPUT_DIRECTORY));
