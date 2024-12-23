import express from 'express';
import propertyController from '../controllers/property-controller';

const router = express.Router();

router.get('/',propertyController.index);
router.get('/search',propertyController.search);
router.post('/',propertyController.store);


export default router;