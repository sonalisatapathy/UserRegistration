using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UserRegistration.Api.Models
{
    public class AddUserVm : IValidatableObject
    {
        
        public int userID { get; set; }
        [Required (ErrorMessage ="Please enter your first name")]
        public string firstName { get; set; }
        public string middleName { get; set; }
        [Required(ErrorMessage = "Please enter your last name")]
        public string lastName { get; set; }
        [Required(ErrorMessage = "Please enter your email address")]
        public string email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string password { get; set; }
        [Required(ErrorMessage = "Please enter your date of birth")]
        public DateTime Dob { get; set; }
        [Required(ErrorMessage = "Please enter your address")]
        public string address { get; set; }
        [Required(ErrorMessage = "Please enter your country name")]
        public string country { get; set; }
        [Required(ErrorMessage = "Please enter your city name")]
        public string city { get; set; }
        [Required(ErrorMessage = "Please enter your state name")]
        public string state { get; set; }
        [Required(ErrorMessage = "Please enter your gender ")]
        public string gender{ get; set; }
        [Required(ErrorMessage = "Please enter your interests")]
        public List<string> interests { get; set; }
        [Required(ErrorMessage = "Please enter your phone numbers")]
        public string[] inputList { get; set; }
       // int year = newUser.DateOfBirth.Year;
       // int ValidYear = CalculateAge(year);
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (CalculateAge(Dob.Year) < 18)
            {
                yield return new ValidationResult(
                    $"User age must be greater than or equals to 18",
                    new[] { nameof(Dob) });
            }
        }
        public int CalculateAge(int Year)
        {
            int YearsPassed = DateTime.Now.Year - Year;
            return YearsPassed;
        }
    }
}
