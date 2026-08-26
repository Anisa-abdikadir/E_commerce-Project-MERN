import express from "express";

import {
    AddProduct,
    ListProduct,
    removeProduct,
    singleProduct,
        updateProduct

} from "../Controller/productController.js";

import upload from "../Middleware/Multer.js";
import AdminAuth from "../Middleware/AdminAuth.js";

const ProductRouter = express.Router();

ProductRouter.post(
    "/add",AdminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 }
    ]),
    AddProduct
);

ProductRouter.get("/List", ListProduct);
// ProductRouter.post("/single",AdminAuth, singleProduct);
ProductRouter.get("/single/:id", singleProduct);
ProductRouter.post("/remove", removeProduct);
//upadte product
ProductRouter.put("/update/:id", AdminAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
]), updateProduct);



export default ProductRouter;