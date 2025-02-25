using CargoPay.Application.Services.Interfaces;
using CargoPay.Data.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CargoPay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;
        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpPost("AddCard")]
        public async Task<IActionResult> AddCard(CardDTO card)
        {
            var result = await _cardService.AddCardAsync(card);
            if (result.Success)
                return Ok(card);

            return BadRequest(result.Message);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCardAsync(Guid userId)
        {
            var response = await _cardService.GetAsync(userId);
            if (response.Success)
            {
                return Ok(response.Result);
            }
            return NotFound(response.Message);
        }
    }
}
