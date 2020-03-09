using APIProducts.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIProducts.DB
{
    public class ModelDbContext : DbContext
    {
        public ModelDbContext(DbContextOptions<ModelDbContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Category>().HasData(new Category
            {
                CategoryId = 1,
                CategoryName = "Toolbox",
            }, new Category
            {
                CategoryId = 2,
                CategoryName = "Garden",
            }, new Category
            {
                CategoryId = 3,
                CategoryName = "Gaming",
            });


           modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 1,
                ProductName = "Leaf Rake",
               ProductCode = "XN-127",
               ReleaseDate = new DateTime(2020, 02, 25),
                Price = 30,
                Description = "Leaf rake with 48-inch wooden handle",
                StarRating = 3.2,
                ImageUrl = @"StaticFiles\Images\leaf_rake.png",
                CategoryId = 2,

            }, new Product
            {
                Id = 2,
                ProductName = "Garden Cart",
                ProductCode = "XN-125",
                ReleaseDate = new DateTime(2020, 02, 18),
                Price = 32.44,
                Description = "15 gallon capacity rolling garden cart",
                StarRating = 4.2,
                ImageUrl = @"StaticFiles\Images\garden_cart.png",
                CategoryId = 2,

            },new Product
            {
                Id = 3,
                ProductName = "Hammer",
                ProductCode = "XN-123",
                ReleaseDate = new DateTime(2020, 02, 18),
                Price = 32.44,
                Description = "Curved claw steel hammer",
                StarRating = 2.2,
                ImageUrl = @"StaticFiles\Images\hammer.png",
                CategoryId = 1,
            }
            
            );


            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserName = "admin",
                Password = "123"
            });

        }

    }
}
