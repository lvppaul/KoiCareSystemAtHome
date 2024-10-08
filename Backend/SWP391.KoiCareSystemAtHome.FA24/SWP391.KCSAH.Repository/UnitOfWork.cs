using SWP391.KCSAH.Repository.KCSAH.Repository;
using SWP391.KCSAH.Repository.Models;

namespace SWP391.KCSAH.Repository
{
    public class UnitOfWork
    {
        private readonly KoiCareSystemAtHomeContext _context;
        private KoiRepository _koiRepository;
        private ShopRepository _shopRepository;
        private PondRepository _pondRepository;
        private ProductRepository _productRepository;
        private CategoryRepository _categoryRepository;
        private UserRepository _userRepository;

        public UnitOfWork() => _context ??= new KoiCareSystemAtHomeContext();

        public KoiRepository KoiRepository
        {
            get { return _koiRepository ??= new KoiRepository(_context); }
        }
        
        public ShopRepository ShopRepository
        {
            get { return _shopRepository ??= new ShopRepository(_context); }
        }

        public PondRepository PondRepository
        {
            get { return _pondRepository ??= new PondRepository(_context); }
        }

        public ProductRepository ProductRepository
        {
            get { return _productRepository ??= new ProductRepository(_context); }
        }

        public CategoryRepository CategoryRepository
        {
            get { return _categoryRepository ??= new CategoryRepository(_context); }
        }
        public UserRepository UserRepository
        {
            get { return _userRepository ??= new UserRepository(_context); }
        }
    }
}
