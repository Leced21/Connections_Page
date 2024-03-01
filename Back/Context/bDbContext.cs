using System.Collections.Generic;
using System;
using VDEAPI.Models;
using Microsoft.EntityFrameworkCore;
using Back.Models;

namespace Back.Context
{
    public class bDbContext:DbContext
    {
        public bDbContext(DbContextOptions<bDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().ToTable("users");

        }
    }
}
