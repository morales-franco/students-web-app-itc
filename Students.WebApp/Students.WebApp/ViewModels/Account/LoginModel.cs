using System.ComponentModel.DataAnnotations;

namespace Students.WebApp.ViewModels.Account
{
    public class LoginModel
    {
        [Required(ErrorMessage ="El campo Usuario es Obligatorio.")]
        [Display(Name = "Usuario")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "El campo Contraseña es Obligatorio.")]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }
    }
}
