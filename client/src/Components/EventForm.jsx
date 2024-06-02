import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";

const EventForm = ({ event, onSave, onDelete, setSelectedEvent }) => {
  const [formData, setFormData] = useState(event);
  const { createLoading, removeLoading } = useSelector((state) => state.events);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(formData?._id);
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 `}
      style={{ zIndex: "200000" }}
    >
      <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-3 w-full">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {formData?._id ? "Edit Event" : "Create Event"}
          </h2>

          <MdCancel
            className="text-3xl cursor-pointer dark:text-white"
            onClick={() => setSelectedEvent(null)}
          />
        </div>
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 gap-4 max-h-[80vh] overflow-y-auto hide-scrollbar"
        >
          <div>
            <label className="text-gray-700 dark:text-white">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 dark:border-gray-700 border dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-white">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-white">
              Participants (comma separated emails)
            </label>
            <input
              type="text"
              name="participants"
              placeholder="Enter participant emails separated by comma"
              value={formData.participants.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  participants: e.target.value
                    .split(",")
                    .map((email) => email.trim()),
                })
              }
              className="w-full p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-white">Date</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              placeholder="Enter event date"
              value={new Date(formData.date).toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-white">Time</label>
            <input
              type="time"
              name="time"
              placeholder="Enter event time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-white">
              Duration (hours)
            </label>
            <input
              type="number"
              name="duration"
              placeholder="Enter event duration in hours"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-white">
              Session Notes
            </label>
            <textarea
              type="text"
              placeholder="Enter session notes"
              name="sessionNotes"
              value={formData.sessionNotes}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md resize-none"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              createLoading || removeLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {createLoading
              ? formData?._id
                ? "Updating"
                : "Creating"
              : formData?._id
              ? "Update"
              : "Create"}
          </button>
          {formData?._id && (
            <button
              onClick={handleDelete}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                createLoading || removeLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {removeLoading ? "Deleting" : "Delete"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventForm;
