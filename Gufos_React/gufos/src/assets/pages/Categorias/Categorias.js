import React, { Component } from 'react';
import Footer from '../../Componentes/Footer/Footer';
import { METHODS } from 'http';

// Import da biblioteca Material Design BootStrap 
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import { classBody } from '@babel/types';

class Categorias extends Component {

    //#region Método Construtor
    
    // Usado para criar nossos states
    constructor() {
        // Usado para poder manipular os states, que são herdados de Component
        super();
        this.state = {
            // Definimos uma lista inicial vazia
            lista: [],

            // Pegar input do FORM de cadastro
            nome: "",

            // Biblioteca - Material Design Bootstrap (MDB)
            modal: false,

            //Usamos para armazenar os dados a serem armazenados
            editarModal: {
                categoriaId: "",
                titulo: ""
            }
        }


        // Damos o bind quando não usamos arrow function
        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
    }
    //#endregion

    //#region Muda o Estado
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    //#endregion

    //#region Ciclo de Vida
    UNSAFE_componentWillMount() {
        document.title = this.props.titulo_pagina;
        console.log('Carregando');
    }

    componentDidMount() {
        console.log('Carregado');
        console.log(this.state.lista);
        this.listaAtualizada();
    }

    componentDidUpdate() {
        console.log('Atualizando');
    }

    componentWillUnmount() {
        console.log('Saindo');
    }
    //#endregion

    //#region GET
    // GET - Listar
    listaAtualizada = () => {
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState({ lista: data }))
    }
    //#endregion

    //#region POST
    // POST
    cadastrarCategoria(event) {

        // Impede que a página seja recarregada
        event.preventDefault();

        console.log('Cadastrando');
        console.log(this.state.nome);

        // Querendo ou não é CTRL+C CTRL+V 
        fetch("http://localhost:5000/api/categoria", {
            method: "POST",
            body: JSON.stringify({ titulo: this.state.nome }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }))
            }).catch(error => console.log(error))
    }
    //#endregion

    //#region PUT
    //UPDATE - Atualiza a categoria
    salvarAlteracoes = (event) => {
        // Previne que a página não seja recarregada
        event.preventDefault();

        fetch("http://localhost:5000/api/categoria/" + this.state.editarModal.categoriaId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.editarModal)
        })
            .then(response => response.json())
            .catch(error => console.log(error))

        // Atraso na requisição, pois as requests possuem intervalos muito próximos
        setTimeout(() => {
            this.listaAtualizada();
        }, 1000)

        // Fechar modal
        this.toggle();
    }
    //#endregion

    //#region DELETE
    // DELETE - Deletar categoria
    deletarCategoria = (id) => {

        console.log(id);

        fetch("http://localhost:5000/api/categoria/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listaAtualizada();
                this.setState(() => ({ lista: this.state.lista }))
            }).catch(error => console.log(error))
    }
    //#endregion

    // Acionado quando clicamos no botão editar para capturar e salvar no State os dados atuais
    alterarCategoria = (categoria) => {
        console.log(categoria)

        this.setState(
            {
                editarModal: {
                    categoriaId: categoria.categoriaId,
                    titulo: categoria.titulo
                }
            }
        );

        // Abrir modal
        this.toggle();
    }

    // Utilizamos para poder alterar o input de Cadastro
    atualizaNome(input) {
        this.setState({ nome: input.target.value })
    }

    //#region Atualiza State
    // Utilizamos para atualizar os states dos inputs
    atualizaEditarModalTitulo(input) {
        this.setState({
            editarModal: {
                categoriaId: this.state.editarModal.categoriaId,
                titulo: input.target.value
            }
        })
    }
    //#endregion

    render() {
        return (
            <div>
                {/* <Link to='/'>Voltar </Link> */}
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        // Percorrer a lista de Categorias
                                        this.state.lista.map(
                                            function (categoria) {
                                                return (
                                                    // Colocamos uma "key" pois cada linha em JSX precisa de um ID único
                                                    <tr key={categoria.categoriaId}>
                                                        <td>{categoria.categoriaId}</td>
                                                        <td>{categoria.titulo}</td>
                                                        <td>
                                                            <button onClick={e => this.alterarCategoria(categoria)}>Alterar</button>
                                                            <button onClick={e => this.deletarCategoria(categoria.categoriaId)}>Excluir</button>
                                                        </td>
                                                    </tr>
                                                )
                                                // Usamos para vincular todo o contexto do map
                                            }.bind(this))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Tipo de Evento</h2>
                            <form onSubmit={this.cadastrarCategoria}>
                                <div className="container">
                                    <input
                                        type="text"
                                        id="nome-tipo-evento"
                                        placeholder="tipo do evento" value={this.state.nome}
                                        onChange={this.atualizaNome.bind(this)}
                                    />
                                    <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                                </div>
                            </form>
                            {/* Utilizamos o Modal da biblioteca para fazer o UPDATE */}
                            <MDBContainer>
                                {/* Abraçamos os inputs do container com um form */}
                                <form onSubmit={this.salvarAlteracoes}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.titulo}</MDBModalHeader>
                                        <MDBModalBody>
                                            <MDBInput
                                                label="Categoria" value={this.state.editarModal.titulo}
                                                onChange={this.atualizaEditarModalTitulo.bind(this)}
                                            />
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                            {/* Incluimos o tipo Submit no botão para enviar o formulário */}
                                            <MDBBtn color="primary" type='submit'>Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </form>
                            </MDBContainer>
                        </div>
                    </section>
                </main>
                <Footer escola="SENAC" />
            </div >
        );
    }
}
export default Categorias;