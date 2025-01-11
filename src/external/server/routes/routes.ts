import { Router } from "express";
import RouteGrouping from 'express-route-grouping';

import UserRoutes from "./_user";
import AuthRoutes from "./_auth";

const router: Router = Router();
const root = new RouteGrouping();

router.get('/', (req, res) => {
    res.send('rota inicial');
})

router.use(AuthRoutes);
router.use(UserRoutes);

// root.group('/api', () => {
// })

// router.use(root.getRouter());

export {
    router
}