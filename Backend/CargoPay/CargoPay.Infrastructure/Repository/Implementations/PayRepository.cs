using CargoPay.Data.DTOs;
using CargoPay.Data.Entities;
using CargoPay.Data.Response;
using CargoPay.Infrastructure.Data;
using CargoPay.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Infrastructure.Repository.Implementations
{
    public class PayRepository : IPayRepository
    {
        private readonly DataContext _context;
        public PayRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResponse<Pay>> AddPaydAsync(PayDTO payDTO)
        {
            var pay = new Pay
            {
                Id = Guid.NewGuid().ToString(),
                Amount = payDTO.Amount,
                Date = DateTime.Now,
                Details = payDTO.Details,
                Fee = payDTO.Fee,
                Status = payDTO.Status,
                UserId = payDTO?.UserId?.ToString(),
                CardId = payDTO?.CardId?.ToString(),
            };

            _context.Add(pay);

            try
            {
                var card = await UpdateBalance(pay.Amount, pay.Fee, pay.CardId, pay.UserId);
                if (!card)
                {
                    return new ActionResponse<Pay>
                    {
                        Success = false,
                        Message = "Saldo insuficiente"
                    };

                }

                await _context.SaveChangesAsync();
                return new ActionResponse<Pay>
                {
                    Success = true,
                    Result = pay
                };
               
            }
            catch (Exception e)
            {
                return new ActionResponse<Pay>
                {
                    Success = false,
                    Message = e.Message
                };
            }
        }

        private async Task<bool> UpdateBalance(decimal amount, decimal fee, string cardId, string userId)
        {
            var pays = await _context.Cards.FirstOrDefaultAsync(x => x.Id == cardId);
            if (amount > (pays.Balance))
            {
                return false;
            }
            var newAmount = pays.Balance -= amount;

            var numUpdated = _context.Cards.Where(c => c.Id == cardId).ExecuteUpdate(s => s
                .SetProperty(x => x.Balance, x => newAmount)
            ) ;

            if (numUpdated >= 1)
                return true;
            else return false;
        }

        public async Task<ActionResponse<IEnumerable<Pay>>> GetAsync(Guid userId)
        {
            var data = await _context.Pays.Include(c => c.Card).Where(c => c.UserId == userId.ToString()).ToListAsync();
            data.Select(c => new { c.Amount, c.Details, c.Date, c.Card?.Number, c.Fee, c.Status, c.UserId, c.CardId });

            return new ActionResponse<IEnumerable<Pay>>
            {
                Success = true,
                Result = data
            };
        }
    }
}
