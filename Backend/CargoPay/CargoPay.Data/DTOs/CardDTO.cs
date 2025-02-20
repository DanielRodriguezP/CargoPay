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
    public class CardDTO
    {
        public string? Number { get; set; }
        public int CVV { get; set; }
        public decimal Balance { get; set; }
        public CardType CardType { get; set; }
        public Guid? CustomerId { get; set; }
    }
}
