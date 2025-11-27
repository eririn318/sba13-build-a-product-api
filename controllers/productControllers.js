const Product = require('../models/Product')

// POST /api/products (Create a Product)
const createProduct = async (req, res)=>{
    try{
        const product = await Product.create(req.body)
        // The request succeeded AND a new resource was created on the server. For POST status
        res.status(201).json(product)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
// GET  http://localhost:4000/api/products/
// GET all products
const getAllProducts = async (req,res)=>{
    try{
      const all = await Product.find()
      res.send(all)
    }catch(error){
        res.state(404).json({error: error.message})
    }
}

// GET ID from data first by http://localhost:4000/api/products/ ,then
// GET /api/products/:id (Read a Single Product)
const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({error: "Product not found"})
        res.json(product)    
    }catch(error){
        // error 400=(wrong json format, wrong url format, sending data the backend does't expect etc )
        res.status(400).json({error: error.message})
    }
}
// GET id from http://localhost:4000/api/products/ 
// WRITE data{"name": "eriko kan"}
// THEN PUT http://localhost:4000/api/products/6927b5526d23342e3aeea4a1
// PUT /api/products/:id (Update a Product)
const updatedProduct = async (req, res) => {
    try{
        const updateProduct = await Product.findByIdAndUpdate (
            req.params.id,
            req.body,
            {new:true}
        )
        // error 404 =(server  working, but the thing you asked for is not exist)
        // wrong URL, page route does not match, file was moved or deleted,api endpoint misspelled etc
        if(!updateProduct) return res.status(404).json({error: "Product not found"})
            res.json(updateProduct)
    
        }catch(error){
            // error 500 is internal server error
            res.status(500).json({error: error.message})
        }
    }
// GET id from http://localhost:4000/api/products/6927b5526d23342e3aeea4a1, then
// DELETE /api/products/:id (Delete a Product)
const deleteProduct = async (req, res) => {
    try{
        const removeProduct = await Product.findByIdAndDelete(req.params.id)
        res.json(`Removed product ${removeProduct._id}`)

        if (!removeProduct) return res.status(404).json({error: "Product not found"})
    }catch(error){
    // error 400=(url is wrong or something is wrong (can not read))
        res.status(400).json({error: error.message})
    }
}
// GET http://localhost:4000/api/products/filter?category
// GET http://localhost:4000/api/products/filter?minPrice=10&maxPrice=2500(It will show items with min $10 & max $2500 with displaying "category")
// GET /api/products (Read All Products with Advanced Querying)
const filterProduct = async (req, res)=>{
    try{
        const {minPrice, maxPrice} = req.query
        const filter={}

        if (minPrice || maxPrice) {
            filter.price={}
            // $gte=(greater than or equal to minPrice)
            if(minPrice) filter.price.$gte= Number(minPrice) 
            // $lte=(less thant or equal to maxPrice)
            if(maxPrice) filter.price.$lte=Number(maxPrice)      
            }
            // .select->include category, id will be default
       const category = await Product.find(filter).select({category:1}) 
       res.json(category)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//  GET http://localhost:4000/api/products/sort?sortBy=price&order=asc
 // GET http://localhost:4000/api/products/sort?sortBy=price (SORT BY PRICE)
const sortProduct = async (req, res) => {
    try{
        const {sortBy = 'price', order='asc'} = req.query
        
        // descending if true, highest to lowest, not lowest to highest
        const sortOrder = order === 'desc' ? -1:1
        
        // take sort and put it in sortObj/is that order or descending?
        const sortObj={}
        sortObj[sortBy]=sortOrder

        const products = await Product.find().sort(sortObj).select({price:1})
        res.json(products)

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// GET http://localhost:4000/api/products/pagination?page=1&limit=10->(1st page, limit 10 items -> it has 2 items, it will show all)
// GET http://localhost:4000/api/products/pagination?page=2&limit=10->(2nd page, limit 10 items -> there is no items in 2nd page, it will show [])
const paginatedProduct = async (req, res) =>{
    try{
        const page = parseInt(req.query.page) || 1 //default: page 1
        const limit = parseInt(req.query.limit) || 10 //default: limit10

        //page1: skip(0).limit(10)=>returns documents 1-10
        //page2: skip(1).limit(10)=>returns documents 11-20
        //page3: skip(2).limit(10=>returns documents 21-30
        const pages = await Product.find()
            .sort({price:1})
            .skip((page-1)*limit) 
            .limit(limit)
        res.json(pages)
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


    module.exports = {createProduct,getProductById,updatedProduct,deleteProduct,filterProduct,sortProduct,paginatedProduct,getAllProducts }