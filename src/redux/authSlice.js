import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadAuthFromStorage = () => {
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return JSON.parse(authData);
    }
  } catch (error) {
    console.error('Error loading auth from localStorage:', error);
  }
  return {
    user: null,
    role: null
  };
};

export const authSlice = createSlice({
    name: "auth",
    initialState: loadAuthFromStorage(),
    reducers: {
        setUser: (state, action) => {
           state.user = action.payload.user;
           state.role = action.payload.role;
           
           // Save to localStorage
           try {
             localStorage.setItem('auth', JSON.stringify({
               user: action.payload.user,
               role: action.payload.role
             }));
             // Also save role separately for Firebase auth state listener
             localStorage.setItem('role', action.payload.role);
           } catch (error) {
             console.error('Error saving auth to localStorage:', error);
           }
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
            
            // Remove from localStorage
            try {
              localStorage.removeItem('auth');
              localStorage.removeItem('role');
            } catch (error) {
              console.error('Error removing auth from localStorage:', error);
            }
        }
    }
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
