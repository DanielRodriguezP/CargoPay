using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Data.Response
{
    public class ActionResponse<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Result { get; set; }
    }
}
