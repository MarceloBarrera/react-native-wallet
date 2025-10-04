import express from "express";
import {
  getTransactionsByUserId,
  deleteTransactionById,
  createTransaction,
  getTransactionSummary,
} from "../controllers/transactionsController.js";
const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransactionById);

router.post("/", express.json(), createTransaction);

router.get("/summary/:userId", getTransactionSummary);

export default router;
