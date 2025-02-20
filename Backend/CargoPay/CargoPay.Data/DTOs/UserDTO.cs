using CargoPay.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.DTOs
{
    public class UserDTO : User
    {
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [Required(ErrorMessageResourceName = "RequiredField")]
        [StringLength(20, MinimumLength = 6, ErrorMessageResourceName = "LengthField")]
        public string Password { get; set; } = null!;

        [Compare("Password", ErrorMessageResourceName = "PasswordAndConfirmationDifferent")]
        [Display(Name = "PasswordConfirm")]
        [DataType(DataType.Password)]
        [Required(ErrorMessageResourceName = "RequiredField")]
        [StringLength(20, MinimumLength = 6, ErrorMessageResourceName = "LengthField")]
        public string PasswordConfirm { get; set; } = null!;

    }
}
