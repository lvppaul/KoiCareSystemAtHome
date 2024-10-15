using AutoMapper;
using Domain.Models.Entity;
using Domain.Repositories;
using SWP391.KCSAH.Repository.KCSAH.Repository;

namespace SWP391.KCSAH.Repository
{
    public class UnitOfWork
    {
        private readonly KoiCareSystemAtHomeContext _context;
        private readonly IMapper _mapper;
        private KoiRepository _koiRepository;
        private ShopRepository _shopRepository;
        private PondRepository _pondRepository;
        private ProductRepository _productRepository;
        private CategoryRepository _categoryRepository;
        //private CartRepository _cartRepository;
        private UserRepository _userRepository;
        private OrderRepository _orderRepository;
        private OrderDetailRepository _orderDetailRepository;
        private NewsRepository _newRepository;
        private NewsImageRepository _newImageRepository;
        private BlogRepository _blogRepository;
        private BlogImageRepository _blogImageRepository;
        private BlogCommentRepository _blogCommentRepository;

        public UnitOfWork() => _context ??= new KoiCareSystemAtHomeContext();

        public KoiRepository KoiRepository
        {
            get { return _koiRepository ??= new KoiRepository(_context); }
        }

        public ShopRepository ShopRepository
        {
            get { return _shopRepository ??= new ShopRepository(_context, _mapper); }
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

        //public CartRepository CartRepository
        //{
        //    get { return _cartRepository ??= new CartRepository(_context); }
        //}
        public OrderRepository OrderRepository
        {
            get { return _orderRepository ??= new OrderRepository(_context); }
        }

        public OrderDetailRepository OrderDetailRepository
        {
            get { return _orderDetailRepository ??= new OrderDetailRepository(_context); }
        }

        public NewsRepository NewRepository
        {
            get { return _newRepository ??= new NewsRepository(_context); }
        }

        public NewsImageRepository NewsImageRepository
        {
            get { return _newImageRepository ??= new NewsImageRepository(_context); }
        }
        public BlogRepository BlogRepository
        {
            get { return _blogRepository ??= new BlogRepository(_context); }
        }

        public BlogImageRepository BlogImageRepository
        {
            get { return _blogImageRepository ??= new BlogImageRepository(_context); }
        }

        public BlogCommentRepository BlogCommentRepository
        {
            get { return _blogCommentRepository ??= new BlogCommentRepository(_context); }
        }

        public UserRepository UserRepository
        {
            get { return _userRepository ??= new UserRepository(_context); }
        }
    }
}
