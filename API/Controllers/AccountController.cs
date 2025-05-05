using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace API.Controllers
{

    
    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]  //account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto register)
        {

            if (await UserExists(register.UserName))
            {
                return BadRequest("Username is taken");
            }
            return Ok();
            //using var hmac = new HMACSHA512();
            //var user = new AppUser
            //{
            //    UserName = register.UserName.ToLower(),
            //    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(register.Password)),
            //    PasswordSalt = hmac.Key
            //};

            //context.Users.Add(user);
            //await context.SaveChangesAsync();
            //return new UserDto
            //{
            //    Username = user.UserName,
            //    Token = await tokenService.CreateToken(user)
            //};

        }

        [HttpPost("login")]  //account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            //var user = await context.Users.SingleOrDefaultAsync(x => x.UserName == login.UserName.ToLower());

            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());
            if (user == null)
            {
                return Unauthorized("Invalid username");
            }
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            return new UserDto
            {
                Username = user.UserName,
                Token = await tokenService.CreateToken(user)
            };
        }


        private async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower()); // Bob != bob
                                                                                                  // return await userManager.Users.AnyAsync(x => x.NormalizedUserName == username.ToUpper()); // Bob != bob
        }
    }
}
