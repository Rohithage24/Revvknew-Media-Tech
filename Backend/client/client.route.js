import e from 'express';
import multer from 'multer';
import path from 'path';
import { createData , getClint } from '../client/client.controller.js';

const router = e.Router();


 

router.post('/posts',  createData);
router.get('/posts/:slug',getClint)

export default router;