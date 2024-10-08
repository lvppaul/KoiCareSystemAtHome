using AutoMapper;
using SWP391.KCSAH.Repository.Models;

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
            CreateMap<ProductDTO, Product>().ReverseMap();
        }
    }
}
