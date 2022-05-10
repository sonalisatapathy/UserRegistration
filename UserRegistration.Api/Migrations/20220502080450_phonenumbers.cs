using Microsoft.EntityFrameworkCore.Migrations;

namespace UserRegistration.Api.Migrations
{
    public partial class phonenumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneType",
                table: "UserData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneType",
                table: "UserData");
        }
    }
}
