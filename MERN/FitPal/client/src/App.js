import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Update from './pages/Update'

function App() {
  //using global context to check state of user (if user is signed in or not)
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" />} />
            <Route path="/update" element={<Update/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
