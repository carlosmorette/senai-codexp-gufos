using System.Collections.Generic;
using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;
using GUFOS_BackEnd.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GUFOS_BackEnd.Repositories {
    public class PresencaRepository : IPresenca {

        public async Task<Presenca> Alterar (Presenca presenca) {
            using (GufosContext _context = new GufosContext ()) {
                _context.Entry (presenca).State = EntityState.Modified;
                await _context.SaveChangesAsync ();
            }
            return presenca;
        }

        public async Task<Presenca> BuscarPorID (int id) {
            using (GufosContext _context = new GufosContext ())
            return await _context.Presenca.FindAsync (id);
        }

        public async Task<Presenca> Excluir (Presenca presenca) {
            using (GufosContext _context = new GufosContext ()) {
                _context.Presenca.Remove (presenca);
                await _context.SaveChangesAsync ();
                return presenca;
            }
        }

        public async Task<List<Presenca>> Listar () {
            using (GufosContext _context = new GufosContext ()) {
                return await _context.Presenca.Include ("Evento").Include ("Usuario").ToListAsync ();
            }
        }

        public async Task<Presenca> Salvar (Presenca presenca) {
            using (GufosContext _context = new GufosContext ()) {
                await _context.AddAsync (presenca);
                await _context.SaveChangesAsync ();

                return presenca;
            }
        }
    }
}