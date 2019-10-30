using System.Collections.Generic;
using System.Threading.Tasks;
using GUFOS_BackEnd.Domains;
using GUFOS_BackEnd.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GUFOS_BackEnd.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        
        // GufosContext _context = new GufosContext();

        CategoriaRepository _repositorio = new CategoriaRepository ();

        // GET: api/Categoria/
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {
            var categorias = await _repositorio.Listar ();

            if (categorias == null) {
                return NotFound ();
            }

            return categorias;
        }

        // GET: api/Categoria/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {
            var categoria = await _repositorio.BuscarPorID (id);

            if (categoria == null) {
                return NotFound ();
            }

            return categoria;
        }

        // POST: api/Categoria/
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {
            try {
                await _repositorio.Salvar(categoria);
            } catch (DbUpdateConcurrencyException) {
                throw;
            }

            return categoria;
        }

        // PUT: api/Categoria/5
        [HttpPut ("{id}")]
        public async Task<IActionResult> Put (int id, Categoria categoria) {
            if (id != categoria.CategoriaId) {
                return BadRequest ();
            }

            try {
                
                await _repositorio.Alterar (categoria);
            
            } catch (DbUpdateConcurrencyException) {
                var categoria_valido = await _repositorio.BuscarPorID(id);

                if (categoria_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        // DELETE: api/Categoria/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Categoria>> Delete (int id) {
            var categoria = await _repositorio.BuscarPorID(id);
            if (categoria == null) {
                return NotFound ();
            }

            return categoria;
        }

    }
}