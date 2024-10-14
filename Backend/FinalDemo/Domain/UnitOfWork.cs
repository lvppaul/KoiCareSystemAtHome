﻿using AutoMapper;
using Domain.Models;
using SWP391.KCSAH.Repository.KCSAH.Repository;
using SWP391.KCSAH.Repository.Models;

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
        private OrderRepository _orderRepository;
        private OrderDetailRepository _orderDetailRepository;

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
    }
}