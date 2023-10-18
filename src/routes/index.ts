import express from "express";

import PingController from "../controller/ping";
import HealthController from "../controller/health";

const router = express.Router();

const pingController: PingController = PingController.getInstance();
const healthController: HealthController = HealthController.getInstance();

router.get("/ping", async (_req, res) => {
  const response = await pingController.getMessage();
  return res.send(response);
});

router.post("/ping", async (req, res) => {
  const response = await pingController.postMessage(req.body);
  return res.send(response);
});

router.get('/health', async (_req, res) => {
  const response = await healthController.index();
  return res.send(response);
});

export default router;