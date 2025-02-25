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
    public class PayService : IPayService
    {
        private readonly IPayRepository _payRepository;
        public PayService(IPayRepository payRepository)
        {
                _payRepository = payRepository;
        }
        public async Task<ActionResponse<Pay>> AddPaydAsync(PayDTO payDTO) => await _payRepository.AddPaydAsync(payDTO);
        public async Task<ActionResponse<IEnumerable<Pay>>> GetAsync(Guid userId) => await _payRepository.GetAsync(userId);
    }
}
