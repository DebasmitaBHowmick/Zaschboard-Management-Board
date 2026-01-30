
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#7f93ce] via-[#96a5f3] to-[#6f82c8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#020617]">
  <Header />
  <main className="flex-1 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#020617]">
    <RouterComp />
  </main>
  <Footer />
  <ToastContainer autoClose={2000} closeOnClick />
</div>

  );
}

export default App;
