import { Router } from "express";
import { createCollectionImplicit } from "./author.service.js";

const router = Router();

//////////////////////////////////////////////////////////////////

// 2 - 

router.post("/collection", async (req, res, next) => {
  try {
      const insertedData = await createCollectionImplicit(req.body);
      res.status(201).json({
          message: "author created successfully",
          success: true,
          insertedData
      })
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
