using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIProducts.Entities;
using APIProducts.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIProducts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository<User> _dataRepository;

        public UsersController(IUserRepository<User> dataRepository)
        {
            _dataRepository = dataRepository;
        }


        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return _dataRepository.GetAllUsers();
        }


        [HttpGet("{id}")]
        public User GetUserById(int id)
        {
            return _dataRepository.GetUserById(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User is null.");
            }

            _dataRepository.Add(user);
            return Ok();
        }



        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
