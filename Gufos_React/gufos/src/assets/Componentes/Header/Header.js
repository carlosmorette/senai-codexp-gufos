import React, { Component } from 'react';
import Logo from '../../img/icon-login.png';

// Para utilizar o Link importamos ele
import { Link, withRouter } from 'react-router-dom';
import { usuarioAutenticado, parseJwt } from '../../../services/auth';

class Header extends Component {
    logout = () => {

        // Remove o token do localStorage
        localStorage.removeItem('usuario-gufos');

        // Redireciona para o endereco '/'
        this.props.history.push('/');
    }


    render() {
        return (
            <header className="cabecalhoPrincipal">
                <div className="container">
                    <img src={Logo} />
                    <nav className="cabecalhoPrincipal-nav">
                        <Link to="/">Home</Link>

                        {usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                            // Se o usuário for administrador
                            <React.Fragment>
                                <Link to="/categoria">Categoria</Link>
                                <a onClick={this.logout}>Sair</a>
                            </React.Fragment>
                            ) : (
                                usuarioAutenticado() && parseJwt().Role === "Aluno" ? (
                                    // Se o usuario for Aluno
                                    <React.Fragment>
                                        <Link to="/Eventos">Eventos</Link>
                                        <a onClick={this.logout}>Sair</a>
                                    </React.Fragment>
                                ) : (
                                        // Se o usuario não estiiver logado
                                        <React.Fragment>
                                            <Link to='/Login' className="cabecalhoPrincipal-nav-login">Login</Link>
                                        </React.Fragment>
                                    )
                            )}
                        {/* ? == if */}
                        {/* : == else */}
                    </nav>
                </div>
            </header>
        );
    }
}
export default withRouter(Header);