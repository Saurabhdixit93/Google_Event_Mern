import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  getAllEvents,
  removeEvent,
  updateSingleEvent,
} from "../redux/Slices/eventSlices";

const Calendar = () => {
  const dispatch = useDispatch();
  const { AllEvents, loading } = useSelector((state) => state.events);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      return dispatch(getAllEvents())
        .unwrap()
        .then((_) => {
          return;
        })
        .catch((_) => {
          return;
        });
    };
    fetchEvents();
  }, [dispatch]);

  const handleDateClick = (info) => {
    setSelectedEvent({
      date: info.dateStr,
      time: "00:00",
      duration: 1,
      title: "",
      description: "",
      participants: [],
      sessionNotes: "",
      id: null,
    });
  };

  const handleEventClick = (info) => {
    const event = AllEvents.find((event) => {
      return event._id === info.event._def?.extendedProps?._id;
    });
    setSelectedEvent(event);
  };

  const handleEventSave = async (event) => {
    if (event._id) {
      return dispatch(updateSingleEvent({ data: event, eventId: event._id }))
        .unwrap()
        .then((_) => {
          return setSelectedEvent(null);
        })
        .catch((_) => {
          return;
        });
    } else {
      return dispatch(createEvent(event))
        .unwrap()
        .then((_) => {
          return setSelectedEvent(null);
        })
        .catch((_) => {
          return;
        });
    }
  };

  const handleEventDelete = async (id) => {
    return dispatch(removeEvent(id))
      .unwrap()
      .then((_) => {
        return setSelectedEvent(null);
      })
      .catch((_) => {
        return;
      });
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : (
        <>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={AllEvents}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />

          {selectedEvent && (
            <EventForm
              event={selectedEvent}
              onSave={handleEventSave}
              onDelete={handleEventDelete}
              setSelectedEvent={setSelectedEvent}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Calendar;
