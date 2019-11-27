# GUFOS - Agenda de Eventos - React JS

## Requisitos
> - Node Js
> - Visual Studio Code

## Criação do Ambiente
> Instalamos globalmente nosso acesso ao create-react-app

```bash
npm install -g create-react-app
```
## Criação do Projeto
> Criamos nosso projeto:
```bash
create-react-app gufos_react
```
> Testamos nosso projeto:
```bash
  cd gufos_react
  npm start
```
> Quando precisar paramos a aplicação com **CTRL+C** e **S**

<br><br>

## Desenvolvendo a aplicação

> Alteramos o arquivo App.js para incluir o título da Home e um Rodapé:

```jsx
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Home</h1>
      <footer>Escola SENAI de Informática</footer>
    </div>
  );
}

export default App;
```

> Criamos a seguinte estrutura: src -> pages -> Categorias. E criar o arquivo Categorias.js dentro da pasta acabada de criar. <br>

> Em *Categorias.js* colocamos a seguinte estrutura:
```jsx
import React, { Component } from 'react';

class Categorias extends Component {
    render(){
        return(
            <div>
                <h1>Categorias</h1>
                <footer>Escola SENAI de Informática</footer>
            </div>
        );
    }
}

export default Categorias;
```

<br><br>

> Para realizar o acesso a diferentes rotas, instalamos o react-router:
```bash
npm install --save react-router-dom
```

> O *index.js* possui toda a parte de roteamento e configuração.  <br>
> Vamos alterar esse arquivo para fazer com que as duas páginas sejam acessadas dessa forma:
- localhost:3000/
- localhost:3000/categorias
<br>

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// Importamos as dependências necessárias:
import {Route, BrowserRouter as Router} from 'react-router-dom';

// Importamos a página de Categorias:
import Categorias from './pages/Categorias/Categorias';

// Realizamos a criação das Rotas:
const Rotas = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/categorias" component={Categorias} />
        </div>
    </Router>
)

// Trocamos ao App padrão pelas nossas rotas
ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
> Rodamos a aplicação e testamos se as 2 urls estão funcionando corretamente: <br>
- localhost:3000/
- localhost:3000/categorias

> Criamos uma página "Não encontrada", caso passe alguma rota inválida, e dentro dela passamos:
```jsx
import React, { Component } from 'react';

class NaoEncontrada extends Component {
    render(){
        return <div>404</div>
    }
}

export default NaoEncontrada;
```

> Alteramos o *index.js* chamando o *Switch* e importando nossa classe criada:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// Importamos as dependências necessárias:
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

// Importamos as páginas criadas
import Categorias from './pages/Categorias/Categorias';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';

// Realizamos a criação das Rotas:
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/categorias" component={Categorias} />
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
```

> Com os arquivos de "gufos-base" em mãos, copiamos a pasta *assets* para dentro de *src* <br>
> Depois pegamos nosso *<header>* e *<main>*, e colocamos dentro de *Categorias.js*, e alteramos tudo de *class* para *className* <br>
> Além disso, importamos nosso logo dos assets para usálo como variável:
```jsx
import React, { Component } from 'react';
import Rodape from '../../components/Rodape/Rodape';

// Importamos nosso logo dos Assets
import logo from '../../assets/img/icon-login.png';

class Categorias extends Component {
    render(){
        return(
            <div className="App">
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo} />

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                        <table id="tabela-lista">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo"></tbody>
                        </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                        <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Categoria
                        </h2>
                        <form>
                        <div className="container">
                            <input
                            type="text"
                            className="class__categoria"
                            id="input__categoria"
                            placeholder="tipo do evento"
                            />
                            <button
                            id="btn__cadastrar"
                            className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                            >
                            Cadastrar
                            </button>
                        </div>
                        </form>
                    </div>
                    </section>
                </main>
                <footer className="rodapePrincipal">
                    <section className="rodapePrincipal-patrocinadores">
                    <div className="container">
                        <p>Escola SENAI de Informática - 2019</p>
                    </div>
                    </section>
                </footer>
            </div>
        );
    }
}

export default Categorias;
```


<br><br>

## Componetização

> Como os dois componentes/páginas possuem o Rodapé, podemos criar um outro componente 
> externo a fim de facilitar as futuras modificações e/ou alterações. <br>

> Para isso criamos a seguinte estrutura: <br>
> - src -> componentes -> Rodape -> criar um arquivo Rodape.js. <br>

> Dentro deste arquivo colocamos a seguinte estrutura:
```jsx
import React from 'react';

function Rodape(){
    return (
        <div>
            <footer className="rodapePrincipal">
                <section className="rodapePrincipal-patrocinadores">
                <div className="container">
                    <p>Escola SENAI de Informática - 2019</p>
                </div>
                </section>
            </footer>
        </div>
    )
}

export default Rodape;
```

>Dentro do arquivo *App.js*, comentamos o rodapé que tinha fixo e incluímos o novo:
```jsx
import React from 'react';
import './App.css';
// Importamos nosso componente
import Rodape from './components/Rodape/Rodape';

function App() {
  return (
    <div className="App">
      <h1>Home</h1>
      <Rodape />
      {/* <footer>Escola SENAI de Informática</footer> */}
    </div>
  );
}

export default App;
```

> Fazemos o mesmo em *Categorias.js* :
```jsx
import React, { Component } from 'react';
import Rodape from '../../components/Rodape/Rodape';

// Importamos nosso logo dos Assets
import logo from '../../assets/img/icon-login.png';

class Categorias extends Component {
    render(){
        return(
            <div className="App">
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo} />

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                        <table id="tabela-lista">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo"></tbody>
                        </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                        <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Categoria
                        </h2>
                        <form>
                        <div className="container">
                            <input
                            type="text"
                            className="class__categoria"
                            id="input__categoria"
                            placeholder="tipo do evento"
                            />
                            <button
                            id="btn__cadastrar"
                            className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                            >
                            Cadastrar
                            </button>
                        </div>
                        </form>
                    </div>
                    </section>
                </main>
                <Rodape />
            </div>
        );
    }
}

export default Categorias;
```

> Rodamos a aplicação e verificamos o resultado. <br>
> Com a aplicação rodando, testamos o componente incluindo o ano no Rodapé

<br><br><br>


# Ciclos de Vida

> Em *Categorias.js* importamos o *Link* do react-router-dom:
```jsx
import {Link} from 'react-router-dom';
```
> Em seguida, colocamos um Link para voltar para a home, em baixo do logo do Gufos:
```jsx
<Link to="/">Voltar</Link>
```

> Em *Categorias.js* colocamos os seguintes ciclos:
```jsx
    componentWillMount(){
        console.log('Will');
    }

    componentDidMount(){
        console.log('Did');
    }

    componentDidUpdate(){
        console.log("Update");
    }

    componentWillUnmount(){
        console.log("Unmount")
    }
```
> No console testamos os primeiros 3, que são muito parecidos, e depois clicamos no link *Voltar* para notar que o Unmount foi acionado <br>

> Mostramos o Warning referente ao componentWillMount, e abrimos na documentação do React sobre a descontinuação: <br>
> [https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

> Comitamos o que fizemos até agora para poder prosseguir sem erros <br>
> Após isto damos o seguinte comando , segundo documentação :

```bash
npx react-codemod rename-unsafe-lifecycles
```

> Ele vai perguntar quais arquivos desejamos verificar, colocamos **. (ponto)** para que ele pegue todos <br>
> Depois selecionamos a opção ***> Javascript*** <br>
> Note que agora o cliclo foi renomeado automaticamente para : *UNSAFE_componentWillMount()* <br>

# Props e State
## Props
> Para passar uma Prop nas rotas , usamos uma arrow function :
```jsx
// Declaração na index.js
<Route path="/categorias" component={ () => <Categorias titulo_pagina="Categorias | Gufos" /> } />
```
```jsx
// Chamada em Categorias.js , dentro do ciclo willMount
componentWillMount(){
    document.title = this.props.titulo_pagina;
    console.log('Will');
}
```

## State
> Criamos uma lista fixa de objeto para testarmos, dentro de um método construtor, passada via state:
```jsx
    constructor(){
        super();
        this.state = {
            lista : [
                {idCategoria: 1, titulo: "Design"},
                {idCategoria: 2, titulo: "Jogos"},
                {idCategoria: 3, titulo: "Meetup"}
            ]
        }
    }
```

> Varremos esta lista com *map* , dentro da tabela:
```jsx
                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.lista.map(function(categoria){
                                    return (
                                        <tr key={categoria.categoriaId}>
                                            <td>{categoria.categoriaId}</td>
                                            <td>{categoria.titulo}</td>
                                            <td>Alterar/Excluir</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
```
> Link para quem quiser entender melhor de MAP , FILTER e REDUCE: <br>
[https://medium.com/@programadriano/javascript-conhecendo-map-filter-e-reduce-ce072d8f0ec5]
(https://medium.com/@programadriano/javascript-conhecendo-map-filter-e-reduce-ce072d8f0ec5)


<br><br>

# Consumindo a API
# GET
> Antes de prosseguir, devemos comentar o HTTPS redirection no backend, e nos certificarmos de que o Cors está habilitado... <br>
> Alteramos para fazermos a chamada de API, utilizando fetch:
```jsx
    constructor(){
        super();
        this.state = {
            lista : []
            //     {idCategoria: 1, nome: "Design"},
            //     {idCategoria: 2, nome: "Jogos"},
            //     {idCategoria: 3, nome: "Meetup"}
            // ]
        }
    }

    listaAtualizada = () =>{
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState( {lista: data } ));
    }

    componentDidMount(){
        this.listaAtualizada();
    }
```
# POST
> Criamos um novo atributo, chamado *nome* em nosso construtor, além disso já criamos nosso método para cadastrar a categoria:
```jsx
    constructor(){
        super();
        this.state = {
            lista : [],
            nome : ""
        }
    }

    cadastrarCategoria(event){
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.nome);
    }
```
> No form colocamos nosso evento:
```jsx
<form onSubmit={this.cadastrarCategoria}>
```
> Após isto testamos e notamos que vai dar erro, pos não fizemos a ligação dos contextos do método com *bind* <br>
> Portanto, dentro do construtor, declaramos:
```jsx
    constructor(){
        super();
        this.state = {
            lista : [],
            nome : ""
        }

        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
    }
```
> Notamos agora, que o erro sumiu, mas ainda assim precisamos capturar os valores corretos do state, quando ele for alterado <br>
> Para isto, criamos o seguinte método:
```jsx
    atualizaNome(input){
        this.setState({ nome : input.target.value })
    }
```
> No nosso input colocamos o *value* e o evento *onChange*:
```jsx
    <input
        type="text"
        className="class__categoria"
        id="input__categoria"
        placeholder="tipo do evento"
        value={this.state.nome}
        onChange={this.atualizaNome.bind(this)}
    />
```

> Agora, criamos nossa requisição **POST**:
```jsx
    cadastrarCategoria(event){
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.nome);

        fetch("http://localhost:5000/api/categoria", {
           method : "POST",
           body: JSON.stringify({ titulo : this.state.nome }),
           headers : { 
               "Content-Type" : "application/json"
           }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.listaAtualizada();
            this.setState( () => ({ lista: this.state.lista }));
        })
        .catch(error => console.log(error))
    }
```

# DELETE
> Incluímos nosso método, copiando do *POST* e alterando alguns parâmetros:
```jsx
    deletarCategoria = (id) =>{

        console.log("Excluindo");
        
        fetch("http://localhost:5000/api/categoria/"+id, {
           method : "DELETE",
           headers : { 
               "Content-Type" : "application/json"
           }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.listaAtualizada();
            this.setState( () => ({ lista: this.state.lista }));
        })
        .catch(error => console.log(error))

    }
```

> Ddepois damos o *bind* deste método no construtor:
```jsx
    constructor(){
        super();
        this.state = {
            lista : [],
            nome : ""
        }

        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.deletarCategoria   = this.deletarCategoria.bind(this);
    }
```

> Dentro da nossa lista no *map*, damos o *bind* no *map* inteiro para poder chamar nosso método de exclusão <br>
> Além disso, incluímos nosso botão de acção e seu evento *onClick*:
```jsx
                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.lista.map(function(categoria){
                                    return (
                                        <tr key={categoria.categoriaId}>
                                            <td>{categoria.categoriaId}</td>
                                            <td>{categoria.titulo}</td>
                                            <td>
                                                <button onClick={e => this.deletarCategoria(categoria.categoriaId)}>Excluir</button>
                                            </td>
                                        </tr>
                                    );
                                }.bind(this))
                            }
                        </tbody>
```

# PUT
> Instalamos a biblioteca Material Design Bootstrap React, acessando pelo Google e seguindo os passos:
```bash
npm install --save mdbreact
```

> Em *index.js* importamos os estilos:
```jsx
// Importamos os estilos:
import './assets/css/flexbox.css';
import './assets/css/reset.css';
import './assets/css/style.css';
```

> Importamos para o *index.js* 
```jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
```

> Depois rodamos nossa aplicação novamente.
```bash
npm start
```

> No site do MDB(Material Design Bootstrap), entramos no link do Modal, e copiamos o seguinte trecho para o nosso código:
```jsx
// Import lá no topo:
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

// modal como false, no state
this.state = {
    lista : [],
    nome : "",
    loading: false,
    modal: false    
}

// O método Toggle
toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

// Modal antes do Rodapé, com o botão comentado
<MDBContainer>
    {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
    <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
    <MDBModalBody>
        (...)
    </MDBModalBody>
    <MDBModalFooter>
        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        <MDBBtn color="primary">Save changes</MDBBtn>
    </MDBModalFooter>
    </MDBModal>
</MDBContainer>
```

> Depois nosso método alterarCategoria deve ter o toggle dentro dele
```jsx
    alterarCategoria = (produto) => {        
        console.log(produto);

        // Abrir Modal
        this.toggle();
    }
```
> Colocamos o State editarModal :
```jsx
        this.state = {
            lista : [],
            nome : "",
            loading: false,
            modal: false,
            editarModal : {
                categoriaId: "",
                titulo: ""
            }          
        }
```

> Dentro de *alterarCategoria* setamos o State de *editarModal* :
```jsx
    alterarCategoria = (produto) => {
        console.log(produto);

        this.setState({
            editarModal: {
                  categoriaId : produto.categoriaId,
                  titulo: produto.titulo
            }
        })

        // Abrir Modal
        this.toggle();
    }
```

> E no Header do Modal colocamos para mostrar a categoria a ser editada:
```jsx
<MDBModalHeader toggle={this.toggle}>Editar <b>{this.state.editarModal.titulo}</b> </MDBModalHeader>
```

> Abraçamos nosso Container do Modal com um form, e mudamos os textos dos botões, além de inserir o type="submit" no botão Alterar:
```jsx
        <MDBContainer>
            {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
            <form>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Editar <b>{this.state.editarModal.titulo}</b> </MDBModalHeader>
                <MDBModalBody>
                        
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                    <MDBBtn color="primary" type="submit">Alterar</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </form>
        </MDBContainer>
```

> Agora vamos incluir o input do MDB
```jsx
// Damos o import, pode ser só o MDBInput, dentro do já importado mdbreact
import { MDBInput } from "mdbreact";

// Colocamos o input dentro do Body do Modal:
<MDBInput label="Categoria" value={this.state.editarModal.titulo} />
```

> Ao fazer isso podemos notar que não conseguimos mexer no input, portanto precisamos criar o método a seguir:
```jsx
    atualizaEditarModalTitulo(input){
        this.setState({ 
            editarModal: {
                categoriaId : this.state.editarModal.id,
                titulo: input.target.value
            }
        })
    }
```
> E aplicar em nosso input, no evento onChange:
```jsx
                <MDBContainer>
                    {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                    <form>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}>Editar <b>{this.state.editarModal.titulo}</b> </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput 
                                label="Categoria" 
                                value={this.state.editarModal.titulo}
                                onChange={this.atualizaEditarModalTitulo.bind(this)} 
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                            <MDBBtn color="primary" type="submit">Alterar</MDBBtn>
                        </MDBModalFooter>
                        </MDBModal>
                    </form>
                </MDBContainer>
```

> Após isto feito, criamos nosso método *salvarAlteracoes*:
```jsx
    salvarAlteracoes = (event) => {

        event.preventDefault();
        console.log(this.state.editarModal);

        fetch("http://localhost:5000/api/categoria/"+this.state.editarModal.categoriaId, {
           method : "PUT",
           body: JSON.stringify(this.state.editarModal),
           headers : { 
               "Content-Type" : "application/json"
           }
        })
        .then(response => response.json())
        .then(
            setTimeout(() => {
                this.listaAtualizada()
            }, 1000)
        )
        .catch(error => console.log(error))        

        // FecharModal
        this.toggle();
    }
```

> Damos o *bind* de *salvarAlteracoes* dentro do construtor para deixar o método dentro do mesmo contexto:
```jsx
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
        this.deletarCategoria   = this.deletarCategoria.bind(this);
        this.salvarAlteracoes   = this.salvarAlteracoes.bind(this);
```


# Loading e Mensagem de Erros

## Biblioteca - Font-Awesome
> Importamos para a nossa *index.html* no public o Font-Awesome, procurando sua CDN no Google:
```html
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
```

## Loading
> Dentro de **Categorias.js** definimos um state chamado ***loading*** <br>
> Dentro da lista atualizada colocamos nosso script, antes e depois do fetch, como ***true*** e ***false***:
```jsx
    listaAtualizada = () =>{

        this.setState({ loading : true});

        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => {
                this.setState( {lista: data } )
                this.setState({ loading : false});
            })
            .catch(error => {
                this.setState({ loading : false});
                console.log(error);
            })
    }
```

> Logo abaixo da div da tabela, colocamos nossa veirifcação para mostrar o Loading:
```jsx
    {loading && <i className="fa fa-spin fa-spinner fa-2x"></i>}
```

## Mensagem de Erros
> Criamos um state chamado ***erroMsg*** , com conteúdo vazio:
```jsx
        this.state = {
            lista : [],
            nome : "",
            loading: false,
            erroMsg : "",
            modal: false,
            editarModal : {
                categoriaId: "",
                titulo: ""
            }          
        }
```

> Agora damos a condição para ele aparecer caso tenha conteúdo:
```jsx
{this.state.erroMsg && <div className="text-danger">{this.state.erroMsg}</div>}
```

> Agora em deletarCategoria colocamos uma mensagem no catch, para que ele diga que não é possível excluir o item pois deve existir amarrções no banco:
```jsx
        .catch(error => {
            console.log(error)
            this.setState({ erroMsg : "Não foi possível excluir, verifique se não há eventos cadastrados nesta Categoria" })
        })
```

