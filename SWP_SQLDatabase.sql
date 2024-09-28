create database KoiCareSystemAtHome
go
use KoiCareSystemAtHome
go

--Create User table
CREATE TABLE [User] (
    UserID NVARCHAR(50) NOT NULL PRIMARY KEY,  -- Primary key
    UserName VARCHAR(50) NOT NULL,    -- User's username
    FullName NVARCHAR(200) NOT NULL,  -- User's full name
    Pass VARCHAR(50) NOT NULL,        -- User's password (consider using hashing for better security)
    Phone VARCHAR(20) NOT NULL,       -- User's phone number
    Sex VARCHAR(10) NOT NULL,         -- User's gender
    Email NVARCHAR(200) NOT NULL,     -- User's email
    Street NVARCHAR(50) NOT NULL,     -- Street address
    District NVARCHAR(50) NOT NULL,   -- District
    City NVARCHAR(50) NOT NULL,       -- City
    Country NVARCHAR(50) NOT NULL,    -- Country
    Role BIT DEFAULT 0,               -- User role (admin or normal user, where 0 = normal user)
    isActive BIT DEFAULT 1            -- Account active status (1 = active, 0 = inactive)
);

--Create Pond table
CREATE TABLE Pond (
    PondID NVARCHAR(50) NOT NULL PRIMARY KEY,            -- Primary key
    UserID NVARCHAR(50) NOT NULL,                        -- Foreign key to the User table
    Name NVARCHAR(50) NOT NULL,                 -- Pond name
    Volume FLOAT NOT NULL,                      -- Pond volume
    Depth INT NOT NULL,                         -- Pond depth
    PumpingCapacity INT NOT NULL,               -- Pumping capacity of the pond
    Drain INT NOT NULL,                         -- Drain availability
    Skimmer INT NOT NULL,                       -- Skimmer availability
    Note NVARCHAR(MAX),                         -- Additional notes
    FOREIGN KEY (UserID) REFERENCES [User](UserID) -- Foreign key relationship with User table
);

--Create Category table
CREATE TABLE Category (
	CategoryID NVARCHAR(50) NOT NULL PRIMARY KEY,
	Name NVARCHAR(255) NOT NULL,
	Description NVARCHAR(Max) NOT NULL
);

--Create Product table
CREATE TABLE Product(
	ProductID NVARCHAR(50) NOT NULL PRIMARY KEY,
	Name NVARCHAR(255) NOT NULL,
	Description NVARCHAR(Max) NOT NULL,
	Quantity INT NOT NULL,
	Price FLOAT NOT NULL,
	Status bit default 1,
	CategoryID NVARCHAR(50) NOT NULL,
	UserID NVARCHAR(50) NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID),
	FOREIGN KEY (CategoryID) REFERENCES [Category](CategoryID)
);

--Create Product_Image table
CREATE TABLE Product_Image(
	ImageID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	ProductID NVARCHAR(50) NOT NULL,
	Path NVARCHAR(Max) NOT NULL,
	FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);
--Create Cart table
CREATE TABLE Cart(
	CartID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	UserID NVARCHAR(50) NOT NULL,
	TotalQuantity INT NOT NULL,
	TotalPrice FLOAT NOT NULL,
	TotalItems INT NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

--Create Shop table
CREATE TABLE Shop(
	ShopID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	UserID NVARCHAR(50) NOT NULL,
	ShopName NVARCHAR(255) NOT NULL,
	Picture VARCHAR(Max) NOT NULL,
	Description NVARCHAR(255) NOT NULL,
	Phone VARCHAR(20) NOT NULL,
	Email VARCHAR(255) NOT NULL,
	Rating DECIMAL(2,1) DEFAULT 0,
	FOREIGN KEY (UserID) REFERENCES [User](UserID)
);


--Create Koi table
CREATE TABLE Koi (
    KoiID NVARCHAR(50) NOT NULL PRIMARY KEY,           -- Primary key
    UserID NVARCHAR(50) NOT NULL,                       -- Foreign key to the User table
    PondID NVARCHAR(50) NOT NULL,                       -- Foreign key to the Pond table
    Age INT NOT NULL,                          -- Age of the fish
    Name NVARCHAR(255) NOT NULL,               -- Name of the fish
    Note NVARCHAR(MAX) NOT NULL,               -- Additional notes about the fish
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
	UserID NVARCHAR(50) NOT NULL,
	KoiID NVARCHAR(50) NOT NULL,
	Weight INT NOT NULL,
	Length INT NOT NULL,
	UpdatedTime DATETIME NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID),
	FOREIGN KEY (KoiID) REFERENCES Koi(KoiID)
); 

--Create Koi_Image table
CREATE TABLE Koi_Image(
	ImageID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	KoiID NVARCHAR(50) NOT NULL,
	Path NVARCHAR(Max) NOT NULL,
	FOREIGN KEY (KoiID) REFERENCES Koi(KoiID)
);

--Create Koi_Remind table
CREATE TABLE Koi_Remind(
	RemindID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	UserID NVARCHAR(50) NOT NULL,
	KoiID NVARCHAR(50) NOT NULL,
	Description NVARCHAR(255) NOT NULL,
	DateRemind DATE NOT NULL,
	FOREIGN KEY (UserID) REFERENCES [User](UserID),
	FOREIGN KEY (KoiID) REFERENCES Koi(KoiID)
);

--Create Blogs Table
CREATE TABLE Blogs (
    BlogID INT NOT NULL PRIMARY KEY,
    UserID NVARCHAR(50) NOT NULL,
    PublishDate DATE NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

--Create CartItem table
CREATE TABLE CartItem (
    CartItemID INT NOT NULL PRIMARY KEY,
    ProductID NVARCHAR(50) NOT NULL,
    CartID INT NOT NULL,
    Quantity INT NOT NULL,
    PricePerItem FLOAT NOT NULL,
    TotalPrice FLOAT NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (CartID) REFERENCES Cart(CartID)
);

--Create PaymentMethod table
CREATE TABLE PaymentMethod(
	PaymentMethodID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	PaymentName NVARCHAR(255) NOT NULL,
	CreateAt TIME NOT NULL
);

--Create Water_Parameter table
CREATE TABLE Water_Parameter (
    MeasureID INT NOT NULL PRIMARY KEY,
    UserID NVARCHAR(50) NOT NULL,
    PondID NVARCHAR(50) NOT NULL,
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
    OrderID int NOT NULL PRIMARY KEY,
    UserID NVARCHAR(50) NOT NULL,
    ShopID int NOT NULL,
    FullName nvarchar(200) NOT NULL,
    Phone varchar(20) NOT NULL,
    OrderDate date NOT NULL,
    Email varchar(200) NOT NULL,
    Street nvarchar(50) NOT NULL,
    District nvarchar(50) NOT NULL,
    City nvarchar(50) NOT NULL,
    Country nvarchar(50) NOT NULL,
    PaymentMethodID INT NOT NULL,
    TotalPrice float NOT NULL,
    CreateAt date NOT NULL,
    OrderStatus bit DEFAULT 0,
    
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (ShopID) REFERENCES Shop(ShopID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethod(PaymentMethodID)
);

--Create OrderDetail table
CREATE TABLE OrderDetail (
    OrderDetail_ID int NOT NULL PRIMARY KEY,
    OrderID int NOT NULL,
    ProductID NVARCHAR(50) NOT NULL,
    Quantity int NOT NULL,
    UnitPrice float NOT NULL,
    CreatedAt date NOT NULL,
    
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

--Create News table 
CREATE TABLE News (
    NewsID int NOT NULL PRIMARY KEY,
    Title nvarchar(255) NOT NULL,
    PublishDate date NOT NULL,
    Content nvarchar(MAX) NOT NULL
);

