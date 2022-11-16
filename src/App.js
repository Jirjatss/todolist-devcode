import { Route, Routes } from "react-router-dom";
import "./App.css";
import EditActivity from "./components/EditActivity";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<EditActivity />} />
    </Routes>
  );
}

export default App;
