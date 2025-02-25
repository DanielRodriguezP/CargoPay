using CargoPay.Application.Services.Implementations;
using CargoPay.Application.Services.Interfaces;
using CargoPay.Data.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoPay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PayController: ControllerBase
    {
        private readonly IPayService _payService;

        public PayController(IPayService payService)
        {
            _payService = payService;
        }

        [HttpPost("AddPay")]
        public async Task<IActionResult> AddPay(PayDTO pay)
        {
            var result = await _payService.AddPaydAsync(pay);
            if (result.Success)
                return Ok(pay);

            return BadRequest(result.Message);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetPayAsync(Guid userId)
        {
            var response = await _payService.GetAsync(userId);
            if (response.Success)
            {
                return Ok(response.Result);
            }
            return NotFound(response.Message);
        }
    }
}
