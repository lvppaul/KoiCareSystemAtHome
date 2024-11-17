--drop database KoiCareSystemAtHome;

use KoiCareSystemAtHome1711;

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
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Sex], [Street], [District], [City], [Country], [Avatar], [RefreshToken], [RefreshTokenExpiration], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'Minh Quan', N'Luu', N'Male', N'Nguyen Anh Thu', N'12', N'TP Ho Chi Minh', N'Viet Nam', NULL, N'cZF16z487jreK6CEzrUNr8cU8JTZa2a7U8bkU8Z2Eyc=', CAST(N'2024-11-16T11:06:40.3000739' AS DateTime2), N'minhquan1412@gmail.com', N'MINHQUAN1412@GMAIL.COM', N'minhquan1412@gmail.com', N'MINHQUAN1412@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEKKpNy6VxZERRfJ7mrvm1K4jTY+UA2CGHXukt48ARQx/jZCFOD5nRiP3kAfLpmWKhw==', N'XGQW7464UNRVLEXMYI6UMLOZ72WA62CQ', N'17451b9a-eb04-4c95-804b-bf1e48fd6462', N'0785663033', 0, 0, NULL, 1, 0)

--1.
INSERT INTO [AspNetUsers] (Id, FirstName, LastName, Sex, Street, District, City, Country, Avatar, UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp, PhoneNumber, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnd, LockoutEnabled, AccessFailedCount)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 'John', 'Cena', 'Male', '123 Main St', 'Central', 'New York', 'USA', NULL, 'john@gmail.com', 'JOHN@GMAIL.COM', 'john@gmail.com', 'JOHN@GMAIL.COM', 1, 'AQAAAAIAAYagAAAAEIu0gnPvb0zhWrk4NNA3wEMiOewPTGZLrYqgAOJs5OwUbuKXyPKTBekE9OveJ020gg==', 'RWVHVDP7IWP22CE4U3VXIEKH4ZOXHD2W', '71aae56b-e997-4ae0-8215-2e0f71381a88', '0974628465', 0, 0, NULL, 1, 0),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Leo', 'Hong', 'Male', '456 Elm St', 'North', 'Los Angeles', 'USA', NULL, 'leo@gmail.com', 'LEO@GMAIL.COM', 'leo@gmail.com', 'LEO@GMAIL.COM', 1, 'AQAAAAIAAYagAAAAEGpxZE3331Wf1VD06SX9YwKAG5vWkybbOpLxqbv0tl8AO1Uqhi76j06+HI4eYqyy8w==', 'RWARB7P3OCYEXGGG7ETY3TGEX3FZPISM', '1a48b288-f740-4491-ae98-e50b5273fb21', '0912756395', 0, 0, NULL, 1, 0),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'Tri', 'Vo', 'Male', 'D1', 'Long Thanh My', 'Thu Duc', 'Viet Nam', NULL, 'congtri@gmail.com', 'congtri@GMAIL.COM', 'congtri@gmail.com', 'congtri@GMAIL.COM', 1, 'AQAAAAIAAYagAAAAEMSsXYBri40up6lHG2s0YHq4+fVyvxAGIKkIXHGh1lHXfFRNq79FWJ/oka/KX0OusA==', 'UF5GBLSGV3DSLXRSIDKRAXKGEEIIM3TL', '82c5fd3e-d565-43d1-a031-8af185d68916', '0936584637', 0, 0, NULL, 1, 0),
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'Rize', 'Kate', 'Female', '324 Jos St', 'South', 'Washington', 'USA', NULL, 'koipremium@gmail.com', 'KOIPREMIUM@GMAIL.COM', 'koipremium@gmail.com', 'KOIPREMIUM@GMAIL.COM', 1, 'AQAAAAIAAYagAAAAEAAinoUzd5JbC2ZXIsjuzrMAwLklvMaW0XlwQpaoRZHof+FMlGnMJSiNThEoQJ3C/Q==', '5YQ266SGHHXQ2W3KRSLNZKZSM7BB4XWC', 'fbd64607-02bd-47ca-8cb3-22d7c2f6a6c8', '0965829475', 0, 0, NULL, 1, 0),
('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'Mary', 'Derwin', 'Female', '42 Merlin St', 'West', 'Ohio', 'USA', NULL, 'thekotool@gmail.com', 'THEKOTOOL@GMAIL.COM', 'thekotool@gmail.com', 'THEKOTOOL@GMAIL.COM', 1, 'AQAAAAIAAYagAAAAEMFEM383aESJByWGKS3TlzTnvQdLT1LzwWblpe2+AzVDIOIBfUqsZHnQkzC1oSo72g==', '5CIZCKPIKKLLFBIRJDJHT45DZ3V7DL2Q', '98bef99c-d585-4b37-be2d-6e57540bb48b', '0959378542', 0, 0, NULL, 1, 0),
('1432d10e-64e9-4b0e-b7ff-05253aa0000d', 'Eric', 'Lee', 'Male', '321 Pine St', 'East', 'Houston', 'USA', NULL, 'eric@gmail.com', 'ERIC@GMAIL.COM', 'eric@gmail.com', 'ERIC@GMAIL.COM', 1, 'AQAAAAIAAYagAAAAEFr2CdCRhT97+9YVoUzBTASFnivlAQhse85fiWfDVotU3zvnXyAOpsZREN5fd4udSQ==', 'VJ642LAK6R4YACZS3CX54BTPHUVG24UR', 'caa3d7e0-e031-455b-b577-4cdeac8a798e', '0957937561', 0, 0, NULL, 1, 0);

INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Sex], [Street], [District], [City], [Country], [Avatar], [RefreshToken], [RefreshTokenExpiration], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen', N'Duc', N'Male', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', NULL, N'H82nd7o7zlWwHwt9CiGGEVpHoS3O9erImMr+mnqjrpo=', CAST(N'2024-11-16T20:53:15.7152139' AS DateTime2), N'ThangNguyenDuc2012@gmail.com', N'THANGNGUYENDUC2012@GMAIL.COM', N'ThangNguyenDuc2012@gmail.com', N'THANGNGUYENDUC2012@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEK9Kf5SniCfv8DD3vB89vcofKNqdzNb/e48/fMR1EcEGkPSGFJj4Ll3rGMU2UnH+MA==', N'ZSTCDY3W5KM2UMZWCPEISJU37XGFG2OP', N'd28c462a-3522-4007-a56c-4e73172119f3', N'0321654987', 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Sex], [Street], [District], [City], [Country], [Avatar], [RefreshToken], [RefreshTokenExpiration], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'Phat', N'Le', N'Male', N'Tan Son Nhat', N'Go Vap', N'TP Ho Chi Minh', N'Viet Nam', NULL, N'YLlCH1wK7d0lNVnFRiDIRyRZD4lyIDiB7BcBROMGB44=', CAST(N'2024-11-16T22:11:54.7207517' AS DateTime2), N'PhatLV1234@gmail.com', N'PHATLV1234@GMAIL.COM', N'PhatLV1234@gmail.com', N'PHATLV1234@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEBRC/KuNx/NaxaJUjeaEucZBtPxSVOcJC2v3kEJBmAN8PQ3PJH0gU91KtRgaU27tTQ==', N'SSMVVEISSZT6DQRWXUA2ADT642PP7BQR', N'b07f5062-8b3c-4044-aa54-614eea8b03d1', N'0345678912', 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Sex], [Street], [District], [City], [Country], [Avatar], [RefreshToken], [RefreshTokenExpiration], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'Mai', N'Ngoc Nguyen', N'Female', N'123 Street A', N'Thu Duc', N'TP Ho Chi Minh', N'Vietnam', NULL, N'k82zygm3v/1WBfldFnGKbofh9oDCLHnEidfxN2ZtznU=', CAST(N'2024-11-16T22:25:32.6397293' AS DateTime2), N'Ngocmai1223@gmail.com', N'NGOCMAI1223@GMAIL.COM', N'Ngocmai1223@gmail.com', N'NGOCMAI1223@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEL+Cgix+JD+nom/cAJZKiMbMaQ428sDFoRYZr+9yOXX0Hr7L2T1h3iPy73HS457Tjw==', N'YXW5LF4XCCLZTBRFLCBAWOQD724SFPFD', N'bea0e1c5-f31e-4336-9f42-849acb338ac5', N'0326965123', 0, 0, NULL, 1, 0)


--All roles password: Abc@123

--2
INSERT INTO [AspNetRoles] (Id, Name, NormalizedName, ConcurrencyStamp)
VALUES
('511e95c7-ae67-4186-9fd7-8d5da11979b0', 'member', 'MEMBER', NULL),
('6f242335-7855-4678-b3f2-0a0c7c525c8a', 'admin', 'ADMIN', NULL),
('90204048-b8cd-4d16-bfe7-5991e5360e06', 'vip', 'VIP', NULL),
('ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6', 'shop', 'SHOP', NULL);

--3
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'511e95c7-ae67-4186-9fd7-8d5da11979b0')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'156e10b8-ca91-4925-938f-1d872a357ebe', N'511e95c7-ae67-4186-9fd7-8d5da11979b0')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'979a42a8-ecc7-4d15-ab6f-410755b9e593', N'6f242335-7855-4678-b3f2-0a0c7c525c8a')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'90204048-b8cd-4d16-bfe7-5991e5360e06')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'373236e8-0df7-44bf-9990-ce22fa1ff829', N'90204048-b8cd-4d16-bfe7-5991e5360e06')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'90204048-b8cd-4d16-bfe7-5991e5360e06')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'90204048-b8cd-4d16-bfe7-5991e5360e06')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'90204048-b8cd-4d16-bfe7-5991e5360e06')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'a5827eaf-5c36-414d-8e9c-d1de148d6911', N'ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'b02dfef5-997d-49cd-89f5-1c44499ecdef', N'ac9abd73-dc84-4bd4-b4b5-8e062cd66cc6')

-----

INSERT INTO Category (Name, Description)	
VALUES 
('Koi Food', 'Food products specially designed for koi fish to promote growth and health.'),
('Pond Equipment', 'Equipment and tools for maintaining and improving pond health.'),
('Koi Health', 'Products related to the health and care of koi fish, including treatments and supplements.');


INSERT INTO Shop (UserID, ShopName, Thumbnail, Description, Phone, Email, Rating)
VALUES 
('a5827eaf-5c36-414d-8e9c-d1de148d6911', 'Koi Premium', 'shop/shopThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/shop2_thumbnail.png', 
'Koi Premium offers a comprehensive selection of high-quality products for koi fish care, designed to meet the needs of both beginner and experienced koi enthusiasts. With a commitment to quality, Koi Premium ensures that each product is crafted to support the health, beauty, and growth of koi fish, making koi care accessible and effective.', 
'0965829475', 'koipremium@gmail.com', 4.8),

('b02dfef5-997d-49cd-89f5-1c44499ecdef', 'The KoTool', 'shop/shopThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/shop_thumbnail.png', 
'The KoTool specializes in providing essential tools and products for koi fish enthusiasts, focusing on the well-being of koi fish through expertly selected items. The KoTool aims to help hobbyists maintain optimal pond conditions with ease, offering reliable and trusted products to promote a thriving environment for koi fish.',
'0959378542', 'thekotool@gmail.com', 4.6);


INSERT INTO ShopRatings (UserId, ShopId, Rating, CreateAt)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 1, 5, GETDATE()),  -- Member user rating Shop 1
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 4, GETDATE()),  -- VIP user rating Shop 1
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 2, 3, GETDATE()),  -- Admin user rating Shop 2
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 5, GETDATE()),  -- Member user rating Shop 2
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 2, GETDATE()),  -- VIP user rating Shop 1
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 2, 4, GETDATE());  -- Admin user rating Shop 2


INSERT INTO Product (ShopId, Name, ExpiredDate, Thumbnail, Description, Quantity, Price, CategoryID)
VALUES
(2, 'Premium Koi Food', '2026-01-15', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/premium_koi_food.png', 'High-quality koi food for vibrant colors and growth.', 100, 600000, 1),
(1, 'Growth Formula', '2026-02-20', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/growth_formula.png', 'A special formula to promote faster growth in koi.', 150, 750000, 1),
(2, 'Wheat Germ Food', '2026-03-10', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/wheat_germ_food.png', 'Koi food designed for colder weather to support digestion.', 200, 550000, 1),
(1, 'Color Enhancing Food', '2026-01-30', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/color_enhancing_food.png', 'Enhances the colors of koi fish naturally.', 120, 800000, 1),
(2, 'Koi Fry Food', '2025-12-25', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_fry_food.png', 'Specially formulated for young koi fry.', 180, 450000, 1),
(1, 'Spirulina Pellets', '2026-02-15', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/spirulina_pellets.png', 'Rich in spirulina for healthy koi growth.', 100, 650000, 1),
(2, 'High Protein Food', '2026-03-20', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/high_protein_food.png', 'High-protein food to boost koi muscle development.', 130, 720000, 1),
(1, 'All Season Koi Food', '2026-01-25', 'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/all_season_koi_food.png', 'Koi food suitable for all seasons.', 160, 520000, 1),
(2, 'Floating Pellets', '2026-02-28', 'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/floating_pellets.png', 'Floating pellets that koi love to feed on.', 140, 600000, 1),
(1, 'Pond Pump', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_pump.png', 'High-capacity pump for maintaining water flow in ponds.', 50, 5000000, 2),
(2, 'Pond Skimmer', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/pond_skimmer.png', 'Essential skimmer for removing debris from the pond surface.', 70, 2500000, 2),
(1, 'UV Clarifier', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/uv_clarifier.png', 'UV clarifier to keep pond water clear and algae-free.', 60, 4000000, 2),
(2, 'Pond Heater', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/pond_heater.png', 'Heater for maintaining optimal water temperature during cold seasons.', 40, 4500000, 2),
(1, 'Filter System', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/filter_system.png', 'Advanced filtration system for large ponds.', 45, 7000000, 2),
(2, 'Aeration Kit', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/aeration_kit.png', 'Complete aeration kit to boost oxygen levels in the pond.', 80, 2100000, 2),
(1, 'Pond Net', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_net.png', 'Pond net to catch debris and fish.', 100, 750000, 2),
(2, 'Waterfall Kit', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/waterfall_kit.png', 'Waterfall kit to create a stunning feature in the pond.', 20, 8000000, 2),
(1, 'Pond Liner', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_liner.png', 'Durable pond liner to prevent leaks.', 90, 2000000, 2),
(2, 'Koi Health Boost', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_health_boost.png', 'A vitamin and mineral supplement for healthier koi.', 120, 500000, 3),
(1, 'Anti-Bacterial Treatment', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/anti_bacterial_treatment.png', 'Treatment for bacterial infections in koi.', 100, 850000, 3),
(2, 'Anti-Parasite Treatment', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/anti_parasite_treatment.png', 'Effective treatment for koi parasite issues.', 110, 950000, 3),
(1, 'Water Conditioner', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/water_conditioner.png', 'Conditioner to ensure safe water quality for koi.', 150, 650000, 3),
(2, 'Koi Salt', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_salt.png', 'Koi salt to help maintain water salinity and fish health.', 200, 300000, 3),
(1, 'Pond Bacteria', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_bacteria.png', 'Beneficial bacteria to improve water quality.', 180, 700000, 3),
(2, 'Koi Fungus Treatment', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_fungus_treatment.png', 'Treats fungal infections in koi.', 75, 850000, 3),
(2, 'Koi First Aid Kit', null,'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/koi_first_aid_kit.png', 'A complete first aid kit for koi emergencies.', 50, 1000000, 3),
(1, 'Koi Sedative', null,'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/koi_sedative.png', 'Sedative for koi handling and transportation.', 30, 1200000, 3);


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
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Main Pond', 2000.0, 'pond/pondThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/mainpond_thumbnail.png', 4, 700, 1, 1, 'This is the main pond for koi fish.'),
('373236e8-0df7-44bf-9990-ce22fa1ff829', 'Small Pond', 500.0, 'pond/pondThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/smallpond_thumbnail.png', 2, 300, 1, 0, 'A small pond for young koi.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Outdoor Pond', 1500.0, 'pond/pondThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/outdoorpond_thumbnail.png', 3, 500, 1, 1, 'Outdoor pond with a skimmer and large volume.'),
('156e10b8-ca91-4925-938f-1d872a357ebe', 'Indoor Pond', 750.0, 'pond/pondThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/indoorpond_thumbnail.png', 2, 400, 0, 1, 'Indoor pond for special koi breeding.');


INSERT INTO Water_Parameter (UserID, PondID, Nitrite, Oxygen, Nitrate, CreatedAt, Temperature, Phosphate, pH, Ammonium, Hardness, CarbonDioxide, CarbonHardness, Salt, TotalChlorines, OutdoorTemp, AmountFed)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 0.1, 6.5, 5.0, GETDATE(), 24.0, 0.1, 7.2, 0.3, 4.0, 10.0, 5.0, 0.3, 1.0, 22.0, 100.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 0.2, 7.0, 6.0, GETDATE(), 23.5, 0.03, 7.5, 0.7, 6.0, 8.0, 4.5, 0.5, 0.5, 21.5, 90.0),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 0.05, 7.5, 4.5, GETDATE(), 25.0, 0.01, 7.0, 1.2, 11.0, 9.0, 6.0, 1.0, 1.5, 23.0, 110.0),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 0.15, 6.8, 5.5, GETDATE(), 24.5, 0.06, 7.3, 0.1, 7.0, 11.0, 5.5, 0.1, 1.0, 22.5, 95.0);  -- VIP user


INSERT INTO Koi (UserID, PondID, Thumbnail, Age, Name, Note, Origin, Length, Weight, Color, CreateAt, Sex, Variety, Physique, Status)
VALUES
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi1_thumbnail.png', 3, 'Hotaro', 'A beautiful koi with bright colors.', 'Japan', 45, 3100, 'Orange and White', GETDATE(), 'Male','Kohaku','Corpulent', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi2_thumbnail.png', 1, 'Kawasaki', 'Young koi, growing fast.', 'USA', 30, 2000, 'Black and Yellow', GETDATE(), 'Female','Sanke','Slim', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi3_thumbnail.png', 2, 'Neru', 'A stunning koi with unique patterns.', 'China', 35, 3000, 'Red and White', GETDATE(), 'Male','Hikari','Normal', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi4_thumbnail.png', 4, 'Yama', 'Very active koi, loves to swim.', 'Thailand', 52, 4600, 'Blue and Orange', GETDATE(), 'Female','Kohaku','Corpulent', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 1, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi5_thumbnail.png', 2, 'Eitoku', 'Friendly koi, often interacts with people.', 'Japan', 38, 2600, 'White with Black Spots', GETDATE(), 'Female','Asagi','Slim', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 3, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi6_thumbnail.png', 5, 'Anteiku', 'An older koi with lots of personality.', 'USA', 65, 5300, 'Yellow and Black', GETDATE(), 'Male','Sanke','Corpulent', 1),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 2, 'koi/koiThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/koi7_thumbnail.png', 3, 'Garam', 'Small but very colorful.', 'China', 40, 3000, 'Orange and Black', GETDATE(), 'Female','Shusui','Slim', 1),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 'koi/koiThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/koi8_thumbnail.png', 3, 'Honda', 'A rare breed of koi.', 'Thailand', 48, 3700, 'Calico', GETDATE(), 'Male','Hikari','Normal', 1);  -- Member user


INSERT INTO Koi_Record (UserID, KoiID, Weight, Length, UpdatedTime)
VALUES
('156e10b8-ca91-4925-938f-1d872a357ebe', 2, 2200, 30, GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 3, 3100, 35, GETDATE()),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 4, 4400, 52, GETDATE()),  -- Member user
('373236e8-0df7-44bf-9990-ce22fa1ff829', 5, 2700, 39, GETDATE()),  -- VIP user
('156e10b8-ca91-4925-938f-1d872a357ebe', 6, 5500, 65, GETDATE());  -- Member user


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
'<p>Koi ponds are serene and beautiful additions to any garden, but they also require proper care and attention to ensure your koi thrive in a healthy, balanced environment. From water quality to feeding routines, let�s explore some essential tips for maintaining a flourishing koi pond.</p><p>&nbsp;</p><h3><strong>1. Maintain Optimal Water Quality</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:600/600;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog1_image1.png?alt=media&token=761c2c09-83a5-4afb-a662-8348d535c82f" width="600" height="600"></figure><p>&nbsp;</p><p>The health of your koi fish is directly tied to the quality of the water in their pond. Here�s how to keep it pristine:</p><p>- <strong>Filtration</strong>: Invest in a good pond filter system to remove debris and harmful waste, ensuring clear water.</p><p>- <strong>Water Testing</strong>: Regularly test for pH (ideal is between 7.0 and 8.5), ammonia, nitrite, and nitrate levels. These elements can impact your koi�s health if left unchecked.</p><p>- <strong>Aeration</strong>: Koi need well-oxygenated water. An aeration system or waterfall feature is highly recommended to keep oxygen levels stable, especially in warmer months.</p><p>A clean pond environment will help prevent diseases and keep your koi vibrant and healthy.</p><h3><strong>2. Feeding Your Koi for Optimal Health</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:900/566;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog1_image2.png?alt=media&token=01891a9e-1949-4e31-9100-e76839176c9b" width="900" height="566"></figure><p>&nbsp;</p><p>Feeding koi is one of the most enjoyable aspects of pond maintenance. To keep your koi growing strong and colorful, follow these feeding tips:</p><p>&nbsp;</p><p>- <strong>Balanced Diet</strong>: Koi require a diet rich in protein during warmer seasons and a lower-protein diet in colder months to aid digestion.</p><p>- <strong>Portion Control</strong>: Feed only as much as your koi can consume in a few minutes. Overfeeding leads to waste buildup and can affect water quality.</p><p>- Feeding Schedule: During spring and summer, feed koi two to three times daily. In colder months, reduce feeding frequency and switch to easy-to-digest foods like wheat germ.</p><p>&nbsp;</p><p>Balanced feeding promotes growth, color enhancement, and a stronger immune system in your koi.</p><p>&nbsp;</p><h3><strong>3. Regular Pond Maintenance</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1070/800;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog1_image3.png?alt=media&token=e7fdf4fd-87a1-4031-8176-641f45e044ce" width="1070" height="800"></figure><p>&nbsp;</p><p>Routine maintenance is crucial to keeping your pond environment healthy and aesthetically pleasing:</p><p>- <strong>Skim the Surface</strong>: Remove leaves, debris, and other waste floating on the surface of the water. This prevents waste from decomposing and affecting water quality.</p><p>- <strong>Pond Plants</strong>: Incorporate plants like water lilies and floating plants. They provide shade, reduce algae growth, and offer hiding spots for koi.</p><p>- <strong>Seasonal Clean-Up</strong>: At least twice a year, thoroughly clean your pond. Clear out sludge, rinse filters, and inspect pumps and equipment for efficiency.</p><p>Regular maintenance not only keeps your pond looking beautiful but also helps to avoid common pond problems like algae blooms and poor water quality.</p><h3>Conclusion</h3><p>Creating a thriving koi pond takes time, patience, and dedication. With regular water quality checks, balanced feeding, and a consistent maintenance routine, you�ll have a healthy pond filled with vibrant, happy koi. Embrace these essential koi care tips, and enjoy the peaceful beauty your koi pond brings to your surroundings!</p>', 
'Koi Care 101: Essential Tips for a Thriving Koi Pond'),  -- Member user

('373236e8-0df7-44bf-9990-ce22fa1ff829', GETDATE(), 'blog/blogThumbnails/373236e8-0df7-44bf-9990-ce22fa1ff829/blog2_thumbnail.png', 
'<p>A beautiful koi pond can be a peaceful centerpiece for any outdoor space, but a thriving koi habitat requires attention to specific environmental needs. Let�s dive into the essentials for creating a healthy pond environment that promotes the well-being of your koi.</p><p>&nbsp;</p><h3><strong>1. Ideal Pond Size and Depth</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1500/1000;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F373236e8-0df7-44bf-9990-ce22fa1ff829%2Fblog2_image1.png?alt=media&token=5e12de9e-3a0d-4f4f-b75c-b842f92c3357" width="900" height="600"></figure><p>&nbsp;</p><p>The size and depth of your koi pond play a significant role in supporting koi health:</p><p>- <strong>Size</strong>: Koi grow large, with some reaching over 24 inches. Ensure your pond provides ample space � ideally, at least 1,000 gallons or more to accommodate multiple koi comfortably.</p><p>- <strong>Depth</strong>: Koi ponds should be at least 3 feet deep. This depth helps maintain stable water temperature, protecting koi from temperature fluctuations that can cause stress.</p><p>A spacious pond with varied depths helps koi feel secure and provides room for healthy growth.</p><p>&nbsp;</p><h3><strong>2. Maintaining Balanced Water Chemistry</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1250/1250;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F373236e8-0df7-44bf-9990-ce22fa1ff829%2Fblog2_image2.png?alt=media&token=106f0000-de5a-4c44-aa34-d6d25871bec0" width="1250" height="1250"></figure><p>&nbsp;</p><p>Keeping your pond water chemically balanced is essential for koi health:</p><p>- <strong>pH Levels</strong>: Koi thrive in slightly alkaline water, with a pH between 7.0 and 8.5. Test the water regularly and make adjustments as necessary.</p><p>- <strong>Ammonia, Nitrite, and Nitrate</strong>: Harmful substances like ammonia can build up from fish waste. Biological filters help convert ammonia to less harmful nitrate, which can be reduced by water changes and plant absorption.</p><p>- <strong>Temperature</strong>: Koi are sensitive to extreme temperature changes. Install a pond thermometer to monitor temperature, and consider a pond heater in cold climates.</p><p>Balanced water chemistry supports a stress-free environment, reducing the risk of diseases and improving koi vitality.</p><p>&nbsp;</p><h3><strong>3. Adding Natural Elements and Pond Plants</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1200/797;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F373236e8-0df7-44bf-9990-ce22fa1ff829%2Fblog2_image3.png?alt=media&token=7f421821-f614-4203-8ef3-4cd208c4f55d" width="1200" height="797"></figure><p>&nbsp;</p><p>Introducing natural elements, like plants and rocks, adds beauty and functionality to the pond:</p><p>- <strong>Plants</strong>: Aquatic plants like water lilies, cattails, and submerged oxygenators help shade the pond, reduce algae, and provide hiding spots for koi.</p><p>- <strong>Rocks and Gravel</strong>: Adding rocks at the bottom of the pond mimics a natural habitat and encourages beneficial bacteria growth, which aids in breaking down organic matter.</p><p>- <strong>Shelters</strong>: Provide shaded areas or caves within the pond for koi to retreat during hot weather or when they feel threatened.</p><p>Natural features not only enhance the aesthetic of your pond but also contribute to a balanced ecosystem that benefits your koi.</p><p>&nbsp;</p><h3><strong>Conclusion</strong></h3><p>&nbsp;</p><p>A healthy pond environment is the foundation for vibrant, thriving koi. By focusing on pond size, water quality, and adding natural elements, you can create a sanctuary that supports the health and happiness of your koi. With regular monitoring and maintenance, your koi pond will flourish, bringing years of enjoyment and tranquility to your space.</p>', 
'Creating a Healthy Pond Environment for Koi'),  -- VIP user

('156e10b8-ca91-4925-938f-1d872a357ebe', GETDATE(), 'blog/blogThumbnails/156e10b8-ca91-4925-938f-1d872a357ebe/blog3_thumbnail.png', 
'<p>Koi are treasured for their beauty, and the right diet is key to maintaining vibrant colors, growth, and health. Selecting quality koi food tailored to their needs ensures they thrive. Here�s a guide to choosing the best food for your koi.</p><p>&nbsp;</p><h3><strong>1. Understanding Koi Dietary Needs</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:474/400;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog3_image1.png?alt=media&token=7e878a5b-35d9-44d0-8819-cfafd1df51d7" width="474" height="400"></figure><p>&nbsp;</p><p>Koi have specific nutritional needs based on their growth stage, season, and water temperature. These factors affect their metabolism and nutrient absorption:</p><p>- <strong>High Protein for Growth</strong>: Young koi benefit from a diet rich in protein (about 35-40%) to support rapid growth. Look for growth formula foods that contain fish meal, a natural protein source.</p><p>- <strong>Balanced Diet for Adults</strong>: For adult koi, choose a balanced diet with moderate protein (around 30%) and essential fats. This helps maintain their shape without excessive growth.</p><p>- <strong>Digestible Ingredients</strong>: Wheat germ and spirulina are common ingredients that aid in digestion, especially in cooler weather when koi�s metabolism slows.</p><p>A well-balanced diet provides essential nutrients, helping koi maintain their vibrant colors and robust health year-round.</p><p>&nbsp;</p><h3><strong>2. Seasonal Feeding Considerations</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1024/1024;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog3_image2.png?alt=media&token=d8bcb456-63c9-43fc-9dc4-c5f9e0ac0c91" width="1024" height="1024"></figure><p>&nbsp;</p><p>Koi diets should be adjusted with changing seasons:</p><p>- <strong>Spring and Summer</strong>: Warmer water increases koi�s metabolic rate, so high-protein, high-energy foods are ideal. Feed them frequently, as they�re more active and require more nutrition for growth and repair.</p><p>- <strong>Autumn and Winter</strong>: As water temperature drops, koi�s metabolism slows. Switch to a wheat germ-based food, which is easier to digest, and reduce feeding frequency. In very cold climates, stop feeding when water temperature goes below 50�F (10�C).</p><p>Adjusting their diet seasonally prevents digestive issues and ensures koi remain healthy through each season.</p><p>&nbsp;</p><h3><strong>3. Choosing Food Types and Forms</strong></h3><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:1024/1024;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2F156e10b8-ca91-4925-938f-1d872a357ebe%2Fblog3_image3.png?alt=media&token=c134beec-f26f-44b5-8df9-f81ed50ceafd" width="1024" height="1024"></figure><p>&nbsp;</p><p>Selecting the right food type and form helps with feeding efficiency:</p><p>- <strong>Pellets vs. Flakes</strong>: Pellets are the most popular form of koi food as they float on the water, allowing koi to feed at the surface. Flakes are an alternative for smaller koi but can cloud the water if not eaten quickly.</p><p>- <strong>Floating vs. Sinking</strong>: Floating pellets allow you to observe your koi as they eat, which helps monitor their health. Sinking pellets are preferred in colder weather or for shy koi that avoid surface feeding.</p><p>- <strong>Specialty Foods</strong>: Some foods are formulated for specific benefits, such as color-enhancing food with added carotenoids or immune-boosting food with vitamins and probiotics.</p><p>Choose the form and type based on your pond setup and feeding habits to make feeding easier and more efficient.</p><p>&nbsp;</p><h3><strong>Conclusion</strong></h3><p>Feeding your koi a diet that caters to their life stage, seasonal needs, and eating habits promotes their health and longevity. Investing in quality food pays off in vibrant colors, strong growth, and active koi. With a tailored feeding approach, your koi will continue to be a stunning, healthy addition to your pond.</p>', 
'Choosing the Best Koi Food for Optimal Health'),  -- Member user

('b02dfef5-997d-49cd-89f5-1c44499ecdef', GETDATE(), 'blog/blogThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/blog4_thumbnail.png', 
'<p>Choosing koi carp can be a daunting exercise, given the sheer volume in the variation of breeds available to pick from.</p><p>Koi can offer so much to your garden, their elegance and beauty bring a serenity to any koi pond, and they�ll also help encourage the growth of pond plants as well as attracting birds, butterflies and other wildlife.</p><p>Before we delve into the different types of koi, let�s cover some of the basics in picking a healthy fish.</p><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:768/512;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2Fb02dfef5-997d-49cd-89f5-1c44499ecdef%2Fblog4_image1.png?alt=media&token=002c0ba6-9eb7-4cfc-b493-9ab6d417e122" width="768" height="512"></figure><p>&nbsp;</p><p><strong>Body Shape</strong> � A healthy koi should be almost missile-shaped; neither fat nor thin, with a rounded, slimline shape, rounded nose and a smooth, uniform body.&nbsp;</p><p><strong>Colouration �</strong> Regardless of their natural colouration and pattern, koi carp should exhibit a strong, even colour. Though there are intricacies in each breed, this is a good general rule to follow.</p><p><br><strong>Quality of Skin � The skin of a koi in good health should be bright and glossy in appearance, while the scales should be barely visible.</strong></p><p><br><strong>General Health � </strong>It�s important to watch your potential choice of koi swimming naturally before you purchase. It should be swimming upright with a natural, graceful movement, while the dorsal fin should be erect and the pectoral fins spread wide.</p><p>With that covered, the next stage of picking your brand new koi carp will be down to personal preference, it�s now time to consider the markings and colouration of the fish.</p><h2>Markings and Colouration:</h2><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:768/512;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2Fb02dfef5-997d-49cd-89f5-1c44499ecdef%2Fblog4_image2.png?alt=media&token=52f5a923-99fb-4b98-93c5-201a1cea05ea" width="768" height="512"></figure><p>&nbsp;</p><p><strong>Black (Sumi) �</strong> Dark black markings on the koi, these can often be prone to fading in old age and can often make your fish harder to view while in the water. These are both things to consider when choosing your fish.</p><p><strong>White base (Shiroji) � A white base colour will make your fish easier to spot while in the pond, however it may not develop as well as some other colours.</strong></p><p><strong>Red (Beni or Hi) � </strong>The beni provides striking markings on a koi, one way of picking out a fish that will mature with a deep shade of longer lasting red colouration is to look out for a diamond of dark red situated in the middle of the scales.</p><p>Now that you know the basics of colouration, it�s time to familiarise yourself with the different breeds of koi. While there are hundreds of breeds available in different variants, we�ve broken koi fish down into thirteen different categories.</p><h2>Breeds of Koi:</h2><h2>&nbsp;</h2><figure class="image"><img style="aspect-ratio:768/448;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/blog%2FblogImages%2Fb02dfef5-997d-49cd-89f5-1c44499ecdef%2Fblog4_image3.png?alt=media&token=43475dcc-28ba-4a89-8785-558f36eb1004" width="768" height="448"></figure><h2>&nbsp;</h2><ul><li><strong>Asagi � </strong>One of the plainer variations of koi, they are void of bright colouration and missing the metallic finish apparent in many other breeds. They are mainly a greyish-blue hue with red colouration along the sides of the body, cheeks and pectoral fins.</li><li><strong>Bekko � </strong>Matt in appearance, they possess a striking set of sumi markings along the a body of white, red or yellow.</li><li><strong>Goshiki � </strong>Holding the literal meaning �Five Colours�, the Goshiki comprises of a white, red, black, blue and dark blue colouring.</li><li><strong>Hikari Muji �</strong> �Hikari� translates directly as �shiny�, while �muji� means �single colour�, making this a single coloured variant of koi carp with a glossy sheen to the scales.</li><li><strong>Hikari-Moyomono � </strong>Fully metallic in colour with patterns of two or more colour variations.</li><li><strong>Hikari-Utsurimono �</strong> A metallic variant of the Showa and Utsurimono breeds.</li><li><strong>Kinginrin � </strong>A breed of koi that features shiny scales along the sides of the body or length of the back.</li><li><strong>Kohaku �</strong> Kohaku is the most well known breed of koi, and also the oldest. They comprise of a white base colour with patterns of red contrasting on top of the white colouration.</li><li><strong>Kawarimono � </strong>A completely non-metallic koi that do no not fit into any other categories of breed.</li><li><strong>Tancho � </strong>Deriving from the Tancho Crane (the national bird of Japan), the Tancho has a red spot on its head which resembles the Japanese flag � this makes them a very popular breed of koi.</li><li><strong>Sanke �</strong> Predominantly white and red in colour, overlaid with black patterning. Sanke are essentially a sub-breed of the Kohaku with added sumi markings, making them a popular alternative.</li><li><strong>Showa � </strong>Black bodied koi fish with large red and white markings.</li><li><strong>Utsurimono � </strong>Commonly shortened to �Utsuri�, the full name is a literal translation of �reflective ones�. There are three variations of the black bodied Utsuri, with either red, white or yellow markings.</li></ul><p>You�re now covered to go out and pick out the right koi for you! Don�t forget that caring for your koi fish is incredibly important in ensuring their well being and longevity. We recommend using a&nbsp;<a href="https://www.pond-planet.co.uk/pond-c1/food-treatments-c50/pond-test-kits-c26"><strong>pond testing kit</strong></a>&nbsp;and&nbsp;<a href="https://www.pond-planet.co.uk/pond-c1/food-treatments-c50/pond-treatments-c23"><strong>pond treatment</strong></a>&nbsp;to ready the environment for your koi, while you�ll also want to stock up on plenty of&nbsp;<a href="https://www.pond-planet.co.uk/pond-c1/food-treatments-c50/fish-food-accessories-c32"><strong>specialist koi fish food</strong></a>&nbsp;too.</p>', 
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
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news1_thumbnail.png', 'Koi Fish Resurgence Brings Color and Calm to Urban Spaces', GETDATE(), '<p><strong>Koi Fish Resurgence Brings Color and Calm to Urban Spaces</strong></p><figure class="image"><img style="aspect-ratio:924/614;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews1_image1.png?alt=media&token=a532beb3-df63-421e-a10e-f81e00c1a084" width="924" height="614"></figure><p>In recent years, koi fish have seen a resurgence in urban settings, with parks, gardens, and even office spaces incorporating these colorful fish into tranquil pond installations. Known for their calming influence and aesthetic appeal, koi ponds are becoming popular for their ability to create peaceful environments within bustling cities.</p><figure class="image"><img style="aspect-ratio:626/351;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews1_image2.png?alt=media&token=263a4ff4-0958-436b-be4e-eee2dde7d24d" width="626" height="351"></figure><p>The diversity of koi, from the classic red and white varieties to rarer patterns of black, blue, and yellow, makes each pond unique. Experts say the koi�s serene movements and vivid colors contribute to relaxation and mental well-being, drawing visitors to these ponds for peaceful observation. Many koi enthusiasts even breed their own koi, selecting for colors and patterns to create their perfect pond.</p><figure class="image"><img style="aspect-ratio:1280/720;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews1_image3.png?alt=media&token=48b85bcc-b420-4e3b-88a0-28417836196f" width="1280" height="720"></figure><p>Whether in parks, courtyards, or as part of a water feature in modern architecture, koi ponds are becoming a staple for those seeking a moment of calm amid urban life. As city life becomes more hectic, koi ponds offer a tranquil escape, allowing people to slow down and connect with nature in a simple yet meaningful way.</p>'),
('979a42a8-ecc7-4d15-ab6f-410755b9e593', 'news/newsThumbnails/news2_thumbnail.png', 'Koi Fish Popularity Soars as Urban Escapes Evolve', GETDATE(), '<p><strong>Koi Fish Popularity Soars as Urban Escapes Evolve</strong></p><figure class="image"><img style="aspect-ratio:474/481;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews2_image1.png?alt=media&token=7c654b0b-fa3f-4faa-a1e0-255fca96b275" width="474" height="481"></figure><p>Koi fish have surged in popularity as urban planners and homeowners alike incorporate koi ponds into city landscapes and private gardens. This renewed interest is due not only to the kois vibrant appearance but also to the sense of calm they bring. Koi ponds are now featured in corporate courtyards, urban parks, and wellness centers as people seek natural escapes within the city.</p><figure class="image"><img style="aspect-ratio:799/533;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews2_image2.png?alt=media&token=69b81a42-aea7-484f-aad8-8cabc8517cb1" width="799" height="533"></figure><p>Enthusiasts admire koi for their elegance and unique color patterns, and some even raise koi from young fish to adults, customizing the pond experience to reflect their personal taste. Koi are bred in a variety of colors�red, orange, white, and black�each representing something meaningful, such as luck or prosperity. Their presence in an outdoor setting adds a sense of sophistication and mindfulness to daily life.</p><figure class="image"><img style="aspect-ratio:3264/2448;" src="https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/news%2FnewsImages%2Fnews2_image3.png?alt=media&token=027a0200-fb8d-4e98-a927-bcde01269567" width="900" height="700"></figure><p>In addition to aesthetic value, koi ponds are praised for their environmental benefits. Ponds often include natural water filtration systems and plants that promote healthy ecosystems. This eco-friendly approach has inspired a broader trend toward creating urban green spaces where both people and local wildlife can thrive, making koi ponds a beautiful and sustainable way to connect with nature in the city.</p>');


INSERT INTO News_Image (ImageUrl, NewsID)
VALUES
('news/newsImages/news1_image1.png', 1),
('news/newsImages/news1_image2.png', 1),
('news/newsImages/news1_image3.png', 1),
('news/newsImages/news2_image1.png', 2),
('news/newsImages/news2_image2.png', 2),
('news/newsImages/news2_image3.png', 2);


SET IDENTITY_INSERT [dbo].[Cart] ON 

INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (1, N'373236e8-0df7-44bf-9990-ce22fa1ff829', 1200000)
INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (2, N'156e10b8-ca91-4925-938f-1d872a357ebe', 7500000)
INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (3, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', 0)
INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (4, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', 0)
INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (5, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', 720000)
INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (6, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', 0)
INSERT [dbo].[Cart] ([CartId], [UserId], [TotalAmount]) VALUES (7, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', 0)
SET IDENTITY_INSERT [dbo].[Cart] OFF

INSERT [dbo].[CartItem] ([CartId], [ProductId], [ProductName], [Quantity], [Price], [TotalPrice], [Thumbnail]) VALUES (1, 1, N'Premium Koi Food', 2, 600000, 1200000, N'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/premium_koi_food.png')
INSERT [dbo].[CartItem] ([CartId], [ProductId], [ProductName], [Quantity], [Price], [TotalPrice], [Thumbnail]) VALUES (1, 2, N'Growth Formula', 1, 750000, 750000, N'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/growth_formula.png')
INSERT [dbo].[CartItem] ([CartId], [ProductId], [ProductName], [Quantity], [Price], [TotalPrice], [Thumbnail]) VALUES (2, 10, N'Pond Pump', 1, 5000000, 5000000, N'product/productThumbnails/a5827eaf-5c36-414d-8e9c-d1de148d6911/pond_pump.png')
INSERT [dbo].[CartItem] ([CartId], [ProductId], [ProductName], [Quantity], [Price], [TotalPrice], [Thumbnail]) VALUES (2, 11, N'Pond Skimmer', 1, 2500000, 2500000, N'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/pond_skimmer.png')
INSERT [dbo].[CartItem] ([CartId], [ProductId], [ProductName], [Quantity], [Price], [TotalPrice], [Thumbnail]) VALUES (5, 7, N'High Protein Food', 1, 720000, 720000, N'product/productThumbnails/b02dfef5-997d-49cd-89f5-1c44499ecdef/high_protein_food.png')


INSERT INTO VipPackage (Name, Description, Options, Price)
VALUES
('VIP Package - 1 Month', 'Enjoy exclusive access to calculation tools, personalized reminders, enhanced charts, and priority customer support for one month.', 1, 100000),  -- 1 Month
('VIP Package - 6 Months', 'Gain six months of premium access to calculation tools, customized reminders, detailed charts, and priority customer support.', 6, 500000),  -- 6 Months
('VIP Package - 12 Months', 'Unlock a full year of VIP benefits, including calculation tools, tailored reminders, comprehensive charts, and priority customer support.', 12, 1000000);  -- 12 Months


SET IDENTITY_INSERT [dbo].[VipRecord] ON 

INSERT [dbo].[VipRecord] ([VipRecordId], [VipId], [UserId], [StartDate], [EndDate]) VALUES (1, 2, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', CAST(N'2024-11-09T09:47:07.270' AS DateTime), CAST(N'2025-05-09T09:47:07.270' AS DateTime))
INSERT [dbo].[VipRecord] ([VipRecordId], [VipId], [UserId], [StartDate], [EndDate]) VALUES (2, 3, N'373236e8-0df7-44bf-9990-ce22fa1ff829', CAST(N'2024-06-01T00:00:00.000' AS DateTime), CAST(N'2025-06-01T00:00:00.000' AS DateTime))
INSERT [dbo].[VipRecord] ([VipRecordId], [VipId], [UserId], [StartDate], [EndDate]) VALUES (3, 2, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', CAST(N'2024-11-09T11:05:56.283' AS DateTime), CAST(N'2025-05-09T11:05:56.283' AS DateTime))
INSERT [dbo].[VipRecord] ([VipRecordId], [VipId], [UserId], [StartDate], [EndDate]) VALUES (4, 1, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', CAST(N'2024-11-09T20:53:01.113' AS DateTime), CAST(N'2024-12-09T20:53:01.113' AS DateTime))
INSERT [dbo].[VipRecord] ([VipRecordId], [VipId], [UserId], [StartDate], [EndDate]) VALUES (5, 3, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', CAST(N'2024-11-09T22:11:42.787' AS DateTime), CAST(N'2025-11-09T22:11:42.787' AS DateTime))
INSERT [dbo].[VipRecord] ([VipRecordId], [VipId], [UserId], [StartDate], [EndDate]) VALUES (6, 2, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', CAST(N'2024-11-09T22:25:24.247' AS DateTime), CAST(N'2025-05-09T22:25:24.247' AS DateTime))
SET IDENTITY_INSERT [dbo].[VipRecord] OFF

SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (1, N'156e10b8-ca91-4925-938f-1d872a357ebe', N'John Cena', N'0974628465', CAST(N'2023-01-09T09:47:07.270' AS DateTime), N'john@gmail.com', N'123 Main St', N'Central', N'New York', N'USA', 3500000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (2, N'373236e8-0df7-44bf-9990-ce22fa1ff829', N'Leo Hong', N'0912756395', CAST(N'2023-02-14T09:47:07.270' AS DateTime), N'leo@gmail.com', N'456 Elm St', N'North', N'Los Angeles', N'USA', 1750000, N'Failed', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (3, N'373236e8-0df7-44bf-9990-ce22fa1ff829', N'Leo Hong', N'0912756395', CAST(N'2023-06-22T09:47:07.270' AS DateTime), N'leo@gmail.com', N'456 Elm St', N'North', N'Los Angeles', N'USA', 4700000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (4, N'156e10b8-ca91-4925-938f-1d872a357ebe', N'John Cena', N'0974628465', CAST(N'2023-06-20T09:47:07.270' AS DateTime), N'john@gmail.com', N'123 Main St', N'Central', N'New York', N'USA', 2350000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (5, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'Eric Lee', N'0957937561', CAST(N'2024-08-23T09:47:07.270' AS DateTime), N'eric@gmail.com', N'321 Pine St', N'East', N'Houston', N'USA', 500000, N'Successful', 1, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (7, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'Minh Quan Luu', N'0785663033', CAST(N'2023-10-09T10:58:14.447' AS DateTime), N'minhquan1412@gmail.com', N'Nguyen Anh Thu', N'12', N'TP Ho Chi Minh', N'Viet Nam', 600000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (8, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'Minh Quan Luu', N'0785663033', CAST(N'2024-02-09T11:03:19.833' AS DateTime), N'minhquan1412@gmail.com', N'Nguyen Van Tang ', N'Thu Duc', N'TP Ho Chi Minh', N'Viet Nam', 500000, N'Successful', 1, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (9, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'Minh Quan Luu', N'0785663033', CAST(N'2024-05-01T20:43:55.613' AS DateTime), N'minhquan1412@gmail.com', N'Nguyen Anh Thu', N'12', N'TP Ho Chi Minh', N'Viet Nam', 700000, N'Failed', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (10, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'Minh Quan Luu', N'0785663033', CAST(N'2024-10-30T20:47:49.343' AS DateTime), N'minhquan1412@gmail.com', N'Nguyen Anh Thu', N'12', N'TP Ho Chi Minh', N'Viet Nam', 7000000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (11, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2023-05-28T20:51:37.250' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 100000, N'Successful', 1, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (12, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2023-07-18T21:32:43.350' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 2970000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (13, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2023-12-20T21:37:29.070' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 2000000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (14, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2024-03-08T21:45:45.003' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 4300000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (15, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2024-08-14T21:58:25.630' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 1640000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (16, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2024-09-09T21:59:13.320' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 1600000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (17, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'Thang Nguyen Duc', N'0321654987', CAST(N'2024-11-02T22:01:17.717' AS DateTime), N'ThangNguyenDuc2012@gmail.com', N'Ly Thai To', N'10', N'TP Ho Chi Minh', N'Viet Nam', 720000, N'Failed', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (18, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'Phat Le', N'0345678912', CAST(N'2024-07-21T22:08:03.600' AS DateTime), N'PhatLV1234@gmail.com', N'Tan Son Nhat', N'Go Vap', N'TP Ho Chi Minh', N'Viet Nam', 7050000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (19, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'Le Phat', N'0345678912', CAST(N'2024-07-26T22:10:16.783' AS DateTime), N'PhatLV1234@gmail.com', N'Tan Son Nhat', N'Go Vap', N'TP Ho Chi Minh', N'Viet Nam', 1000000, N'Successful', 1, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (20, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'Phat Le', N'0345678912', CAST(N'2024-09-22T22:14:23.483' AS DateTime), N'PhatLV1234@gmail.com', N'Tan Son Nhat', N'Go Vap', N'TP Ho Chi Minh', N'Viet Nam', 2850000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (21, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'Phat Le', N'0345678912', CAST(N'2024-10-11T22:15:55.593' AS DateTime), N'PhatLV1234@gmail.com', N'Tan Son Nhat', N'Go Vap', N'TP Ho Chi Minh', N'Viet Nam', 5460000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (22, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'Eric Lee', N'0957937561', CAST(N'2023-04-09T22:19:10.060' AS DateTime), N'eric@gmail.com', N'321 Pine St', N'East', N'Houston', N'USA', 9100000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (23, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'Eric Lee', N'0957937561', CAST(N'2023-08-29T22:20:41.600' AS DateTime), N'eric@gmail.com', N'321 Pine St', N'East', N'Houston', N'USA', 6150000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (24, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'Eric Lee', N'0957937561', CAST(N'2023-11-14T22:21:25.897' AS DateTime), N'eric@gmail.com', N'321 Pine St', N'East', N'Houston', N'USA', 1040000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (25, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'Ngoc Nguyen Mai', N'0326965123', CAST(N'2024-11-09T22:25:08.433' AS DateTime), N'Ngocmai1223@gmail.com', N'123 Street A', N'Thu Duc', N'TP Ho Chi Minh', N'Vietnam', 500000, N'Successful', 1, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (26, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'Mai Ngoc Nguyen', N'0326965123', CAST(N'2024-01-22T22:26:51.967' AS DateTime), N'Ngocmai1223@gmail.com', N'123 Street A', N'Thu Duc', N'TP Ho Chi Minh', N'Vietnam', 600000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (27, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'Mai Ngoc Nguyen', N'0326965123', CAST(N'2024-04-09T22:27:43.720' AS DateTime), N'Ngocmai1223@gmail.com', N'123 Street A', N'Thu Duc', N'TP Ho Chi Minh', N'Vietnam', 750000, N'Successful', 0, 0)
INSERT [dbo].[Orders] ([OrderId], [UserId], [FullName], [Phone], [CreateDate], [Email], [Street], [District], [City], [Country], [TotalPrice], [OrderStatus], [isVipUpgrade], [isBuyNow]) VALUES (28, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'Mai Ngoc Nguyen', N'0326965123', CAST(N'2024-06-09T22:28:55.140' AS DateTime), N'Ngocmai1223@gmail.com', N'123 Street A', N'Thu Duc', N'TP Ho Chi Minh', N'Vietnam', 1850000, N'Successful', 0, 0)
SET IDENTITY_INSERT [dbo].[Orders] OFF

-- N-N Table
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (1, 1, 2, 600000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (1, 2, 1, 700000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (2, 3, 1, 550000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (3, 10, 1, 5000000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (3, 11, 2, 2400000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (4, 18, 1, 1800000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (7, 1, 1, 600000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (9, 24, 1, 700000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (10, 14, 1, 7000000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (12, 6, 2, 650000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (12, 7, 1, 720000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (12, 21, 1, 950000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (13, 18, 1, 2000000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (14, 9, 3, 600000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (14, 11, 1, 2500000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (15, 8, 2, 520000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (15, 23, 2, 300000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (16, 21, 1, 950000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (16, 22, 1, 650000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (17, 7, 1, 720000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (18, 9, 2, 600000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (18, 10, 1, 5000000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (18, 20, 1, 850000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (20, 1, 1, 600000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (20, 4, 2, 800000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (20, 6, 1, 650000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (21, 7, 3, 720000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (21, 15, 1, 2100000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (21, 27, 1, 1200000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (22, 14, 1, 7000000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (22, 24, 3, 700000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (23, 2, 2, 750000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (23, 12, 1, 4000000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (23, 22, 1, 650000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (24, 8, 2, 520000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (26, 1, 1, 600000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (27, 16, 1, 750000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (28, 3, 1, 550000,'Pending')
INSERT [dbo].[OrderDetail] ([OrderId], [ProductId], [Quantity], [UnitPrice],[OrderDetailStatus]) VALUES (28, 6, 2, 650000,'Pending')


INSERT [dbo].[OrderVipDetail] ([OrderId], [VipId]) VALUES (11, 1)
INSERT [dbo].[OrderVipDetail] ([OrderId], [VipId]) VALUES (5, 2)
INSERT [dbo].[OrderVipDetail] ([OrderId], [VipId]) VALUES (8, 2)
INSERT [dbo].[OrderVipDetail] ([OrderId], [VipId]) VALUES (25, 2)
INSERT [dbo].[OrderVipDetail] ([OrderId], [VipId]) VALUES (19, 3)


-- Inserting Revenue based on Commission Fees (8% of Total Prices for each product)
SET IDENTITY_INSERT [dbo].[Revenue] ON 

INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (1, 1, 152000, 0,0,CAST(N'2023-01-09 09:47:07.270' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (2, 3, 784000, 0,1, CAST(N'2023-09-22 09:47:07.270' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (3, 4, 144000, 0,0, CAST(N'2023-06-20 09:47:07.270' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (4, 7, 48000, 0,0, CAST(N'2023-10-09 10:58:14.447' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (5, 8, 500000, 1,1, CAST(N'2024-02-09 11:03:19.833' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (6, 10, 560000, 0, 1,CAST(N'2024-10-30 20:47:49.343' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (7, 11, 100000, 1, 0,CAST(N'2023-05-28 20:51:37.250' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (8, 12, 237600, 0, 1,CAST(N'2023-07-18 21:32:43.350' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (9, 13, 160000, 0, 0,CAST(N'2023-12-20 21:37:29.070' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (10, 14, 344000, 0, 1,CAST(N'2024-03-08 21:45:45.003' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (11, 15, 131200, 0, 0,CAST(N'2024-08-14 21:58:25.630' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (12, 16, 128000, 0, 0,CAST(N'2024-09-09 21:59:13.320' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (13, 18, 564000, 0, 1,CAST(N'2024-07-21 22:08:03.600' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (14, 19, 1000000, 1, 1,CAST(N'2024-07-26 22:10:16.783' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (15, 20, 228000, 0, 1,CAST(N'2024-09-22 22:14:23.483' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (16, 21, 436800, 0, 1,CAST(N'2024-10-11 22:15:55.593' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (17, 22, 728000, 0, 1,CAST(N'2023-04-09 22:19:10.060' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (18, 23, 492000, 0, 1,CAST(N'2023-08-29 22:20:41.600' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (19, 24, 83200, 0, 1,CAST(N'2023-11-14 22:21:25.897' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (20, 25, 500000, 1, 0,CAST(N'2024-11-09 22:25:08.433' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (21, 26, 48000, 0, 0,CAST(N'2024-01-22 22:26:51.967' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (22, 27, 60000, 0, 0,CAST(N'2024-04-09 22:27:43.720' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (23, 28, 148000, 0, 0,CAST(N'2024-06-09 22:28:55.140' AS DateTime))
INSERT [dbo].[Revenue] ([RevenueId], [OrderId], [Income], [isVip], [isShopRevenue],[CreateAt]) VALUES (24, 5, 500000, 1, 0,CAST(N'2024-08-23 09:47:07.270' AS DateTime))
SET IDENTITY_INSERT [dbo].[Revenue] OFF

SET IDENTITY_INSERT [dbo].[PaymentTransaction] ON 

INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (1, N'156e10b8-ca91-4925-938f-1d872a357ebe', N'TxnRef001', N'3500000', N'ABC', N'BankTranNo001', N'Visa', 1, N'Nov  9 2024  9', N'00', N'TxnNo001', N'00', N'SecureHash001', N'TmnCode001', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (2, N'373236e8-0df7-44bf-9990-ce22fa1ff829', N'TxnRef002', N'1750000', N'NBC', N'BankTranNo002', N'MasterCard', 2, N'Nov  9 2024  9', N'00', N'TxnNo002', N'00', N'SecureHash002', N'TmnCode002', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (3, N'373236e8-0df7-44bf-9990-ce22fa1ff829', N'TxnRef003', N'4700000', N'TPB', N'BankTranNo003', N'Visa', 3, N'Nov  9 2024  9', N'00', N'TxnNo003', N'00', N'SecureHash003', N'TmnCode003', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (4, N'156e10b8-ca91-4925-938f-1d872a357ebe', N'TxnRef004', N'2350000', N'MBB', N'BankTranNo004', N'Bank', 4, N'Nov  9 2024  9', N'00', N'TxnNo004', N'00', N'SecureHash004', N'TmnCode004', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (5, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'638667467029048732', N'60000000', N'NCB', N'VNP14660461', N'ATM', 7, N'20241109110040', N'00', N'14660461', N'00', N'edd5bb0e543d518eb664ce287611e240edc1ef6c6c030e9a3209302cdec770ddfb822bd114856a9ab7ae261c8ea1e1f6a92d58047e2dfaf8d728c4ac5ece999f', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (6, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'638667469999779758', N'50000000', N'NCB', N'VNP14660477', N'ATM', 8, N'20241109110548', N'00', N'14660477', N'00', N'5fcde574e0a61ec982cf2ee965059bd6c2738b88c90c0b2f9c8d0582632027dda9659866c90feb1172adba816d3289551175123ee33cb9ed547ebf52f3ffbbee', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (7, N'02ef888c-9467-48bf-b56f-c0aa9033c5a3', N'638667821357867791', N'700000000', N'NCB', N'VNP14661476', N'ATM', 10, N'20241109204935', N'00', N'14661476', N'00', N'a613704ca0b23ba104dd61aa27299507516d0d4d0781b2fe5fc82e1e037f5a28ac65084f6344d13716aabcba83653135cee58413f6022d23e7e9e8a786f44d76', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (8, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'638667822974183353', N'10000000', N'NCB', N'VNP14661480', N'ATM', 11, N'20241109205250', N'00', N'14661480', N'00', N'680f7f2dca91e4d469471d8725cae7637220fa221ac2d8aee491908c54f084c67b4178950cedc95781eff0fb1f92d72b9dba4436bda4f7d617b1d4057c90cb2e', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (9, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'638667847866723959', N'297000000', N'NCB', N'VNP14661573', N'ATM', 12, N'20241109213358', N'00', N'14661573', N'00', N'8c53bb9fed2c18b0ec9fc8ba878b030fbba5850ef102b4bf20611e14cc9a6a545290185547e3dfeb9d3ea610de6c0558490118a8320beca029ef5ff67b88b68f', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (10, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'638667850527573050', N'200000000', N'NCB', N'VNP14661586', N'ATM', 13, N'20241109213752', N'00', N'14661586', N'00', N'fe12e29d21d6371c6916043bae058605af881a485951643facb5acc147e7324c946bd726e14f8f35b7150e5fd14bdf104c81abd4cf7824f2d175ba84883857ff', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (11, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'638667855481811685', N'430000000', N'NCB', N'VNP14661608', N'ATM', 14, N'20241109214729', N'00', N'14661608', N'00', N'ff867b28e54918fb3c824304fb939ee2d63e3087d0a7896fb0452f2d4d5e62dc1b4c043d461acc2fe8152e57e66a403f0e30ce1e31309075835dc0215b886c1d', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (12, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'638667863079760822', N'164000000', N'NCB', N'VNP14661623', N'ATM', 15, N'20241109215844', N'00', N'14661623', N'00', N'6df40f476528d98fb930cc72767d34b1f19eac2631506f8f2d83a07b31298ba8ce3a9c85f7790845eb6535d96a0bb04660cfbb89ef5c2e819bb159e21220a578', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (13, N'cf9cfeb9-efe8-47c7-8875-d9779fad2176', N'638667863554497272', N'160000000', N'NCB', N'VNP14661624', N'ATM', 16, N'20241109215927', N'00', N'14661624', N'00', N'849f7fa665c1e284a7724a80bc340f85edd93decc8652bd9a871686ec2709b990ce56c0f38e6b2ab720f2ee37a11c9e2f776f521f19f0104afdbf7e12bfa2d17', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (14, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'638667869503912293', N'705000000', N'NCB', N'VNP14661633', N'ATM', 18, N'20241109220923', N'00', N'14661633', N'00', N'68c1731e55fead2f02f162f91e04c4513d94b596463227d39081d8ccd51c90794d62b370999ef8776032bc083357071e23ecade0a1aac6285a1d62245d0bed63', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (15, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'638667870169224744', N'100000000', N'NCB', N'VNP14661636', N'ATM', 19, N'20241109221135', N'00', N'14661636', N'00', N'aa5a440162da54ee416530a5f74b0962cdaa46167cbefdd58ff34115a5d5477b36889bbf229b82dddf444b50100f21b888d579f2c2b3de5d51b38899620a11b9', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (16, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'638667872816923290', N'285000000', N'NCB', N'VNP14661642', N'ATM', 20, N'20241109221454', N'00', N'14661642', N'00', N'df2718b442a80d83af943884a84d62b2a4b32f01a0a6ac8a35462c226964453332f78e7c6fb37885ef03d202fba4063eece68932b9913e2c0ded3ef6be3c9d19', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (17, N'd0fe3890-f85b-45b4-93bc-1ee6c3505aad', N'638667873576626092', N'546000000', N'NCB', N'VNP14661644', N'ATM', 21, N'20241109221609', N'00', N'14661644', N'00', N'b97e50cf57f3a24036ee1b7152f27c8b7b48370bcc384cea06446203644b0c3b31f46156a97b570620c1f0043e2d51facf426468df3bde2880f652d5b637ba33', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (18, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'638667875601980508', N'910000000', N'NCB', N'VNP14661652', N'ATM', 22, N'20241109221933', N'00', N'14661652', N'00', N'33315481f8e2e855970aae5b4248dafe52ffbf49e35944f782b691eca300bf5cfc8f2b6625ed838a5896de85d73fd0cf841cb1fd35f194a8d36423379f2994a4', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (19, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'638667876454008324', N'615000000', N'NCB', N'VNP14661657', N'ATM', 23, N'20241109222057', N'00', N'14661657', N'00', N'd12005dd176a3375a0f0751855544d520b08719ad4d0553fb349719dbcee5854d0f6c7cf674e9e38985b0c2e7f7c71928146ebf9b84f85b5157b950e0e1e7734', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (20, N'1432d10e-64e9-4b0e-b7ff-05253aa0000d', N'638667876924339137', N'104000000', N'NCB', N'VNP14661660', N'ATM', 24, N'20241109222145', N'00', N'14661660', N'00', N'8a1d0f2263c9565e71ea09810ce98055633a89e1969b873f163b1b9a95d4075c5824fb3382336419bbe508ad8b2a892db5b2f4a2a292cfc1391f39c518b5628c', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (21, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'638667879084555853', N'50000000', N'NCB', N'VNP14661666', N'ATM', 25, N'20241109222520', N'00', N'14661666', N'00', N'fc8fd3a10ec9e91f5f75139bebd10abf3e474b4b914085a68084dc36a1604691a8a00787189905c37d9f688dd66d2f1ad8bf9720c21bafac1f62e116f9e4bb83', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (22, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'638667880148707487', N'60000000', N'NCB', N'VNP14661669', N'ATM', 26, N'20241109222706', N'00', N'14661669', N'00', N'd8947adfeabec909ab8fd74b0cd8df1e9554f1dad35a89acafd43b8e0a98b0f6568c70d5cbee80f15a82db5923154fc5bc6fe6eecfe224cad8ffa20b77bdf11e', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (23, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'638667880663596001', N'75000000', N'NCB', N'VNP14661671', N'ATM', 27, N'20241109222758', N'00', N'14661671', N'00', N'b0ed5504bd3a61c589e61f1c3287eb6533f99df656feab565bcf7b4668bac270b2fde536b4f8f1d29a570c4ae8ffbadab7985e516f21c2f9d14eea40f3071519', N'LTB2UNVG', 1)
INSERT [dbo].[PaymentTransaction] ([Id], [userId], [VnpTxnRef], [VnpAmount], [VnpBankCode], [VnpBankTranNo], [VnpCardType], [VnpOrderInfo], [VnpPayDate], [VnpResponseCode], [VnpTransactionNo], [VnpTransactionStatus], [VnpSecureHash], [VnpTmnCode], [PaymentStatus]) VALUES (24, N'd2944665-9d7a-43ea-b41e-fa363ebd5625', N'638667881374906973', N'185000000', N'NCB', N'VNP14661676', N'ATM', 28, N'20241109222909', N'00', N'14661676', N'00', N'80edd68adb4e1916d56d9dc4242b72ff90d660963f142d2d96bc3a2a7fa33c288b7757c4b09d5da4f86ba6c8deb7ff176130cc410aef888b6baedcb02b11673f', N'LTB2UNVG', 1)
SET IDENTITY_INSERT [dbo].[PaymentTransaction] OFF

--Koi Record Sample
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (1, 24, 214);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (2, 40, 1044);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (3, 51, 2232);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (4, 60, 3522);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (5, 65, 4666);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (6, 69, 5593);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (7, 72, 6364);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (8, 74, 6798);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (9, 76, 7364);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (10, 78, 7961);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (11, 80, 8589);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (12, 82, 9249);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (13, 84, 9443);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (14, 85, 9602);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (15, 87, 9864);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (16, 88, 10044);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (17, 89, 10184);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (18, 90, 10302);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (19, 91, 10410);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (20, 92, 10512);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (21, 93, 10600);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (22, 94, 10680);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (23, 95, 10750);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (24, 96, 10820);
INSERT INTO KoiRecordSample (Age, Length, Weight) VALUES (25, 97, 10880);

--Water Parameter Sample
INSERT INTO WaterParameterSample
(
    MaxNitrite, MinOxygen, MaxOxygen, MaxNitrate, MinKH, MaxKH, TotalChlorines, 
    MinGH, MaxGH, MinAmmonium, MaxAmmonium, MinSalt, MaxSalt, MaxPhosphate, 
    MinCarbonDioxide, MaxCarbonDioxide, MaxTemperature, MinTemperature, MinPH, MaxPH
)
VALUES
(
    0.25, 5.0, 18.0, 40.0, 5.04, 6.44, 0.003, 
    4.0, 10.0, 0.2, 2.0, 0.3, 0.7, 0.035, 
    5.0, 35.0, 29.0, 20.0, 4.0, 9.0
);