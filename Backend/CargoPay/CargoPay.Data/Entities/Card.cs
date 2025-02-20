using CargoPay.Data.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.Entities
{
    public class Card
    {
        public string Id { get; set; }
        public string? Number { get; set; }
        public int CVV { get; set; }
        public decimal Balance { get; set; }
        public CardType CardType { get; set; }

        [ForeignKey("User")]
        public string? UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
