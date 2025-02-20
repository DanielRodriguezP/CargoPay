using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.DTOs
{
    public class LoginDTO
    {
        [Display(Name = "Email")]
        [Required(ErrorMessageResourceName = "RequiredField")]
        [EmailAddress(ErrorMessageResourceName = "ValidEmail")]
        public string Email { get; set; } = null!;

        [Display(Name = "Password")]
        [Required(ErrorMessageResourceName = "RequiredField")]
        [MinLength(6, ErrorMessageResourceName = "MinLength")]
        public string Password { get; set; } = null!;

    }
}
