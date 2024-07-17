# Task Management System

## Description
This project is a Task Management System that enables users to manage their tasks effectively. Users can:

- Create new tasks with a title, description, due date, and priority level.
- View a list of all tasks with options to sort by due date, priority, and creation date.
- Edit task details, including changing the status to "in-progress" or "completed".
- Delete tasks that are no longer needed.
- Filter tasks by status (all, in-progress, completed) and search by keywords in the title or description.
- View a dashboard with statistics such as the number of tasks completed, tasks in progress, and overdue tasks.

## Features
- **Create Tasks:** Add new tasks with detailed information.
- **View Tasks:** List and sort tasks by various criteria.
- **Edit Tasks:** Update task information and status.
- **Delete Tasks:** Remove tasks from the list.
- **Filter and Search:** Easily find specific tasks.
- **Dashboard:** Track productivity with task statistics.

## Technology Stack
- **Frontend:** React
- **State Management:** Redux
- **Backend:** Node.js with Express (mock backend using JSON Server)
- **Version Control:** Git

## Setup and Installation

#### Prerequisites
- Node.js
- npm
- TypeScript

#### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   ```

2. Navigate to project directory:
   ```bash
   cd task-management-system
   ```
3. **Note:** Depending on your system's configuration, you might need to run the above command with **sudo** to install dependencies.
   ```bash
   sudo npm <replace with command>
   ```

### Library Installation Steps (task-management-lib)

1. Navigate to the library directory:
   ```bash
   cd task-management-lib

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the library:
   ```bash
   npm run build
   ```

4. Package the library:
   ```bash
   npm pack
   ```

5. Verify the integrity of `task-management-lib-<version>.tgz`:
   ```bash
   tar -tzf task-management-lib-<version>.tgz
   ```

   The file structure should look like this:
   ```bash
   package/lib/task.js
   package/package.json
   package/task-management-lib-<version>.tgz
   package/lib/task.d.ts
   ```

### Server Installation Steps (task-management-server)

1. Navigate to the server directory:
   if you are in the `task-management-lib` or `task-management-app` directory:
   ```bash
   cd ../task-management-server
   ```
   or if you are in the `task-management-system` directory:
   ```bash
   cd task-management-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify dependency version is correct:
   - Open the `package.json` file located in your project's root directory.
   - Look for the `task-management-lib` entry under `dependencies`.
   - Ensure that the version number matches the expected version (e.g., `"file:../task-management-lib/task-management-lib-0.0.3.tgz"`).

4. Install library:
   ```bash
   npm install ../task-management-lib/task-management-lib-<version>.tgz
   ```
   Replace `<version>` with the actual version number.

5. Start the server:
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:5001`.

6. Verify the server is running by using one of the following methods:
   - **Web Browser Method:**
     1. Open a web browser.
     2. Navigate to `http://localhost:5001/api/tasks`.
     3. You should see a JSON list of tasks.

   - **Command Line Method:**
     Alternatively, you can use `curl` in the terminal:
     ```bash
     curl http://localhost:5001/api/tasks
     ```
   - **Short Method for both methods:**
     - Check the server status by checking the URL [http://localhost:5001/api](http://localhost:5001/api)
     - You should see a message: `API is running`

### Application Installation Steps (task-management-app)

1. Navigate to the server directory:
   if you are in the `task-management-lib` or `task-management-server` directory:
   ```bash
   cd ../task-management-app
   ```
   or if you are in the `task-management-system` directory:
   ```bash
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify dependency version is correct:
   - Open the `package.json` file located in your project's root directory.
   - Look for the `task-management-lib` entry under `dependencies`.
   - Ensure that the version number matches the expected version (e.g., `"file:../task-management-lib/task-management-lib-0.0.3.tgz"`).

4. Install library:
   ```bash
   npm install ../task-management-lib/task-management-lib-<version>.tgz
   ```
   Replace `<version>` with the actual version number.

5. Start the server:
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:3000`.

6. Open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
