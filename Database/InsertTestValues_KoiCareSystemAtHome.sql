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
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member', 'a', NULL, NULL, NULL, NULL, NULL, NULL, 'member@example.com', 'MEMBER@EXAMPLE.COM', 'member@example.com', 'MEMBER@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEIu0gnPvb0zhWrk4NNA3wEMiOewPTGZLrYqgAOJs5OwUbuKXyPKTBekE9OveJ020gg==', 'RWVHVDP7IWP22CE4U3VXIEKH4ZOXHD2W', '71aae56b-e997-4ae0-8215-2e0f71381a88', NULL, 0, 0, NULL, 1, 0),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip', 'b', NULL, NULL, NULL, NULL, NULL, NULL, 'vip@example.com', 'VIP@EXAMPLE.COM', 'vip@example.com', 'VIP@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEGpxZE3331Wf1VD06SX9YwKAG5vWkybbOpLxqbv0tl8AO1Uqhi76j06+HI4eYqyy8w==', 'RWARB7P3OCYEXGGG7ETY3TGEX3FZPISM', '1a48b288-f740-4491-ae98-e50b5273fb21', NULL, 0, 0, NULL, 1, 0),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'admin', 'd', NULL, NULL, NULL, NULL, NULL, NULL, 'admin@example.com', 'ADMIN@EXAMPLE.COM', 'admin@example.com', 'ADMIN@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEMSsXYBri40up6lHG2s0YHq4+fVyvxAGIKkIXHGh1lHXfFRNq79FWJ/oka/KX0OusA==', 'UF5GBLSGV3DSLXRSIDKRAXKGEEIIM3TL', '82c5fd3e-d565-43d1-a031-8af185d68916', NULL, 0, 0, NULL, 1, 0),
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'shop', 'c2', NULL, NULL, NULL, NULL, NULL, NULL, 'shop2@example.com', 'SHOP2@EXAMPLE.COM', 'shop2@example.com', 'SHOP2@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEAAinoUzd5JbC2ZXIsjuzrMAwLklvMaW0XlwQpaoRZHof+FMlGnMJSiNThEoQJ3C/Q==', '5YQ266SGHHXQ2W3KRSLNZKZSM7BB4XWC', 'fbd64607-02bd-47ca-8cb3-22d7c2f6a6c8', NULL, 0, 0, NULL, 1, 0),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'shop', 'c', NULL, NULL, NULL, NULL, NULL, NULL, 'shop@example.com', 'SHOP@EXAMPLE.COM', 'shop@example.com', 'SHOP@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEMFEM383aESJByWGKS3TlzTnvQdLT1LzwWblpe2+AzVDIOIBfUqsZHnQkzC1oSo72g==', '5CIZCKPIKKLLFBIRJDJHT45DZ3V7DL2Q', '98bef99c-d585-4b37-be2d-6e57540bb48b', NULL, 0, 0, NULL, 1, 0),
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', 'member', 'new', NULL, NULL, NULL, NULL, NULL, NULL, 'newmember@example.com', 'NEWMEMBER@EXAMPLE.COM', 'newmember@example.com', 'NEWMEMBER@EXAMPLE.COM', 1, 'AQAAAAIAAYagAAAAEFr2CdCRhT97+9YVoUzBTASFnivlAQhse85fiWfDVotU3zvnXyAOpsZREN5fd4udSQ==', 'VJ642LAK6R4YACZS3CX54BTPHUVG24UR', 'caa3d7e0-e031-455b-b577-4cdeac8a798e', '0123498765', 0, 0, NULL, 1, 0);

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
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Main Pond', 1000.5, 'pond/pondThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/mainpond_thumbnail.png', 3, 500, 1, 1, 'This is the main pond for koi fish.'),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Small Pond', 500.0, 'pond/pondThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/smallpond_thumbnail.png', 2, 300, 1, 0, 'A small pond for young koi.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Outdoor Pond', 1500.0, 'pond/pondThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/outdoorpond_thumbnail.png', 4, 700, 1, 1, 'Outdoor pond with a skimmer and large volume.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Indoor Pond', 750.0, 'pond/pondThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/indoorpond_thumbnail.png', 2, 400, 0, 1, 'Indoor pond for special koi breeding.');


INSERT INTO Category (Name, Description)	
VALUES 
('Koi Food', 'Food products specially designed for koi fish to promote growth and health.'),
('Pond Equipment', 'Equipment and tools for maintaining and improving pond health.'),
('Koi Health', 'Products related to the health and care of koi fish, including treatments and supplements.');


INSERT INTO Shop (UserID, ShopName, Thumbnail, Description, Phone, Email, Rating)
VALUES 
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'BEST KoiShop', 'shop/shopThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/shop2_thumbnail.png', 'Shop 2 specializing in koi care products.', '123456789', 'shop2@example.com', 4.8),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'The KoTool', 'shop/shopThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/shop_thumbnail.png', 'Shop specializing in koi fish care products.', '987654321', 'shop@example.com', 4.8);


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
'Koi fish are not only beautiful but require special care. In this post, we dive into the basics of setting up a koi pond, maintaining water quality, feeding koi, and monitoring their health. Perfect for anyone just starting their koi-keeping journey!', 
'Koi Care 101: Essential Tips for a Thriving Koi Pond'),  -- Member user

('373236e8-0df7-44bf-9990-ce22fa1ff829', GETDATE(), 'blog/blogThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/blog2_thumbnail.png', 
'Maintaining a healthy pond is crucial for the well-being of koi. Learn how to balance water quality, control algae growth, and set up effective filtration systems to create an ideal environment for your koi.', 
'Creating a Healthy Pond Environment for Koi'),  -- VIP user

('156e10b8-ca91-4925-938f-1d872a357ebe', GETDATE(), 'blog/blogThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/blog3_thumbnail.png', 
'Choosing the right diet is key to koi growth and vibrant colors. This post covers the types of food suitable for koi, tips on feeding schedules, and how to adjust feeding with seasonal changes.', 
'Choosing the Best Koi Food for Optimal Health'),  -- Member user

('979a42a8-ecc7-4d15-ab6f-410755b9e593', GETDATE(), 'blog/blogThumbnails/979a42a8-ecc7-4d15-ab6f-1d872a357ebe/blog4_thumbnail.png', 
'From size to coloration, picking the right koi fish can be an art. Learn how to select koi with desired traits, including tips on evaluating health and avoiding common pitfalls when purchasing.', 
'Guide to Choosing the Perfect Koi for Your Pond');  -- Admin user


INSERT INTO Water_Parameter (UserID, PondID, Nitrite, Oxygen, Nitrate, CreatedAt, Temperature, Phosphate, pH, Ammonium, Hardness, CarbonDioxide, CarbonHardness, Salt, TotalChlorines, OutdoorTemp, AmountFed)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 0.1, 6.5, 5.0, GETDATE(), 24.0, 0.5, 7.2, 0.0, 150.0, 10.0, 5.0, 0.0, 1.0, 22.0, 100.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 0.2, 7.0, 6.0, GETDATE(), 23.5, 0.4, 7.5, 0.1, 140.0, 8.0, 4.5, 0.0, 0.5, 21.5, 90.0),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 0.05, 7.5, 4.5, GETDATE(), 25.0, 0.6, 7.0, 0.0, 160.0, 9.0, 6.0, 0.0, 1.5, 23.0, 110.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 0.15, 6.8, 5.5, GETDATE(), 24.5, 0.3, 7.3, 0.2, 155.0, 11.0, 5.5, 0.0, 1.0, 22.5, 95.0);  -- VIP user


INSERT INTO Orders (UserID, FullName, Phone, CreateDate, Email, Street, District, City, Country, TotalPrice, OrderStatus,isVipUpgrade)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member a', '1234567890', GETDATE(), 'member@example.com', '123 Main St', 'Central', 'New York', 'USA', 3500000, 'Successful', 0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip b', '0987654321', GETDATE(), 'vip@example.com', '456 Elm St', 'North', 'Los Angeles', 'USA', 1750000, 'Fail', 0),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'vip b', '2345678901', GETDATE(), 'vip@example.com', '789 Oak St', 'West', 'Chicago', 'USA',  4700000, 'Successful', 0),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 'member a', '3456789012', GETDATE(), 'member@example.com', '321 Pine St', 'East', 'Houston', 'USA', 2350000, 'Successful', 0),  -- Member user
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', 'member new', '0123498765', GETDATE(), 'newmember@example.com', '321 Pine St', 'East', 'Houston', 'USA', 500000, 'Successful', 1);

-- N-N Table
INSERT INTO OrderDetail (OrderID, ProductID, Quantity, UnitPrice)
VALUES
(1, 1, 2, 600000),    -- OrderID 1, Product P001
(1, 2, 1, 700000),    -- OrderID 1, Product P002
(2, 3, 1, 550000),    -- OrderID 2, Product P003
(3, 10, 1, 5000000),  -- OrderID 3, Product P010
(3, 11, 2, 2400000),  -- OrderID 3, Product P011
(4, 18, 1, 1800000);  -- OrderID 4, Product P018


INSERT INTO News (UserId, Thumbnail, Title, PublishDate, Content)
VALUES
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news1_thumbnail.png', 'Koi Care Tips', GETDATE(), 'Discover essential tips for maintaining a thriving koi pond, including water quality, feeding schedules, and regular health checks.'),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news2_thumbnail.png', 'Pond Maintenance Guide', GETDATE(), 'This comprehensive guide covers the key aspects of pond maintenance, from filtration systems to seasonal cleaning, ensuring a healthy habitat for your koi.'),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news3_thumbnail.png', 'Koi Health and Nutrition', GETDATE(), 'Understanding the dietary needs of your koi is crucial. Learn about the best types of food, feeding practices, and how to identify signs of health issues.'),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news4_thumbnail.png', 'Seasonal Care for Koi', GETDATE(), 'Get seasonal tips on how to adjust your koi care routine throughout the year, including temperature changes, feeding adjustments, and health monitoring.');


INSERT INTO BlogComments (UserID, BlogId, Content, CreateDate)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 'Great tips! I learned a lot about koi care.', GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'Thanks for the information on pond maintenance!', GETDATE()),  -- VIP user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 'I appreciate the dietary advice for koi.', GETDATE()),  -- VIP user
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 4, 'Very informative article on seasonal care.', GETDATE());  -- Admin user


-- Inserting Revenue based on Commission Fees (15% of Total Prices for each product)
INSERT INTO Revenue (OrderID, Income)
VALUES
(1, (2 * 600000 * 0.15) + (1 * 700000 * 0.15)),  -- Revenue from Order ID 1
(2, (1 * 550000 * 0.15)),                         -- Revenue from Order ID 2
(3, (1 * 5000000 * 0.15) + (2 * 2400000 * 0.15)), -- Revenue from Order ID 3
(4, (1 * 1800000 * 0.15));                        -- Revenue from Order ID 4


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
('blog/blogImages/979a42a8-ecc7-4d15-ab6f-410755b9e593/blog4_image1.png', 4),
('blog/blogImages/979a42a8-ecc7-4d15-ab6f-410755b9e593/blog4_image2.png', 4),
('blog/blogImages/979a42a8-ecc7-4d15-ab6f-410755b9e593/blog4_image3.png', 4);


INSERT INTO News_Image (ImageUrl, NewsID)
VALUES
('news/newsImages/1/news1_image1.png', 1),
('news/newsImages/1/news1_image2.png', 1),
('news/newsImages/1/news1_image3.png', 1),
('news/newsImages/2/news2_image1.png', 2),
('news/newsImages/2/news2_image2.png', 2),
('news/newsImages/2/news2_image3.png', 2),
('news/newsImages/3/news3_image1.png', 3),
('news/newsImages/3/news3_image2.png', 3),
('news/newsImages/3/news3_image3.png', 3),
('news/newsImages/4/news4_image1.png', 4),
('news/newsImages/4/news4_image2.png', 4),
('news/newsImages/4/news4_image3.png', 4);


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


INSERT INTO VipPackage (Name, Description, Price)
VALUES
('VIP Package - 1 Month', 'Enjoy exclusive access to calculation tools, personalized reminders, enhanced charts, and priority customer support for one month.', 100000),  -- 1 Month
('VIP Package - 6 Months', 'Gain six months of premium access to calculation tools, customized reminders, detailed charts, and priority customer support.', 500000),  -- 6 Months
('VIP Package - 12 Months', 'Unlock a full year of VIP benefits, including calculation tools, tailored reminders, comprehensive charts, and priority customer support.', 1000000);  -- 12 Months


INSERT INTO ShopRatings (UserId, ShopId, Rating, CreateAt)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 5, GETDATE()),  -- Member user rating Shop 1
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 4, GETDATE()),  -- VIP user rating Shop 1
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 2, 3, GETDATE()),  -- Admin user rating Shop 2
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 5, GETDATE()),  -- Member user rating Shop 2
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 2, GETDATE()),  -- VIP user rating Shop 1
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 2, 4, GETDATE());  -- Admin user rating Shop 2


INSERT INTO OrderVipDetail (OrderId, CreateDate)
VALUES
(5, GETDATE()); 


INSERT INTO VipRecord (CreateDate, VipId, UserId, StartDate, EndDate)
VALUES
(GETDATE(), 3, '373236e8-0df7-44bf-9990-ce22fa1ff829', '2024-06-01', '2025-12-01'),  -- 6-month VIP package for vip b
(DATEADD(day, 1, GETDATE()), 1, '1432d10e-64e9-4b0e-b7ff-05253aa0000d', GETDATE(), DATEADD(year, 1, GETDATE()));  -- 1-year VIP package for new member


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