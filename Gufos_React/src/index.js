import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Importamos os estilos:
import './assets/css/flexbox.css';
import './assets/css/reset.css';
import './assets/css/style.css';

// React Material Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


// Importamos as dependências necessárias:
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

// Importamos as páginas criadas
import Categorias from './pages/Categorias/Categorias';
import Eventos from './pages/Eventos/Eventos';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';
import Login from './pages/Login/Login';
import { usuarioAutenticado, parseJwt } from './services/auth';

const PermissaoAdmin = ({ component : Component }) => (
    <Route 
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname : "/login"}}/>
            )
        }
    />
)

const PermissaoAluno = ({ component : Component }) => (
    <Route 
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Aluno" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ pathname : "/login"}}/>
            )
        }
    />
)

// Realizamos a criação das Rotas:
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <PermissaoAdmin path="/categorias" component={Categorias} />
                <PermissaoAluno path="/eventos" component={Eventos} />
                {/* <Route path="/login" component={ () => <Login titulo_pagina="Login | Gufos"/> } /> */}
                <Route path="/login" component={Login} />
                <Route component={NaoEncontrada} />
            </Switch>
        </div>
    </Router>
)

// Trocamos ao App padrão pelas nossas rotas
ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
