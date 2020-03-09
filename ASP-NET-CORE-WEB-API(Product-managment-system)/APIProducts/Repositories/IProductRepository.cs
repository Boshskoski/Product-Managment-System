using APIProducts.Entities;
using APIProducts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIProducts.Repositories
{
    public interface IProductRepository<Product>
    {
        IEnumerable<Product> GetAll();
        Product Get(int id);
        void Add(Product product);
        void Update(Product product, ProductDto dbEntity);
        void Delete(Product product);
    }
}
