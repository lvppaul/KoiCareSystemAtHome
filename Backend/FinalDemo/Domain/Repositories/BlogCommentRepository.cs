﻿using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public class BlogCommentRepository: GenericRepository<BlogComment>
    {
        public BlogCommentRepository(KoiCareSystemAtHomeContext context) => _context = context;

        public async Task<List<BlogComment>> GetAllAsync()
        {
            return await _context.BlogComments.ToListAsync();
        }

        public async Task<List<BlogComment>> GetByUserIdAsync(string userId)
        {
            var result = await _context.BlogComments.Where(b => b.ApplicationUser.Id.Equals(userId)).ToListAsync();

            return result;
        }

        public async Task<List<BlogComment>> GetBlogCommentsByBID(int id)
        {
            var comments = await _context.BlogComments
                .Where(b => b.BlogId.Equals(id))
                .ToListAsync();



            return comments ?? new List<BlogComment>();
        }
    }
}
