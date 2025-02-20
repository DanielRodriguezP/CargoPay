using CargoPay.Data.DTOs;
using CargoPay.Data.Entities;
using CargoPay.Data.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Infrastructure.Repository.Interfaces
{
    public interface ICardRepository
    {
        Task<ActionResponse<Card>> GetAsync(Guid id);
        Task<ActionResponse<Card>> AddCardAsync(CardDTO cardDTO);
    }
}
