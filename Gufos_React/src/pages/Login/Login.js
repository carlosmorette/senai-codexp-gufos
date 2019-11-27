import React, { Component } from 'react'
import '../../assets/css/login.css'
import { parseJwt } from '../../services/auth';
import api from '../../services/api';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            senha: "",
            erroMensagem : "",
            isLoading : false
        }
    }

    // Atualiza estado genérico, para que seja feito uma só vez.
    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    realizarLogin(event){
        event.preventDefault();

        // Limpa o conteúdo do state erroMensagem
        this.setState({ erroMensagem : '' })

        // Define que uma requisição está em andamento
        this.setState({ isLoading : true })

        // let config = {
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Access-Control-Allow-Origin":"*" // Cors
        //     }
        // }

        // Axios.post("http://localhost:5000/api/login", {
        //     email : this.state.email,
        //     senha : this.state.senha
        // }, config)

        let usuario = {
            email: this.state.email,
            senha: this.state.senha
        }
        
        api.post("/login", usuario)
        .then(response => {
            // console.log("Retorno do login: ", response);
            // console.log("Retorno do login: ", response.status);
            

            // Caso a requisição retorne um status code 200
            // salva o token no localStorage
            // e define que a requisição terminou
            if (response.status === 200) {
                localStorage.setItem('usuario-gufos', response.data.token)
                this.setState({ isLoading : false })

                // Exibe no console somente o token
                console.log("Meu token é: " + response.data.token)

                // Define base64 recebendo o payload do token
                var base64 = localStorage.getItem('usuario-gufos').split('.')[1]
                // exibe no console o valor de base64
                console.log(base64)

                // Exibe no console o valor do payload convertido para string
                console.log(window.atob(base64))

                // Exibe no console o valor do payload convertido para JSON
                console.log(JSON.parse(window.atob(base64)))

                // Exibe no console o tipo de usuário logado
                console.log(parseJwt().Role)

                if (parseJwt().Role === 'Administrador') {
                    //console.log(this.props)
                    this.props.history.push('/categorias');
                }
                else {
                    this.props.history.push('/eventos');
                }
            }
            
        })
        // Caso ocorra algum erro, define o state erroMensagem como 'E-mail ou senha inválidos'
        // e define que a requisição terminou
        .catch(erro => {
            console.log("Erro: ", erro)
            this.setState({ erroMensagem : 'E-mail ou senha inválidos!' })
            this.setState({ isLoading : false })
        })
    }

    render() {
        return (
            <section className="container flex">
                <div className="img__login">
                    <div className="img__overlay">
                    </div>
                </div>

                <div className="item__login">
                    <div className="row">
                        {/* <div className="item">
                            <img src={Logo} className="icone__login" />
                        </div> */}
                        <div className="item" id="item__title">
                            <p className="text__login" id="item__description">Bem-vindo! Faça login para acessar sua conta.</p>
                        </div>
                        <form onSubmit={this.realizarLogin.bind(this)}>
                            <div className="item">
                                <input
                                    className="input__login"
                                    placeholder="username"
                                    type="text"
                                    name="email" // Deve ser igual ao nome da variável no state para que o atualizaEstado funcione.
                                    value={this.state.email}
                                    onChange={this.atualizaEstado}
                                    id="login__email"
                                />
                            </div>
                            <div className="item">
                                <input
                                    className="input__login"
                                    placeholder="password"
                                    type="password"
                                    name="senha"
                                    value={this.state.senha}
                                    onChange={this.atualizaEstado}
                                    id="login__password"
                                />
                            </div>
                            <p style={{ color : 'red' }}>{this.state.erroMensagem}</p>
                            {/* <div className="item">
                                <button type="submit" className="btn btn__login" id="btn__login">Login</button>
                            </div> */}
                            {
                                this.state.isLoading === true &&
                                <div className="item">
                                    <button type="submit" className="btn btn__login" id="btn__login" disabled>Loading...</button>
                                </div>
                            }
                            {
                                this.state.isLoading === false &&
                                <div className="item"> 
                                    <button type="submit" className="btn btn__login" id="btn__login">Login</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}