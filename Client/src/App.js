import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; 
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import  '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import Profile from './screens/Profile';
import { useEffect } from 'react';
import getUserData from './APIendpoint/getUserData.js';
import { useGlobalState } from './ContextAPI/GlobalStateContext';
function App() {
  const { dispatch } = useGlobalState();
  useEffect(() => {
    const checkLogin = async () => {
      const data = await getUserData();
      if(data!=null){
        dispatch({ type: "SET_LOGIN_STATUS", payload: true });
        dispatch({ type: "SET_USER", payload: data.user });
      }
    };
     checkLogin();
  }, []);
  return (
    <Router>
    <div>
     <Routes>
       <Route exact path="/" element={<Home/>} />
       <Route exact path="/login" element={<Login/>} />
       <Route exact path="/Createuser" element={<Signup/>} />
       <Route exact path="/MyOrder" element={<MyOrder/>} />
       <Route exact path="/Profile" element={<Profile/>} />
     </Routes>

    </div>
    </Router>
  );
}

export default App;