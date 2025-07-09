import { useEffect, useState } from "react";
import './Guisados.css'

export default function Guisados() {
    const [guisado, setGuisado] = useState([]);
    const [nuevoGuisado, setNuevoGuisado] = useState('');

    //data
    useEffect(() =>{
        fetch("http://localhost:5000/guiso")
        .then(res => res.json())
        .then(data => setGuisado(data))
    }, []);

    //Agregar guiso
    const agregarGuisado = () => {
        if (nuevoGuisado.trim() === '') return;

        fetch("http://localhost:5000/guiso", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nombre: nuevoGuisado})
        })
        .then(res => res.json())
        .then(data => {
            setGuisado([...guisado, data]);
            setNuevoGuisado("");
        });
    };

    //Eliminar guisado
    const eliminarGuisado = (id) => {
        fetch(`http://localhost:5000/guiso/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setGuisado(guisado.filter(item => item.id !== id));
        });
    };

    return (
        <article className="guisados-container">
            <h2 className="section-title">⭕Guisados:</h2>
            <div className="guisado-section">
                <ul className="guisado-list">
                    {guisado.map((item) => (
                        <li key={item.id} className="guisado-item">
                            {item.nombre}
                            <button className="delete-button" onClick={() => eliminarGuisado(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <div className="input-section">
                    <input 
                        type="text" 
                        placeholder="Agregar opcion..." 
                        value={nuevoGuisado} 
                        onChange={(e) =>setNuevoGuisado(e.target.value)}
                    />
                    <button onClick={agregarGuisado}>Agregar</button>
                </div>
            </div>
            <div className="extras-section">
                <h2>⭕Tortillas</h2>
                <h2>⭕Agua de sabor o refresco(costo extra)</h2>
                <h2>Extras</h2>
                <div>
                    <ul>
                        <li>
                            Tacos dorados
                        </li>
                        <li>
                            Milanesa empanizada
                        </li>
                        <li>
                            Pechuga empanizada
                        </li>
                    </ul>
                </div>
                <br />
                <p>*Pregunte por la disponibilidad de las comidas extras</p>
            </div>
        </article>
    )
}
