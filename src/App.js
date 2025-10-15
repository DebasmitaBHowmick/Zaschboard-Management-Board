
import './App.css';
import Header from './components/Header';
import RouterComp from './Routers/RouterComp';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/config';
import { setUser, logout } from './redux/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const savedRole = localStorage.getItem('role');
        dispatch(setUser({ 
          user: {
            name: user.displayName || user.email,
            email: user.email,
            uid: user.uid
          }, 
          role: savedRole || 'employee' // Default to employee if no role saved
        }));
      } else {
        // User is signed out
        dispatch(logout());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
     <Header/>
     <RouterComp/>
      <ToastContainer autoClose={2000} closeOnClick="true"/>
     <Footer/>
    </div>
  );
}

export default App;
