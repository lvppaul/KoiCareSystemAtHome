using AutoMapper;
using Domain.Models;
using Domain.Models.Dto.Request;
using Domain.Models.Dto.Response;
using Domain.Models.Dto.Update;
using Domain.Models.Entity;
using Microsoft.AspNetCore.Identity;

namespace KCSAH.APIServer.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            //
            CreateMap<MemberDTO, ApplicationUser>().ReverseMap();
            //Shop
            CreateMap<Shop, ShopDTO>().ReverseMap();
            CreateMap<ShopRequestDTO, Shop>().ReverseMap();
            CreateMap<ShopRequestDTO, ShopDTO>().ReverseMap();
            CreateMap<ShopUpdateDTO, Shop>().ReverseMap().ReverseMap();
            //ShopRating
            CreateMap<ShopRating, ShopRatingDTO>().ReverseMap();
            CreateMap<ShopRatingRequestDTO, ShopRating>().ReverseMap();
            CreateMap<ShopRatingRequestDTO, ShopRatingDTO>().ReverseMap();
            //Product
            CreateMap<ProductRequestDTO, Product>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<ProductDTO, ProductRequestDTO>().ReverseMap();
            CreateMap<ProductUpdateDTO, Product>().ReverseMap();
            //Order
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<OrderRequestDTO, Order>().ReverseMap();
            CreateMap<OrderRequestDTO, OrderDTO>().ReverseMap();
            CreateMap<Order, OrderVipDTO>().ReverseMap();
            CreateMap<OrderVipRequestDTO, Order>().ReverseMap();
            CreateMap<OrderVipRequestDTO, OrderVipDTO>().ReverseMap();
            //OrderDetail
            CreateMap<OrderDetail, OrderDetailDTO>().ReverseMap();
            CreateMap<OrderDetailRequestDTO, OrderDetail>().ReverseMap();
            CreateMap<OrderDetailRequestDTO, OrderDetailDTO>().ReverseMap();
            //Category
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<CategoryRequestDTO, CategoryDTO>().ReverseMap();
            CreateMap<CategoryRequestDTO, Category>().ReverseMap();
            //Pond
            CreateMap<PondDTO, Pond>().ReverseMap();
            CreateMap<PondUpdateDTO, Pond>().ReverseMap();
            CreateMap<PondUpdateDTO, PondDTO>().ReverseMap();
            CreateMap<PondRequestDTO, PondDTO>().ReverseMap();
            CreateMap<PondRequestDTO, Pond>().ReverseMap();
            //Koi
            CreateMap<KoiRequestDTO, Koi>().ReverseMap();
            CreateMap<KoiRequestDTO, KoiDTO>().ReverseMap();
            CreateMap<Koi, KoiDTO>().ReverseMap();
            CreateMap<KoiDTO, Koi>()
    .ForMember(dest => dest.KoiImages, opt => opt.MapFrom(src => src.Images))
    .ForMember(dest => dest.KoiReminds, opt => opt.MapFrom(src => src.Reminds))
    .ForMember(dest => dest.KoiRecords, opt => opt.MapFrom(src => src.Records))
    ;

            CreateMap<Koi, KoiDTO>()
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.KoiImages))
                .ForMember(dest => dest.Reminds, opt => opt.MapFrom(src => src.KoiReminds))
                .ForMember(dest => dest.Records, opt => opt.MapFrom(src => src.KoiRecords))
                ;
            CreateMap<KoiUpdateDTO, Koi>().ReverseMap();
            //KoiImage
            CreateMap<KoiImageDTO, KoiImage>().ReverseMap();
            CreateMap<KoiImageDTO, KoiImageRequestDTO>().ReverseMap();
            CreateMap<KoiImageRequestDTO, KoiImage>().ReverseMap();
            CreateMap<KoiImageUpdateDTO, KoiImage>().ReverseMap();

            //KoiRemind
            CreateMap<KoiRemindDTO, KoiRemind>().ReverseMap();
            CreateMap<KoiRemindDTO, KoiRemindRequestDTO>().ReverseMap();
            CreateMap<KoiRemindRequestDTO, KoiRemind>().ReverseMap();
            CreateMap<KoiRemindUpdateDTO, KoiRemind>().ReverseMap();

            //KoiRecord
            CreateMap<KoiRecordDTO, KoiRecord>().ReverseMap();
            CreateMap<KoiRecordDTO, KoiRecordRequestDTO>().ReverseMap();
            CreateMap<KoiRecordRequestDTO, KoiRecord>().ReverseMap();
            CreateMap<KoiRecordUpdateDTO, KoiRecord>().ReverseMap();

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
            CreateMap<BlogUpdateDTO, Blog>().ReverseMap();
            //BlogImage
            CreateMap<BlogImageDTO, BlogImage>().ReverseMap();
            CreateMap<BlogImageDTO, BlogImageRequestDTO>().ReverseMap();
            CreateMap<BlogImageRequestDTO, BlogImage>().ReverseMap();
            CreateMap<BlogImageUpdateDTO,BlogImage>().ReverseMap();

            //BlogComment
            CreateMap<BlogCommentDTO, BlogComment>().ReverseMap();
            CreateMap<BlogCommentDTO, BlogCommentRequestDTO>().ReverseMap();
            CreateMap<BlogCommentRequestDTO, BlogComment>().ReverseMap();
            CreateMap<BlogCommentUpdateDTO, BlogComment>().ReverseMap();

            //ProductImage
            CreateMap<ProductImageDTO, ProductImageRequestDTO>().ReverseMap();
            CreateMap<ProductImage, ProductImageRequestDTO>().ReverseMap();
            CreateMap<ProductImage, ProductImageDTO>().ReverseMap();
            CreateMap<ProductImageUpdateDTO, ProductImage>().ReverseMap();

            //Revenue
            CreateMap<Order, Revenue>().ReverseMap();
            CreateMap<Revenue, RevenueDTO>().ReverseMap();

            //Water Parameter
            CreateMap<WaterParameterDTO, WaterParameterRequestDTO>().ReverseMap();
            CreateMap<WaterParameter, WaterParameterDTO>().ReverseMap();
            CreateMap<WaterParameter, WaterParameterRequestDTO>().ReverseMap();
            CreateMap<WaterParameterUpdateDTO, WaterParameter>().ReverseMap();
            CreateMap<WaterParameterDTO, WaterParameterUpdateDTO>().ReverseMap();

            //Cart
            CreateMap<Cart, CartDTO>().ReverseMap();
            CreateMap<CartRequestDTO, Cart>().ReverseMap();
            CreateMap<CartRequestDTO, CartDTO>().ReverseMap();

            //CartItem
            CreateMap<CartItem, CartItemDTO>().ReverseMap();
            CreateMap<CartItemRequestDTO, CartItem>().ReverseMap();
            CreateMap<CartItemRequestDTO, CartItemDTO>().ReverseMap();

            //PaymentTransaction
            CreateMap<PaymentTransaction, PaymentTransactionDTO>().ReverseMap();

            //VipRecord
            CreateMap<VipRecord,VipRecordDTO>().ReverseMap();
            CreateMap<VipRecordRequestDTO,VipRecord>().ReverseMap();
            CreateMap<VipRecordRequestDTO, VipRecordDTO>().ReverseMap();
            //CreateMap<VipRecordUpdateDTO, VipRecord>().ReverseMap();
            //CreateMap<VipRecordUpdateDTO, VipRecordDTO>().ReverseMap();

            //VipPackage
            CreateMap<VipPackage, VipPackageDTO>().ReverseMap();
            CreateMap<VipPackageRequestDTO, VipPackage>().ReverseMap();
            CreateMap<VipPackageRequestDTO, VipPackageDTO>().ReverseMap();

            //OrderVip
            CreateMap<OrderVipDetail, OrderVipDetailDTO>().ReverseMap();
            CreateMap<OrderVipDetailRequestDTO, OrderVipDetail>().ReverseMap();
            CreateMap<OrderVipDetailRequestDTO, OrderVipDetailDTO>().ReverseMap();

        }
    }
}
