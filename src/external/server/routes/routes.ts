import { Router } from "express";

import UserRoutes from "./_user";
import AuthRoutes from "./_auth";

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('rota inicial');
})

router.use(AuthRoutes);
router.use(UserRoutes);

export {
    router
}