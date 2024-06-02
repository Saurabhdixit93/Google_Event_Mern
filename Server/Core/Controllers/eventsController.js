import { googleCalendar } from "../Configs/googleApis.config.js";
import { EventModel } from "../Database/DatabassSchemas/eventSchema.js";

export const createEvent = async (req, res) => {
  try {
    const userId = req.UserId;
    const {
      title,
      description,
      participants,
      date,
      time,
      duration,
      sessionNotes,
    } = req.body;

    if (!title || !date)
      return res
        .status(400)
        .json({ message: "Title or Date is missing", status: false });

    const event = new EventModel({
      title,
      description,
      participants,
      date,
      time,
      duration,
      sessionNotes,
      userId,
    });
    await event.save();

    const startDateTime = new Date(`${date}T${time}:00`).toISOString();
    const endDateTime = new Date(
      new Date(startDateTime).getTime() + duration * 60 * 60 * 1000
    ).toISOString();

    const eventGoogle = {
      summary: title,
      description,
      start: { dateTime: startDateTime },
      end: { dateTime: endDateTime },
      attendees: participants.map((email) => ({ email })),
    };

    const googleEvent = await googleCalendar.events.insert({
      calendarId: "primary",
      requestBody: eventGoogle,
    });

    // Save the Google Calendar event ID to MongoDB
    event.googleCalendarEventId = googleEvent.data.id;
    await event.save();

    return res.status(201).json({
      message: "Event created successfully",
      event: event,
      googleEvent: googleEvent.data,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: false,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const userId = req.UserId;
    const events = await EventModel.find({ userId: userId });

    if (events.length === 0 || !events) {
      return res.status(404).json({
        message: "No events found",
        status: false,
      });
    }

    return res.status(200).json({
      events: events,
      status: true,
      message: "Events fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: false,
    });
  }
};

export const updateEvent = async (req, res) => {
  const eventId = req.query.eventId;

  const {
    title,
    description,
    participants,
    date,
    time,
    duration,
    sessionNotes,
  } = req.body;

  try {
    const event = await EventModel.findById(eventId);
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found", status: false });

    event.title = title;
    event.description = description;
    event.participants = participants;
    event.date = date;
    event.time = time;
    event.duration = duration;
    event.sessionNotes = sessionNotes;

    // Update Google Calendar Event
    const googleEvent = {
      summary: title,
      description,
      start: { dateTime: new Date(date).toISOString() },
      end: {
        dateTime: new Date(
          new Date(date).getTime() + duration * 60 * 60 * 1000
        ).toISOString(),
      },
      attendees: participants.map((email) => ({ email })),
    };

    await googleCalendar.events.update({
      calendarId: "primary",
      eventId: event.googleCalendarEventId,
      resource: googleEvent,
    });

    await event.save();
    return res
      .status(200)
      .json({ event, status: true, message: "Event updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
};

export const removeEvent = async (req, res) => {
  const eventId = req.query.eventId;

  try {
    const event = await EventModel.findById(eventId);
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found", status: false });

    // Delete Google Calendar Event
    await googleCalendar.events.delete({
      calendarId: "primary",
      eventId: event.googleCalendarEventId,
    });

    await EventModel.findByIdAndDelete(eventId);
    return res.status(200).json({ message: "Event deleted", status: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
};
