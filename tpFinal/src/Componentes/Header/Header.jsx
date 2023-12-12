import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Inicio from "../Inicio/Inicio";
import Contacto from "../Contacto/Contacto";
import Favoritos from "../Favoritos/Favoritos";
import "./Header.css"

const Header = () => {
    const [favorites, setFavorites] = useState([]);

    return (
        <BrowserRouter>
            <header>
                <nav className="NavHeader">
                    <NavLink className={"navlink"} to="/Inicio">Inicio</NavLink>
                    <NavLink className={"navlink"} to="/Contacto">Contacto</NavLink>
                    <NavLink className={"navlink"} to="/Favoritos">Favoritos</NavLink>
                </nav>
            </header>

            <Routes>
                <Route path="/Inicio" element={<Inicio favorites={favorites} setFavorites={setFavorites} />} />
                <Route path="/Contacto" element={<Contacto />} />
                <Route path="/Favoritos" element={<Favoritos favoritesList={favorites} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Header;
