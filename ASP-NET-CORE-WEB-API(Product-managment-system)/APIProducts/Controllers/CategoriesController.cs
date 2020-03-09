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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository<Category> _dataRepository;

        public CategoriesController(ICategoryRepository<Category> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IActionResult GetGategories()
        {
            IEnumerable<Category> categories = _dataRepository.GetCategories();
            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public string GetCategoryNameByTheCategoryId(int categoryId)
        {
            return _dataRepository.GetCategoryNameByTheCategoryId(categoryId);
        }

        [HttpGet("take-id/{categoryName}")]
        public int GetCategoryIdByTheCategoryName(string categoryName)
        {
            return _dataRepository.GetCategoryIdByTheCategoryName(categoryName);
        }
    }
}
