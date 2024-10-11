create database KoiCareSystemAtHome
go
use KoiCareSystemAtHome
go

--Create User table
CREATE TABLE [User] (
    UserID varchar(200) NOT NULL PRIMARY KEY,  -- Primary key
	Avatar varchar(Max),
    UserName VARCHAR(50) NOT NULL,    -- User's username
    FullName NVARCHAR(200),  -- User's full name
    Password VARCHAR(200) NOT NULL,        -- User's password (consider using hashing for better security)
    Phone VARCHAR(20) NOT NULL,       -- User's phone number
    Sex VARCHAR(10) NOT NULL,         -- User's gender
    Email NVARCHAR(200) NOT NULL,     -- User's email
    Street NVARCHAR(50),     -- Street address
    District NVARCHAR(50),   -- District
    City NVARCHAR(50),       -- City
    Country NVARCHAR(50),    -- Country
    Role int NOT NULL,               -- User role (admin or normal user, where 0 = normal user)
    isActive BIT DEFAULT 1            -- Account active status (1 = active, 0 = inactive)
);

--Create Pond table
CREATE TABLE Pond (
    PondID varchar(10) NOT NULL PRIMARY KEY,            -- Primary key
    UserID varchar(200) NOT NULL,                        -- Foreign key to the User table
    Name NVARCHAR(50) NOT NULL,					 -- Pond name
    Volume FLOAT NOT NULL,                      -- Pond volume
	Thumbnail varchar(MAX),
    Depth INT NOT NULL,                         -- Pond depth
    PumpingCapacity INT NOT NULL,               -- Pumping capacity of the pond
    Drain INT NOT NULL,                         -- Drain availability
    Skimmer INT NOT NULL,                       -- Skimmer availability
    Note NVARCHAR(MAX),                         -- Additional notes
    FOREIGN KEY (UserID) REFERENCES [User](UserID) -- Foreign key relationship with User table
);

--Create Category table
CREATE TABLE Category (
	CategoryID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	Name NVARCHAR(255) NOT NULL,
	Description NVARCHAR(Max) NOT NULL
);

--Create Product table
CREATE TABLE Product(
	ProductID varchar(10) NOT NULL PRIMARY KEY,
	Name NVARCHAR(255) NOT NULL,
	Thumbnail varchar(Max),
	Description NVARCHAR(Max),
	Quantity INT NOT NULL,
	Price FLOAT NOT NULL,
	Status bit default 1,
	CategoryID int NOT NULL,
	UserID varchar(200) NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID),
	FOREIGN KEY (CategoryID) REFERENCES [Category](CategoryID)
);

--Create Product_Image table
CREATE TABLE Product_Image(
	ImageID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	ProductID varchar(10) NOT NULL,
	ImageUrl NVARCHAR(Max) NOT NULL,
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

--Create Shop table
CREATE TABLE Shop(
	ShopID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	UserID varchar(200) NOT NULL,
	ShopName NVARCHAR(255) NOT NULL,
	Thumbnail VARCHAR(Max),
	Description NVARCHAR(255) NOT NULL,
	Phone VARCHAR(20) NOT NULL,
	Email VARCHAR(255) NOT NULL,
	Rating DECIMAL(2,1) DEFAULT 0,
	FOREIGN KEY (UserID) REFERENCES [User](UserID)
);


--Create Koi table
CREATE TABLE Koi (
    KoiID varchar(10) NOT NULL PRIMARY KEY,           -- Primary key
    UserID varchar(200) NOT NULL,                       -- Foreign key to the User table
    PondID varchar(10) NOT NULL,                       -- Foreign key to the Pond table
	Thumbnail varchar(Max),
    Age INT NOT NULL,                          -- Age of the fish
    Name NVARCHAR(255) NOT NULL,               -- Name of the fish
    Note NVARCHAR(MAX),               -- Additional notes about the fish
    Origin NVARCHAR(255) NOT NULL,             -- Fish's origin (e.g., country, breeder, etc.)
    Length INT NOT NULL,                       -- Length of the fish
    Weight INT NOT NULL,                       -- Weight of the fish
    Color NVARCHAR(200) NOT NULL,              -- Color of the fish
    Status BIT DEFAULT 1,                      -- Status (1 = active, 0 = inactive)
    FOREIGN KEY (UserID) REFERENCES [User](UserID), -- Foreign key relationship with User table
    FOREIGN KEY (PondID) REFERENCES Pond(PondID)  -- Foreign key relationship with Pond table
);

--Create Koi_Record table
CREATE TABLE Koi_Record(
	RecordID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	UserID varchar(200) NOT NULL,
	KoiID varchar(10) NOT NULL,
	Weight INT NOT NULL,
	Length INT NOT NULL,
	UpdatedTime DATETIME NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID),
	FOREIGN KEY (KoiID) REFERENCES Koi(KoiID)
); 

--Create Koi_Image table
CREATE TABLE Koi_Image(
	ImageID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	KoiID varchar(10) NOT NULL,
	Url NVARCHAR(Max),
	FOREIGN KEY (KoiID) REFERENCES Koi(KoiID)
);

--Create Koi_Remind table
CREATE TABLE Koi_Remind(
	RemindID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	UserID varchar(200) NOT NULL,
	KoiID varchar(10) NOT NULL,
	RemindDescription NVARCHAR(255),
	DateRemind DATETIME NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID),
	FOREIGN KEY (KoiID) REFERENCES Koi(KoiID)
);

--Create Blogs Table
CREATE TABLE Blogs (
    BlogID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserID varchar(200) NOT NULL,
    PublishDate DATETIME NOT NULL,
	Thumbnail varchar(Max),
    Content NVARCHAR(MAX) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

--Create PaymentMethod table
CREATE TABLE PaymentMethod(
	PaymentMethodID int NOT NULL PRIMARY KEY IDENTITY(1,1),
	PaymentName NVARCHAR(255) NOT NULL
);

--Create Water_Parameter table
CREATE TABLE Water_Parameter (
    MeasureID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserID varchar(200) NOT NULL,
    PondID varchar(10) NOT NULL,
    Nitrite FLOAT NOT NULL,
    Oxygen FLOAT NOT NULL,
    Nitrate FLOAT NOT NULL,
    [DateTime] DATETIME NOT NULL,
    Temperature FLOAT NOT NULL,
    Phosphate FLOAT NOT NULL,
    pH FLOAT NOT NULL,
    Ammonium FLOAT NOT NULL,
    Hardness FLOAT NOT NULL,
    CarbonDioxide FLOAT NOT NULL,
    CarbonHardness FLOAT NOT NULL,
    Salt FLOAT NOT NULL,
    TotalChlorines FLOAT NOT NULL,
    OutdoorTemp FLOAT NOT NULL,
    AmountFed FLOAT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (PondID) REFERENCES Pond(PondID)
);

--Create Orders table
CREATE TABLE Orders (
    OrderID int NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserID varchar(200) NOT NULL,
    ShopID int NOT NULL,
    FullName nvarchar(200) NOT NULL,
    Phone varchar(20) NOT NULL,
    CreateDate datetime NOT NULL, 
    Email varchar(200),
    Street nvarchar(50) NOT NULL,
    District nvarchar(50) NOT NULL,
    City nvarchar(50) NOT NULL,
    Country nvarchar(50) NOT NULL,
    PaymentMethodID int NOT NULL,
    TotalPrice float NOT NULL, 
    OrderStatus bit DEFAULT 0,

    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (ShopID) REFERENCES Shop(ShopID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethod(PaymentMethodID)
);

--Create OrderDetail table
CREATE TABLE OrderDetail (
    OrderID int NOT NULL,
    ProductID varchar(10) NOT NULL,
    Quantity int NOT NULL,
    UnitPrice float NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

--Create News table 
CREATE TABLE News (
    NewsID int NOT NULL PRIMARY KEY IDENTITY(1,1),
	Thumbnail varchar(Max),
    Title nvarchar(255) NOT NULL,
    PublishDate datetime NOT NULL,
    Content nvarchar(MAX) NOT NULL
);

--Create BlogComments table
CREATE TABLE BlogComments (
    CommentId int NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserID varchar(200) NOT NULL,
    BlogId int NOT NULL,
    Content nvarchar(MAX) NOT NULL,
    CreateDate datetime NOT NULL,

    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (BlogId) REFERENCES Blogs(BlogId)
);

--Create Revenue table
CREATE TABLE Revenue (
	RevenueId int not null PRIMARY KEY IDENTITY(1,1),
	OrderID int NOT NULL,
	CommissionFee float NOT NULL,
	FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Blog_Image (
    ImageID int NOT NULL PRIMARY KEY IDENTITY(1,1),
    ImageUrl nvarchar(MAX) NOT NULL,
    BlogID int NOT NULL,
    FOREIGN KEY (BlogID) REFERENCES Blogs(BlogID)
);

CREATE TABLE News_Image (
    ImageID int NOT NULL PRIMARY KEY IDENTITY(1,1),
    ImageUrl nvarchar(MAX) NOT NULL,
    NewsID int NOT NULL,
    FOREIGN KEY (NewsID) REFERENCES News(NewsID)
);

