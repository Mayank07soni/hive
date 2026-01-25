import express from 'express';
import authMiddleware  from '../middlewares/authMiddlewares.js';
import complainController from '../controllers/complainController.js'
const complainrouter=express.Router();

complainrouter.post('/compain_page',authMiddleware,complainController);

export default complainrouter;

