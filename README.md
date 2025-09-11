# Synacy Trainee Leave System

## Overview 
This system lets people in an organization manage leave requests:

- Employees can submit leave requests and view their own leave history.
- Managers can review and approve or reject leave requests from their team, as well as submit their own leave requests.
- Admins can manage employees and view company-wide leave applications.

## Backend Repository
This repository is the frontend. The backend API is here:
- [Backend Repository](https://github.com/Vince-Capin/leave-management-system)

Make sure the backend is running and that the frontend is configured to call the correct API base URL (via environments or a dev proxy) when you integrate both.

## Key Features
- Role-based pages (Admin, Manager, Employee)
- Apply for leave and view leave history
- Admin tools to view and manage employees and all leave requests
- Reusable UI components (tables, paginators, modals, etc.)
- Angular Material for consistent UI

## Tech Stack
- Angular 18   [Angular Documentation](https://angular.dev/installation)
- TypeScript 5.5
- Angular Material

## Prerequisites
Make sure you have the following installed:

- Node.js
  - Recommended: Node 18.19+ or Node 20+
- npm (comes with Node)
- Optional: Angular CLI 18.x globally
  - If you prefer not to install globally, you can use npx to run Angular CLI commands.

## Getting Started

1) Clone the repository
- Use your preferred Git client or command line.

2) Install dependencies
``` 
npm install
```

4) Run in development (with live reload)
```
ng serve --proxy-config proxy.conf.json
```
- This runs ng serve and serves the app locally (by default on http://localhost:4200). The terminal will display the exact URL.


## API Endpoints Used by the Frontend

Base API URL
- All endpoints are prefixed with: `/api/v1`
- In local development, these are typically proxied to the backend server.

### Users (`/api/v1/user`)
- GET `/api/v1/user`
  - Description: Fetch all users.
  - Query params: none
  - Response: List of users.

- GET `/api/v1/user/{id}`
  - Description: Fetch a single user by ID (used both for arbitrary users and “current user by ID” in this app).
  - Path params:
    - `id` (string or number): User ID
  - Response: User object.

- GET `/api/v1/user/managers`
  - Description: Fetch all users who have a manager role.
  - Query params: none
  - Response: List of managers.

- GET `/api/v1/user/paginated?page={pageNumber}&size={pageSize}`
  - Description: Fetch users with pagination.
  - Query params:
    - `page` (number): Page number (0-based or 1-based depending on backend)
    - `size` (number): Items per page
  - Response: Paginated users payload (items + pagination metadata).

- POST `/api/v1/user`
  - Description: Create a new user (admin flow).
  - Body: User request DTO (e.g., name, role, managerId, etc. — match backend contract)
  - Response: Created User.

- PUT `/api/v1/user/{userId}`
  - Description: Update an existing user (admin flow).
  - Path params:
    - `userId` (string): User ID
  - Body: User request DTO with updated fields
  - Response: Updated User.

### Leave Applications (`/api/v1/leave-application`)
- GET `/api/v1/leave-application/active?status={status}&page={page}&max={max}`
  - Description: Get active leave applications filtered by status.
  - Query params:
    - `status` (string): e.g., PENDING, APPROVED, REJECTED
    - `page` (number): Page number
    - `max` (number): Page size
  - Response: Paginated leave applications.

- GET `/api/v1/leave-application/history?status={status}&page={page}&max={max}`
  - Description: Get historical (non-active) leave applications filtered by status.
  - Query params: same as above
  - Response: Paginated leave applications.

- GET `/api/v1/leave-application/{managerId}/active?status={status}&page={page}&max={max}`
  - Description: Manager view of active leave applications filtered by status.
  - Path params:
    - `managerId` (number)
  - Query params: `status`, `page`, `max`
  - Response: Paginated leave applications.

- GET `/api/v1/leave-application/{managerId}/history?status={status}&page={page}&max={max}`
  - Description: Manager view of historical leave applications filtered by status.
  - Path params:
    - `managerId` (number)
  - Query params: `status`, `page`, `max`
  - Response: Paginated leave applications.

- PUT `/api/v1/leave-application/{id}/status?leaveStatus={status}`
  - Description: Update a leave application’s status (e.g., approve/reject).
  - Path params:
    - `id` (number): Leave application ID
  - Query params:
    - `leaveStatus` (string): New status to set
  - Body: `{}` (empty object)
  - Response: Updated LeaveApplication.

- POST `/api/v1/leave-application`
  - Description: Submit a new leave request (employee flow).
  - Body: Leave request DTO (dates, type, reason, etc. — match backend contract)
  - Response: Created leave application (or operation result).

- PUT `/api/v1/leave-application/{userId}/status?leaveStatus={cancelStatus}`
  - Description: Cancel a leave application for a user (sets a cancellation-type status).
  - Path params:
    - `userId` (number)
  - Query params:
    - `leaveStatus` (string): e.g., CANCELLED
  - Body: `{}` (empty object)
  - Response: `void` (or operation result).

- GET `/api/v1/leave-application/{userId}?page={page}&max={max}`
  - Description: Get a user’s leave applications with pagination (employee view).
  - Path params:
    - `userId` (number)
  - Query params:
    - `page` (number)
    - `max` (number)
  - Response: Paginated leave applications.

Notes:
- Status values are strings and should match the backend’s accepted enum values.
- Pagination parameters (`page`, `size`/`max`) must follow the backend’s conventions (0-based vs 1-based).
- In development, ensure your proxy or environment configuration forwards `/api` to the running backend.

## Troubleshooting

- Port already in use:
  - Stop the other process or run ng serve --port 4300 (or any free port).
- Node version issues:
  - Use Node 18.19+ or 20+ to match Angular 18 requirements.
 

