using SWP391.KCSAH.Repository.KCSAH.Repository;
using SWP391.KCSAH.Repository.Models;

namespace SWP391.KCSAH.Repository
{
    public class UnitOfWork
    {
        private readonly KoiCareSystemAtHomeContext _context;
        private KoiRepository _koiRepository;
        private ShopRepository _shopRepository;

        public UnitOfWork() => _context ??= new KoiCareSystemAtHomeContext();

        public KoiRepository KoiRepository
        {
            get { return _koiRepository ??= new KoiRepository(_context); }
        }
        
        public ShopRepository ShopRepository
        {
            get { return _shopRepository ??= new ShopRepository(_context); }
        }
    }
}
