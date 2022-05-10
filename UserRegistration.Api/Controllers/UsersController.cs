using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserRegistration.Api.Data;
using UserRegistration.Api.Models;

namespace UserRegistration.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        [Route("allUsers")]
        public IActionResult GetAllUsers()

        {
            var users = GetUsers();
            return Ok(users);

        }

        [Route("adduser")]
        [HttpPost]
        public IActionResult AddUser(AddUserVm user)

        {
            var db = new UserRegistrationContext();


            if (user == null)
            {
                return BadRequest();
            }
            var checkEmail = db.UserData.Where(x => x.Email == user.email).FirstOrDefault();
            if (checkEmail != null)
            {
                return BadRequest();
            }

            var newUser = new User()
            {
                FirstName = user.firstName.Trim(),
                MiddleName = user.middleName?.Trim(),
                LastName = user.lastName.Trim(),
                Email = user.email.Trim(),
                Address = user.address.Trim(),
                City = user.city.Trim(),
                Country = user.country.Trim(),
                DateOfBirth = user.Dob,
                Gender = user.gender,
                Interests = (user.interests != null && user.interests.Count > 0) ? string.Join(",", user.interests) : string.Empty,
                Password = user.password.Trim(),
                ContactDetails = (user.inputList != null && user.inputList.Length > 0) ? string.Join(",", user.inputList) : string.Empty,
                State = user.state.Trim(),

            };
          
            if (!db.UserData.Any(x => x.Email == user.email))
            {   
                db.UserData.Add(newUser);
                db.SaveChanges();
                return Ok(newUser);
            }
            else
            {
                ModelState.AddModelError("", "Email is already exist");
                return BadRequest(ModelState);
            }

        }
        [Route("deleteuser/{id:int}")]
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            var db = new UserRegistrationContext();
            var deleteUser = db.UserData.Where(x => x.userID == id).FirstOrDefault();
           
            db.Remove(deleteUser);
            db.SaveChanges();
            return  Ok(deleteUser);
            
        }
       
        private List<User> GetUsers()
        {

            var dbContext = new UserRegistrationContext();
            var storeUserData = dbContext.UserData.Select(x => new User()
            {
                userID= x.userID,
                FirstName = x.FirstName,
                MiddleName = x.MiddleName,
                LastName = x.LastName,
                Address = x.Address,
                City = x.City,
                State = x.State,
                DateOfBirth = x.DateOfBirth,
                Interests = x.Interests,
                Password = x.Password,
                Gender = x.Gender,
               // PhoneNumbers = x.PhoneNumbers,
                Country = x.Country,
                Email = x.Email,
                ContactDetails=x.ContactDetails,
        }).OrderByDescending(x => x.userID).ToList();
            return storeUserData;
            
        }
       
    }
}
