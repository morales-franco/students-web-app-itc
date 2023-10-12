using Students.WebApp.Features.Students.Dtos;
using System.ComponentModel.DataAnnotations;

namespace Students.WebApp.Features.Students.ViewModels
{
    public record StudentCreateModel
    {
        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(50)]
        public string Apellido { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        public static explicit operator StudentCreateDto(StudentCreateModel model) =>
            new StudentCreateDto(model.Nombre, model.Apellido, model.FechaNacimiento);
    }
}
