import express from 'express'
import authUser from '../Middleware/auth.js'

import { addToCard,UpdateCart,getUserCart } from '../Controller/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCard)
cartRouter.post('/Update',authUser,UpdateCart)


export default cartRouter