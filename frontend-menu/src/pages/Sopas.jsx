import { useEffect, useState } from "react";
import './Sopas.css'

export default function Sopas() {
    const [sopas, setSopas] = useState([]);
    const [nuevaSopa, setNuevaSopa] = useState('');

    // datos del back de la api
    useEffect(() => {
        fetch("http://localhost:5000/sopa")
        .then(res => res.json())
        .then(data => setSopas(data))
    }, []);

    //Agregar sopa
    const agregarSopa = () =>{
        if (nuevaSopa.trim() === '') return;          
        
        fetch(`http://localhost:5000/sopa`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nombre: nuevaSopa})
        })
        .then(res => res.json())
        .then(data => {
            setSopas([...sopas, data]);
            setNuevaSopa('');
        });
    };

    //Eliminar sopa
    const eliminarSopa = (id) => {
        fetch(`http://localhost:5000/sopa/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setSopas(sopas.filter(item => item.id !== id));
        });
    };

    return (
        <article className="sopas-container">
            <h1 className="title">Menu del dia</h1>
            <div className="sopas-section">
                <h2 className="section-title">⭕Sopas:</h2>
                <ul className="sopas-list">
                    {sopas.map((item) => (
                        <li key={item.id} className="sopas-item">
                            {item.nombre}
                            <button className="delete-button" onClick={() => eliminarSopa(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <div className="input-section">
                    <input 
                        type="text"
                        placeholder="Agregar opcion..." 
                        value={nuevaSopa} 
                        onChange={(e) => setNuevaSopa(e.target.value)} 
                    />
                <button onClick={agregarSopa}>Agregar</button>
                </div>
            </div>
            <div className="extras-section">
                <h2>O si lo prefiere: caldo de pollo</h2>
            </div>
        </article>
    );
}