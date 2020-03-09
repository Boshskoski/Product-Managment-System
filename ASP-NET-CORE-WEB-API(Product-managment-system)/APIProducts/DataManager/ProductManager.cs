using APIProducts.DB;
using APIProducts.Entities;
using APIProducts.Models;
using APIProducts.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIProducts.DataManager
{
    public class ProductManager : IProductRepository<Product>
    {
        private readonly ModelDbContext _dbContext;

        public ProductManager(ModelDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Add(Product product)
        {
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
        }

        public void Delete(Product product)
        {
            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();
        }

        public Product Get(int id)
        {
            return _dbContext.Products.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<Product> GetAll()
        {
            return _dbContext.Products.ToList();
        }

        public void Update(Product product, ProductDto dbEntity)
        {
            product.Id = dbEntity.Id;
            product.ProductName = dbEntity.ProductName;
            product.ProductCode = dbEntity.ProductCode;
            product.CategoryId = dbEntity.CategoryId;
            product.Price = dbEntity.Price;
            product.Description = dbEntity.Description;
            product.ImageUrl = dbEntity.ImageUrl;
            product.ReleaseDate = Convert.ToDateTime(dbEntity.ReleaseDate);
         
            _dbContext.SaveChanges();
        }
    }
}
