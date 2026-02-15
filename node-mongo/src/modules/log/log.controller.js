import { Router } from "express";
import { addNewLog, createCappedLogs } from "./log.service.js";

const router = Router();


//////////////////////////////////////////////////////////////////

// 3 - 

router.post("/collection", (req, res, next) => {
  try {
    createCappedLogs();

    res.status(201).json({
      message: "logs capped collection created successfully!",
      success: "true",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//////////////////////////////////////////////////////////////////

// 7 - 

router.post('/', async (req, res, next) => {
  try {
  const result = await addNewLog(req.body);
    
    res.status(201).json({
      message: "log added successfully",
      success: true,
      result
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success:false
    })
  }
})

export default router;
