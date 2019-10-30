using System.Collections.Generic;
using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;
using GUFOS_BackEnd.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GUFOS_BackEnd.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase {
        // GufosContext _context = new GufosContext();

        TipoUsuarioRepository _repositorio = new TipoUsuarioRepository ();

        // GET: api/TipoUsuario/
        [HttpGet]
        public async Task<ActionResult<List<TipoUsuario>>> Get () {
            var tipoUsuarios = await _repositorio.Listar ();

            if (tipoUsuarios == null) {
                return NotFound ();
            }

            return tipoUsuarios;
        }

        // GET: api/TipoUsuario/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Get (int id) {
            var tipoUsuario = await _repositorio.BuscarPorID (id);

            if (tipoUsuario == null) {
                return NotFound ();
            }

            return tipoUsuario;
        }

        // POST: api/TipoUsuario/
        [HttpPost]
        public async Task<ActionResult<TipoUsuario>> Post (TipoUsuario tipoUsuario) {
            try {
                await _repositorio.Salvar (tipoUsuario);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return tipoUsuario;
        }

        // PUT: api/TipoUsuario/5
        [HttpPut ("{id}")]
        public async Task<IActionResult> Put (int id, TipoUsuario tipoUsuario) {
            if (id != tipoUsuario.TipoUsuarioId) {
                return BadRequest ();
            }

            try {
                await _repositorio.Alterar (tipoUsuario);

            } catch (DbUpdateConcurrencyException) {
                var tipoUsuario_valido = await _repositorio.BuscarPorID (id);

                if (tipoUsuario_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        // DELETE: api/TipoUsuario/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<TipoUsuario>> Delete (int id) {
            var tipoUsuario = await _repositorio.BuscarPorID(id);
            if (tipoUsuario == null) {
                return NotFound ();
            }


            return tipoUsuario;
        }

    }
}