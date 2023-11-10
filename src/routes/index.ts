import express from "express";

import PingController from "../controller/ping";
import HealthController from "../controller/health";
import { ReturnSummaryError } from "../models/errors";

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

router.post("/ping/rec", async (req, res) => {
  try {
    const response = await pingController.postMessageRec(req.body);
    return res.send(response);
  } catch (err) {
    if (err instanceof ReturnSummaryError) {
      res.statusMessage = err.code || "Internal Server Error";
      res.statusCode = err.status || 500;
      return res.send(err.data);
    } else {
      console.error("Erreur inconnue sur /ping/rec");
      console.error(err);
      res.statusMessage = "Internal Server Error";
      res.statusCode = 500;
      return res.send();
    }
  }
});

router.get('/health', async (_req, res) => {
  const response = await healthController.getHealth();
  return res.send(response);
});

export default router;