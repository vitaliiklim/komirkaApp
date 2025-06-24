using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Models;

namespace KomirkaApp.Api.Services
{
    public class MapService
    {
        private readonly ApplicationDbContext _db;
        public MapService(ApplicationDbContext db)
        {
            _db = db;
        }

        // Повертає список всіх камер схову
        public async Task<List<Locker>> GetAllLockersAsync()
        {
            return await _db.Lockers.ToListAsync();
        }
    }
}