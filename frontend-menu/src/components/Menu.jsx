//Menu solo para los clientes
//Solo peticiones GET

import React, { useEffect, useState } from 'react'
import './Menu.css'

export default function Menu() {
    const [sopas, setSopas] = useState([]);
    const [arroz, setArroz] = useState([]);
    const [guisados, setGuisados] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/sopa")
        .then((res) => res.json())
        .then((data) => setSopas(data));

        fetch("http://localhost:5000/arroz")
        .then((res) => res.json())
        .then((data) => setArroz(data));

        fetch("http://localhost:5000/guiso")
        .then((res) => res.json())
        .then((data) => setGuisados(data));
    }, []);

    return (
        <div>
            <div className='header-section'>
                <p className='brand'>Cocina Domi</p>
            </div>
            <article className="sopas-container">
                <h1 className="title">Menu del dia</h1>
                <div className="sopas-section">
                    <h2 className="section-title">⭕Sopas:</h2>
                    <ul className="sopas-list">
                        {sopas.map((item) => (
                            <li key={item.id} className="sopas-item">
                                {item.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="extras-section">
                    <h2>O si lo prefiere: caldo de pollo</h2>
                </div>
            </article>

            <article className="arroz-container">
                <h2 className="section-title">⭕Arroz:</h2>
                <div className="arroz-section">
                    <ul className="arroz-list">
                        {arroz.map((item) => (
                            <li key={item.id} className="arroz-item">
                                {item.nombre}
                            </li>
                        ))}
                    </ul>
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

            <article className="guisados-container">
                <h2 className="section-title">⭕Guisados:</h2>
                <div className="guisado-section">
                    <ul className="guisado-list">
                        {guisados.map((item) => (
                            <li key={item.id} className="guisado-item">
                                {item.nombre}
                            </li>
                        ))}
                    </ul>
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
        </div>
    )
}
