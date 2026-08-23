import  express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ConnectDB from './Config/Mongodb.js'
import userRout from './routers/userRout.js'
import ProductRouter from './routers/ProductRouter.js'
import cartRouter from './routers/cartRouter.js'
import authUser from './Middleware/auth.js'
import orderRouter from "./routers/orderRouter.js"

//app config
const app =express()
const port=process.env.PORT || 4000

//Middle wares
app.use (express.json())
app.use(cors())

ConnectDB()

// api end poin
app.use('/api/user',userRout)
app.use('/api/product',ProductRouter)
app.use('/api/cart',authUser,cartRouter)
app.use('/api/order', orderRouter);



app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen( port,()=>
console.log('server start port on :'+port))