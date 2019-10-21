using System.Collections.Generic;
using System.Threading.Tasks;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers {

    [Route ("api/[controller]")]

    //GET: api/usuario
    [ApiController]
    public class UsuarioController : ControllerBase {

        GufosContext _contexto = new GufosContext ();

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {

            var usuario = await _contexto.Usuario.Include (t => t.TipoUsuario).ToListAsync ();

            if (usuario == null) {
                return NotFound ();
            }

            return usuario;
        }

        // GET: api/usuario/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            var usuario = await _contexto.Usuario.Include (t => t.TipoUsuario).FirstOrDefaultAsync (e => e.UsuarioId == id);

            if (usuario == null) {
                return NotFound ();
            }

            return usuario;
        }
        // Não colocamos ID porque ja faz auto-incremento (IDENTITY)
        //POST: api/usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post (Usuario Usuario) {

            try {
                await _contexto.AddAsync (Usuario);

                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return Usuario;
        }

        // Referenciamos o ID para mostrar onde iremos fazer a alteração
        //PUT: api/usuario
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Usuario Usuario) {

            if (id != Usuario.UsuarioId) {
                return BadRequest ();
            }

            _contexto.Entry (Usuario).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {

                var usuario_valido = await _contexto.Usuario.FindAsync (id);

                if (Usuario == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        //DELETE: api/usuario/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Usuario>> Delete (int id) {

            var Usuario = await _contexto.Usuario.FindAsync (id);

            if (Usuario == null) {
                return NotFound ();
            }

            _contexto.Usuario.Remove (Usuario);
            await _contexto.SaveChangesAsync ();

            return Usuario;

        }
    }
}