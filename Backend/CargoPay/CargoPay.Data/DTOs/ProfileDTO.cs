using CargoPay.Data.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.DTOs
{
    public class ProfileDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public UserType UserType { get; set; }
        public string? Address { get; set; }
        public string FullName => $"{FirstName} {LastName}";
    }
}
