import React, {Component} from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Rodape from '../../components/Rodape/Rodape';
import api from '../../services/api';
import { MDBBtn, MDBInput, MDBAlert, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";


export default class Eventos extends Component{

    constructor(){
        super()
        this.state = {
            
            listaEventos        : [],
            listaCategorias     : [],
            listaLocalizacao    : [],
            
            postEvento : {
                titulo: "",
                categoriaId: "",
                acessoLivre: "",
                dataEvento: "",
                localizacaoId: "",
            },

            putEvento : {
                eventoId: "",
                titulo: "",
                categoriaId: "",
                acessoLivre: "",
                dataEvento: "",
                localizacaoId: "",
            },

            erroMsg : "",
            successMsg : "",
            modal: false,

        }



    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    componentDidMount(){
        this.getEventos();
        this.getCategorias();
        this.getLocalizacao();
    }


    //#region GETs
    getEventos = () =>{
        api.get('/evento')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaEventos : response.data })
            }
        })
    }

    getCategorias = () => {
        api.get('/categoria')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaCategorias : response.data })
            }
        })
    }

    getLocalizacao = () => {
        api.get('/localizacao')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaLocalizacao : response.data })
            }
        })
    }
    //#endregion


    //#region POSTs
    postSetState = (input) =>{
        this.setState({
            postEvento : {
                ...this.state.postEvento, [input.target.name] : input.target.value
            }
        })
    }

    postEvento = (e) =>{

        e.preventDefault();

        // Converter para booleano
        if(this.state.postEvento.acessoLivre === "0"){ 
            this.state.postEvento.acessoLivre = false 
        }else{
            this.state.postEvento.acessoLivre = true
        }

        api.post('/evento', this.state.postEvento)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Não foi possível cadastrar evento" });
        })

        setTimeout(() => {
            this.getEventos();
        }, 1500);
    }
    //#endregion


    //#region DELETE
    deleteEvento(id){

        this.setState({ successMsg : "" })

        api.delete('/evento/'+id)
        .then(response => {
            if(response.status === 200){
                this.setState({ successMsg : "Excluído com sucesso" })

                setTimeout(() => {
                    this.getEventos();
                }, 1500);
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Falha ao excluir" })
        })
        
    }
    //#endregion
   
    
    //#region PUT
    putSetState = (input) =>{
        this.setState({
            putEvento : {
                ...this.state.putEvento, [input.target.name] : input.target.value
            }   
        })
    }
    
    putEvento = (event) =>{
        
        event.preventDefault();
        let evento_id = this.state.putEvento.eventoId;
        let evento_alterado = this.state.putEvento;
        
        // Converter para booleano
        if(this.state.putEvento.acessoLivre === "0"){ 
            this.state.putEvento.acessoLivre = false 
        }else{
            this.state.putEvento.acessoLivre = true
        }
        
        api.put('/evento/'+evento_id, evento_alterado)
        .then(() => {
            this.setState({successMsg : "Evento alterado com sucesso!"});
        })
        .catch(error => {
            console.log(error);
            this.setState({erroMsg : "Falha ao alterar o Evento"});
        })
        
        this.toggle();
        
        setTimeout(() => {
            this.getEventos();
        }, 1500);

        setTimeout(() => {
            this.setState({successMsg : ""});
            this.setState({erroMsg : ""});
        }, 3500);
        
    }
    
    openModal = (e) =>{
        
        this.toggle();
        this.setState({putEvento : e});
        
        console.log("PUT", this.state.putEvento);
    }
    //#endregion
    
    
    render(){
       return(
           <>
            <Cabecalho />

            <main className="conteudoPrincipal">
                <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                            {
                                this.state.erroMsg && 
                                <MDBAlert color="danger" >
                                    {this.state.erroMsg}
                                </MDBAlert>
                            }
                        
                            {
                            this.state.successMsg && 
                                <MDBAlert color="success" >
                                    {this.state.successMsg}
                                </MDBAlert>
                            }
                    <table id="tabela-lista">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Evento</th>
                            <th>Data</th>
                            <th>Acesso Livre</th>
                            <th>Categoria</th>
                            <th>Localização</th>
                            <th>Ações</th>
                        </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.listaEventos.map( 
                                    function (e) {
                                        return(
                                            <tr key={e.eventoId}>
                                                <td>{e.eventoId}</td>
                                                <td>{e.titulo}</td> 
                                                <td>{e.dataEvento}</td>
                                                <td>
                                                    {e.acessoLivre && "Sim"}
                                                    {!e.acessoLivre && "Não"}
                                                </td>
                                                <td>{e.categoria.titulo}</td>
                                                <td>{e.localizacao.endereco}</td>
                                                <td>
                                                    <MDBBtn color="primary" size="sm" onClick={() => this.openModal(e)}>
                                                        <i className="fas fa-edit"></i>
                                                    </MDBBtn>
                                                    <br />
                                                    <MDBBtn color="danger" size="sm" onClick={() => this.deleteEvento(e.eventoId)}>
                                                        <i className="fas fa-trash"></i>
                                                    </MDBBtn>
                                                </td>
                                            </tr>
                                        )
                                    }.bind(this)
                                )
                            }
                        </tbody>
                    </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                    <form onSubmit={this.postEvento}>    
                    <div className="container">
                        <input
                            type="text"
                            id="evento__titulo"
                            placeholder="título do evento"
                            name="titulo"
                            value={this.state.listaEventos.titulo}
                            onChange={this.postSetState}
                        />
                        <input 
                            type="datetime-local" 
                            id="evento__data" 
                            placeholder="dd/MM/yyyy"
                            name="dataEvento"
                            value={this.state.listaEventos.dataEvento}
                            onChange={this.postSetState}
                        />
                        <select id="option__acessolivre"
                            name="acessoLivre"
                            value={this.state.postEvento.acessoLivre}
                            onChange={this.postSetState}
                        >
                            <option value="1">Livre</option>
                            <option value="0">Restrito</option>
                        </select>
                        <select id="option__tipoevento"
                            name="categoriaId"
                            value={this.state.listaEventos.categoriaId}
                            onChange={this.postSetState}
                        >
                            <option value="">Escolha uma categoria...</option>
                            {
                                this.state.listaCategorias.map( function(c){
                                    return(
                                        <option 
                                            key={c.categoriaId}
                                            value={c.categoriaId}
                                        >
                                            {c.titulo}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <select id="option__enderecoevento"
                            name="localizacaoId"
                            value={this.state.listaEventos.localizacaoId}
                            onChange={this.postSetState}
                        >
                        <option value="">Escolha um endereço...</option>
                        {
                                this.state.listaLocalizacao.map( function(l){
                                    return(
                                        <option 
                                            key={l.localizacaoId}
                                            value={l.localizacaoId}
                                        >
                                            {l.endereco}
                                        </option>
                                    )
                                })
                            }                        
                        </select>

                    <button
                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                    </div>

                    </form>


                    </div>
                </section>


            </main>

            <MDBContainer>
                <form onSubmit={this.putEvento}>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>Editar - {this.state.putEvento.titulo}</MDBModalHeader>
                    <MDBModalBody>

                        <MDBInput 
                            label="Titulo" 
                            name="titulo"
                            value={this.state.putEvento.titulo}
                            onChange={this.putSetState}
                        />

                        <MDBInput
                            type="datetime-local"
                            label="Data do Evento" 
                            name="dataEvento"
                            value={this.state.putEvento.dataEvento.split(",")[0]}
                            onChange={this.putSetState}
                        />

                        <select 
                            name="acessoLivre" 
                            className="browser-default custom-select"
                            onChange={this.putSetState}
                        >
                                <option value={this.state.putEvento.acessoLivre}>
                                    {this.state.putEvento.acessoLivre == 0 && "Restrito"}
                                    {this.state.putEvento.acessoLivre == 1 && "Livre"}
                                </option>
                                <option value="0">Restrito</option>
                                <option value="1">Livre</option>
                        </select>
                        
                        <select 
                            name="categoriaId" 
                            className="browser-default custom-select"
                            onChange={this.putSetState}
                            value={this.state.putEvento.categoriaId}
                        >  
                            {
                                this.state.listaCategorias.map( function(c){
                                    return(
                                        <option 
                                            key={c.categoriaId}
                                            value={c.categoriaId}
                                        >
                                            {c.titulo}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <select 
                            name="localizacaoId" 
                            className="browser-default custom-select"
                            onChange={this.putSetState}
                            value={this.state.putEvento.localizacaoId}
                        >  
                            {
                                 this.state.listaLocalizacao.map( function(l){
                                    return(
                                        <option 
                                            key={l.localizacaoId}
                                            value={l.localizacaoId}
                                        >
                                            {l.endereco}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        
                    </MDBModalBody>
                    <MDBModalFooter>
                    <   MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                        <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                </form>
            </MDBContainer>

            <Rodape />
           </>
       ) 
    }

}