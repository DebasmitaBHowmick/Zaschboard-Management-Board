import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux"
import {fetchTasks, updateTask } from "../redux/taskSlice";
import { logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import {useAISummary} from "../hooks/useAISummary";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";


const TaskList = () => {
useTitle("Employee Dashboard");
const {summary, setSummary, loading: aiLoading, error: summaryError, generateSummary} = useAISummary();
const dispatch = useDispatch();
 const {tasks, loading, error} = useSelector(state => state.tasks);
 const {user} = useSelector(state=> state.auth);
const [comments, setComments] = useState("");
const [delayReason, setDelayReason] = useState("");
const [selectedTaskId, setSelectedTaskId] = useState(null);

const [notes, setNotes] = useState("");
const [selectedTask, setSelectedTask] = useState(null);
const [editMode, setEditMode] = useState("")

useEffect(() => {
  dispatch(fetchTasks())
}, [dispatch])

const handleAccept = (task) => {
  toast.success(`Task "${task.title}" accepted!`);
  dispatch(updateTask({...task, status: "in progress"}));
};

const handleReject = (task) => {
  if (!comments.trim()) {
    toast.error("Please provide a reason for rejection");
    return;
  }
  toast.info(`Task "${task.title}" rejected`);
  dispatch(updateTask({
    ...task, 
    status: "rejected",
    rejectionReason: comments,
    comments: comments
  }));
  setComments("");
};

const handleComplete = (task) => {
  toast.success(`Task "${task.title}" marked as completed!`);
  dispatch(updateTask({...task, status: "completed"}));
};

const handleDelay = (task) => {
  if (!delayReason.trim()) {
    toast.error("Please provide a reason for delay");
    return;
  }
  toast.warning(`Delay reason added for "${task.title}"`);
  dispatch(updateTask({
    ...task, 
    status: "delayed",
    delayReason: delayReason,
    comments: task.comments ? `${task.comments}\n[DELAY REASON]: ${delayReason}` : `[DELAY REASON]: ${delayReason}`
  }));
  setDelayReason("");
};

const handleComment = (taskId) => {
  if (!comments.trim()) {
    toast.error("Please write a comment first");
    return;
  }
  
  const task = myTasks.find(t => t.id === taskId);
  if (task) {
    const updatedComments = task.comments ? `${task.comments}\n[COMMENT]: ${comments}` : `[COMMENT]: ${comments}`;
    dispatch(updateTask({...task, comments: updatedComments}));
    toast.success(`Comment added for "${task.title}"`);
  }
  setComments("");
};

const handleNotes = (task) => {
  setSelectedTask(task);
  setNotes(task.notes || "");
  setSummary(task.summary || "");
};

//handle save in backend
const saveNotes = async (task) => {
  if (!notes.trim()) {
    toast.error("Please write a note first");
    return;
  }

  if (!selectedTask) {
    toast.error("Please select a task first");
    return;
  };
 const updatedTask = {...selectedTask, notes: notes, aiSummary: summary};


  toast.info(`Note added for "${task.title}"`);
  await dispatch(updateTask(updatedTask));
  setSelectedTask(updatedTask);

  //update in redux
  dispatch(fetchTasks())
  setEditMode(false);
  toast.success(`Note added for "${task.title}"`)
}

const handleAiSumarry = async () => {
  if (!notes.trim()) return alert("Please write notes first");

  const aiText = await generateSummary(notes);

  //ai summary & notes saved in backend
  const updatedTask = { ...selectedTask, notes, aiSummary: aiText };
  await dispatch(updateTask(updatedTask));

  //selected task with the updated form
  setSelectedTask(updatedTask); 
  setSummary(aiText)

  //update in redux
  dispatch(fetchTasks())
  toast.success(`AI summary saved for "${selectedTask.title}"`);
}

const myTasks = tasks ? tasks.filter((it) => it && it.id && (it.assignedTo === user?.email || it.assignedPerson === user?.name)) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">
            My Assigned Tasks
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600 font-medium">
              Employee: <span className="text-purple-600">{user?.name || user?.email}</span>
            </p>
            <button
              onClick={() => {
                dispatch(logout());
                toast.info("Logged out successfully");
                window.location.href = '/login';
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && myTasks && myTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-purple-100 text-left text-sm font-semibold text-purple-700">
                  <th className="py-3 px-4">Task</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Start</th>
                  <th className="py-3 px-4">End</th>
                  <th className="py-3 px-4"> Notes if any</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-purple-50 transition">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {task.title || "No Title"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {task.description || "No Description"}
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
                        }`}>
                        {task.status || "pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {task.startDate ? new Date(task.startDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}
                    </td>
                    <td>
                    <span className="py-3 px-4 text-gray-600"> {handleNotes ? (task.notes) : "No notes Available"}</span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {task.status === "pending" && (
                        <>
                          <button onClick={() => handleAccept(task)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm" >
                            Accept
                          </button>
                          <button onClick={() => handleReject(task)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm" >
                            Reject
                          </button>
                        </>
                      )}
                      {task.status === "in progress" && (
                        <>
                          <button onClick={() => handleComplete(task)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                            Mark Completed
                          </button>
                          <button onClick={() => handleDelay(task)}
                            className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 text-sm">
                            Report Delay
                          </button>
                        </>
                      )}
                      {task.status === "delayed" && (
                        <button onClick={() => handleComplete(task)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                          Mark Completed
                        </button>
                      )}
                      <button  onClick={() => handleNotes(task)}  className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm">
                          Add Notes </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-600">
              No tasks assigned to you yet.
            </p>
          )
        )}

        {/* Comment and Delay Reason Section */}
        <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
            Task Feedback & Comments
          </h2>
          
          {myTasks.map((task) => (
            <div key={task.id} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">
                {task.title}
              </h3>
              
              {/* Comments Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Comment:
                </label>
                <div className="flex gap-2">
                  <input 
                    value={selectedTaskId === task.id ? comments : ''} 
                    onChange={(e) => {
                      setComments(e.target.value);
                      setSelectedTaskId(task.id);
                    }} 
                    type="text" 
                    placeholder="Write your comment here..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none" 
                  />
                  <button 
                    onClick={() => handleComment(task.id)} 
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-semibold transition">
                    Add Comment
                  </button>
                </div>
              </div>

              {/* Delay Reason Section - Only for in-progress tasks */}
              {task.status === "in progress" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Delay (if applicable):
                  </label>
                  <div className="flex gap-2">
                    <input 
                      value={selectedTaskId === task.id ? delayReason : ''} 
                      onChange={(e) => {
                        setDelayReason(e.target.value);
                        setSelectedTaskId(task.id);
                      }} 
                      type="text" 
                      placeholder="Reason for delay..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" 
                    />
                    <button 
                      onClick={() => handleDelay(task)} 
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 font-semibold transition"
                    >
                      Report Delay
                    </button>
                  </div>
                </div>
              )}

              {/* Display existing comments */}
              {task.comments && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Previous Comments:</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{task.comments}</p>
                </div>
              )}
            </div>
          ))}
        </div>
         {/* Employee Note & AI Summary Section */}
         
         {selectedTask && selectedTask.status === "in progress" && (
          <div className="mt-10 bg-purple-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-purple-700 mb-3">
              Notes for: {selectedTask.title}
            </h2>

            <textarea value={notes}  onChange={(e) => setNotes(e.target.value)} placeholder="Write your work notes, progress, or insights..."
              className="w-full h-32 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none mb-3" />

            {!editMode ? (
              <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Edit
            </button>
            ) : (<button
              onClick={saveNotes} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
              Save
            </button>)}

              {/* Notes textarea */}
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              rows="5" className={`w-full border rounded-lg p-3 focus:ring-2 ${
                editMode ? "focus:ring-purple-400 bg-white" : "bg-gray-100 cursor-not-allowed"
              }`}
              placeholder="Write your task notes..."
              disabled={!editMode}/>

            {/* Buttons */}
            {editMode && (
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button onClick={handleAiSumarry} disabled={aiLoading}
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 font-medium">
                  {aiLoading ? "Generating Summary..." : "AI Summarize Notes"}
                </button>
              </div>
            )}

            {summary && (
              <motion.div 
              initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              className="bg-white border rounded-lg p-3 mb-3">
                <h3 className="text-sm font-semibold text-purple-700 mb-1">
                  AI Suggested Summary:
                </h3>
                <p className="text-gray-700 text-sm">{summary}</p>
              </motion.div>
            )}

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => generateSummary(notes)}
                disabled={aiLoading}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-60"
              >
                {aiLoading ? "Generating..." : "Generate AI Summary"}
              </button>

              <button
                onClick={() => saveNotes(selectedTask)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold">
                Save Notes
              </button>
               
              <button
                onClick={() => setSelectedTask(null)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition font-semibold"
              >
                Close
              </button>
            </div>

            {summaryError && (
              <p className="text-red-600 text-sm mt-3 text-center">
                {summaryError}
              </p>
            )}
    
          </div>
         )}

      </div>
    </div>
  )
}

export default TaskList
