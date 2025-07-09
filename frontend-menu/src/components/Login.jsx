// Vista login

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                onLogin(); // actualiza estado en App
                navigate("/admin");
            } else {
                setErrorMsg(data.message || "Credenciales inválidas");
            }

        } catch (err) {
            setErrorMsg("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login de Administrador</h2>
            <form onSubmit={handleSubmit}>
                {errorMsg && <p className="error">{errorMsg}</p>}
                <div className="form-group">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}
