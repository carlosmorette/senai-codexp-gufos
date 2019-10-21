using System.Collections.Generic;
using System.Threading.Tasks;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers {

    // Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[controller]")]

    // Controle de API
    [ApiController]
    public class LocalizacaoController : ControllerBase {

        GufosContext _contexto = new GufosContext ();

        // GET: api/Localizacao
        [HttpGet]
        public async Task<ActionResult<List<Localizacao>>> Get () {

            var localizacoes = await _contexto.Localizacao.ToListAsync ();

            if (localizacoes == null) {
                return NotFound ();
            }

            return localizacoes;
        }

        // GET: api/Localizacao/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Localizacao>> Get (int id) {

            // FindAsync = procura algo específico no banco
            var localizacao = await _contexto.Localizacao.FindAsync (id);

            if (localizacao == null) {
                return NotFound ();
            }

            return localizacao;
        }

        // POST api/Localizacao
        [HttpPost]
        public async Task<ActionResult<Localizacao>> Post (Localizacao localizacao) {

            try {
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync (localizacao);

                // Salvamos efetivamente o nosso objeto no banco de dados
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return localizacao;
        }

        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Localizacao localizacao) {

            // Se o Id do objeto não existir ele retorna 404
            if (id != localizacao.LocalizacaoId) {
                return BadRequest ();
            }

            // Comparamos os atributos que foram modificados através do EF(Entity Framework)
            _contexto.Entry (localizacao).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {

                // Verificamos se o obejto inserido realmente existe no banco
                var localizacao_valido = await _contexto.Localizacao.FindAsync (id);

                if (localizacao_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            // NoContent = Retorna 204, sem nada
            return NoContent ();
        }

        //DELETE api/localizacao/id
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Localizacao>> Delete (int id) {

            var localizacao = await _contexto.Localizacao.FindAsync (id);

            if (localizacao == null) {
                return NotFound ();
            }

            _contexto.Localizacao.Remove(localizacao);
            await _contexto.SaveChangesAsync();

            return localizacao;
        }
    }
}