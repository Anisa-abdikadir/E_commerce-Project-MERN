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


// const singleProduct = async (req, res) => {

//     // only admin delete
//     try {
//         const{productId}=req.body
//         const product = await productModel.findById(productId)
//         res.json({success:true,product})
        
//     } catch (error) {
//          console.log(error)
//                 res.json({success:false,message:error.message})
        
//     }
  
// };
const singleProduct = async (req, res) => {

    try {

        const { id } = req.params

        const product = await productModel.findById(id)

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            })
        }

        res.json({
            success: true,
            product
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }
}


//upadte product
const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body;

    const product = await productModel.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found"
      });
    }

    // Images cusub haddii admin soo geliyo
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const newImages = [
      image1,
      image2,
      image3,
      image4
    ].filter(Boolean);

    let imageURL = product.image;

    // Haddii images cusub la soo geliyo
    if (newImages.length > 0) {

      const uploadedImages = await Promise.all(
        newImages.map(async (item) => {

          const result = await imagekit.upload({
            file: fs.readFileSync(item.path),
            fileName: item.originalname,
          });

          return result.url;
        })
      );

      imageURL = uploadedImages;
    }

    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.category = category;
    product.subCategory = subCategory;
    product.sizes = JSON.parse(sizes);
    product.bestseller = bestseller === "true";
    product.image = imageURL;

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully"
    });

  } catch (error) {

    console.log("Update Product Error:", error);

    res.json({
      success: false,
      message: error.message
    });
  }
};


// 

export {
  AddProduct,
  ListProduct,
  removeProduct,
  singleProduct,
  updateProduct

};