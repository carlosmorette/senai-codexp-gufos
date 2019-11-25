import React, { Component } from 'react';
import Footer from '../../Componentes/Footer/Footer';
import { METHODS } from 'http';
import Categorias from '../Categorias/Categorias';
import Header from '../../Componentes/Header/Header';
import api from '../../../services/api';
import Axios from 'axios';


class Eventos extends Component {

  //#region Método Construtor
  // Usado para criar nossos states
  constructor() {
    super();
    this.state = {
      lista: [],

      // Criamos esse objeto porque ele será responsável por listar
      listaCategoria: [],

      titulo: "",
      data: new Date(),
      acesso: 0,
      tipodoevento: "",
      categoriaId: 0

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

  //#region POST
  //POSTAR
  cadastrarEvento(event) {
    event.preventDefault();

    let evento = {
      titulo: this.state.titulo,
      data: new Date(this.state.data),
      acesso: parseInt(this.state.acesso),
      categoriaId: this.state.categoriaId
    };

    Axios.post('http://localhost:5000/api/eventos', evento)
      .then(data => {
        if (data.status === 200) {
          console.log('Evento Cadastrado!');
          this.setState({ isLoading: false });
        };
      })
      .catch(erro => {
        console.log(erro);
        this.setState({ isLoading: false });
      })
      .then(this.listarEvento.bind(this));

  };


  atualizaStateCampo(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  //#endregion

  render() {
    return (
      <div class="Eventos">
        <Header />
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
                            <td>{evento.acessoLivre ? 'Livre' : 'Restrito'}</td>
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
              <form onSubmit={this.cadastrarEvento.bind(this)}>
                <div className="container">
                  <input
                    type="text"
                    id="evento__titulo"
                    placeholder="título do evento"
                    onChange={this.atualizaStateCampo.bind(this)}
                  />
                  <input
                    type="date"
                    id="evento__data"
                    placeholder="dd/MM/yyyy"
                    onChange={this.atualizaStateCampo.bind(this)}
                  />
                  <select id="option__acessolivre"
                    value={this.state.value}
                    onChange={this.atualizaStateCampo.bind(this)}>
                    <option value="1">Livre</option>
                    <option value="0">Restrito</option>
                  </select>

                  <select id="option__tipoevento"
                    value={this.state.value}
                    onChange={this.atualizaStateCampo.bind(this)}>
                    <option value="0">Tipo do Evento</option>
                    {
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
                <center>
                  <button
                    type="submit"
                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                    Cadastrar
                    </button>
                </center>
              </form>

            </div>
          </section>
        </main>
        <Footer />
      </div >
    );
  }
}

export default Eventos;