# Role-Based Task Management System - Implementation Guide

## Overview
This implementation provides a complete role-based authentication and task management system with separate portals for managers and employees.

## Key Features Implemented

### 1. Role-Based Authentication
- **Manager Role**: Full access to task management (create, edit, delete, view all tasks)
- **Employee Role**: Limited access to assigned tasks only (accept, reject, comment, report delays)
- **Route Protection**: Automatic redirection and toast notifications for unauthorized access

### 2. Manager Portal (`/mngr-dashboard`)
- Create new tasks with assignment to specific employees
- Edit and delete existing tasks
- View all tasks with status tracking
- Monitor employee feedback and comments
- Access restricted to managers only

### 3. Employee Portal (`/emp-dashboard`)
- View only assigned tasks
- Accept or reject pending tasks
- Add comments and feedback
- Report delays with reasons
- Mark tasks as completed
- Access restricted to employees only

### 4. Task Status Management
- **Pending**: Newly created tasks awaiting employee response
- **In Progress**: Accepted tasks being worked on
- **Completed**: Finished tasks
- **Rejected**: Tasks declined by employees (with reason)
- **Delayed**: Tasks with reported delays (with reason)

## Key Components

### ProtectedRoute Component
- Validates user authentication and role
- Shows toast notifications for unauthorized access
- Redirects to login page when needed

### TaskList Component (Employee Portal)
- Displays only tasks assigned to the current employee
- Provides accept/reject functionality for pending tasks
- Allows commenting and delay reporting
- Shows task status with appropriate styling

### AddTasks Component (Manager Portal)
- Full task management capabilities
- Role-based access control
- Enhanced table with comments/feedback column
- Status tracking for all task states

## Usage Instructions

### For Testing
1. Use the login/register forms to test authentication
2. Test role-based access by logging in as different user types
3. Verify persistent authentication by refreshing the page

### For Managers
1. Login with manager role
2. Access `/mngr-dashboard` to manage tasks
3. Create tasks and assign them to employees
4. Monitor task progress and employee feedback

### For Employees
1. Login with employee role
2. Access `/emp-dashboard` to view assigned tasks
3. Accept/reject tasks as appropriate
4. Add comments and report delays when needed

## Security Features

### Route Protection
- Automatic role validation on protected routes
- Toast notifications for unauthorized access attempts
- Graceful fallback to login page

### Access Control
- Managers cannot access employee portal
- Employees cannot access manager portal
- Clear error messages and user guidance

### Data Filtering
- Employees only see tasks assigned to them
- Managers see all tasks in the system
- Proper task assignment validation

## Toast Notifications
- Success messages for successful operations
- Error messages for validation failures
- Info messages for status changes
- Warning messages for delays

## Styling
- Consistent purple/blue color scheme
- Responsive design for mobile and desktop
- Status-based color coding for tasks
- Modern UI with Tailwind CSS

## Testing the System

1. **Start the application**: `npm start`
2. **Start JSON server**: `npm run server` (in another terminal)
3. **Test manager flow**:
   - Register/Login as manager
   - Navigate to `/mngr-dashboard`
   - Try accessing `/emp-dashboard` (should show error)
4. **Test employee flow**:
   - Register/Login as employee
   - Navigate to `/emp-dashboard`
   - Try accessing `/mngr-dashboard` (should show error)
5. **Test persistence**: Refresh the page - you should stay logged in

## Future Enhancements
- Real-time notifications
- Task priority levels
- File attachments
- Advanced reporting
- Email notifications
- Task templates

