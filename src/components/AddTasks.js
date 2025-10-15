import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchTasks, createTask, updateTask, deleteTask} from "../redux/taskSlice";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";

const AddTasks = () => {
  useTitle("Manager Portal")
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { user,role } = useSelector((state) => state.auth);
  const isManager = role === "manager";

  // form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    assignedPerson: "",
    dept: "",
    status: "pending",
    startDate: "",
    endDate: "",
    comments: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  // fetch all tasks
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value);
    setFormData({ ...formData, [name]: value });
  };

  // handle add / update task
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData);

    if (!isManager) {
      toast.info("Only Managers can add or edit tasks.");
      return;
    }

    // Check each required field individually
    if (!formData.title.trim()) {
      alert("Please enter a task title.");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter a task description.");
      return;
    }
    if (!formData.dept.trim()) {
      alert("Please enter a department.");
      return;
    }
    if (!formData.assignedPerson.trim()) {
      alert("Please enter an assigned person.");
      return;
    }

    if (editingTaskId) {
      dispatch(updateTask({ ...formData, id: editingTaskId }));
      toast.info("Task updated successfully!");
      setEditingTaskId(null);
    } else {
      const newTask = { 
        ...formData, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch(createTask(newTask));
      toast.info("Task added successfully!");
    }

    // clear form
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      assignedPerson: "",
      dept: "",
      status: "pending",
      startDate: "",
      endDate: "",
      comments: "",
    });
  };

  // edit task
  const handleEdit = (task) => {
    setFormData(task);
    setEditingTaskId(task.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // delete task
  const handleDelete = async (id) => {
    if (!isManager) {
      toast.error("Only managers can delete tasks.");
      return;
    }
    
    // Double-check authentication before proceeding
    if (!user || role !== "manager") {
      toast.error("Authentication error. Please login again.");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        console.log("Attempting to delete task with ID:", id);
        console.log("Current user:", user);
        console.log("Current role:", role);
        
        const result = await dispatch(deleteTask(id));
        console.log("Delete result:", result);
        
        if (deleteTask.fulfilled.match(result)) {
          toast.success("Task deleted successfully!");
        } else if (deleteTask.rejected.match(result)) {
          toast.error(`Failed to delete task: ${result.payload}`);
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("An error occurred while deleting the task");
      }
    }
  };

  // Show access denied message if not a manager
  if (!isManager) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            Only managers can access this portal. Please login as a manager to manage tasks.
          </p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700">
            Manager Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 font-medium">
              Welcome: <span className="text-purple-600">{user?.name || user?.email || "Manager"}</span>
            </p>
            <button
              onClick={() => {
                dispatch(logout());
                toast.info("Logged out successfully");
                window.location.href = '/';
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Form */}
        <form  onSubmit={handleSubmit}
          className="bg-purple-50 p-6 rounded-xl shadow-inner mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title *"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            placeholder="Department *"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            name="assignedPerson"
            value={formData.assignedPerson}
            onChange={handleChange}
            placeholder="Assigned Person *"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <input
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="Assigned To (email)"
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description *"
            className="col-span-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Comments"
            className="col-span-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              {editingTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        {/* Task Table */}
        <div className="overflow-x-auto">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && tasks && tasks.length > 0 ? (
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-100 text-left text-sm font-semibold text-purple-700">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Start</th>
                  <th className="py-3 px-4">End</th>
                  <th className="py-3 px-4">Comments/Feedback</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.filter(task => task && task.id).map((task) => (
                  <tr key={task.id} className="hover:bg-purple-50 transition">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {task.title || "No Title"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{task.dept || "-"}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {task.assignedPerson || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "in progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : task.status === "delayed"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status || "pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {task.startDate
                        ? new Date(task.startDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {task.endDate
                        ? new Date(task.endDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs">
                      <div className="truncate" title={task.comments || "No comments"}> 
                        {task.comments ? 
                          (task.comments.length > 50 ? 
                            `${task.comments.substring(0, 50)}...` : 
                            task.comments
                          ) : 
                          "-"
                        }
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && (
              <p className="text-center text-gray-600 mt-6">
                No tasks available.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTasks;

