using APIProducts.DB;
using APIProducts.Entities;
using APIProducts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIProducts.DataManager
{
    public class CategoryManager : ICategoryRepository<Category>
    {
        private readonly ModelDbContext _dbContext;

        public CategoryManager(ModelDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Category> GetCategories()
        {
            return _dbContext.Categories;
        }

        //We sent the category id from some product,after that we get the name from the Categories table
        public string GetCategoryNameByTheCategoryId(int categoryId)
        {
            return _dbContext.Categories.FirstOrDefault(category => category.CategoryId == categoryId).CategoryName;
        }

        public int GetCategoryIdByTheCategoryName(string categoryName)
        {
            return _dbContext.Categories.FirstOrDefault(category => category.CategoryName == categoryName).CategoryId;
        }
    }
}
