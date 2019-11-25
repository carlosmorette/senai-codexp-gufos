import React, { Component } from 'react';
import Footer from '../../Componentes/Footer/Footer';
import Header from '../../Componentes/Header/Header';
import Axios from 'axios'; //Importando o Axios
import {parseJwt} from '../../../services/auth';
import api from '../../../services/api';

export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            erroMensagem: "",
            isLoading: false,
        }
    }

    // Atualiza estado genérico, para que seja feito uma só vez
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    realizarLogin = (event) => {
        event.preventDefault();

        // Limpa o conteúdo do state erroMensagem
        this.setState({ erroMensagem: '' })

        // Define que uma requisição está em andamento
        this.setState({ isLoading: true })

        // let config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "+" //Cors
        //     }
        // }

        // Axios.post("http://localhost:5000/api/login", {
        //     email: this.state.email,
        //     senha: this.state.senha
        // }, config)

        api.post("/login",{
            email: this.state.email,
            senha: this.state.senha
        })
            .then(response => {
                // console.log("Retorno do login: ", response)

                
                // Caso a requisição retorne status com 200 salva o token no localStorage e define que a requisição terminou
                if (response.status === 200) {
                    localStorage.setItem('usuario-gufos', response.data.token)
                    this.setState({ isLoading: false })
                    
                    // Exibe no console somente o token
                    console.log("Meu token é: " + response.data.token)

                    // Define base64 recebendo o payload do token
                    var base64 = localStorage.getItem('usuario-gufos').split('.')[1]

                    // Exibe no console o valor de basae64
                    console.log(base64)

                    // Exibi no console o valor do payload convertido para string
                    console.log(window.atob(base64))

                    // Exibe no console o valor do payload convertido para JSON
                    console.log(JSON.parse(window.atob(base64)))
                    
                    // Exibe no console o tipo de usuario logado
                    console.log(parseJwt().Role)
               
                    if (parseJwt().Role === 'Administrador'){
                        this.props.history.push('/categoria')
                    }
                    else{
                        this.props.history.push('/eventos')
                    }
                }


            })
            // Caso ocorra algum erro, define o state erroMensagem como 'E-mail ou senha inválidos!'
            // e define que a requisição terminou
            .catch(erro => {
                console.log("Erro: ", erro)
                this.setState({ erroMensagem: 'E-mail ou senha inválidos!' })
                this.setState({ isLoading: false })
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
                                <p style={{ color: 'red', textAlign: "center" }}>{this.state.erroMensagem}</p>
                                {
                                    this.state.isLoading === true &&
                                    <div className="item">
                                        <button className="btn btn__login" id="btn__login" type="submit" disabled>Loading...</button>
                                    </div>
                                }
                                {
                                    this.state.isLoading === false &&
                                    <div className="item">
                                        <button className="btn btn__login" id="btn__login" type="submit">Login</button>
                                    </div>
                                }
                            </form>
                        </div>
                        <Footer />
                    </div>
                </section>
            </div>
        );
    }
}