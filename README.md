# Video demo
https://www.loom.com/share/2e8eb0a2d63a4529bb323bb2b7a8a2a1?sid=dd313cd8-6629-4ab0-95fb-ccef5fea9e62
# Backend Repository
https://github.com/jiteshjampa/Event-Hub
# Event Management Dashboard

Welcome to the **Event Management Dashboard**! This project aims to streamline the process of managing events, attendees, and task assignments efficiently.

## **Project Overview**
This web-based application allows users to:
- **Event Management:** Perform CRUD operations for events, including adding, editing, and deleting events.
- **Attendee Management:** Manage attendees by viewing, adding, or removing them, and assigning attendees to specific events or tasks.
- **Task Tracker:** Track tasks related to events and update task statuses with visual progress indicators.

The application is built with:
- **Next.js** for frontend development.
- **Tailwind CSS** for responsive design.
- **shadcn** components for UI.
- **Lucide React** for icons.

---

## **Table of Contents**
1. [Installation](#installation)
2. [Folder Structure](#folder-structure)
3. [Features](#features)
4. [API Integration](#api-integration)
5. [Usage Instructions](#usage-instructions)
6. [UI Components](#ui-components)
7. [Development Guidelines](#development-guidelines)

---

## **Installation**

Follow these steps to set up the project locally:

### **1. Clone the Repository:**
```bash
git clone https://github.com/your-repo/event-management-dashboard.git
cd event-management-dashboard
```

### **2. Install Dependencies:**
```bash
npm install
```

### **3. Start the Development Server:**
```bash
npm run dev
```

### **4. Environment Variables:**
Create a `.env.local` file in the root directory and configure the following variables:
```plaintext
MONGODB_URI=your_mongo_connection_string
NEXT_PUBLIC_API_URL=your_api_base_url
```

### **5. Backend Integration:**
Ensure the backend API is running locally or hosted remotely to connect with the frontend.

---

## **Folder Structure**

```plaintext
src/
|-- app/
|   |-- auth/
|   |   |-- login/page.js
|   |   |-- register/page.js
|   |-- attendees/page.js
|   |-- dashboard/page.js
|   |-- events/page.js
|   |-- tasks/page.js
|-- components/
|   |-- Navbar.js
|   |-- EventDetails.js
|   |-- Events.js
|   |-- Attendees.js
|   |-- Tasks.js
```

---

## **Features**

### **1. Event Management Page:**
- List all events with add, edit, and delete functionality.
- Display event details such as name, description, location, and date.

### **2. Attendee Management Page:**
- View, add, and remove attendees.
- Assign attendees to events or tasks.

### **3. Task Tracker Page:**
- Display tasks associated with events.
- Update task statuses between "Pending" and "Completed."

---

## **API Integration**

The following RESTful APIs are used to support frontend functionality:

### **1. Event Management API:**
- `POST /api/events`: Create a new event
- `GET /api/events`: Retrieve all events
- `PUT /api/events/:id`: Update an event
- `DELETE /api/events/:id`: Delete an event

### **2. Attendee Management API:**
- `POST /api/attendees`: Add a new attendee
- `GET /api/attendees`: Get all attendees
- `DELETE /api/attendees/:id`: Remove an attendee

### **3. Task Management API:**
- `POST /api/tasks`: Create a task
- `GET /api/tasks/:eventId`: Get tasks for a specific event
- `PUT /api/tasks/:taskId`: Update task status

---

## **Usage Instructions**

### **1. Event Management:**
- Navigate to the "Events" page.
- Add a new event by clicking the **Add Event** button and filling out the form.
- Edit or delete events using the corresponding buttons.

### **2. Attendee Management:**
- Navigate to the "Attendees" page.
- Add attendees by filling out the form.
- Assign attendees to specific events or tasks.

### **3. Task Tracker:**
- Navigate to the "Tasks" page.
- View and update task statuses for events.

---

## **UI Components**
- **Navbar:** Provides navigation across different sections.
- **EventDetails:** Displays detailed information for a selected event.
- **Events:** Handles event management features.
- **Attendees:** Manages attendee functions.
- **Tasks:** Manages task tracking and status updates.

---

## **Development Guidelines**

### **1. Form Validation:**
- All fields are required for creating or updating events and attendees.
- Ensure valid date formats for event creation.
- Display error messages in red when validation fails.

### **2. Loading Indicators:**
- Use loading indicators while API calls are in progress.

### **3. Success/Error Messages:**
- Provide user feedback for successful or failed operations.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contributing**
Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

### **Contact**
For issues or suggestions, please contact us via [GitHub Issues](https://github.com/your-repo/issues).

