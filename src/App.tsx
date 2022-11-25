import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Component/Home"
import Register from "./Component/Register"
import Login from "./Component/Login/Login"
import List from "./Component/List/ListPage"
import Ranking from "./Component/RankingPage/RankingPage"
import Form from "./Component/FormPage/FormPage"
import Update from "./Component/UpdatePage/UpdatePage"
import UserUpdate from "./Component/UserUpdate"
import { UserProvider } from "./Context/UserContext"
import Sidebar from './Component/Sidebar'

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
            <Route path="/home" element={<Sidebar component={<Home/>}/>}/>
            <Route path="/register" element={<Sidebar component={<Register/>}/>}/>
            <Route path="/login" element={<Sidebar component={<Login/>}/>}/>
            <Route path="/list" element={<Sidebar component={<List/>}/>}/>
            <Route path="/ranking" element={<Sidebar component={<Ranking/>}/>}/>
            <Route path="/post" element={<Sidebar component={<Form/>}/>}/>
            <Route path="/update" element={<Sidebar component={<Update/>}/>}/>
            <Route path="/userupdate" element={<Sidebar component={<UserUpdate/>}/>}/>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;