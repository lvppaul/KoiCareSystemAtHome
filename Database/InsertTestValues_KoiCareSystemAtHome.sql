--drop database KoiCareSystemAtHome;

use KoiCareSystemAtHome;

--Disable Foreign Key Constraints
--EXEC sp_msforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';

--DELETE FROM TableName; -- 'Delete records from a table'
--DBCC CHECKIDENT ('TableName', RESEED, 0); -- Set to 0 or desired starting value

--Re-enable Foreign Key Constraints
--EXEC sp_msforeachtable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL';

/*
 General Rules for User Roles:
 - Pond, Koi, Koi_Record, Koi_Remind, Water_Parameter, Orders: Cannot include UserID with the shop role.

 - Koi_Remind, Product, Shop: Cannot include UserID with the member role.

 - Admin UserID: Can only appear in Blogs and BlogComments tables.

 - Product, Shop: Can only include UserID with the shop role.
*/

--User table: insert according to the numbered order

--1.
INSERT INTO [AspNetUsers] (Id, FirstName, LastName, Sex, Street, District, City, Country, UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp, PhoneNumber, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnd, LockoutEnabled, AccessFailedCount)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member', 'a', NULL, NULL, NULL, NULL, NULL, 'member@example.com', 'MEMBER@EXAMPLE.COM', 'member@example.com', 'MEMBER@EXAMPLE.COM', 0, 'AQAAAAIAAYagAAAAEIu0gnPvb0zhWrk4NNA3wEMiOewPTGZLrYqgAOJs5OwUbuKXyPKTBekE9OveJ020gg==', 'RWVHVDP7IWP22CE4U3VXIEKH4ZOXHD2W', '71aae56b-e997-4ae0-8215-2e0f71381a88', NULL, 0, 0, NULL, 1, 0),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip', 'b', NULL, NULL, NULL, NULL, NULL, 'vip@example.com', 'VIP@EXAMPLE.COM', 'vip@example.com', 'VIP@EXAMPLE.COM', 0, 'AQAAAAIAAYagAAAAEGpxZE3331Wf1VD06SX9YwKAG5vWkybbOpLxqbv0tl8AO1Uqhi76j06+HI4eYqyy8w==', 'RWARB7P3OCYEXGGG7ETY3TGEX3FZPISM', '1a48b288-f740-4491-ae98-e50b5273fb21', NULL, 0, 0, NULL, 1, 0),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'admin', 'd', NULL, NULL, NULL, NULL, NULL, 'admin@example.com', 'ADMIN@EXAMPLE.COM', 'admin@example.com', 'ADMIN@EXAMPLE.COM', 0, 'AQAAAAIAAYagAAAAEMSsXYBri40up6lHG2s0YHq4+fVyvxAGIKkIXHGh1lHXfFRNq79FWJ/oka/KX0OusA==', 'UF5GBLSGV3DSLXRSIDKRAXKGEEIIM3TL', '82c5fd3e-d565-43d1-a031-8af185d68916', NULL, 0, 0, NULL, 1, 0),
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'sho2p', 'c2', NULL, NULL, NULL, NULL, NULL, 'shop2@example.com', 'SHOP2@EXAMPLE.COM', 'shop2@example.com', 'SHOP2@EXAMPLE.COM', 0, 'AQAAAAIAAYagAAAAEAAinoUzd5JbC2ZXIsjuzrMAwLklvMaW0XlwQpaoRZHof+FMlGnMJSiNThEoQJ3C/Q==', '5YQ266SGHHXQ2W3KRSLNZKZSM7BB4XWC', 'fbd64607-02bd-47ca-8cb3-22d7c2f6a6c8', NULL, 0, 0, NULL, 1, 0),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'shop', 'c', NULL, NULL, NULL, NULL, NULL, 'shop@example.com', 'SHOP@EXAMPLE.COM', 'shop@example.com', 'SHOP@EXAMPLE.COM', 0, 'AQAAAAIAAYagAAAAEMFEM383aESJByWGKS3TlzTnvQdLT1LzwWblpe2+AzVDIOIBfUqsZHnQkzC1oSo72g==', '5CIZCKPIKKLLFBIRJDJHT45DZ3V7DL2Q', '98bef99c-d585-4b37-be2d-6e57540bb48b', NULL, 0, 0, NULL, 1, 0);

--All roles password: Abc@123

--2
INSERT INTO [AspNetRoles] (Id, Name, NormalizedName, ConcurrencyStamp)
VALUES
('511e95c7-ae67-4186-9fd7-8d5da11979b0', 'member', 'MEMBER', NULL),
('6f242335-7855-4678-b3f2-0a0c7c525c8a', 'admin', 'ADMIN', NULL),
('90204048-b8cd-4d16-bfe7-5991e5360e06', 'vip', 'VIP', NULL),
('ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6', 'shop', 'SHOP', NULL);

--3
INSERT INTO [AspNetUserRoles] (UserId, RoleId)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', '511e95c7-ae67-4186-9fd7-8d5da11979b0'),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', '6f242335-7855-4678-b3f2-0a0c7c525c8a'),
('373236e8-0df7-44bf-9990-ce22fa1ff829', '90204048-b8cd-4d16-bfe7-5991e5360e06'),
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6'),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6');

-----

INSERT INTO Pond (UserID, Name, Volume, Thumbnail, Depth, PumpingCapacity, Drain, Skimmer, Note)
VALUES 
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Main Pond', 1000.5, 'mainpond_thumbnail.png', 3, 500, 1, 1, 'This is the main pond for koi fish.'),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Small Pond', 500.0, 'smallpond_thumbnail.png', 2, 300, 1, 0, 'A small pond for young koi.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Outdoor Pond', 1500.0, 'outdoorpond_thumbnail.png', 4, 700, 1, 1, 'Outdoor pond with a skimmer and large volume.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Indoor Pond', 750.0, 'indoorpond_thumbnail.png', 2, 400, 0, 1, 'Indoor pond for special koi breeding.');


INSERT INTO Category (Name, Description)	
VALUES 
('Koi Food', 'Food products specially designed for koi fish to promote growth and health.'),
('Pond Equipment', 'Equipment and tools for maintaining and improving pond health.'),
('Koi Health', 'Products related to the health and care of koi fish, including treatments and supplements.');


INSERT INTO Product (Name, Thumbnail, Description, Quantity, Price, Status, CategoryID, UserID)
VALUES
('Premium Koi Food', 'premium_koi_food.png', 'High-quality koi food for vibrant colors and growth.', 100, 25.99, 1, 1, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Growth Formula', 'growth_formula.png', 'A special formula to promote faster growth in koi.', 150, 29.99, 1, 1, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Wheat Germ Food', 'wheat_germ_food.png', 'Koi food designed for colder weather to support digestion.', 200, 22.50, 1, 1, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Color Enhancing Food', 'color_enhancing_food.png', 'Enhances the colors of koi fish naturally.', 120, 32.00, 1, 1, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Koi Fry Food', 'koi_fry_food.png', 'Specially formulated for young koi fry.', 180, 18.50, 1, 1, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Spirulina Pellets', 'spirulina_pellets.png', 'Rich in spirulina for healthy koi growth.', 100, 27.00, 1, 1, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('High Protein Food', 'high_protein_food.png', 'High-protein food to boost koi muscle development.', 130, 30.00, 1, 1, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('All Season Koi Food', 'all_season_koi_food.png', 'Koi food suitable for all seasons.', 160, 20.99, 1, 1, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Floating Pellets', 'floating_pellets.png', 'Floating pellets that koi love to feed on.', 140, 23.75, 1, 1, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Pond Pump', 'pond_pump.png', 'High-capacity pump for maintaining water flow in ponds.', 50, 199.99, 1, 2, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Pond Skimmer', 'pond_skimmer.png', 'Essential skimmer for removing debris from the pond surface.', 70, 99.99, 1, 2, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('UV Clarifier', 'uv_clarifier.png', 'UV clarifier to keep pond water clear and algae-free.', 60, 150.00, 1, 2, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Pond Heater', 'pond_heater.png', 'Heater for maintaining optimal water temperature during cold seasons.', 40, 180.00, 1, 2, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Filter System', 'filter_system.png', 'Advanced filtration system for large ponds.', 45, 250.00, 1, 2, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Aeration Kit', 'aeration_kit.png', 'Complete aeration kit to boost oxygen levels in the pond.', 80, 85.00, 1, 2, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Pond Net', 'pond_net.png', 'Pond net to catch debris and fish.', 100, 30.00, 1, 2, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Waterfall Kit', 'waterfall_kit.png', 'Waterfall kit to create a stunning feature in the pond.', 20, 320.00, 1, 2, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Pond Liner', 'pond_liner.png', 'Durable pond liner to prevent leaks.', 90, 75.00, 1, 2, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Koi Health Boost', 'koi_health_boost.png', 'A vitamin and mineral supplement for healthier koi.', 120, 19.99, 1, 3, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Anti-Bacterial Treatment', 'anti_bacterial_treatment.png', 'Treatment for bacterial infections in koi.', 100, 35.00, 1, 3, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Anti-Parasite Treatment', 'anti_parasite_treatment.png', 'Effective treatment for koi parasite issues.', 110, 40.00, 1, 3, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Water Conditioner', 'water_conditioner.png', 'Conditioner to ensure safe water quality for koi.', 150, 25.50, 1, 3, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Koi Salt', 'koi_salt.png', 'Koi salt to help maintain water salinity and fish health.', 200, 12.00, 1, 3, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Pond Bacteria', 'pond_bacteria.png', 'Beneficial bacteria to improve water quality.', 180, 28.00, 1, 3, 'a5827eaf-5c36-414d-8e9c-d1de148d6911'),
('Koi Fungus Treatment', 'koi_fungus_treatment.png', 'Treats fungal infections in koi.', 75, 38.00, 1, 3, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Koi First Aid Kit', 'koi_first_aid_kit.png', 'A complete first aid kit for koi emergencies.', 50, 45.00, 1, 3, 'b02dfef5-997d-49cd-89f5-1c44499ecdef'),
('Koi Sedative', 'koi_sedative.png', 'Sedative for koi handling and transportation.', 30, 55.00, 1, 3, 'a5827eaf-5c36-414d-8e9c-d1de148d6911');


INSERT INTO Product_Image (ProductID, ImageUrl)
VALUES
-- Images for Koi Food Products (P001 to P009)
(1, 'product_p001_img1.png'), (1, 'product_p001_img2.png'), (1, 'product_p001_img3.png'),
(2, 'product_p002_img1.png'), (2, 'product_p002_img2.png'), (2, 'product_p002_img3.png'),
(3, 'product_p003_img1.png'), (3, 'product_p003_img2.png'), (3, 'product_p003_img3.png'),
(4, 'product_p004_img1.png'), (4, 'product_p004_img2.png'), (4, 'product_p004_img3.png'),
(5, 'product_p005_img1.png'), (5, 'product_p005_img2.png'), (5, 'product_p005_img3.png'),
(6, 'product_p006_img1.png'), (6, 'product_p006_img2.png'), (6, 'product_p006_img3.png'),
(7, 'product_p007_img1.png'), (7, 'product_p007_img2.png'), (7, 'product_p007_img3.png'),
(8, 'product_p008_img1.png'), (8, 'product_p008_img2.png'), (8, 'product_p008_img3.png'),
(9, 'product_p009_img1.png'), (9, 'product_p009_img2.png'), (9, 'product_p009_img3.png'),

-- Images for Pond Equipment Products (P010 to P018)
(10, 'product_p010_img1.png'), (10, 'product_p010_img2.png'), (10, 'product_p010_img3.png'),
(11, 'product_p011_img1.png'), (11, 'product_p011_img2.png'), (11, 'product_p011_img3.png'),
(12, 'product_p012_img1.png'), (12, 'product_p012_img2.png'), (12, 'product_p012_img3.png'),
(13, 'product_p013_img1.png'), (13, 'product_p013_img2.png'), (13, 'product_p013_img3.png'),
(14, 'product_p014_img1.png'), (14, 'product_p014_img2.png'), (14, 'product_p014_img3.png'),
(15, 'product_p015_img1.png'), (15, 'product_p015_img2.png'), (15, 'product_p015_img3.png'),
(16, 'product_p016_img1.png'), (16, 'product_p016_img2.png'), (16, 'product_p016_img3.png'),
(17, 'product_p017_img1.png'), (17, 'product_p017_img2.png'), (17, 'product_p017_img3.png'),
(18, 'product_p018_img1.png'), (18, 'product_p018_img2.png'), (18, 'product_p018_img3.png'),

-- Images for Koi Health Products (P019 to P027)
(19, 'product_p019_img1.png'), (19, 'product_p019_img2.png'), (19, 'product_p019_img3.png'),
(20, 'product_p020_img1.png'), (20, 'product_p020_img2.png'), (20, 'product_p020_img3.png'),
(21, 'product_p021_img1.png'), (21, 'product_p021_img2.png'), (21, 'product_p021_img3.png'),
(22, 'product_p022_img1.png'), (22, 'product_p022_img2.png'), (22, 'product_p022_img3.png'),
(23, 'product_p023_img1.png'), (23, 'product_p023_img2.png'), (23, 'product_p023_img3.png'),
(24, 'product_p024_img1.png'), (24, 'product_p024_img2.png'), (24, 'product_p024_img3.png'),
(25, 'product_p025_img1.png'), (25, 'product_p025_img2.png'), (25, 'product_p025_img3.png'),
(26, 'product_p026_img1.png'), (26, 'product_p026_img2.png'), (26, 'product_p026_img3.png'),
(27, 'product_p027_img1.png'), (27, 'product_p027_img2.png'), (27, 'product_p027_img3.png');


INSERT INTO Shop (UserID, ShopName, Thumbnail, Description, Phone, Email, Rating)
VALUES 
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'BEST KoiShop', 'shop2_thumbnail.png', 'Shop 2 specializing in koi care products.', '123456789', 'shop2@example.com', 4.8),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'The KoTool', 'shop_thumbnail.png', 'Shop specializing in koi fish care products.', '987654321', 'shop@example.com', 4.8);


INSERT INTO Koi (UserID, PondID, Thumbnail, Age, Name, Note, Origin, Length, Weight, Color, Status)
VALUES
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'koi1_thumbnail.png', 2, 'Koi A', 'A beautiful koi with bright colors.', 'Japan', 30, 5, 'Orange and White', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 'koi2_thumbnail.png', 1, 'Koi B', 'Young koi, growing fast.', 'USA', 20, 2, 'Black and Yellow', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'koi3_thumbnail.png', 3, 'Koi C', 'A stunning koi with unique patterns.', 'China', 35, 6, 'Red and White', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 'koi4_thumbnail.png', 4, 'Koi D', 'Very active koi, loves to swim.', 'Thailand', 32, 7, 'Blue and Orange', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'koi5_thumbnail.png', 2, 'Koi E', 'Friendly koi, often interacts with people.', 'Japan', 28, 4, 'White with Black Spots', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 'koi6_thumbnail.png', 1, 'Koi F', 'Small but very colorful.', 'USA', 15, 1, 'Yellow and Black', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'koi7_thumbnail.png', 3, 'Koi G', 'A rare breed of koi.', 'China', 40, 8, 'Orange and Black', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 'koi8_thumbnail.png', 5, 'Koi H', 'An older koi with lots of personality.', 'Thailand', 38, 9, 'Calico', 1);  -- Member user


INSERT INTO Koi_Record (UserID, KoiID, Weight, Length, UpdatedTime)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 5, 30, GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 2, 20, GETDATE()),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 6, 35, GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 5, 7, 32, GETDATE()),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 6, 4, 28, GETDATE());  -- Member user


INSERT INTO Koi_Image (KoiID, Url)
VALUES
(1, 'koi1_image1.png'),
(1, 'koi1_image2.png'),
(1, 'koi1_image3.png'),
(2, 'koi2_image1.png'),
(2, 'koi2_image2.png'),
(2, 'koi2_image3.png'),
(3, 'koi3_image1.png'),
(3, 'koi3_image2.png'),
(3, 'koi3_image3.png'),
(4, 'koi4_image1.png'),
(4, 'koi4_image2.png'),
(4, 'koi4_image3.png'),
(5, 'koi5_image1.png'),
(5, 'koi5_image2.png'),
(5, 'koi5_image3.png'),
(6, 'koi6_image1.png'),
(6, 'koi6_image2.png'),
(6, 'koi6_image3.png'),
(7, 'koi7_image1.png'),
(7, 'koi7_image2.png'),
(7, 'koi7_image3.png'),
(8, 'koi8_image1.png'),
(8, 'koi8_image2.png'),
(8, 'koi8_image3.png');

INSERT INTO Koi_Remind (UserID, KoiID, RemindDescription, DateRemind)
VALUES
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'Check water quality', DATEADD(DAY, 7, GETDATE())),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 'Feed special diet', DATEADD(DAY, 3, GETDATE())),      -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 5, 'Check for parasites', DATEADD(DAY, 10, GETDATE())),   -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 7, 'Clean the pond', DATEADD(DAY, 14, GETDATE())),        -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'Monitor growth', DATEADD(DAY, 30, GETDATE()));       -- VIP user


INSERT INTO Blogs (UserID, PublishDate, Thumbnail, Content, Title)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', GETDATE(), 'blog1_thumbnail.png', 'This is the content of the first blog post about koi care.', 'Koi Care 101'),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', GETDATE(), 'blog2_thumbnail.png', 'Insights on how to maintain a healthy pond for koi fish.', 'Maintaining Healthy Ponds'),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', GETDATE(), 'blog3_thumbnail.png', 'The best types of food for your koi fish.', 'Best Koi Food'),  -- Member user
('979a42a8-ecc7-4d15-ab6f-410755b9e593', GETDATE(), 'blog4_thumbnail.png', 'Tips on selecting the right koi for your pond.', 'Choosing the Right Koi');  -- Admin user


INSERT INTO PaymentMethod (PaymentName)
VALUES
('Credit Card'),
('PayPal'),
('Bank Transfer'),
('Cash on Delivery');


INSERT INTO Water_Parameter (UserID, PondID, Nitrite, Oxygen, Nitrate, [DateTime], Temperature, Phosphate, pH, Ammonium, Hardness, CarbonDioxide, CarbonHardness, Salt, TotalChlorines, OutdoorTemp, AmountFed)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 0.1, 6.5, 5.0, GETDATE(), 24.0, 0.5, 7.2, 0.0, 150.0, 10.0, 5.0, 0.0, 1.0, 22.0, 100.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 0.2, 7.0, 6.0, GETDATE(), 23.5, 0.4, 7.5, 0.1, 140.0, 8.0, 4.5, 0.0, 0.5, 21.5, 90.0),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 0.05, 7.5, 4.5, GETDATE(), 25.0, 0.6, 7.0, 0.0, 160.0, 9.0, 6.0, 0.0, 1.5, 23.0, 110.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 0.15, 6.8, 5.5, GETDATE(), 24.5, 0.3, 7.3, 0.2, 155.0, 11.0, 5.5, 0.0, 1.0, 22.5, 95.0);  -- VIP user


INSERT INTO Orders (UserID, ShopID, FullName, Phone, CreateDate, Email, Street, District, City, Country, PaymentMethodID, TotalPrice, OrderStatus)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 'member a', '1234567890', GETDATE(), 'member@example.com', '123 Main St', 'Central', 'New York', 'USA', 1, 150.75, 0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'vip b', '0987654321', GETDATE(), 'vip@example.com', '456 Elm St', 'North', 'Los Angeles', 'USA', 2, 75.50, 0),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'vip b', '2345678901', GETDATE(), 'vip@example.com', '789 Oak St', 'West', 'Chicago', 'USA', 3, 200.00, 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 'member a', '3456789012', GETDATE(), 'member@example.com', '321 Pine St', 'East', 'Houston', 'USA', 1, 99.99, 1);  -- Member user

-- N-N Table
INSERT INTO OrderDetail (OrderID, ProductID, Quantity, UnitPrice)
VALUES
(1, 1, 2, 25.99), -- OrderID 1, Product P001
(1, 2, 1, 29.99), -- OrderID 1, Product P002
(2, 3, 1, 22.50), -- OrderID 2, Product P003
(3, 10, 1, 199.99), -- OrderID 3, Product P010
(3, 11, 2, 99.99),  -- OrderID 3, Product P011
(4, 18, 1, 75.00); -- OrderID 4, Product P018


INSERT INTO News (Thumbnails, Title, PublishDate, Content)
VALUES
('news1_thumbnail.png', 'Koi Care Tips', GETDATE(), 'Learn essential tips for taking care of your koi fish.'),
('news2_thumbnail.png', 'Pond Maintenance Guide', GETDATE(), 'A comprehensive guide to maintaining a healthy pond environment.'),
('news3_thumbnail.png', 'Koi Health and Nutrition', GETDATE(), 'Understanding the dietary needs of your koi fish.'),
('news4_thumbnail.png', 'Seasonal Care for Koi', GETDATE(), 'Seasonal tips to keep your koi healthy year-round.');


INSERT INTO BlogComments (UserID, BlogId, Content, CreateDate)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 'Great tips! I learned a lot about koi care.', GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'Thanks for the information on pond maintenance!', GETDATE()),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 'I appreciate the dietary advice for koi.', GETDATE()),  -- VIP user
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 4, 'Very informative article on seasonal care.', GETDATE());  -- Admin user


-- ComissionFee = 15% Order total price
INSERT INTO Revenue (OrderID, CommissionFee)
VALUES
(1, 12.30),  -- Revenue from Order ID 1
(2, 5.00),   -- Revenue from Order ID 2
(3, 60.00),  -- Revenue from Order ID 3
(4, 11.25);   -- Revenue from Order ID 4

INSERT INTO Blog_Image (ImageUrl, BlogID)
VALUES
('blog1_image1.png', 1), 
('blog1_image2.png', 1),
('blog1_image3.png', 1),
('blog2_image1.png', 2),
('blog2_image2.png', 2),
('blog2_image3.png', 2),
('blog3_image1.png', 3),
('blog3_image2.png', 3),
('blog3_image3.png', 3),
('blog4_image1.png', 4),
('blog4_image2.png', 4),
('blog4_image3.png', 4);

INSERT INTO News_Image (ImageUrl, NewsID)
VALUES
('news1_image1.png', 1),
('news1_image2.png', 1),
('news1_image3.png', 1),
('news2_image1.png', 2),
('news2_image2.png', 2),
('news2_image3.png', 2),
('news3_image1.png', 3),
('news3_image2.png', 3),
('news3_image3.png', 3),
('news4_image1.png', 4),
('news4_image2.png', 4),
('news4_image3.png', 4);
