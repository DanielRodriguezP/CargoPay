using CargoPay.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace CargoPay.Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {
            
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Pay> Pays { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Card>().HasIndex(c => c.Number).IsUnique();
            modelBuilder.Entity<Customer>().HasIndex(c => c.FullName).IsUnique();
        }
    }
}
