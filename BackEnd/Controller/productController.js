import imagekit from "../Config/ImageKit.js";
import fs from "fs";
import ProductModel from "../models/ProductModels.js"
import productModel from "../models/ProductModels.js";

const AddProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [
      image1,
      image2,
      image3,
      image4,
    ].filter((item) => item !== undefined);

    const imageURL = await Promise.all(
      images.map(async (item) => {

        const result = await imagekit.upload({
          file: fs.readFileSync(item.path),
          fileName: item.originalname,
        });

        return result.url;
      })
    );
    const productData={
         name,
      description,
      price:Number (price),
      category,
      subCategory,
      bestseller:bestseller === "true"? true:false,
      sizes: JSON.parse(sizes),
      image:imageURL,
      date:Date.now()
    }
    console.log(productData);

    const product =new ProductModel(productData);
    await product.save();

    // console.log("Product Data:");
    // console.log({
    //   name,
    //   description,
    //   price,
    //   category,
    //   subCategory,
    //   sizes,
    //   bestseller,
    // });

    // console.log("Image URLs:", imageURL);

    // res.json({
    //   success: true,
    //   data: {
    //     name,
    //     description,
    //     price,
    //     category,
    //     subCategory,
    //     sizes,
    //     bestseller,
    //     images: imageURL,
    //   },
    // });
    res.json({success:true,message:"product added"})

  } catch (error) {
    console.log("Add Product Error:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};


const ListProduct = async (req, res) => {
       try {
        const products=await ProductModel.find({});
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error)        
        res.json({success:false,message:error.message})
        
    }
  
};


const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product Remove"})
        
    } catch (error) {
        console.log(error)
                res.json({success:false,message:error.message})

        
    }
 
};


const singleProduct = async (req, res) => {

    // only admin delete
    try {
        const{productId}=req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
         console.log(error)
                res.json({success:false,message:error.message})
        
    }
  
};

// 

export {
  AddProduct,
  ListProduct,
  removeProduct,
  singleProduct,
};