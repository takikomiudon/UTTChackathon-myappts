import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from "react";
import Home from "./Component/Home"
import Register from "./Component/Register"
import Login from "./Component/Login/Login"
import List from "./Component/ListPage"
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
  const [id, setId] = useState("");

  return (
    <div className="app">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<Home nameid={nameid}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login NameId={nameid} setNameId={setNameId}/>}/>
            <Route path="/list" element={<List nameid={nameid} setId={setId}/>}/>
            <Route path="/ranking" element={<Ranking/>}/>
            <Route path="/post" element={<Form nameid={nameid}/>}/>
            <Route path="/update" element={<Update id={id}/>}/>
            <Route path="/userupdate" element={<UserUpdate nameid={nameid}/>}/>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;