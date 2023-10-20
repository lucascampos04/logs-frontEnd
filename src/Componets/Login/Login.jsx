import React, { useState } from "react";
import axios from "axios"
import "./LoginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(''); 
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    
    const h1Styles = {
        fontSize: "50px",
    };



    const handleLogin = async (e) => {
        e.preventDefault()
        console.log("Username : " +username + "\nPassword :"+ password)
        try{
            const response = await axios.post('http://localhost:3030/api/login',
                JSON.stringify({username, password}),
                {
                    headers: {"Content-Type":'application/json'}
                }
            )

            console.log(response.data)
                
            if(response.status === 200){
                navigate("/central-do-aluno");
            }

        } catch(error){
            if(!error?.response){
                setError('Erro ao acessar o servidor')
                
            } else if(error.response.status == 401){
                setError('Usuarios ou senha invalidos')
            }
        }
                
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}
                            <h1 className="card-title bold-heading" style={h1Styles}>
                                Login
                            </h1>
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <div className="password-input">
                                        <input
                                            className="form-control"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <i
                                            className="material-icons password-toggle-icon"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword
                                                ? "visibility"
                                                : "visibility_off"}
                                        </i>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary login-button"
                                    type="submit"
                                    onClick={(e) => handleLogin(e)}
                                >
                                    Login
                                </button>
                                <Link to="/create-account" className="create-account-link">
                                    Criar Conta
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Login;
