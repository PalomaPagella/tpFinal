import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Busqueda from "../Busqueda/Busqueda";
import Contacto from "../Contacto/Contacto";
import Favoritos from "../Favoritos/Favoritos";
import "./Header.css"

const Header = () => {
    const [favorites, setFavorites] = useState([]);

    return (
        <BrowserRouter>
            <header>
                <nav className="NavHeader">
                    <NavLink className={"navlink"} to="/Busqueda">Búsqueda</NavLink>
                    <NavLink className={"navlink"} to="/Contacto">Contacto</NavLink>
                    <NavLink className={"navlink"} to="/Favoritos">Favoritos</NavLink>
                </nav>
            </header>

            <Routes>
                <Route path="/Busqueda" element={<Busqueda favorites={favorites} setFavorites={setFavorites} />} />
                <Route path="/Contacto" element={<Contacto />} />
                <Route path="/Favoritos" element={<Favoritos favoritesList={favorites} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Header;
