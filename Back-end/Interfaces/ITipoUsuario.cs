using System.Collections.Generic;
using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;

namespace GUFOS_BackEnd.Interfaces {
    public interface ITipoUsuario {

        Task<List<TipoUsuario>> Listar ();

        Task<TipoUsuario> BuscarPorID (int id);

        Task<TipoUsuario> Salvar (TipoUsuario tipoUsuario);

        Task<TipoUsuario> Alterar (TipoUsuario tipoUsuario);

        Task<TipoUsuario> Excluir (TipoUsuario tipoUsuario);
    }
}