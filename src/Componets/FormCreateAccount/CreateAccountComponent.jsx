import React, { useState } from "react";
import M from "materialize-css";
import "./CreateAccountStyle.css";
import "materialize-css/dist/css/materialize.min.css";

function CreateDirectorForm() {
    // Estados para armazenar os dados do formulário e os erros
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

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

    // Função para lidar com mudanças no campo de senha
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPasswordStrength();
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

            console.log("Dados submetidos:");
            console.log("Username:", username);
            console.log("Email:", email);
            console.log("PhoneNumber:", phoneNumber);
            console.log("Password:", password);
            console.log("ConfirmPassword:", confirmPassword);
        }
    };

    // Inicialização de Materialize CSS
    React.useEffect(() => {
        M.AutoInit();
    }, []);

    return (
        <div className="container">
            <h2 id="form-title">Criar Conta</h2>
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
                            type="password"
                            className={`validate ${error ? "error-input" : ""}`}
                            value={password}
                            onChange={handlePasswordChange}
                        />
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
                            type="password"
                            className={`validate ${error ? "error-input" : ""}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
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
