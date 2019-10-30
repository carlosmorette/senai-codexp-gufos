using System.Collections.Generic;
using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;
using GUFOS_BackEnd.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GUFOS_BackEnd.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase {
        // GufosContext _context = new GufosContext();

        UsuarioRepository _repositorio = new UsuarioRepository ();

        // GET: api/Usuario/
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Usuario>>> Get () {
            var usuarios = await _repositorio.Listar ();

            if (usuarios == null) {
                return NotFound ();
            }
            return usuarios;
        }

        // GET: api/Usuario/5
        [HttpGet ("{id}")]
        [Authorize]
        public async Task<ActionResult<Usuario>> Get (int id) {
            var usuario = await _repositorio.BuscarPorID (id);

            if (usuario == null) {
                return NotFound ();
            }
            return usuario;
        }

        // POST: api/Usuario/
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Usuario>> Post (Usuario usuario) {
            try {
                await _repositorio.Salvar (usuario);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return usuario;
        }

        // PUT: api/Usuario/5
        [HttpPut ("{id}")]
        [Authorize]
        public async Task<IActionResult> Put (int id, Usuario usuario) {
            if (id != usuario.UsuarioId) {
                return BadRequest ();
            }

            try {
                await _repositorio.Alterar (usuario);
            } catch (DbUpdateConcurrencyException) {
                var usuario_valido = await _repositorio.BuscarPorID (id);

                if (usuario_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        // DELETE: api/Usuario/5
        [HttpDelete ("{id}")]
        [Authorize]
        public async Task<ActionResult<Usuario>> Delete (int id) {
            var usuario = await _repositorio.BuscarPorID (id);
            if (usuario == null) {
                return NotFound ();
            }

            return usuario;
        }

    }
}