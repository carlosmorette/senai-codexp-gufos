import React, { Component } from 'react';
import Footer from '../../Componentes/Footer/Footer';
import { METHODS } from 'http';
import Categorias from '../Categorias/Categorias';
import Header from '../../Componentes/Header/Header';


class Eventos extends Component {

  //#region Método Construtor
  // Usado para criar nossos states
  constructor() {
    super();
    this.state = {
      lista: [],

      // Criamos esse objeto porque ele será responsável por listar
      listaCategoria: [],

      titulo: '',
      dataEvento: "",
      acessoLivre: "",
      categoria: "",

      editarModal: {
        eventoId: "",
        titulo: "",
        dataEvento: "",
        acessoLivre: "",
        categoria: ""
      },
    }
  }
  //#endregion

  //#region Ciclo de Vida

  // UNSAFE para desaparecer o erro de segurança
  UNSAFE_componentWillMount() {
    // No documento chamamos a propriedade title = isso.propriedade.titulo_pagina
    document.title = this.props.titulo_pagina;
    console.clear("CARREGANDO");
  }


  componentDidMount() {
    console.log('CARREGADO');
    console.log(this.state.lista);
    this.listarEvento();
    this.listarCategorias();
  }

  componentDidUpdate() {
    console.log('Atualizando');
  }

  // Diz que está saindo
  componentWillUnmount() {
    console.log("SAINDO");
  }

  //#endregion

  //#region GET
  //LISTAR
  listarEvento = () => {

    fetch('http://localhost:5000/api/evento')

      // Trazendo para JSON
      .then(response => response.json())

      // Alterando o estado da lista
      .then(data => this.setState({ lista: data }))
  }

  //#endregion

  //#region POST
  //POSTAR
  cadastrarEvento(event){
    event.preventDefault();

    console.log('Cadastrando');

  }

  //#endregion

  //#region Listar Categorias no Option
  listarCategorias = () => {
    // Queremos listar o Titulo de Categoria, então colocamos o Link da Categoria
    fetch('http://localhost:5000/api/Categoria/')

      // Trazendo para JSON
      .then(response => response.json())

      // Aqui chamamos o objeto listaCategoria porque ele será responsável por listar
      .then(data => this.setState({ listaCategoria: data }))
  }
  //#endregion

  render() {
    return (
      <div class="Eventos">
        <Header/>
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
            <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Evento</th>
                    <th>Data</th>
                    <th>Acesso Livre</th>
                    <th>Tipo do Evento</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody id="tabela-lista-corpo">
                  {
                    //Percorrer a lista de Eventos
                    this.state.lista.map(
                      function (evento) {
                        return (
                          //Colocamos uma 'key' pois cada linha em JSX precisa de um ID único
                          <tr key={evento.eventoId}>
                            <td>{evento.eventoId}</td>
                            <td>{evento.titulo}</td>
                            <td>{evento.dataEvento}</td>
                            <td>{evento.acessoLivre}</td>
                            <td>{evento.categoria.titulo}</td>
                            <td>
                              <button onClick={e => this.alteraEvento(evento)}>Alterar</button>
                              <button onClick={e => this.deletarEvento(evento.eventoId)}>Excluir</button>
                            </td>
                          </tr>
                        )
                      }.bind(this))
                  }
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
              <form>
                <div className="container">
                  <input type="text" id="evento__titulo" placeholder="título do evento"/>
                  <input type="text" id="evento__data" placeholder="dd/MM/yyyy" />
                  <select id="option__acessolivre">
                    <option value="1">Livre</option>
                    <option value="0">Restrito</option>
                  </select>

                  <select id="option__tipoevento">
                    <option value="0">Tipo do Evento</option>
                    {/* Aqui percorremos a lista de Categorias, mapeamos para conseguir mostra-la*/}
                    {
                      /* 
                        Aqui chamamos o objeto listaCategoria, lembrando que ele será responsável por listar
                      */
                      this.state.listaCategoria.map(
                        /*
                          Criamos a função que recebe como parametro categoria
                        */
                        function (categoria) {
                          // Interessante lembrar que return é como se fosse uma criação de elemento, ou seja, iremos mostrar algo novo, um elemento novo e a sintaxe fica = parametroCategoria.objetodesejado, que no caso é o titulo
                          return (
                            <option value="0">{categoria.titulo}</option>
                          )
                        }.bind(this))
                    }
                  </select>
                  <textarea
                    rows="3"
                    cols="50"
                    placeholder="descrição do evento"
                    id="evento__descricao"
                  ></textarea>
                </div>
              </form>
              <button
                className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                onclick="cadastrarEvento()"
              >
                Cadastrar
          </button>
            </div>
          </section>
        </main>
        <Footer />
      </div >
    );
  }
}

export default Eventos;