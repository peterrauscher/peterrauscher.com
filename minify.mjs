import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";

(async () => {
  await imagemin(["posts/thumbnails/*.jpg"], {
    destination: "src/assets/thumbnails",
    plugins: [imageminJpegtran()],
  });
})();
