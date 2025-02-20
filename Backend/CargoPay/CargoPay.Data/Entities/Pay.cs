using CargoPay.Data.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.Entities
{
    public class Pay
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string? Details{ get; set; }
        public decimal Fee { get; set; }
        public decimal Amount { get; set; }
        public StatusEnum Status { get; set; }

        [ForeignKey("User")]
        public string? UserId { get; set; }
        public virtual User? User { get; set; }

        [ForeignKey("Card")]
        public string? CardId { get; set; }
        public virtual Card? Card { get; set; }
    }
}
