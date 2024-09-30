using PMS.Repository.Models;
using PMS.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.Repository
{
    public class UnitOfWork
    {
        private readonly KoiCareSystemAtHomeContext _context;
        private UserRepository _userRepository;
        
        public UnitOfWork() => _context ??= new KoiCareSystemAtHomeContext();

        public UserRepository UserRepository { get { return _userRepository ??= new UserRepository(_context); } }
    }
}
