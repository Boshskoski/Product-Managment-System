using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIProducts.Repositories
{
    public interface ICategoryRepository<Category>
    {
        IEnumerable<Category> GetCategories();
        string GetCategoryNameByTheCategoryId(int categoryId);
        int GetCategoryIdByTheCategoryName(string categoryName);
    }
}
