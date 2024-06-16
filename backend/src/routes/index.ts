import { Router } from 'express';
import adminRoutes from './admin.routes';
import authRoutes from './auth.routes'
import clientRoutes from './client.routes'

const router = Router();

router.use('/admin', adminRoutes);
router.use(authRoutes);
router.use(clientRoutes);

export default router;