// import express from 'express';
// const router = express.Router();

// router.post('/login', (req, res) => {
//     res.json({ message: "Login successful" }); // Temporary stub
// });

// export default router;


import express from 'express'
import { login ,verify} from '../controllers/authController.js'

import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/login',login)
router.post('/verify',authMiddleware,verify)
export default router