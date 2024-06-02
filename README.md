## Features

### Calendar Management

#### Calendar View

- Interactive calendar view displaying the user’s schedule.
- Users can click on dates and time slots to view and manage appointments.
- Event creation can be triggered by clicking anywhere on the calendar.

#### Event Creation

- Pop-up form for event creation with the following fields:
  - Event title
  - Description
  - List of participants
  - Date (supports dd-mm-yyyy, mm-dd-yyyy & yyyy-mm-dd)
  - Time (supports 12 & 24 hours format)
  - Duration (in hours)
  - Session notes
- Includes validation for required fields and proper data formats.

### Google Calendar Integration

#### Google Calendar Sync

- Integrates with Google Calendar API to sync events.
- Allows users to authorize Evallo to access their Google Calendar and manage events.
- Ensures that any event created, updated, or deleted in the calendar reflects in the user’s Google Calendar (two-way sync).
- Provides clear feedback for successful or failed integrations.

## Backend Development

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

### Setup

1. Initialize a Node.js project:
   ```bash
   npm init -y
   ```

````

2. Install necessary dependencies:

   ```bash
   npm install express mongoose googleapis
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5000
   MONGO_URI=<Your MongoDB URI>
   GOOGLE_CLIENT_ID=<Your Google Client ID>
   GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
   GOOGLE_REDIRECT_URI=<Your Google Redirect URI>
   JWT_SECRET=<Your JWT Secret>
   CLIENT_URL=<Client side base url>
   ```

4. Set up MongoDB using Mongoose for event storage.

5. Implement OAuth 2.0 flow for Google Calendar integration:
   - On user login, if no user exists with the provided email, create a new account.

## Frontend Development

### Technologies Used

- React.js
- Tailwind CSS
- FullCalendar

### Setup

1. Initialize a React.js project:

   ```bash
   npx create-react-app evallo-calendar
   ```

2. Install necessary dependencies:

   ```bash
   npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction axios
   ```

3. Create a `.env` file with the following variables:

   ```
   REACT_APP_BACKEND_BASE=<Your API Base URL>
   ```

   ```
   REACT_APP_GOOGLE_CLIENT_ID=<google client id>
   ```

4. Configure FullCalendar for the calendar view.

5. Build the event creation form using controlled components.

6. Fetch events from the backend and display them on the calendar.

7. Implement Google Calendar integration management interface.

## Running the Application

### Backend

1. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Start the React development server:
   ```bash
   npm start
   ```

## API Endpoints

### Events

- `GET /events/all-events`: Retrieve all events.
- `POST /events/new-event`: Create a new event.
- `PUT events/update-event=${eventId}`: Update an existing event.
- `DELETE /events/remove?eventId=${eventId}`: Delete an event.

### Google Calendar

- `GET /auth/login`: Get the Google OAuth URL.
- `GET /oauth2callback`: Handle the OAuth callback.
- `GET /google/authUrl`: Retrive tokens for access.

## Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [FullCalendar](https://fullcalendar.io/)
- [Google Calendar API](https://developers.google.com/calendar)
- [Tailwind CSS](https://tailwindcss.com/)

## Contact

For any inquiries, please contact [smartds2550@gmail.com].

```

### Explanation

- **Introduction**: Provides a brief overview of the project.
- **Features**: Lists the main features of the calendar system.
- **Backend Development**: Details the technologies used, setup instructions, and OAuth implementation.
- **Frontend Development**: Describes the technologies used, setup instructions, and the integration of FullCalendar.
- **Running the Application**: Instructions for running both the backend and frontend servers.
- **API Endpoints**: Lists the API endpoints available for events and Google Calendar operations.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Information about the project’s license.
- **Acknowledgements**: Credits to the tools and libraries used in the project.
- **Contact**: Contact information for inquiries.
```
````
