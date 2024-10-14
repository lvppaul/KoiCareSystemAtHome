using AutoMapper;
using Domain.Models;
using Domain.Models.Dto;
using SWP391.KCSAH.Repository.Models;
using SWP391.KCSAH.Repository.Models.Dto;

namespace KCSAH.APIServer.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<Shop, ShopDTO>().ReverseMap();
            CreateMap<PondDTO, Pond>().ReverseMap();
            CreateMap<Koi, KoiDTO>().ReverseMap();
            CreateMap<ProductRequestDTO, Product>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailDTO>().ReverseMap();
            CreateMap<ShopRequestDTO, Shop>().ReverseMap();
            CreateMap<ShopRequestDTO, ShopDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<ProductDTO, ProductRequestDTO>().ReverseMap();
            CreateMap<OrderRequestDTO, Order>().ReverseMap();
            CreateMap<OrderRequestDTO, OrderDTO>().ReverseMap();
            CreateMap<OrderDetailRequestDTO, OrderDetail>().ReverseMap();
            CreateMap<OrderDetailRequestDTO, OrderDetailDTO>().ReverseMap();
            CreateMap<CategoryRequestDTO, Category>().ReverseMap();
            CreateMap<CategoryRequestDTO, CategoryDTO>().ReverseMap();
        }
    }
}
