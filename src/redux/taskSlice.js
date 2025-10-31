import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const baseURl = process.env.REACT_APP_HOST;

 export const fetchTasks = createAsyncThunk("tasks/fetchAll", async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURl}/api/tasks`);
    const data = response.data;

      const normalizedData= Array.isArray(data) ? data : Array.isArray(data?.tasks)  ? data.tasks : [];

    return normalizedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch tasks");
    }
  });
  
  // Create new task
  export const createTask = createAsyncThunk("tasks/create", async (task, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURl}/api/tasks`, task, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        return response.data;
      }
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to create task");
    }
  });

  //update tasks
  export const updateTask = createAsyncThunk("tasks/update", async (task, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseURl}/api/tasks/${task.id}`, task, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to update task");
    }
  });

  export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (taskId, thunkAPI) => {
      try {
        console.log("Delete task API call - Task ID:", taskId);
        console.log("Delete URL:", `${baseURl}/${taskId}`);
        
        const response = await axios.delete(`${baseURl}/api/tasks/${taskId}`);
        console.log("Delete response:", response);
        
        // Some backends return deleted item or status
        if (response.status === 200 || response.status === 204) {
          console.log("Delete successful, returning taskId:", taskId);
          return taskId; // return the ID for the slice to update state
        } else {
          console.log("Delete failed with status:", response.status);
          return thunkAPI.rejectWithValue("Task not found or already deleted");
        }
      } catch (error) {
        console.error("Delete task error:", error);
        console.error("Error response:", error.response);
        
        // Check if it's a 404 error
        if (error.response && error.response.status === 404) {
          return thunkAPI.rejectWithValue("Task not found");
        }
        return thunkAPI.rejectWithValue(error.message || "Failed to delete task");
      }
    }
  );


export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },
    reducer: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
            state.error = null;
          })
          .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })  //create

          .addCase(createTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload)
          })
          .addCase(updateTask.fulfilled, (state, action) => {
            state.tasks= state.tasks.map((item) => item.id === action.payload.id ? action.payload : item)
          })
          .addCase(deleteTask.fulfilled, (state, action)=> {
            console.log("Delete fulfilled, removing task with ID:", action.payload);
            state.tasks = state.tasks.filter((it) => it.id !== action.payload.toString())
          })
          .addCase(deleteTask.rejected, (state, action) => {
            console.log("Delete rejected:", action.payload);
            state.error = action.payload;
          })
    }
});

export default taskSlice.reducer
