import React, { useState } from "react";
import "./LoginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

function Login() {
    const h1Styles = {
        fontSize: "50px",
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null); // Estado para armazenar a mensagem de erro

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (username === "admin" && password === "123") {
            console.log("Login bem sucedido");
            navigate("/central-aluno");
            console.log("Username: ", username);
            console.log("Password: ", password);
        } else {
            setError("Usuário ou senha incorreto");
            console.log("Usuario ou senha incorreto");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>} {/* Renderiza a mensagem de erro se existir */}
                            <h1 className="card-title text-center bold-heading" style={h1Styles}>
                                Login
                            </h1>
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        className="form-control"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <i
                                        className={`material-icons password-toggle-icon ${
                                            showPassword ? "active" : ""
                                        }`}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "visibility" : "visibility_off"}
                                    </i>
                                </div>
                                <button className="btn btn-primary" type="button" onClick={handleLogin}>
                                    Login
                                </button>

                                <Link to="/outra-pagina">Criar Conta</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
