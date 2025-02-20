using CargoPay.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace CargoPay.Infrastructure.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {
            
        }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Pay> Pays { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Card>().HasIndex(c => c.Number).IsUnique();
            //modelBuilder.Entity<Pay>()
            //    .HasOne(p => p.Card)
            //    .WithMany(c => c.Pays)
            //    .HasForeignKey(p => p.CardId)
            //    .OnDelete(DeleteBehavior.Cascade);
            DisableCascadingDelete(modelBuilder);
        }
        private void DisableCascadingDelete(ModelBuilder modelBuilder)
        {
            var relationships = modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys());
            foreach (var relationship in relationships)
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
