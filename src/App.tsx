import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from "react";
import Home from "./Component/Home"
import Register from "./Component/Register"
import Login from "./Component/Login/Login"
import List from "./Component/List/ListPage"
import Ranking from "./Component/RankingPage/RankingPage"
import Form from "./Component/FormPage/FormPage"
import Update from "./Component/UpdatePage/UpdatePage"
import UserUpdate from "./Component/UserUpdate"
import { UserProvider } from "./Context/UserContext"

function App() {
  let defaultnameid = ""
  if (localStorage.getItem("nameid") != null) {
    defaultnameid = String(localStorage.getItem("nameid"))
  }

  const [nameid, setNameId] = useState(defaultnameid);

  return (
    <div className="app">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/ranking" element={<Ranking/>}/>
            <Route path="/post" element={<Form/>}/>
            <Route path="/update" element={<Update/>}/>
            <Route path="/userupdate" element={<UserUpdate/>}/>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;