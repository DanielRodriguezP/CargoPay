using CargoPay.Data.Entities;
using CargoPay.Data.Enum;
using CargoPay.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CargoPay.Infrastructure.Data
{
    public class SeedDb
    {
        private readonly DataContext _context;
        private readonly IUsersRepository _usersService;

        public SeedDb(DataContext context, IUsersRepository userService)
        {
            _context = context;
            _usersService = userService;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();
            await CheckRolesAsync();
            await CheckUserAsync("Daniel", "Rodriguez", "daniel.rodriguez@gmail.com", "322 311 4620", UserType.Admin, "Calle 40 #50-34");

        }
        private async Task CheckRolesAsync()
        {
            await _usersService.CheckRoleAsync(UserType.Admin.ToString());
            await _usersService.CheckRoleAsync(UserType.User.ToString());
        }

        private async Task<User> CheckUserAsync(string firstName, string lastName, string email, string phone, UserType userType, string address)
        {
            var user = await _usersService.GetUserAsync(email);
            if (user == null)
            {
                user = new User
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    UserName = email,
                    PhoneNumber = phone,
                    UserType = userType,
                    Address = address
                };

                await _usersService.AddUserAsync(user, "123456");
                await _usersService.AddUserToRoleAsync(user, userType.ToString());
            }

            return user;
        }



    }
}
