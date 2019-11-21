import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/assets/pages/Home/App';

//Importamos a pagina NotFound passando o caminho dela
import Categorias from './assets/pages/Categorias/Categorias';

// Importamos a pagina Login passando o caminho dela
import Login from './assets/pages/Login/Login';

import Eventos from './assets/pages/Eventos/Eventos';

//Importamos a pagina NotFound passando o caminho dela
import NotFound from './assets/pages/NotFound/NotFound';
import * as serviceWorker from './serviceWorker';

// Importou a biblioteca react-router-dom
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Importamos nosso CSS padrão
import './assets/css/flexbox.css';
import './assets/css/reset.css';
import './assets/css/style.css';
import './assets/css/cabecalho.css';
import './assets/css/rodape.css';
import './assets/css/login.css';

// Imports pedidos
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


// Realizar a criação de Rotas
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Categoria" component={() => <Categorias titulo_pagina="Categorias - Gufos"/>} />
                <Route path="/Categorias" component={() => <Categorias titulo_pagina="Categorias - Gufos"/>} />
                <Route path="/Login" component={() => <Login titulo_pagina="Login - Gufos"/>}/>
                <Route path="/Logins" component={() => <Login titulo_pagina="Login - Gufos"/>}/>
                <Route path="/Evento" component={() => <Eventos titulo_pagina="Eventos - Gufos"/>}/>
                <Route path="/Eventos" component={() => <Eventos titulo_pagina="Eventos- Gufos"/>}/>
                <Route component={NotFound} />
            </Switch>   
        </div>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
