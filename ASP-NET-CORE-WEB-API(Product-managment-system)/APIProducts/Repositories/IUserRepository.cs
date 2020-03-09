using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIProducts.Repositories
{
    public interface IUserRepository<User>
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        void Add(User user);
    }
}
