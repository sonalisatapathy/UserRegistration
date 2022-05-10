using Microsoft.EntityFrameworkCore.Migrations;

namespace UserRegistration.Api.Migrations
{
    public partial class ContactDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.AddColumn<string>(
                name: "ContactDetails",
                table: "UserData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactDetails",
                table: "UserData");

           
        }
    }
}
