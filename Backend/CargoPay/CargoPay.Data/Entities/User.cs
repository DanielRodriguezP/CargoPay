using CargoPay.Data.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.Entities
{
    public class User: IdentityUser
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public UserType UserType { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string? Address { get; set; }
        public ICollection<Card>? Cards { get; set; }
        public ICollection<Pay>? Pays { get; set; }
    }
}
