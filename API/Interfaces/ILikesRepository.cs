using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWhithLikes(int userId);
        Task<PagedList<LikesDto>> GetUserLikes(LikesParams likesParams);
    }
}