﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20250412161455_InititalCreate4")]
    partial class InititalCreate4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

            modelBuilder.Entity("Domain.ChessGame", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("Moves")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("MovesPlayed")
                        .HasColumnType("INTEGER");

                    b.PrimitiveCollection<string>("MovesTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Player1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Player2")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("RemainingTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Winner")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });
#pragma warning restore 612, 618
        }
    }
}
