using AutoMapper;
using Domain.Models;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Entity;

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
            CreateMap<CategoryRequestDTO, CategoryDTO>().ReverseMap();
            CreateMap<CategoryRequestDTO, Category>().ReverseMap();
            CreateMap<PondRequestDTO, PondDTO>().ReverseMap();
            CreateMap<PondRequestDTO, Pond>().ReverseMap();
            CreateMap<KoiRequestDTO, Koi>().ReverseMap();
            CreateMap<KoiRequestDTO, KoiDTO>().ReverseMap();
        }
    }
}
