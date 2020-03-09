using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIProducts.Entities;
using APIProducts.Models;
using APIProducts.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIProducts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository<Product> _dataRepository;

        public ProductsController(IProductRepository<Product> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Product> products = _dataRepository.GetAll();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Product product = _dataRepository.Get(id);

            if (product == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }

            return Ok(product);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Employee is null.");
            }

            _dataRepository.Add(product);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id , [FromBody] ProductDto product)
        {
            if (product == null)
            {
                return BadRequest("Employee is null.");
            }

            Product productToUpdate = _dataRepository.Get(product.Id);
            if (productToUpdate == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }

            _dataRepository.Update(productToUpdate, product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Product product = _dataRepository.Get(id);
            if (product == null)
            {
                return NotFound("The Employee record with this id couldn't be found.");
            }

            _dataRepository.Delete(product);
            return NoContent();
        }


    }
}
