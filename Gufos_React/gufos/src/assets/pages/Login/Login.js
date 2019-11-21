import React, { Component } from 'react';
import Footer from '../../Componentes/Footer/Footer';
import Header from '../../Componentes/Header/Header';
import Axios from 'axios'; //Importando o Axios

class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
        }
    }

    // Atualiza estado genérico, para que seja feito uma só vez
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    realizarLogin = (event) => {
        event.preventDefault();

        let config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "+" //Cors
            }
        }

        Axios.post("http://localhost:5000/api/login", {
            email: this.state.email,
            senha: this.state.senha
        }, config)
        .then(response => {
            console.log("Retorno do login: ", response)
        })
        .catch(erro => {
            console.log("Erro: ", erro)
        })

    }

    render() {
        return (
            <div className="Login">
                <Header />
                <section className="container flex">
                    <div className="img__login"><div className="img__overlay"></div></div>

                    <div className="item__login">
                        <div className="row">
                            <div className="item">
                                <img src="" className="icone__login" />
                            </div>
                            <div className="item" id="item__title">
                                <p className="text__login" id="item__description">
                                    Bem-vindo! Faça login para acessar sua conta.</p>
                            </div>
                            <form onSubmit={this.realizarLogin}>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        placeholder="Username"
                                        type="text"
                                        name="email" //Deve ser igual ao nome da variável no state para que o atualizaEstado funcione.
                                        value={this.state.email}
                                        onChange={this.atualizaEstado}
                                        id="login__email"
                                    />
                                </div>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        placeholder="Password"
                                        type="password"
                                        name='senha'
                                        value={this.state.senha}
                                        onChange={this.atualizaEstado}
                                        id="login__password" />
                                </div>
                                <div className="item">
                                    <button className="btn btn__login" id="btn__login" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                        <Footer />
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;