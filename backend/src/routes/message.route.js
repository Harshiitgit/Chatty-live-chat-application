import express from "express"
import { protectRouter } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessages, searchUsers } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectRouter,getUsersForSidebar);
router.get("/search",protectRouter,searchUsers);
router.get("/:id",protectRouter,getMessages);
router.post("/send/:id",protectRouter,sendMessages);

export default router;