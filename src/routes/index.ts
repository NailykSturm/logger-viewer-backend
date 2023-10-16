import express from "express";

import PingController from "../controller/ping";
import HealthController from "../controller/health";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get('/health', async (_req, res) => {
    const controller = new HealthController();
    const response = await controller.index();
    return res.send(response);
});

export default router;