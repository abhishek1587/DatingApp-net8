using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
    {
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            //var users = await userRepository.GetUsersAsync();
            //if (users == null || !users.Any())
            //{
            //    return NotFound("No users found.");
            //}
            //var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);
            //return  Ok(usersToReturn);

            var users = await userRepository.GetMembersAsync();
            return Ok(users);
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            //var user = await userRepository.GetUserByUsernameAsync(username);
            //if(user ==null)
            //{
            //    return NotFound($"User with username {username} not found.");
            //}
            //return  mapper.Map<MemberDto>( user);

            var user = await userRepository.GetMemberAsync(username);
            if (user == null) return NotFound();
            return Ok(user);
        }


        //[HttpGet("{id:int}")] // /api/users/1
        //public async Task<ActionResult<AppUser>> GetUser(int id)
        //{
        //    var user = await userRepository.GetUserByIdAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound($"User with ID {id} not found.");
        //    }
        //    return Ok(user);
        //}
    }
}
