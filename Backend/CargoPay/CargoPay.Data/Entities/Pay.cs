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
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string? Details{ get; set; }
        public decimal Fee { get; set; }
        public decimal ValuePaid { get; set; }

        [ForeignKey("Customer")]
        public Guid? CustomerId { get; set; }
        public virtual Customer? Customer { get; set; }

        [ForeignKey("Card")]
        public Guid? CardId { get; set; }
        public virtual Card? Card { get; set; }
    }
}
