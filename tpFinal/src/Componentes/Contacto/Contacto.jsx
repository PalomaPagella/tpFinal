import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./Contacto.css"

const Contacto = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_w14moeg', 'template_impuilw', form.current, 'vsT_3wYypwKfwbBbg')
            .then((result) => {
                console.log(result.text);
                form.current.reset();
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            <form ref={form} onSubmit={sendEmail}>
                <label>Nombre</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Mensaje</label>
                <textarea name="message" />
                <input className='btn contacto' type="submit" value="Enviar" />
            </form>
        </>);
};

export default Contacto;