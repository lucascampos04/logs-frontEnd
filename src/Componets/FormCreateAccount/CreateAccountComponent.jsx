import React, { useState } from "react";
import M from "materialize-css";
import "./CreateAccountStyle.css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

function CreateDirectorForm() {
    // Estados para armazenar os dados do formulário e os erros
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Função para verificar a força da senha
    const checkPasswordStrength = () => {
        const lengthStrength = password.length >= 8;
        const upperCaseStrength = /[A-Z]/.test(password);
        const numberStrength = /[0-9]/.test(password);
        const specialCharStrength = /[!@#\$%^&*]/.test(password);

        if (lengthStrength && upperCaseStrength && numberStrength && specialCharStrength) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Função para lidar com o envio do formulário
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            console.log("As senhas não coincidem.");
            setIsPasswordValid(false);
        } else {
            setError("");
            checkPasswordStrength();
            setSuccessMessage("Criando conta... ");
            callApiToCreateAccount();
        }
    };

    // Conectando à API para criar a conta
    const callApiToCreateAccount = async () => {
        const userData = {
            username,
            email,
            phone_number: phoneNumber,
            password,
        };

        try {
            const response = await axios.post('http://localhost:3030/api/createAccount', userData, {
                headers: { "Content-Type": 'application/json' }
            });

            console.log(response.data);

            if (response.status === 201) {
                setSuccessMessage("Conta criada com sucesso!");
                location.href = "/login"; // Isso redireciona para a página de login, mas pode não ser a melhor maneira de lidar com isso.
            }
        } catch (error) {
            if (!error?.response) {
                // Lida com erros de conexão.
            } else if (error.response.status === 401) {
                setError('Erro');
            }
        }
    }
    // Inicialização do Materialize CSS
    React.useEffect(() => {
        M.AutoInit();
    }, []);

    const containerBorder = {
        marginTop: '10px',
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
    }

    const fontH2 = {
        textAlign: "center",
        fontWeight: "bold"
    }
    
    return (
        <div className="container dark-background" style={containerBorder}>
            <h2 id="form-title" style={fontH2}>Criar Conta</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            name="username"
                            placeholder="Username"
                            id="username"
                            type="text"
                            className="validate"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-field col s6">
                        <input
                            name="password"
                            placeholder="Senha"
                            id="password"
                            type={showPassword ? "text" : "password"} // Alterado para mostrar/esconder a senha
                            className={`validate ${error ? "error-input" : ""}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordStrength();
                            }}
                        />
                        <i
                            className="material-icons password-toggle-icon"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "visibility" : "visibility_off"}
                        </i>
                        {error && <p className="red-text">{error}</p>}
                        {isPasswordValid === false && password.length > 0 && (
                            <div className="row">
                                <p className="red-text">Senha inválida.</p>
                            </div>
                        )}
                        {isPasswordValid && password.length > 0 && (
                            <div className="row">
                                <p className="green-text">Senha válida!</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            name="phoneNumber"
                            placeholder="Número de Telefone"
                            id="phoneNumber"
                            type="text"
                            className="validate"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-field col s6">
                        <input
                            name="confirmPassword"
                            placeholder="Confirmar Senha"
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            className={`validate ${error ? "error-input" : ""}`}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                checkPasswordMatch(); // Verifica se as senhas coincidem
                            }}
                        />
                        {error && <p className="red-text">{error}</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input
                            name="email"
                            placeholder="E-mail"
                            id="email"
                            type="email"
                            className="validate"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-success btn-large ${!isPasswordValid ? "disabled" : ""}`}
                    >
                        CADASTRAR
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateDirectorForm;
