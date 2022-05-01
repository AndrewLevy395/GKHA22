import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sim from "./components/pages/simnow/Sim";
import FranchiseLoad from "./components/pages/franchise/FranchiseLoad";
import FranchiseNew from "./components/pages/franchise/FranchiseNew";
import FranchiseMainMenu from "./components/pages/franchise/FranchiseMainMenu";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sim" element={<Sim />} />
        <Route path="/franchise_load" element={<FranchiseLoad />} />
        <Route path="/franchise_new" element={<FranchiseNew />} />
        <Route path="/franchise_menu" element={<FranchiseMainMenu />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
