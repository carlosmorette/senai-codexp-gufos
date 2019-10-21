using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    [Table("Tipo_Usuario")]
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            Usuario = new HashSet<Usuario>();
        }

        [Key]
        [Column("Tipo_Usuario_id")]
        public int TipoUsuarioId { get; set; }
        [Required]
        [StringLength(255)]
        public string Titulo { get; set; }

        [InverseProperty("TipoUsuario")]
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
