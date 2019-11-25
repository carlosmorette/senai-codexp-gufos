import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/assets/pages/Home/App';

// Importamos as páginas
import Categorias from './assets/pages/Categorias/Categorias';
import Login from './assets/pages/Login/Login';
import Eventos from './assets/pages/Eventos/Eventos';
import NotFound from './assets/pages/NotFound/NotFound';

import * as serviceWorker from './serviceWorker';

// Importou a biblioteca react-router-dom
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// Importamos nosso CSS padrão
import './assets/css/flexbox.css';
import './assets/css/reset.css';
import './assets/css/style.css';
import './assets/css/cabecalho.css';
import './assets/css/rodape.css';
import './assets/css/login.css';

// Imports pedidos do MDB
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { usuarioAutenticado, parseJwt } from './services/auth';

const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === 'Administrador' ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
        }
    />
)

const PermissaoAluno = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === 'Aluno' ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
        }
    />
)

// Realizar a criação de Rotas
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path='/login' component={Login} />
                <PermissaoAluno path="/eventos" component={Eventos} />
                <PermissaoAdmin path="/categoria" component={Categorias} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

serviceWorker.unregister();