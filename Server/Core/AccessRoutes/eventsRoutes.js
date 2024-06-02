import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  removeEvent,
  updateEvent,
} from "../Controllers/eventsController.js";
const eventRouter = Router();

eventRouter.post("/new-event", createEvent);
eventRouter.get("/all-events", getAllEvents);
eventRouter.put("/update-event", updateEvent);
eventRouter.delete("/remove-event", removeEvent);

export default eventRouter;
