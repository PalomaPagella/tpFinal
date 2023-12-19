import React from "react";
import "./Footer.css";
import tmdb from "../assets/tmdb.svg"

function Footer() {
    return (
        <>
            <div className="Footer">
                <img className="imgLogo" src={tmdb} alt="" />
                <p>Este sitio web utiliza TMDB y las API de TMDB, pero no está respaldado, certificado ni aprobado de ningún otro modo por TMDB. Su uso es meramente académico.</p>
            </div>
        </>
    );
}
export default Footer
