import { useEffect, useState } from "react";
import './Arroz.css'

export default function Arroz() {
    const[arroz, setArroz] = useState([]);
    const[nuevoArroz, setNuevoArroz] = useState(['']);

    // Datos del back
    useEffect(() => {
        fetch("http://localhost:5000/arroz")
        .then(res => res.json())
        .then(data => setArroz(data))
    }, []);

    //Agregar arroz
    const agregarArroz = () => {
        if (nuevoArroz.trim() === '') return;

        fetch("http://localhost:5000/arroz", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nombre: nuevoArroz})
        })
        .then(res => res.json())
        .then(data => {
            setArroz([...arroz, data]);
            setNuevoArroz('');
        });
    };

    //Eliminar arroz
    const eliminarArroz = (id) => {
        fetch(`http://localhost:5000/arroz/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setArroz(arroz.filter(item => item.id !== id));
        });
    };

    return (
        <article className="arroz-container">
            <h2 className="section-title">⭕Arroz:</h2>
            <div className="arroz-section">
                <ul className="arroz-list">
                    {arroz.map((item) => (
                        <li key={item.id} className="arroz-item">
                            {item.nombre}
                            <button className="delete-button" onClick={() => eliminarArroz(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <div className="input-section">
                    <input 
                        type="text" 
                        placeholder="Agregar opcion..." 
                        value={nuevoArroz} 
                        onChange={(e) => setNuevoArroz(e.target.value)}
                    />
                    <button onClick={agregarArroz}>Agregar</button>
                </div>
            </div>
            <div className="extras-section">
                <p>Puede pedir su arroz con huevo</p>
                <ul>
                    <li>Revuelto</li>
                    <li>Estrellado</li>
                    <li>Platano</li>
                </ul>
            </div>
        </article>
    );
}