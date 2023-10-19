import 'bootstrap/dist/css/bootstrap.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login.jsx"

function App() {
    return (
        // Rotas
        <Router>
            <Routes>
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
