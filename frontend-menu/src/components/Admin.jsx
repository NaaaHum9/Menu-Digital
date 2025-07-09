//Pagina como ya la tengo, con los botones y todo
//Lo mismo que en APP

import React from 'react'
import Header from "./Header";
import Arroz from "../pages/Arroz";
import Guisados from "../pages/Guisados";
import Sopas from "../pages/Sopas";
import './Admin.css'

export default function Admin() {
    return (
        <div>
            <h1>Panel de Administracion</h1>
            <Header />
            <Sopas />
            <Arroz />
            <Guisados />
        </div>
    );
}
