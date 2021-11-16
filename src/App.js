import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages import
import Login from "./containers/Login";
import CreateUser from "./containers/CreateUser";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Header /> {/* state might impact, not data */}
      <p>Hello from app</p>
      <Router>
        <Routes>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
