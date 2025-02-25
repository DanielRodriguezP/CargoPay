using CargoPay.Data.Entities;
using CargoPay.Data.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.DTOs
{
    public class PayDTO
    {
        public string? Details { get; set; }
        public decimal Fee { get; set; }
        public decimal Amount { get; set; }
        public StatusEnum Status { get; set; }
        public string? UserId { get; set; }
        public string? CardId { get; set; }
    }
}
