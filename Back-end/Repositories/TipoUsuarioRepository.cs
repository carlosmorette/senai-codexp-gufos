using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;
using GUFOS_BackEnd.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GUFOS_BackEnd.Repositories {
    public class TipoUsuarioRepository : ITipoUsuario {

        public async Task<TipoUsuario> Alterar (TipoUsuario tipoUsuario) {
            using (GufosContext _context = new GufosContext ()) {
                _context.Entry (tipoUsuario).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }
            return tipoUsuario;
        }

        public async Task<TipoUsuario> BuscarPorID (int id) {
            using (GufosContext _context = new GufosContext ())
            return await _context.TipoUsuario.FindAsync (id);
        }

        public async Task<TipoUsuario> Excluir (TipoUsuario tipoUsuario) {
            using (GufosContext _context = new GufosContext ()) {
                _context.TipoUsuario.Remove (tipoUsuario);
                await _context.SaveChangesAsync ();
                return tipoUsuario;
            }
        }

        public async Task<System.Collections.Generic.List<TipoUsuario>> Listar () {
            using (GufosContext _context = new GufosContext ()) {
                return await _context.TipoUsuario.ToListAsync ();
            }
        }

        public async Task<TipoUsuario> Salvar (TipoUsuario tipoUsuario) {
            using (GufosContext _context = new GufosContext ()) {
                await _context.AddAsync (tipoUsuario);
                await _context.SaveChangesAsync ();

                return tipoUsuario;
            }
        }
    }
}