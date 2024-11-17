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
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Profile from './screens/Profile';
function App() {
  return (
    <CartProvider>

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
    </CartProvider>
  );
}

export default App;