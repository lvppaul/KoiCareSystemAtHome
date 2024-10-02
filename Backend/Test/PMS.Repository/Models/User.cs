using System;
using System.Collections.Generic;

namespace PMS.Repository.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Pass { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Sex { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string District { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Country { get; set; } = null!;

    public bool? Role { get; set; }

    public bool? IsActive { get; set; }
}
