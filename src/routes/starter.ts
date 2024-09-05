
const {express,Request,Response} = require("express")
const route = express.Router()
import multer from "multer";


const storageEngine = multer.diskStorage({
    destination: "./images/categories",
});

const upload = multer({
    storage: storageEngine,
});

route.post("/addCategory",upload.single("image"), ()=>{})


module.exports = route;