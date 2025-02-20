using CargoPay.Data.DTOs;
using CargoPay.Data.Entities;
using CargoPay.Data.Enum;
using CargoPay.Data.Response;
using CargoPay.Infrastructure.Data;
using CargoPay.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Infrastructure.Repository.Implementations
{
    public class CardRepository : ICardRepository
    {
        private readonly DataContext _context;

        public CardRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ActionResponse<Card>> AddCardAsync(CardDTO cardDTO)
        {
            var card = new Card
            {
                Id = Guid.NewGuid().ToString(),
                Balance = cardDTO.Balance,
                Number = cardDTO.Number,
                CVV = cardDTO.CVV,
                CardType = cardDTO.CardType,
                UserId = cardDTO.UserId.ToString(),
            };

            _context.Add(card);

            try
            {
                await _context.SaveChangesAsync();
                return new ActionResponse<Card>
                {
                    Success = true,
                    Result = card
                };
            }
            catch (Exception e) 
            {
                return new ActionResponse<Card>
                {
                    Success = false,
                    Message = e.Message
                };
            }
        }
     
        public async Task<ActionResponse<Card>> GetAsync(Guid id)
        {
            var data = await _context.Cards.FirstOrDefaultAsync(c => c.Id == id.ToString());

            if (data == null)
            {
                return new ActionResponse<Card>
                {
                    Success = false,
                    Message = "Error, no existe la tarjeta"
                };
            }

            return new ActionResponse<Card>
            {
                Success = true,
                Result = data
            };
        }
    }
}
