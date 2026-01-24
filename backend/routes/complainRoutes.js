import express from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares';
import {complainController} from '../controllers/complainController'
const complainrouter=express.Router();

complainrouter.post('/compain_page',authMiddleware,complainController);

export default complainrouter;

