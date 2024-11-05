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
INSERT INTO [AspNetUsers] (Id, FirstName, LastName, Sex, Street, District, City, Country, Avatar, UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp, PhoneNumber, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnd, LockoutEnabled, AccessFailedCount)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member', 'a', NULL, '123 Main St', 'Central', 'New York', 'USA', NULL, 'member@example.com', 'MEMBER@EXAMPLE.COM', 'member@example.com', 'MEMBER@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEIu0gnPvb0zhWrk4NNA3wEMiOewPTGZLrYqgAOJs5OwUbuKXyPKTBekE9OveJ020gg==', 'RWVHVDP7IWP22CE4U3VXIEKH4ZOXHD2W', '71aae56b-e997-4ae0-8215-2e0f71381a88', '1234567890', 0, 0, NULL, 1, 0),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip', 'b', NULL, '456 Elm St', 'North', 'Los Angeles', 'USA', NULL, 'vip@example.com', 'VIP@EXAMPLE.COM', 'vip@example.com', 'VIP@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEGpxZE3331Wf1VD06SX9YwKAG5vWkybbOpLxqbv0tl8AO1Uqhi76j06+HI4eYqyy8w==', 'RWARB7P3OCYEXGGG7ETY3TGEX3FZPISM', '1a48b288-f740-4491-ae98-e50b5273fb21', '0987654321', 0, 0, NULL, 1, 0),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'admin', 'd', NULL, NULL, NULL, NULL, NULL, NULL, 'admin@example.com', 'ADMIN@EXAMPLE.COM', 'admin@example.com', 'ADMIN@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEMSsXYBri40up6lHG2s0YHq4+fVyvxAGIKkIXHGh1lHXfFRNq79FWJ/oka/KX0OusA==', 'UF5GBLSGV3DSLXRSIDKRAXKGEEIIM3TL', '82c5fd3e-d565-43d1-a031-8af185d68916', NULL, 0, 0, NULL, 1, 0),
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'shop', 'c2', NULL, NULL, NULL, NULL, NULL, NULL, 'shop2@example.com', 'SHOP2@EXAMPLE.COM', 'shop2@example.com', 'SHOP2@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEAAinoUzd5JbC2ZXIsjuzrMAwLklvMaW0XlwQpaoRZHof+FMlGnMJSiNThEoQJ3C/Q==', '5YQ266SGHHXQ2W3KRSLNZKZSM7BB4XWC', 'fbd64607-02bd-47ca-8cb3-22d7c2f6a6c8', NULL, 0, 0, NULL, 1, 0),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'shop', 'c', NULL, NULL, NULL, NULL, NULL, NULL, 'shop@example.com', 'SHOP@EXAMPLE.COM', 'shop@example.com', 'SHOP@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEMFEM383aESJByWGKS3TlzTnvQdLT1LzwWblpe2+AzVDIOIBfUqsZHnQkzC1oSo72g==', '5CIZCKPIKKLLFBIRJDJHT45DZ3V7DL2Q', '98bef99c-d585-4b37-be2d-6e57540bb48b', NULL, 0, 0, NULL, 1, 0),
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', 'member', 'new', NULL, '321 Pine St', 'East', 'Houston', 'USA', NULL, 'newmember@example.com', 'NEWMEMBER@EXAMPLE.COM', 'newmember@example.com', 'NEWMEMBER@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEFr2CdCRhT97+9YVoUzBTASFnivlAQhse85fiWfDVotU3zvnXyAOpsZREN5fd4udSQ==', 'VJ642LAK6R4YACZS3CX54BTPHUVG24UR', 'caa3d7e0-e031-455b-b577-4cdeac8a798e', '0123498765', 0, 0, NULL, 1, 0);

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
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6'),
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', '511e95c7-ae67-4186-9fd7-8d5da11979b0');

-----

INSERT INTO Category (Name, Description)	
VALUES 
('Koi Food', 'Food products specially designed for koi fish to promote growth and health.'),
('Pond Equipment', 'Equipment and tools for maintaining and improving pond health.'),
('Koi Health', 'Products related to the health and care of koi fish, including treatments and supplements.');


INSERT INTO Shop (UserID, ShopName, Thumbnail, Description, Phone, Email, Rating)
VALUES 
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'BEST KoiShop', 'shop/shopThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/shop2_thumbnail.png', 'Shop 2 specializing in koi care products.', '123456789', 'shop2@example.com', 4.8),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'The KoTool', 'shop/shopThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/shop_thumbnail.png', 'Shop specializing in koi fish care products.', '987654321', 'shop@example.com', 4.8);


INSERT INTO ShopRatings (UserId, ShopId, Rating, CreateAt)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 5, GETDATE()),  -- Member user rating Shop 1
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 4, GETDATE()),  -- VIP user rating Shop 1
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 2, 3, GETDATE()),  -- Admin user rating Shop 2
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 5, GETDATE()),  -- Member user rating Shop 2
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 2, GETDATE()),  -- VIP user rating Shop 1
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 2, 4, GETDATE());  -- Admin user rating Shop 2


INSERT INTO Product (ShopId, Name, Thumbnail, Description, Quantity, Price, Status, CategoryID)
VALUES
(2, 'Premium Koi Food', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/premium_koi_food.png', 'High-quality koi food for vibrant colors and growth.', 100, 600000, 1, 1),
(1, 'Growth Formula', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/growth_formula.png', 'A special formula to promote faster growth in koi.', 150, 750000, 1, 1),
(2, 'Wheat Germ Food', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/wheat_germ_food.png', 'Koi food designed for colder weather to support digestion.', 200, 550000, 1, 1),
(1, 'Color Enhancing Food', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/color_enhancing_food.png', 'Enhances the colors of koi fish naturally.', 120, 800000, 1, 1),
(2, 'Koi Fry Food', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_fry_food.png', 'Specially formulated for young koi fry.', 180, 450000, 1, 1),
(1, 'Spirulina Pellets', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/spirulina_pellets.png', 'Rich in spirulina for healthy koi growth.', 100, 650000, 1, 1),
(2, 'High Protein Food', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/high_protein_food.png', 'High-protein food to boost koi muscle development.', 130, 720000, 1, 1),
(1, 'All Season Koi Food', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/all_season_koi_food.png', 'Koi food suitable for all seasons.', 160, 520000, 1, 1),
(2, 'Floating Pellets', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/floating_pellets.png', 'Floating pellets that koi love to feed on.', 140, 600000, 1, 1),
(1, 'Pond Pump', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_pump.png', 'High-capacity pump for maintaining water flow in ponds.', 50, 5000000, 1, 2),
(2, 'Pond Skimmer', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/pond_skimmer.png', 'Essential skimmer for removing debris from the pond surface.', 70, 2500000, 1, 2),
(1, 'UV Clarifier', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/uv_clarifier.png', 'UV clarifier to keep pond water clear and algae-free.', 60, 4000000, 1, 2),
(2, 'Pond Heater', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/pond_heater.png', 'Heater for maintaining optimal water temperature during cold seasons.', 40, 4500000, 1, 2),
(1, 'Filter System', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/filter_system.png', 'Advanced filtration system for large ponds.', 45, 7000000, 1, 2),
(2, 'Aeration Kit', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/aeration_kit.png', 'Complete aeration kit to boost oxygen levels in the pond.', 80, 2100000, 1, 2),
(1, 'Pond Net', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_net.png', 'Pond net to catch debris and fish.', 100, 750000, 1, 2),
(2, 'Waterfall Kit', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/waterfall_kit.png', 'Waterfall kit to create a stunning feature in the pond.', 20, 8000000, 1, 2),
(1, 'Pond Liner', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_liner.png', 'Durable pond liner to prevent leaks.', 90, 2000000, 1, 2),
(2, 'Koi Health Boost', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_health_boost.png', 'A vitamin and mineral supplement for healthier koi.', 120, 500000, 1, 3),
(1, 'Anti-Bacterial Treatment', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/anti_bacterial_treatment.png', 'Treatment for bacterial infections in koi.', 100, 850000, 1, 3),
(2, 'Anti-Parasite Treatment', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/anti_parasite_treatment.png', 'Effective treatment for koi parasite issues.', 110, 950000, 1, 3),
(1, 'Water Conditioner', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/water_conditioner.png', 'Conditioner to ensure safe water quality for koi.', 150, 650000, 1, 3),
(2, 'Koi Salt', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_salt.png', 'Koi salt to help maintain water salinity and fish health.', 200, 300000, 1, 3),
(1, 'Pond Bacteria', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_bacteria.png', 'Beneficial bacteria to improve water quality.', 180, 700000, 1, 3),
(2, 'Koi Fungus Treatment', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_fungus_treatment.png', 'Treats fungal infections in koi.', 75, 850000, 1, 3),
(2, 'Koi First Aid Kit', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_first_aid_kit.png', 'A complete first aid kit for koi emergencies.', 50, 1000000, 1, 3),
(1, 'Koi Sedative', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/koi_sedative.png', 'Sedative for koi handling and transportation.', 30, 1200000, 1, 3);


INSERT INTO Product_Image (ProductID, ImageUrl)
VALUES
-- Images for Koi Food Products (P001 to P009)
(1, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p001_img1.png'),
(1, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p001_img2.png'),
(1, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p001_img3.png'),
(2, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p002_img1.png'),
(2, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p002_img2.png'),
(2, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p002_img3.png'),
(3, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p003_img1.png'),
(3, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p003_img2.png'),
(3, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p003_img3.png'),
(4, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p004_img1.png'),
(4, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p004_img2.png'),
(4, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p004_img3.png'),
(5, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p005_img1.png'),
(5, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p005_img2.png'),
(5, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p005_img3.png'),
(6, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p006_img1.png'),
(6, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p006_img2.png'),
(6, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p006_img3.png'),
(7, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p007_img1.png'),
(7, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p007_img2.png'),
(7, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p007_img3.png'),
(8, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p008_img1.png'),
(8, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p008_img2.png'),
(8, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p008_img3.png'),
(9, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p009_img1.png'),
(9, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p009_img2.png'),
(9, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p009_img3.png'),

-- Images for Pond Equipment Products (P010 to P018)
(10, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p010_img1.png'),
(10, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p010_img2.png'),
(10, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p010_img3.png'),
(11, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p011_img1.png'),
(11, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p011_img2.png'),
(11, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p011_img3.png'),
(12, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p012_img1.png'),
(12, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p012_img2.png'),
(12, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p012_img3.png'),
(13, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p013_img1.png'),
(13, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p013_img2.png'),
(13, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p013_img3.png'),
(14, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p014_img1.png'),
(14, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p014_img2.png'),
(14, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p014_img3.png'),
(15, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p015_img1.png'),
(15, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p015_img2.png'),
(15, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p015_img3.png'),
(16, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p016_img1.png'),
(16, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p016_img2.png'),
(16, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p016_img3.png'),
(17, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p017_img1.png'),
(17, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p017_img2.png'),
(17, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p017_img3.png'),
(18, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p018_img1.png'),
(18, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p018_img2.png'),
(18, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p018_img3.png'),

-- Images for Koi Health Products (P019 to P027)
(19, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p019_img1.png'),
(19, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p019_img2.png'),
(19, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p019_img3.png'),
(20, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p020_img1.png'),
(20, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p020_img2.png'),
(20, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p020_img3.png'),
(21, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p021_img1.png'),
(21, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p021_img2.png'),
(21, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p021_img3.png'),
(22, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p022_img1.png'),
(22, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p022_img2.png'),
(22, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p022_img3.png'),
(23, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p023_img1.png'),
(23, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p023_img2.png'),
(23, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p023_img3.png'),
(24, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p024_img1.png'),
(24, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p024_img2.png'),
(24, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p024_img3.png'),
(25, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p025_img1.png'),
(25, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p025_img2.png'),
(25, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p025_img3.png'),
(26, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p026_img1.png'),
(26, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p026_img2.png'),
(26, 'product/productImages/a5827eaf-5c36-414d-8e9c-d1de148d6911/product_p026_img3.png'),
(27, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p027_img1.png'),
(27, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p027_img2.png'),
(27, 'product/productImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/product_p027_img3.png');


INSERT INTO Pond (UserID, Name, Volume, Thumbnail, Depth, PumpingCapacity, Drain, Skimmer, Note)
VALUES 
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Main Pond', 1000.5, 'pond/pondThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/mainpond_thumbnail.png', 3, 500, 1, 1, 'This is the main pond for koi fish.'),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Small Pond', 500.0, 'pond/pondThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/smallpond_thumbnail.png', 2, 300, 1, 0, 'A small pond for young koi.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Outdoor Pond', 1500.0, 'pond/pondThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/outdoorpond_thumbnail.png', 4, 700, 1, 1, 'Outdoor pond with a skimmer and large volume.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Indoor Pond', 750.0, 'pond/pondThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/indoorpond_thumbnail.png', 2, 400, 0, 1, 'Indoor pond for special koi breeding.');


INSERT INTO Water_Parameter (UserID, PondID, Nitrite, Oxygen, Nitrate, CreatedAt, Temperature, Phosphate, pH, Ammonium, Hardness, CarbonDioxide, CarbonHardness, Salt, TotalChlorines, OutdoorTemp, AmountFed)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 0.1, 6.5, 5.0, GETDATE(), 24.0, 0.5, 7.2, 0.0, 150.0, 10.0, 5.0, 0.0, 1.0, 22.0, 100.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 0.2, 7.0, 6.0, GETDATE(), 23.5, 0.4, 7.5, 0.1, 140.0, 8.0, 4.5, 0.0, 0.5, 21.5, 90.0),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 0.05, 7.5, 4.5, GETDATE(), 25.0, 0.6, 7.0, 0.0, 160.0, 9.0, 6.0, 0.0, 1.5, 23.0, 110.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 0.15, 6.8, 5.5, GETDATE(), 24.5, 0.3, 7.3, 0.2, 155.0, 11.0, 5.5, 0.0, 1.0, 22.5, 95.0);  -- VIP user


INSERT INTO Koi (UserID, PondID, Thumbnail, Age, Name, Note, Origin, Length, Weight, Color, CreateAt, Sex, Variety, Physique, Status)
VALUES
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi1_thumbnail.png', 2, 'Koi A', 'A beautiful koi with bright colors.', 'Japan', 30, 5, 'Orange and White', GETDATE(), 'Male','Kohaku','Small', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi2_thumbnail.png', 1, 'Koi B', 'Young koi, growing fast.', 'USA', 20, 2, 'Black and Yellow', GETDATE(), 'Female','Sanke','Thin', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi3_thumbnail.png', 3, 'Koi C', 'A stunning koi with unique patterns.', 'China', 35, 6, 'Red and White', GETDATE(), 'Male','Hikari','Large', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi4_thumbnail.png', 4, 'Koi D', 'Very active koi, loves to swim.', 'Thailand', 32, 7, 'Blue and Orange', GETDATE(), 'Female','Kohaku','Round', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi5_thumbnail.png', 2, 'Koi E', 'Friendly koi, often interacts with people.', 'Japan', 28, 4, 'White with Black Spots', GETDATE(), 'Female','Asagi','Smooth', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi6_thumbnail.png', 1, 'Koi F', 'Small but very colorful.', 'USA', 15, 1, 'Yellow and Black', GETDATE(), 'Male','Sanke','Long', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi7_thumbnail.png', 3, 'Koi G', 'A rare breed of koi.', 'China', 40, 8, 'Orange and Black', GETDATE(), 'Female','Shusui','Short', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi8_thumbnail.png', 5, 'Koi H', 'An older koi with lots of personality.', 'Thailand', 38, 9, 'Calico', GETDATE(), 'Male','Hikari','Sleek', 1);  -- Member user


INSERT INTO Koi_Record (UserID, KoiID, Weight, Length, UpdatedTime)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 5, 30, GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 2, 20, GETDATE()),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 6, 35, GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 5, 7, 32, GETDATE()),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 6, 4, 28, GETDATE());  -- Member user


INSERT INTO Koi_Image (KoiID, ImageUrl)
VALUES
(1, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi1_image1.png'),
(1, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi1_image2.png'),
(1, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi1_image3.png'),
(2, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi2_image1.png'),
(2, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi2_image2.png'),
(2, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi2_image3.png'),
(3, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi3_image1.png'),
(3, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi3_image2.png'),
(3, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi3_image3.png'),
(4, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi4_image1.png'),
(4, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi4_image2.png'),
(4, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi4_image3.png'),
(5, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi5_image1.png'),
(5, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi5_image2.png'),
(5, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi5_image3.png'),
(6, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi6_image1.png'),
(6, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi6_image2.png'),
(6, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi6_image3.png'),
(7, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi7_image1.png'),
(7, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi7_image2.png'),
(7, 'koi/koiImages/373236e8-0df7-44bf-9990-ce22fa1ff829/koi7_image3.png'),
(8, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi8_image1.png'),
(8, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi8_image2.png'),
(8, 'koi/koiImages/156e10b8-ca91-4925-938f-1d872a357ebe/koi8_image3.png');

INSERT INTO Koi_Remind (UserID, KoiID, RemindDescription, DateRemind)
VALUES
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'Check water quality', DATEADD(DAY, 7, GETDATE())),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 'Feed special diet', DATEADD(DAY, 3, GETDATE())),      -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 5, 'Check for parasites', DATEADD(DAY, 10, GETDATE())),   -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 7, 'Clean the pond', DATEADD(DAY, 14, GETDATE())),        -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'Monitor growth', DATEADD(DAY, 30, GETDATE()));       -- VIP user


INSERT INTO Blogs (UserID, PublishDate, Thumbnail, Content, Title)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', GETDATE(), 'blog/blogThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/blog1_thumbnail.png', 
'<p>Koi ponds are serene and beautiful additions to any garden, but they also require proper care and attention to ensure your koi thrive in a healthy, balanced environment. From water quality to feeding routines, let’s explore some essential tips for maintaining a flourishing koi pond.</p><p>&nbsp;</p><h3><strong>1. Maintain Optimal Water Quality</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:600/600;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog1_image1.png?alt=media&token=761c2c09-83a5-4afb-a662-8348d535c82f" width="600" height="600"></figure><p>&nbsp;</p><p>The health of your koi fish is directly tied to the quality of the water in their pond. Here’s how to keep it pristine:</p><p>- <strong>Filtration</strong>: Invest in a good pond filter system to remove debris and harmful waste, ensuring clear water.</p><p>- <strong>Water Testing</strong>: Regularly test for pH (ideal is between 7.0 and 8.5), ammonia, nitrite, and nitrate levels. These elements can impact your koi’s health if left unchecked.</p><p>- <strong>Aeration</strong>: Koi need well-oxygenated water. An aeration system or waterfall feature is highly recommended to keep oxygen levels stable, especially in warmer months.</p><p>A clean pond environment will help prevent diseases and keep your koi vibrant and healthy.</p><h3><strong>2. Feeding Your Koi for Optimal Health</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:900/566;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog1_image2.png?alt=media&token=01891a9e-1949-4e31-9100-e76839176c9b" width="900" height="566"></figure><p>&nbsp;</p><p>Feeding koi is one of the most enjoyable aspects of pond maintenance. To keep your koi growing strong and colorful, follow these feeding tips:</p><p>&nbsp;</p><p>- <strong>Balanced Diet</strong>: Koi require a diet rich in protein during warmer seasons and a lower-protein diet in colder months to aid digestion.</p><p>- <strong>Portion Control</strong>: Feed only as much as your koi can consume in a few minutes. Overfeeding leads to waste buildup and can affect water quality.</p><p>- Feeding Schedule: During spring and summer, feed koi two to three times daily. In colder months, reduce feeding frequency and switch to easy-to-digest foods like wheat germ.</p><p>&nbsp;</p><p>Balanced feeding promotes growth, color enhancement, and a stronger immune system in your koi.</p><p>&nbsp;</p><h3><strong>3. Regular Pond Maintenance</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1070/800;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog1_image3.png?alt=media&token=e7fdf4fd-87a1-4031-8176-641f45e044ce" width="1070" height="800"></figure><p>&nbsp;</p><p>Routine maintenance is crucial to keeping your pond environment healthy and aesthetically pleasing:</p><p>- <strong>Skim the Surface</strong>: Remove leaves, debris, and other waste floating on the surface of the water. This prevents waste from decomposing and affecting water quality.</p><p>- <strong>Pond Plants</strong>: Incorporate plants like water lilies and floating plants. They provide shade, reduce algae growth, and offer hiding spots for koi.</p><p>- <strong>Seasonal Clean-Up</strong>: At least twice a year, thoroughly clean your pond. Clear out sludge, rinse filters, and inspect pumps and equipment for efficiency.</p><p>Regular maintenance not only keeps your pond looking beautiful but also helps to avoid common pond problems like algae blooms and poor water quality.</p><h3>Conclusion</h3><p>Creating a thriving koi pond takes time, patience, and dedication. With regular water quality checks, balanced feeding, and a consistent maintenance routine, you’ll have a healthy pond filled with vibrant, happy koi. Embrace these essential koi care tips, and enjoy the peaceful beauty your koi pond brings to your surroundings!</p>', 
'Koi Care 101: Essential Tips for a Thriving Koi Pond'),  -- Member user

('373236e8-0df7-44bf-9990-ce22fa1ff829', GETDATE(), 'blog/blogThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/blog2_thumbnail.png', 
'<p>A beautiful koi pond can be a peaceful centerpiece for any outdoor space, but a thriving koi habitat requires attention to specific environmental needs. Let’s dive into the essentials for creating a healthy pond environment that promotes the well-being of your koi.</p><p>&nbsp;</p><h3><strong>1. Ideal Pond Size and Depth</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1500/1000;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F373236e8-0df7-44bf-9990-ce22fa1ff829%2Fblog2_image1.png?alt=media&token=5e12de9e-3a0d-4f4f-b75c-b842f92c3357" width="900" height="600"></figure><p>&nbsp;</p><p>The size and depth of your koi pond play a significant role in supporting koi health:</p><p>- <strong>Size</strong>: Koi grow large, with some reaching over 24 inches. Ensure your pond provides ample space – ideally, at least 1,000 gallons or more to accommodate multiple koi comfortably.</p><p>- <strong>Depth</strong>: Koi ponds should be at least 3 feet deep. This depth helps maintain stable water temperature, protecting koi from temperature fluctuations that can cause stress.</p><p>A spacious pond with varied depths helps koi feel secure and provides room for healthy growth.</p><p>&nbsp;</p><h3><strong>2. Maintaining Balanced Water Chemistry</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1250/1250;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F373236e8-0df7-44bf-9990-ce22fa1ff829%2Fblog2_image2.png?alt=media&token=106f0000-de5a-4c44-aa34-d6d25871bec0" width="1250" height="1250"></figure><p>&nbsp;</p><p>Keeping your pond water chemically balanced is essential for koi health:</p><p>- <strong>pH Levels</strong>: Koi thrive in slightly alkaline water, with a pH between 7.0 and 8.5. Test the water regularly and make adjustments as necessary.</p><p>- <strong>Ammonia, Nitrite, and Nitrate</strong>: Harmful substances like ammonia can build up from fish waste. Biological filters help convert ammonia to less harmful nitrate, which can be reduced by water changes and plant absorption.</p><p>- <strong>Temperature</strong>: Koi are sensitive to extreme temperature changes. Install a pond thermometer to monitor temperature, and consider a pond heater in cold climates.</p><p>Balanced water chemistry supports a stress-free environment, reducing the risk of diseases and improving koi vitality.</p><p>&nbsp;</p><h3><strong>3. Adding Natural Elements and Pond Plants</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1200/797;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F373236e8-0df7-44bf-9990-ce22fa1ff829%2Fblog2_image3.png?alt=media&token=7f421821-f614-4203-8ef3-4cd208c4f55d" width="1200" height="797"></figure><p>&nbsp;</p><p>Introducing natural elements, like plants and rocks, adds beauty and functionality to the pond:</p><p>- <strong>Plants</strong>: Aquatic plants like water lilies, cattails, and submerged oxygenators help shade the pond, reduce algae, and provide hiding spots for koi.</p><p>- <strong>Rocks and Gravel</strong>: Adding rocks at the bottom of the pond mimics a natural habitat and encourages beneficial bacteria growth, which aids in breaking down organic matter.</p><p>- <strong>Shelters</strong>: Provide shaded areas or caves within the pond for koi to retreat during hot weather or when they feel threatened.</p><p>Natural features not only enhance the aesthetic of your pond but also contribute to a balanced ecosystem that benefits your koi.</p><p>&nbsp;</p><h3><strong>Conclusion</strong></h3><p>&nbsp;</p><p>A healthy pond environment is the foundation for vibrant, thriving koi. By focusing on pond size, water quality, and adding natural elements, you can create a sanctuary that supports the health and happiness of your koi. With regular monitoring and maintenance, your koi pond will flourish, bringing years of enjoyment and tranquility to your space.</p>', 
'Creating a Healthy Pond Environment for Koi'),  -- VIP user

('156e10b8-ca91-4925-938f-1d872a357ebe', GETDATE(), 'blog/blogThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/blog3_thumbnail.png', 
'<p>Koi are treasured for their beauty, and the right diet is key to maintaining vibrant colors, growth, and health. Selecting quality koi food tailored to their needs ensures they thrive. Here’s a guide to choosing the best food for your koi.</p><p>&nbsp;</p><h3><strong>1. Understanding Koi Dietary Needs</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:474/400;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog3_image1.png?alt=media&token=7e878a5b-35d9-44d0-8819-cfafd1df51d7" width="474" height="400"></figure><p>&nbsp;</p><p>Koi have specific nutritional needs based on their growth stage, season, and water temperature. These factors affect their metabolism and nutrient absorption:</p><p>- <strong>High Protein for Growth</strong>: Young koi benefit from a diet rich in protein (about 35-40%) to support rapid growth. Look for growth formula foods that contain fish meal, a natural protein source.</p><p>- <strong>Balanced Diet for Adults</strong>: For adult koi, choose a balanced diet with moderate protein (around 30%) and essential fats. This helps maintain their shape without excessive growth.</p><p>- <strong>Digestible Ingredients</strong>: Wheat germ and spirulina are common ingredients that aid in digestion, especially in cooler weather when koi’s metabolism slows.</p><p>A well-balanced diet provides essential nutrients, helping koi maintain their vibrant colors and robust health year-round.</p><p>&nbsp;</p><h3><strong>2. Seasonal Feeding Considerations</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1024/1024;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog3_image2.png?alt=media&token=d8bcb456-63c9-43fc-9dc4-c5f9e0ac0c91" width="1024" height="1024"></figure><p>&nbsp;</p><p>Koi diets should be adjusted with changing seasons:</p><p>- <strong>Spring and Summer</strong>: Warmer water increases koi’s metabolic rate, so high-protein, high-energy foods are ideal. Feed them frequently, as they’re more active and require more nutrition for growth and repair.</p><p>- <strong>Autumn and Winter</strong>: As water temperature drops, koi’s metabolism slows. Switch to a wheat germ-based food, which is easier to digest, and reduce feeding frequency. In very cold climates, stop feeding when water temperature goes below 50°F (10°C).</p><p>Adjusting their diet seasonally prevents digestive issues and ensures koi remain healthy through each season.</p><p>&nbsp;</p><h3><strong>3. Choosing Food Types and Forms</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1024/1024;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog3_image3.png?alt=media&token=c134beec-f26f-44b5-8df9-f81ed50ceafd" width="1024" height="1024"></figure><p>&nbsp;</p><p>Selecting the right food type and form helps with feeding efficiency:</p><p>- <strong>Pellets vs. Flakes</strong>: Pellets are the most popular form of koi food as they float on the water, allowing koi to feed at the surface. Flakes are an alternative for smaller koi but can cloud the water if not eaten quickly.</p><p>- <strong>Floating vs. Sinking</strong>: Floating pellets allow you to observe your koi as they eat, which helps monitor their health. Sinking pellets are preferred in colder weather or for shy koi that avoid surface feeding.</p><p>- <strong>Specialty Foods</strong>: Some foods are formulated for specific benefits, such as color-enhancing food with added carotenoids or immune-boosting food with vitamins and probiotics.</p><p>Choose the form and type based on your pond setup and feeding habits to make feeding easier and more efficient.</p><p>&nbsp;</p><h3><strong>Conclusion</strong></h3><p>Feeding your koi a diet that caters to their life stage, seasonal needs, and eating habits promotes their health and longevity. Investing in quality food pays off in vibrant colors, strong growth, and active koi. With a tailored feeding approach, your koi will continue to be a stunning, healthy addition to your pond.</p>', 
'Choosing the Best Koi Food for Optimal Health'),  -- Member user

('b02dfef5-997d-49cd-89f5-1c44499ecdef', GETDATE(), 'blog/blogThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/blog4_thumbnail.png', 
'<p>Choosing koi carp can be a daunting exercise, given the sheer volume in the variation of breeds available to pick from.</p><p>Koi can offer so much to your garden, their elegance and beauty bring a serenity to any koi pond, and they’ll also help encourage the growth of pond plants as well as attracting birds, butterflies and other wildlife.</p><p>Before we delve into the different types of koi, let’s cover some of the basics in picking a healthy fish.</p><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:768/512;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2Fb02dfef5-997d-49cd-89f5-1c44499ecdef%2Fblog4_image1.png?alt=media&token=002c0ba6-9eb7-4cfc-b493-9ab6d417e122" width="768" height="512"></figure><p>&nbsp;</p><p><strong>Body Shape</strong> – A healthy koi should be almost missile-shaped; neither fat nor thin, with a rounded, slimline shape, rounded nose and a smooth, uniform body.&nbsp;</p><p><strong>Colouration –</strong> Regardless of their natural colouration and pattern, koi carp should exhibit a strong, even colour. Though there are intricacies in each breed, this is a good general rule to follow.</p><p><br><strong>Quality of Skin – The skin of a koi in good health should be bright and glossy in appearance, while the scales should be barely visible.</strong></p><p><br><strong>General Health – </strong>It’s important to watch your potential choice of koi swimming naturally before you purchase. It should be swimming upright with a natural, graceful movement, while the dorsal fin should be erect and the pectoral fins spread wide.</p><p>With that covered, the next stage of picking your brand new koi carp will be down to personal preference, it’s now time to consider the markings and colouration of the fish.</p><h2>Markings and Colouration:</h2><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:768/512;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2Fb02dfef5-997d-49cd-89f5-1c44499ecdef%2Fblog4_image2.png?alt=media&token=52f5a923-99fb-4b98-93c5-201a1cea05ea" width="768" height="512"></figure><p>&nbsp;</p><p><strong>Black (Sumi) –</strong> Dark black markings on the koi, these can often be prone to fading in old age and can often make your fish harder to view while in the water. These are both things to consider when choosing your fish.</p><p><strong>White base (Shiroji) – A white base colour will make your fish easier to spot while in the pond, however it may not develop as well as some other colours.</strong></p><p><strong>Red (Beni or Hi) – </strong>The beni provides striking markings on a koi, one way of picking out a fish that will mature with a deep shade of longer lasting red colouration is to look out for a diamond of dark red situated in the middle of the scales.</p><p>Now that you know the basics of colouration, it’s time to familiarise yourself with the different breeds of koi. While there are hundreds of breeds available in different variants, we’ve broken koi fish down into thirteen different categories.</p><h2>Breeds of Koi:</h2><h2>&nbsp;</h2><figure class="image"><img style="aspect-ratio:768/448;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2Fb02dfef5-997d-49cd-89f5-1c44499ecdef%2Fblog4_image3.png?alt=media&token=43475dcc-28ba-4a89-8785-558f36eb1004" width="768" height="448"></figure><h2>&nbsp;</h2><ul><li><strong>Asagi – </strong>One of the plainer variations of koi, they are void of bright colouration and missing the metallic finish apparent in many other breeds. They are mainly a greyish-blue hue with red colouration along the sides of the body, cheeks and pectoral fins.</li><li><strong>Bekko – </strong>Matt in appearance, they possess a striking set of sumi markings along the a body of white, red or yellow.</li><li><strong>Goshiki – </strong>Holding the literal meaning ‘Five Colours’, the Goshiki comprises of a white, red, black, blue and dark blue colouring.</li><li><strong>Hikari Muji –</strong> ‘Hikari’ translates directly as ‘shiny’, while ‘muji’ means ‘single colour’, making this a single coloured variant of koi carp with a glossy sheen to the scales.</li><li><strong>Hikari-Moyomono – </strong>Fully metallic in colour with patterns of two or more colour variations.</li><li><strong>Hikari-Utsurimono –</strong> A metallic variant of the Showa and Utsurimono breeds.</li><li><strong>Kinginrin – </strong>A breed of koi that features shiny scales along the sides of the body or length of the back.</li><li><strong>Kohaku –</strong> Kohaku is the most well known breed of koi, and also the oldest. They comprise of a white base colour with patterns of red contrasting on top of the white colouration.</li><li><strong>Kawarimono – </strong>A completely non-metallic koi that do no not fit into any other categories of breed.</li><li><strong>Tancho – </strong>Deriving from the Tancho Crane (the national bird of Japan), the Tancho has a red spot on its head which resembles the Japanese flag – this makes them a very popular breed of koi.</li><li><strong>Sanke –</strong> Predominantly white and red in colour, overlaid with black patterning. Sanke are essentially a sub-breed of the Kohaku with added sumi markings, making them a popular alternative.</li><li><strong>Showa – </strong>Black bodied koi fish with large red and white markings.</li><li><strong>Utsurimono – </strong>Commonly shortened to ‘Utsuri’, the full name is a literal translation of ‘reflective ones’. There are three variations of the black bodied Utsuri, with either red, white or yellow markings.</li></ul><p>You’re now covered to go out and pick out the right koi for you! Don’t forget that caring for your koi fish is incredibly important in ensuring their well being and longevity. We recommend using a&nbsp;<a href="https://www.pond-planet.co.uk/pond-c1/food-treatments-c50/pond-test-kits-c26"><strong>pond testing kit</strong></a>&nbsp;and&nbsp;<a href="https://www.pond-planet.co.uk/pond-c1/food-treatments-c50/pond-treatments-c23"><strong>pond treatment</strong></a>&nbsp;to ready the environment for your koi, while you’ll also want to stock up on plenty of&nbsp;<a href="https://www.pond-planet.co.uk/pond-c1/food-treatments-c50/fish-food-accessories-c32"><strong>specialist koi fish food</strong></a>&nbsp;too.</p>', 
'Guide to Choosing the Perfect Koi for Your Pond');  -- Shop user


INSERT INTO BlogComments (UserID, BlogId, Content, CreateDate)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 'Great tips! I learned a lot about koi care.', GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'Thanks for the information on pond maintenance!', GETDATE()),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 'I appreciate the dietary advice for koi.', GETDATE()),  -- VIP user
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 4, 'Very informative article on seasonal care.', GETDATE());  -- Shop user


INSERT INTO Blog_Image (ImageUrl, BlogID)
VALUES
('blog/blogImages/156e10b8-ca91-4925-938f-1d872a357ebe/blog1_image1.png', 1), 
('blog/blogImages/156e10b8-ca91-4925-938f-1d872a357ebe/blog1_image2.png', 1),
('blog/blogImages/156e10b8-ca91-4925-938f-1d872a357ebe/blog1_image3.png', 1),
('blog/blogImages/373236e8-0df7-44bf-9990-ce22fa1ff829/blog2_image1.png', 2),
('blog/blogImages/373236e8-0df7-44bf-9990-ce22fa1ff829/blog2_image2.png', 2),
('blog/blogImages/373236e8-0df7-44bf-9990-ce22fa1ff829/blog2_image3.png', 2),
('blog/blogImages/156e10b8-ca91-4925-938f-1d872a357ebe/blog3_image1.png', 3),
('blog/blogImages/156e10b8-ca91-4925-938f-1d872a357ebe/blog3_image2.png', 3),
('blog/blogImages/156e10b8-ca91-4925-938f-1d872a357ebe/blog3_image3.png', 3),
('blog/blogImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/blog4_image1.png', 4),
('blog/blogImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/blog4_image2.png', 4),
('blog/blogImages/b02dfef5-997d-49cd-89f5-1c44499ecdef/blog4_image3.png', 4);


INSERT INTO News (UserId, Thumbnail, Title, PublishDate, Content)
VALUES
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news1_thumbnail.png', 'Koi Fish Resurgence Brings Color and Calm to Urban Spaces<', GETDATE(), '<p><strong>Koi Fish Resurgence Brings Color and Calm to Urban Spaces</strong></p><figure class="image"><img style="aspect-ratio:924/614;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews1_image1.png?alt=media&token=a532beb3-df63-421e-a10e-f81e00c1a084" width="924" height="614"></figure><p>In recent years, koi fish have seen a resurgence in urban settings, with parks, gardens, and even office spaces incorporating these colorful fish into tranquil pond installations. Known for their calming influence and aesthetic appeal, koi ponds are becoming popular for their ability to create peaceful environments within bustling cities.</p><figure class="image"><img style="aspect-ratio:626/351;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews1_image2.png?alt=media&token=263a4ff4-0958-436b-be4e-eee2dde7d24d" width="626" height="351"></figure><p>The diversity of koi, from the classic red and white varieties to rarer patterns of black, blue, and yellow, makes each pond unique. Experts say the koi’s serene movements and vivid colors contribute to relaxation and mental well-being, drawing visitors to these ponds for peaceful observation. Many koi enthusiasts even breed their own koi, selecting for colors and patterns to create their perfect pond.</p><figure class="image"><img style="aspect-ratio:1280/720;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews1_image3.png?alt=media&token=48b85bcc-b420-4e3b-88a0-28417836196f" width="1280" height="720"></figure><p>Whether in parks, courtyards, or as part of a water feature in modern architecture, koi ponds are becoming a staple for those seeking a moment of calm amid urban life. As city life becomes more hectic, koi ponds offer a tranquil escape, allowing people to slow down and connect with nature in a simple yet meaningful way.</p>'),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news2_thumbnail.png', 'Koi Fish Popularity Soars as Urban Escapes Evolve', GETDATE(), '<p><strong>Koi Fish Popularity Soars as Urban Escapes Evolve</strong></p><figure class="image"><img style="aspect-ratio:474/481;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews2_image1.png?alt=media&token=7c654b0b-fa3f-4faa-a1e0-255fca96b275" width="474" height="481"></figure><p>Koi fish have surged in popularity as urban planners and homeowners alike incorporate koi ponds into city landscapes and private gardens. This renewed interest is due not only to the kois vibrant appearance but also to the sense of calm they bring. Koi ponds are now featured in corporate courtyards, urban parks, and wellness centers as people seek natural escapes within the city.</p><figure class="image"><img style="aspect-ratio:799/533;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews2_image2.png?alt=media&token=69b81a42-aea7-484f-aad8-8cabc8517cb1" width="799" height="533"></figure><p>Enthusiasts admire koi for their elegance and unique color patterns, and some even raise koi from young fish to adults, customizing the pond experience to reflect their personal taste. Koi are bred in a variety of colors—red, orange, white, and black—each representing something meaningful, such as luck or prosperity. Their presence in an outdoor setting adds a sense of sophistication and mindfulness to daily life.</p><figure class="image"><img style="aspect-ratio:3264/2448;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews2_image3.png?alt=media&token=027a0200-fb8d-4e98-a927-bcde01269567" width="900" height="700"></figure><p>In addition to aesthetic value, koi ponds are praised for their environmental benefits. Ponds often include natural water filtration systems and plants that promote healthy ecosystems. This eco-friendly approach has inspired a broader trend toward creating urban green spaces where both people and local wildlife can thrive, making koi ponds a beautiful and sustainable way to connect with nature in the city.</p>');


INSERT INTO News_Image (ImageUrl, NewsID)
VALUES
('news/newsImages/news1_image1.png', 1),
('news/newsImages/news1_image2.png', 1),
('news/newsImages/news1_image3.png', 1),
('news/newsImages/news2_image1.png', 2),
('news/newsImages/news2_image2.png', 2),
('news/newsImages/news2_image3.png', 2);


INSERT INTO Cart (UserId, TotalAmount)
VALUES
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1200000),  -- Cart for vip (1200000 from Premium Koi Food + Growth Formula)
('156e10b8-ca91-4925-938f-1d872a357ebe', 7500000),  -- Cart for member (5000000 for Pond Pump + 2500000 for Pond Skimmer)
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', 9100000);  -- Cart for new member (7000000 for Filter System + 2100000 for Pond Bacteria)


INSERT INTO CartItem (CartId, ProductId, ProductName, Quantity, Price, TotalPrice, Thumbnail)
VALUES
-- CartId 1
(1, 1, 'Premium Koi Food', 2, 600000, 1200000, 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/premium_koi_food.png'),  
(1, 2, 'Growth Formula', 1, 750000, 750000, 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/growth_formula.png'),  

-- CartId 2
(2, 10, 'Pond Pump', 1, 5000000, 5000000, 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_pump.png'),  
(2, 11, 'Pond Skimmer', 1, 2500000, 2500000, 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/pond_skimmer.png'),  

-- CartId 3
(3, 14, 'Filter System', 1, 7000000, 7000000, 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/filter_system.png'),  
(3, 24, 'Pond Bacteria', 3, 700000, 2100000, 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_bacteria.png');


INSERT INTO VipPackage (Name, Description, Options, Price)
VALUES
('VIP Package - 1 Month', 'Enjoy exclusive access to calculation tools, personalized reminders, enhanced charts, and priority customer support for one month.', 1, 100000),  -- 1 Month
('VIP Package - 6 Months', 'Gain six months of premium access to calculation tools, customized reminders, detailed charts, and priority customer support.', 6, 500000),  -- 6 Months
('VIP Package - 12 Months', 'Unlock a full year of VIP benefits, including calculation tools, tailored reminders, comprehensive charts, and priority customer support.', 12, 1000000);  -- 12 Months


INSERT INTO VipRecord ( VipId, UserId, StartDate, EndDate)
VALUES
( 2, '1432d10e-64e9-4b0e-b7ff-05253aa0000d', GETDATE(), DATEADD(year, 1, GETDATE())),  -- 6-month VIP package for vip b
( 3, '373236e8-0df7-44bf-9990-ce22fa1ff829', '2024-06-01', '2025-12-01');  -- 1-year VIP package for new member


INSERT INTO Orders (UserID, FullName, Phone, CreateDate, Email, Street, District, City, Country, TotalPrice, OrderStatus, isVipUpgrade)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member a', '1234567890', GETDATE(), 'member@example.com', '123 Main St', 'Central', 'New York', 'USA', 3500000, 'Successful', 0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip b', '0987654321', GETDATE(), 'vip@example.com', '456 Elm St', 'North', 'Los Angeles', 'USA', 1750000, 'Fail', 0),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip b', '2345678901', GETDATE(), 'vip@example.com', '789 Oak St', 'West', 'Chicago', 'USA',  4700000, 'Successful', 0),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member a', '3456789012', GETDATE(), 'member@example.com', '321 Pine St', 'East', 'Houston', 'USA', 2350000, 'Successful', 0),  -- Member user
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', 'member new', '0123498765', GETDATE(), 'newmember@example.com', '321 Pine St', 'East', 'Houston', 'USA', 500000, 'Successful', 1); -- Member user


-- N-N Table
INSERT INTO OrderDetail (OrderID, ProductID, Quantity, UnitPrice)
VALUES
(1, 1, 2, 600000),    -- OrderID 1, Product P001
(1, 2, 1, 700000),    -- OrderID 1, Product P002
(2, 3, 1, 550000),    -- OrderID 2, Product P003
(3, 10, 1, 5000000),  -- OrderID 3, Product P010
(3, 11, 2, 2400000),  -- OrderID 3, Product P011
(4, 18, 1, 1800000);  -- OrderID 4, Product P018


INSERT INTO OrderVipDetail (OrderId, VipId)
VALUES
(5, 2); 


-- Inserting Revenue based on Commission Fees (15% of Total Prices for each product)
INSERT INTO Revenue (OrderID, Income)
VALUES
(1, (2 * 600000 * 0.15) + (1 * 700000 * 0.15)),  -- Revenue from Order ID 1
(2, (1 * 550000 * 0.15)),                         -- Revenue from Order ID 2
(3, (1 * 5000000 * 0.15) + (2 * 2400000 * 0.15)), -- Revenue from Order ID 3
(4, (1 * 1800000 * 0.15));                        -- Revenue from Order ID 4


INSERT INTO PaymentTransaction 
    (UserId, VnpTxnRef, VnpAmount, VnpBankCode, 
     VnpBankTranNo, VnpCardType, VnpOrderInfo, VnpPayDate, 
     VnpResponseCode, VnpTransactionNo, VnpTransactionStatus, 
     VnpSecureHash, VnpTmnCode, PaymentStatus)
VALUES
    ('156e10b8-ca91-4925-938f-1d872a357ebe', 'TxnRef001', 3500000, 'ABC', 
     'BankTranNo001', 'Visa', 1, GETDATE(), 
     '00', 'TxnNo001', '00', 'SecureHash001', 'TmnCode001', 1),
     
    ('373236e8-0df7-44bf-9990-ce22fa1ff829', 'TxnRef002', 1750000, 'NBC', 
     'BankTranNo002', 'MasterCard', 2, GETDATE(), 
     '00', 'TxnNo002', '00', 'SecureHash002', 'TmnCode002', 1),
     
    ('373236e8-0df7-44bf-9990-ce22fa1ff829', 'TxnRef003', 4700000, 'TPB', 
     'BankTranNo003', 'Visa', 3, GETDATE(), 
     '00', 'TxnNo003', '00', 'SecureHash003', 'TmnCode003', 1),
     
    ('156e10b8-ca91-4925-938f-1d872a357ebe', 'TxnRef004', 2350000, 'MBB', 
     'BankTranNo004', 'Bank', 4, GETDATE(), 
     '00', 'TxnNo004', '00', 'SecureHash004', 'TmnCode004', 1);
