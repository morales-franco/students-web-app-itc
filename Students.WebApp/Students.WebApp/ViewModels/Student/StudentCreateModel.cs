using System.ComponentModel.DataAnnotations;

namespace Students.WebApp.ViewModels.Student
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

        //public static explicit operator StudentCreateRequest(StudentCreateModel model) =>
        //    new StudentCreateRequest(model.Nombre, model.Apellido, model.FechaNacimiento);
    }
}
