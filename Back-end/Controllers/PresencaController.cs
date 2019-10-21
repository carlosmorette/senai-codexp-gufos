using System.Collections.Generic;
using System.Threading.Tasks;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers {

    [Route("api/[controller]")]

    //GET: api/Presenca
    [ApiController]
    public class PresencaController : ControllerBase {

        GufosContext _contexto = new GufosContext ();

        [HttpGet]
        public async Task<ActionResult<List<Presenca>>> Get () {

            var presenca = await _contexto.Presenca.Include ("Evento").Include ("Usuario").ToListAsync ();

            if (presenca == null) {
                return NotFound ();
            }

            return presenca;
        }

        // GET: api/Presenca/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<List<Presenca>>> Get (int id) {

            var presenca = await _contexto.Presenca.Include ("Evento").Include ("Usuario").ToListAsync ();

            if (presenca == null) {
                return NotFound ();
            }

            return presenca;
        }

        // Não colocamos ID porque ja faz auto-incremento (IDENTITY)
        //POST: api/Presenca
        [HttpPost]
        public async Task<ActionResult<Presenca>> Post (Presenca presenca) {

            try {
                await _contexto.AddAsync (presenca);

                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return presenca;
        }

        // Referenciamos o ID para mostrar onde iremos fazer a alteração
        //PUT: api/Presenca
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Presenca presenca) {

            if (id != presenca.PresencaId) {
                return BadRequest ();
            }

            _contexto.Entry (presenca).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {

                var presenca_valido = await _contexto.Presenca.FindAsync (id);

                if (presenca_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        //DELETE: api/presenca/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Presenca>> Delete (int id) {

            var presenca = await _contexto.Presenca.FindAsync (id);

            if (presenca == null) {
                return NotFound ();
            }

            _contexto.Presenca.Remove (presenca);
            await _contexto.SaveChangesAsync ();

            return presenca;

        }
    }
}