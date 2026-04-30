const router = require("express").Router();

const upload = require("../middleware/upload");
const { uploadImage } = require("../controllers/uploadController");

router.post("/", upload.single("image"), uploadImage);

module.exports = router;