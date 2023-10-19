import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CentralDoAluno from "./Componets/CentralDoAluno.jsx";
import Login from "./Componets/Login.jsx"

function App() {
    return (
        // Rotas
        <Router>
            <Routes>
                <Route path="/" element={<CentralDoAluno />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
