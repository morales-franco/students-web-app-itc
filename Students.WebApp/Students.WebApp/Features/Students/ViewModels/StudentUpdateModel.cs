using Students.WebApp.Features.Students.Dtos;
using System.ComponentModel.DataAnnotations;

namespace Students.WebApp.Features.Students.ViewModels
{
    public record StudentUpdateModel
    {
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(50)]
        public string Apellido { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        public static explicit operator StudentUpdateDto(StudentUpdateModel model) =>
            new StudentUpdateDto(model.Id, model.Nombre, model.Apellido, model.FechaNacimiento);
    }
}
