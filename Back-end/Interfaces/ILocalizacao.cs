using System.Collections.Generic;
using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;

namespace GUFOS_BackEnd.Interfaces
{
    public interface ILocalizacao
    {

        Task<List<Localizacao>> Listar();

        Task<Localizacao> BuscarPorID (int id);

        Task<Localizacao> Salvar (Localizacao localizacao);

        Task<Localizacao> Alterar (Localizacao localizacao);

        Task<Localizacao> Excluir (Localizacao localizacao);
    }
}