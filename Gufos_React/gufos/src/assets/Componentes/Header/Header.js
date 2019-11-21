import React, { Component } from 'react';
import Logo from '../../img/icon-login.png';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src={Logo} />
                    <nav className="cabecalhoPrincipal-nav">
                        <Link to='/'>Home</Link>
                        <Link to='/Evento'>Eventos</Link>
                        <Link to='/'>Contato</Link>
                        <Link to='/Login' className="cabecalhoPrincipal-nav-login">Login</Link>
                    </nav>
                </div>
            </header>
        );
    }
}