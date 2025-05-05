# Full Stack Engineering Challenge

## Scenario

You’ve joined a growing software company that’s building a lightweight task management tool. The application already supports creating and displaying tasks, and the backend supports nested (self-referencing) tasks through a parent-child relationship.

Your job is to extend the application’s functionality to enable users to **create subtasks via the UI**, and extend the backend API to retrieve subtasks on demand.

This task is designed to assess your ability to work with a real-world React + NestJS codebase, understand context quickly, and deliver clean, functional improvements.

---

## Tech Stack

This application is built with:

- **Frontend**: React (with TypeScript + Context API)
- **Backend**: NestJS (with TypeORM and SQLite)
- **Database**: SQLite (in-memory)
- **Containerisation**: Docker + Docker Compose
- **Build Tools**: Vite (frontend), Nest CLI (backend)

---

## What’s Included

- `frontend/` — React app that renders and creates top-level tasks.
- `backend/` — NestJS API that supports nested tasks via a self-referencing entity.
- `docker-compose.yml` — launches both services together.
- `nginx.conf` — proxies API calls from frontend to backend.
- `README.md` — this file.

---

## What Works Now

- You can **add top-level tasks** from the UI.
- Tasks (and their nested subtasks) are displayed recursively.
- Tasks are saved via the backend into an in-memory SQLite database.
- API routes:
  - `GET /api/tasks` — fetch all tasks with nested subtasks
  - `POST /api/tasks` — create a task (optionally with `parentId`)

---

## Your Challenge

To update both frontend and backend to do the following:

### Frontend

- Add UI controls to allow users to create subtasks under any existing task.
- Wire these to the backend using the existing `createTask(title, parentId)` API call.
- Ensure newly created subtasks appear nested under their parent task.

### Backend

- Add a new route to the NestJS backend:
  - `GET /api/tasks/:id/subtasks`
- This should return all tasks where the `parentId` matches the given `id`.
- Implement the corresponding service method in `TasksService`.

You may use TypeORM relations to perform the query. Keep the structure clean and RESTful.

---

## 🧪 Getting Started

### 1. Build the project

```bash
docker-compose up --build
```

This starts:
- React frontend on [http://localhost:8080](http://localhost:8080)
- NestJS backend on [http://localhost:3000](http://localhost:3000) (proxied via NGINX)

### 2. Add tasks via UI and verify that tasks render correctly.

---

## Submission

This task is intentionally designed to be focused and time-efficient. We expect that it should take no more than 2 to 4 hours, including time to record a brief walkthrough and reflect on improvements.

When you're done, please submit:

- A link to your Git repo.
- A short description of what you implemented and why (this can be as simple as updating this very README).
- A short video walkthrough describing your solution, key decision points, and the code structure.
- A brief roadmap outlining what you would improve or expand on with more time.

---

## 📌 Technical Challenge Summary
### ✅ What Was Implemented
1. **Refactored findAll Function (tasks.service.ts)**
    - Improved the logic of the findAll service to ensure that the Task entity is fully serialized, including proper handling of the subtasks field.
    - This change ensures that all task data, including deeply nested subtasks, is returned consistently via the API endpoint.

2. **Validation in App.tsx**
    - Added a simple client-side validation to prevent the creation of tasks with an empty title.
    - This enhances user experience by reducing invalid or empty task entries at the UI level.

3. **UI Support for Nested Subtasks**
    - Introduced intuitive UI controls allowing users to create subtasks under any existing task.
    - The implementation supports unlimited levels of nested subtasks, enabling flexible and complex task hierarchies.

### 🧠 Why These Changes Were Made
- **Data Integrity**: Ensuring complete serialization of Task entities, including subtasks, provides a more robust and reliable API.

- **User Experience**: Preventing empty task title submissions and enabling nested task creation improves both functionality and usability of the task management feature.

- **Scalability**: Supporting unlimited nesting of subtasks allows the app to accommodate more complex project or workflow requirements.

## 🛣️ Roadmap / Future Improvements
With additional time and resources, the following improvements and enhancements are planned:

1. **Frontend UI Enhancements**
    - Integrate popular UI libraries or frameworks such as Material UI, Tailwind CSS, or Bootstrap to modernize the interface and improve consistency, responsiveness, and accessibility.

2. **Improved Data Serialization Strategy**
    - Replace the manual use of TaskRepository.find() with class-transformer to handle deep serialization directly at the entity level.
    - Alternatively, implement a Read-Only DTO structure to separate data formatting concerns from business logic and improve maintainability.

3. **Advanced Form Handling**
    - Replace basic input handling with Formik for a more structured form management experience.
    - Implement Yup for comprehensive form validation, providing clearer user feedback and reducing the chance of invalid data submission.

4. **Real-Time Collaboration**
    - Enable real-time updates using WebSockets or services like Firebase, allowing multiple users to collaborate on tasks and subtasks simultaneously.

5. **User Authentication and Role-Based Access Control**
    - Add secure user login and signup functionality with role-based permissions (e.g., admin, editor, viewer) to control task visibility and editing rights.
  
6. **Task Scheduling and Reminders**
    - Integrate date pickers and notification systems to allow users to set due dates and receive reminders via email or in-app alerts.
    - This helps users stay on track with deadlines and improves time management within the tool.