using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsAppBecend.Migrations
{
    /// <inheritdoc />
    public partial class t : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EditionsItem_Users_UserId",
                table: "EditionsItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EditionsItem",
                table: "EditionsItem");

            migrationBuilder.RenameTable(
                name: "EditionsItem",
                newName: "EditionsItems");

            migrationBuilder.RenameIndex(
                name: "IX_EditionsItem_UserId",
                table: "EditionsItems",
                newName: "IX_EditionsItems_UserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "NewsItems",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditionsItems",
                table: "EditionsItems",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_EditionsItems_Users_UserId",
                table: "EditionsItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EditionsItems_Users_UserId",
                table: "EditionsItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EditionsItems",
                table: "EditionsItems");

            migrationBuilder.RenameTable(
                name: "EditionsItems",
                newName: "EditionsItem");

            migrationBuilder.RenameIndex(
                name: "IX_EditionsItems_UserId",
                table: "EditionsItem",
                newName: "IX_EditionsItem_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "NewsItems",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditionsItem",
                table: "EditionsItem",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_EditionsItem_Users_UserId",
                table: "EditionsItem",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
