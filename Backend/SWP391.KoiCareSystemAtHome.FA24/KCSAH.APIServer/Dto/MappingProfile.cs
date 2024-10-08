using AutoMapper;
using SWP391.KCSAH.Repository.Models;

namespace KCSAH.APIServer.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>();
            CreateMap<Shop, ShopDTO>();
            CreateMap<ShopDTO, Shop>();
            CreateMap<Pond, PondDTO>();
            CreateMap<PondDTO, Pond>();
            CreateMap<Koi, KoiDTO>();
            CreateMap<KoiDTO, Koi>();
        }
    }
}
