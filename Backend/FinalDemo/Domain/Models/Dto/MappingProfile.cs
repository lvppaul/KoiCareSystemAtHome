using AutoMapper;
using Domain.Models;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
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
            //Pond
            CreateMap<PondUpdateDTO, Pond>().ReverseMap();
            CreateMap<PondUpdateDTO, PondDTO>().ReverseMap();
            CreateMap<PondRequestDTO, PondDTO>().ReverseMap();
            CreateMap<PondRequestDTO, Pond>().ReverseMap();
            CreateMap<KoiRequestDTO, Koi>().ReverseMap();
            CreateMap<KoiRequestDTO, KoiDTO>().ReverseMap();
            //News
            CreateMap<News, NewsDTO>()
                .ForMember(dest => dest.NewsImage, opt => opt.MapFrom(src => src.NewsImages));
            CreateMap<NewsRequestDTO, News>().ReverseMap();
            CreateMap<NewsDTO, NewsRequestDTO>().ReverseMap();

            //NewsImage
            CreateMap<NewsImage, NewsImageDTO>().ReverseMap();
            CreateMap<NewsImageRequestDTO, NewsImage>().ReverseMap();
            CreateMap<NewsImageRequestDTO, NewsImageDTO>().ReverseMap();

            CreateMap<NewsUpdateDTO, News>().ReverseMap();
            //Blog
            //CreateMap<BlogDTO,Blog>().ReverseMap();
            //CreateMap<BlogRequestDTO,Blog>().ReverseMap();
            //CreateMap<BlogRequestDTO,BlogDTO>().ReverseMap();
            CreateMap<BlogDTO, Blog>()
    .ForMember(dest => dest.BlogImages, opt => opt.MapFrom(src => src.Images))
    .ForMember(dest => dest.BlogComments, opt => opt.MapFrom(src => src.Comments));

            CreateMap<Blog, BlogDTO>()
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.BlogImages))
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.BlogComments));

            CreateMap<BlogRequestDTO, Blog>().ReverseMap();
            //BlogImage
            CreateMap<BlogImageDTO, BlogImage>().ReverseMap();
            CreateMap<BlogImageDTO, BlogImageRequestDTO>().ReverseMap();
            CreateMap<BlogImageRequestDTO, BlogImage>().ReverseMap();

            //BlogComment
            CreateMap<BlogCommentDTO, BlogComment>().ReverseMap();
            CreateMap<BlogCommentDTO, BlogCommentRequestDTO>().ReverseMap();
            CreateMap<BlogCommentRequestDTO, BlogComment>().ReverseMap();

        }
    }
}
