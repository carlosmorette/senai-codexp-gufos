import React, { Component } from 'react';
import Logo from '../../img/icon-login.png';


export default class Header extends Component {
    render() {
        return (
            <header class="cabecalhoPrincipal">
                <div class="container">
                    <img src={Logo} />
                    <nav class="cabecalhoPrincipal-nav">
                        <a>Home</a>
                        <a>Eventos</a>
                        <a>Contato</a>
                        <a class="cabecalhoPrincipal-nav-login" href="login.html">Login</a>
                    </nav>
                </div>
            </header>
        );
    }
}