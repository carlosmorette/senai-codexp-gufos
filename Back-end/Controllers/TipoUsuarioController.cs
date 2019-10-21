using System.Collections.Generic;
using System.Threading.Tasks;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers {

    [Route ("api/[controller]")]

    //GET: api/TipoUsuario
    [ApiController]
    public class TipoUsuarioController : ControllerBase {

        GufosContext _contexto = new GufosContext ();

        [HttpGet]
        public async Task<ActionResult<List<TipoUsuario>>> Get () {

            var tipousuario = await _contexto.TipoUsuario.ToListAsync ();

            if (tipousuario == null) {
                return NotFound ();
            }

            return tipousuario;
        }

        // GET: api/tipousuario/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<List<TipoUsuario>>> Get (int id) {

            var tipousuario = await _contexto.TipoUsuario.Include ("Usuario").ToListAsync ();

            if (tipousuario == null) {
                return NotFound ();
            }

            return tipousuario;
        }

        // Não colocamos ID porque ja faz auto-incremento (IDENTITY)
        //POST: api/tipousuario
        [HttpPost]
        public async Task<ActionResult<TipoUsuario>> Post (TipoUsuario tipoUsuario) {

            try {
                await _contexto.AddAsync (tipoUsuario);

                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return tipoUsuario;
        }

        // Referenciamos o ID para mostrar onde iremos fazer a alteração
        //PUT: api/tipousuario
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, TipoUsuario tipoUsuario) {

            if (id != tipoUsuario.TipoUsuarioId) {
                return BadRequest ();
            }

            _contexto.Entry (tipoUsuario).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {

                var tipousuario_valido = await _contexto.TipoUsuario.FindAsync (id);

                if (tipoUsuario == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        //DELETE: api/tipousuario/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Delete (int id) {

            var tipoUsuario = await _contexto.TipoUsuario.FindAsync (id);

            if (tipoUsuario == null) {
                return NotFound ();
            }

            _contexto.TipoUsuario.Remove (tipoUsuario);
            await _contexto.SaveChangesAsync ();

            return tipoUsuario;

        }
    }
}