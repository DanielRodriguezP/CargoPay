using CargoPay.Application.Services.Interfaces;
using CargoPay.Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CargoPay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCardAsync(Guid id)
        {
            var response = await _cardService.GetAsync(id);
            if (response.Success)
            {
                return Ok(response.Result);
            }
            return NotFound(response.Message);
        }

        //private TokenDTO BuildToken(User user)
        //{
            //var claims = new List<Claim>
            //{
            //    new(ClaimTypes.Name, user.Email!),
            //    new(ClaimTypes.Role, user.UserType.ToString()),
            //    new("FirstName", user.FirstName),
            //    new("LastName", user.LastName),
            //    new("Photo", user.Photo ?? string.Empty),
            //    new("CountryId", user.Country.Id.ToString())
            //};

            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwtKey"]!));
            //var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //var expiration = DateTime.UtcNow.AddDays(30);
            //var token = new JwtSecurityToken(
            //    issuer: null,
            //    audience: null,
            //    claims: claims,
            //    expires: expiration,
            //    signingCredentials: credentials);

            //return new TokenDTO
            //{
            //    Token = new JwtSecurityTokenHandler().WriteToken(token),
            //    Expiration = expiration
            //};
        //}

    }
}
