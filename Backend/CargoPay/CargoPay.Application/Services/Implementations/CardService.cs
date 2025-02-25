using CargoPay.Application.Services.Interfaces;
using CargoPay.Data.DTOs;
using CargoPay.Data.Entities;
using CargoPay.Data.Response;
using CargoPay.Infrastructure.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Application.Services.Implementations
{
    public class CardService : ICardService
    {
        private readonly ICardRepository _cardRepository;

        public CardService(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }
        public async Task<ActionResponse<Card>> AddCardAsync(CardDTO cardDTO) => await _cardRepository.AddCardAsync(cardDTO);
        public async Task<ActionResponse<IEnumerable<Card>>> GetAsync(Guid userId) => await _cardRepository.GetAsync(userId);
    }
}
