using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Data;

public partial class ShopContext : DbContext
{
    public ShopContext()
    {
    }

    public ShopContext(DbContextOptions<ShopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductCategory> ProductCategories { get; set; }

    public virtual DbSet<ProductConfiguration> ProductConfigurations { get; set; }

    public virtual DbSet<ProductItem> ProductItems { get; set; }

    public virtual DbSet<Table1> Table1s { get; set; }

    public virtual DbSet<Table2> Table2s { get; set; }

    public virtual DbSet<UserList> UserLists { get; set; }

    public virtual DbSet<Variation> Variations { get; set; }

    public virtual DbSet<VariationOption> VariationOptions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.ToTable("cart_item");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ImageUrl).HasColumnName("imageUrl");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_productList");

            entity.ToTable("product");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("name");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_product_product_category");
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.ToTable("product_category");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .HasColumnName("category_name");
            entity.Property(e => e.ParentCategoryId).HasColumnName("parent_category_id");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK_product_category_product_category");
        });

        modelBuilder.Entity<ProductConfiguration>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("product_configuration");

            entity.Property(e => e.ProductItemId).HasColumnName("product_item_id");
            entity.Property(e => e.VariationOptionId).HasColumnName("variation_option_id");

            entity.HasOne(d => d.ProductItem).WithMany()
                .HasForeignKey(d => d.ProductItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_product_configuration_product_item");

            entity.HasOne(d => d.VariationOption).WithMany()
                .HasForeignKey(d => d.VariationOptionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_product_configuration_variation_option");
        });

        modelBuilder.Entity<ProductItem>(entity =>
        {
            entity.ToTable("product_item");

            entity.HasIndex(e => e.Sku, "IX_product_item").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Price)
                .HasDefaultValue(0.0)
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.QtyInStock).HasColumnName("qty_in_stock");
            entity.Property(e => e.Sku)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("SKU");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_product_item_product");
        });

        modelBuilder.Entity<Table1>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Table_1");

            entity.Property(e => e.ProductItemId).HasColumnName("product_item_id");
            entity.Property(e => e.VariationOptionId).HasColumnName("variation_option_id");
        });

        modelBuilder.Entity<Table2>(entity =>
        {
            entity.ToTable("Table_2");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ProductItemId).HasColumnName("product_item_id");
        });

        modelBuilder.Entity<UserList>(entity =>
        {
            entity.ToTable("userList");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .HasColumnName("email");
            entity.Property(e => e.MiddleName)
                .HasMaxLength(150)
                .HasColumnName("middle_name");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .HasColumnName("name");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("phone_number");
            entity.Property(e => e.Surname)
                .HasMaxLength(150)
                .HasColumnName("surname");
        });

        modelBuilder.Entity<Variation>(entity =>
        {
            entity.ToTable("variation");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");

            entity.HasOne(d => d.Category).WithMany(p => p.Variations)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_variation_product_category");
        });

        modelBuilder.Entity<VariationOption>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_variation_id");

            entity.ToTable("variation_option");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Value)
                .HasMaxLength(150)
                .HasColumnName("value");
            entity.Property(e => e.VariationId).HasColumnName("variation_id");

            entity.HasOne(d => d.Variation).WithMany(p => p.VariationOptions)
                .HasForeignKey(d => d.VariationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_variation_option_variation");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
