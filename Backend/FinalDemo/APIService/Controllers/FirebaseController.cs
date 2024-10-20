using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Firebase.Auth;
using Firebase.Storage;
using Domain.Models.Entity;
using SWP391.KCSAH.Repository.KCSAH.Repository;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FirebaseController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly KoiCareSystemAtHomeContext _context;
        private readonly ShopRepository _shopRepository;
        private readonly BlogRepository _blogRepository;
        private readonly ProductRepository _productRepository;

        private static string apiKey = "AIzaSyBGY901ggyY4ugb7tHNHGDgOKmzRUo_5oI";
        private static string Bucket = "koi-care-system-at-home-32e49.appspot.com";
        private static string AuthEmail = "minhquan141104@gmail.com";
        private static string AuthPassword = "Mquan141104@";
        public FirebaseController(IWebHostEnvironment env, KoiCareSystemAtHomeContext context, ShopRepository shopRepository, BlogRepository blogRepository, ProductRepository productRepository)
        {
            _env = env;
            _context = context;
            _shopRepository = shopRepository;
            _blogRepository = blogRepository;
            _productRepository = productRepository;
        }

        [HttpPost("upload/others")]
        public async Task<IActionResult> Others([FromForm]FileUploadViewModel file)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload != null && fileUpload.Length > 0)
            {
                string foldername = "firebaseFiles";
                string path = Path.Combine(_env.WebRootPath, $"images/{foldername}");

                // Tạo đường dẫn cho FileStream
                using (FileStream fs = new FileStream(Path.Combine(path, fileUpload.FileName), FileMode.Create))
                {
                    // Sao chép dữ liệu từ tệp tải lên vào FileStream
                    await fileUpload.CopyToAsync(fs);

                    // Đặt lại vị trí con trỏ của FileStream về đầu
                    fs.Seek(0, SeekOrigin.Begin);  // Thêm dòng này để reset con trỏ về đầu file

                    // Firebase uploading stuffs
                    var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                    var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                    var cancellation = new CancellationTokenSource();

                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("others")
                        .Child(fileUpload.FileName)
                        .PutAsync(fs, cancellation.Token);

                    try
                    {
                        var link = await task;
                        return Ok(new { link });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { error = $"Exception was thrown: {ex.Message}" });
                    }
                }

            }
            return BadRequest(new { error = "File is required." });
        }

        [HttpPost("upload/news/newsImages")]
        public async Task<IActionResult> NewsImage([FromForm] FileUploadViewModel file)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload != null && fileUpload.Length > 0)
            {
                string foldername = "firebaseFiles";
                string path = Path.Combine(_env.WebRootPath, $"images/{foldername}");

                // Tạo đường dẫn cho FileStream
                using (FileStream fs = new FileStream(Path.Combine(path, fileUpload.FileName), FileMode.Create))
                {
                    // Sao chép dữ liệu từ tệp tải lên vào FileStream
                    await fileUpload.CopyToAsync(fs);

                    // Đặt lại vị trí con trỏ của FileStream về đầu
                    fs.Seek(0, SeekOrigin.Begin);  // Thêm dòng này để reset con trỏ về đầu file

                    // Firebase uploading stuffs
                    var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                    var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                    var cancellation = new CancellationTokenSource();

                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("news")
                        .Child("newsImages")
                        .Child(fileUpload.FileName)
                        .PutAsync(fs, cancellation.Token);

                    try
                    {
                        var link = await task;
                        return Ok(new { link });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { error = $"Exception was thrown: {ex.Message}" });
                    }
                }

            }
            return BadRequest(new { error = "File is required." });
        }


        [HttpPost("upload/shop/shopThumbnail")]
        public async Task<IActionResult> ShopThumbnail([FromForm] FileUploadViewModel file, [FromQuery] string userId)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload != null && fileUpload.Length > 0)
            {
                // Tạo thư mục dựa trên userId
                string foldername = $"firebaseFiles/{userId}";
                string path = Path.Combine(_env.WebRootPath, $"images/{foldername}");

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                // Tạo tên file với ngày giờ hiện tại để đảm bảo tên không trùng lặp
                string fileNameWithDate = $"{Path.GetFileNameWithoutExtension(fileUpload.FileName)}_{DateTime.Now:yyyyMMdd_HHmmss}{Path.GetExtension(fileUpload.FileName)}";

                // Tạo đường dẫn cho FileStream
                using (FileStream fs = new FileStream(Path.Combine(path, fileNameWithDate), FileMode.Create))
                {
                    // Sao chép dữ liệu từ tệp tải lên vào FileStream
                    await fileUpload.CopyToAsync(fs);

                    // Đặt lại vị trí con trỏ của FileStream về đầu
                    fs.Seek(0, SeekOrigin.Begin);

                    // Firebase uploading stuffs
                    var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                    var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                    var cancellation = new CancellationTokenSource();

                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("shop")
                        .Child("shopThumbnails")
                        .Child(userId)  // Thư mục theo userId
                        .Child(fileNameWithDate)  // Sử dụng tên file kèm ngày giờ
                        .PutAsync(fs, cancellation.Token);

                    try
                    {
                        var link = await task;
                        var shop = await _shopRepository.GetShopByUID(userId);
                        
                        shop.Thumbnail = $"shop/shopThumbnails/{userId}/{fileNameWithDate}";

                        // Cập nhật shop trong cơ sở dữ liệu
                        _context.Shops.Update(shop);
                        await _context.SaveChangesAsync(); // Lưu thay đổi
                        return Ok(new { link });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { error = $"Exception was thrown: {ex.Message}" });
                    }
                }
            }
            return BadRequest(new { error = "File is required." });
        }
        [HttpPut("update/shop/shopThumbnail")]
        public async Task<IActionResult> UpdateShopThumbnail([FromForm] FileUploadViewModel file, [FromQuery] string userId)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload != null && fileUpload.Length > 0)
            {
                // Lấy shop từ cơ sở dữ liệu
                var shop = await _shopRepository.GetShopByUID(userId);
                if (shop == null)
                {
                    return NotFound(new { error = "Shop not found." });
                }

                // Xóa ảnh cũ nếu tồn tại
                if (!string.IsNullOrEmpty(shop.Thumbnail))
                {
                    try
                    {
                        // Thực hiện xác thực với Firebase Auth
                        var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                        var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                        // Xóa ảnh cũ trên Firebase Storage
                        var oldImagePath = shop.Thumbnail;
                        var oldImageReference = oldImagePath.Substring(oldImagePath.IndexOf("shop/")); // Lấy phần đường dẫn cần xóa

                        var oldImageDeletionTask = new FirebaseStorage(
                            Bucket,
                            new FirebaseStorageOptions
                            {
                                AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken), // Sử dụng token của người dùng đã xác thực
                                ThrowOnCancel = true
                            })
                            .Child(oldImageReference) // Đường dẫn đến ảnh cần xóa
                            .DeleteAsync();

                        await oldImageDeletionTask; // Chờ quá trình xóa hoàn thành
                    }
                    catch (FirebaseStorageException ex)
                    {
                        // Xử lý lỗi Firebase
                        return BadRequest(new { error = $"Firebase Storage error: {ex.Message}" });
                    }
                    catch (Exception ex)
                    {
                        // Xử lý lỗi chung
                        return BadRequest(new { error = $"Unexpected error: {ex.Message}" });
                    }
                }

                // Tạo thư mục dựa trên userId
                string foldername = $"firebaseFiles/{userId}";
                string path = Path.Combine(_env.WebRootPath, $"images/{foldername}");

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                // Tạo tên file với ngày giờ hiện tại để đảm bảo tên không trùng lặp
                string fileNameWithDate = $"{Path.GetFileNameWithoutExtension(fileUpload.FileName)}_{DateTime.Now:yyyyMMdd_HHmmss}{Path.GetExtension(fileUpload.FileName)}";

                // Tạo đường dẫn cho FileStream
                using (FileStream fs = new FileStream(Path.Combine(path, fileNameWithDate), FileMode.Create))
                {
                    // Sao chép dữ liệu từ tệp tải lên vào FileStream
                    await fileUpload.CopyToAsync(fs);

                    // Đặt lại vị trí con trỏ của FileStream về đầu
                    fs.Seek(0, SeekOrigin.Begin);

                    // Firebase uploading stuffs
                    var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                    var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                    var cancellation = new CancellationTokenSource();

                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("shop")
                        .Child("shopThumbnails")
                        .Child(userId)  // Thư mục theo userId
                        .Child(fileNameWithDate)  // Sử dụng tên file kèm ngày giờ
                        .PutAsync(fs, cancellation.Token);

                    try
                    {
                        var link = await task;

                        // Cập nhật thumbnail mới trong cơ sở dữ liệu
                        shop.Thumbnail = $"shop/shopThumbnails/{userId}/{fileNameWithDate}";

                        // Cập nhật shop trong cơ sở dữ liệu
                        _context.Shops.Update(shop);
                        await _context.SaveChangesAsync(); // Lưu thay đổi

                        return Ok(new { link });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { error = $"Exception was thrown: {ex.Message}" });
                    }
                }
            }
            return BadRequest(new { error = "File is required." });
        }
        
        [HttpPost("upload/Blog/blogImages")]
        public async Task<IActionResult> BlogImages([FromForm] FileUploadViewModel file, [FromQuery] string userId, int blogId)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload != null && fileUpload.Length > 0)
            {
                // Tạo thư mục dựa trên userId
                string foldername = $"firebaseFiles/{userId}";
                string path = Path.Combine(_env.WebRootPath, $"images/{foldername}");

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                // Tạo tên file với ngày giờ hiện tại để đảm bảo tên không trùng lặp
                string fileNameWithDate = $"{Path.GetFileNameWithoutExtension(fileUpload.FileName)}_{DateTime.Now:yyyyMMdd_HHmmss}{Path.GetExtension(fileUpload.FileName)}";

                // Tạo đường dẫn cho FileStream
                using (FileStream fs = new FileStream(Path.Combine(path, fileNameWithDate), FileMode.Create))
                {
                    // Sao chép dữ liệu từ tệp tải lên vào FileStream
                    await fileUpload.CopyToAsync(fs);

                    // Đặt lại vị trí con trỏ của FileStream về đầu
                    fs.Seek(0, SeekOrigin.Begin);

                    // Firebase uploading stuffs
                    var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                    var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                    var cancellation = new CancellationTokenSource();

                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("blog")
                        .Child("blogImages")
                        .Child(userId)  // Thư mục theo userId
                        .Child(fileNameWithDate)  // Sử dụng tên file kèm ngày giờ
                        .PutAsync(fs, cancellation.Token);

                    try
                    {
                        var link = await task;
                        var blogImage = new BlogImage
                        {
                            BlogId = blogId,
                            ImageUrl = $"blog/blogImages/{userId}/{fileNameWithDate}"
                        };
                        _context.BlogImages.Add(blogImage);
                        await _context.SaveChangesAsync();
                        return Ok(new { link });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { error = $"Exception was thrown: {ex.Message}" });
                    }
                }
            }
            return BadRequest(new { error = "File is required." });
        }

        [HttpDelete("delete/Blog/blogImages")]
        public async Task<IActionResult> DeleteBlogImage(int ImageId, [FromQuery] string userId)
        {
            // Tìm ảnh trong cơ sở dữ liệu dựa trên blogImageId
            var blogImage = await _context.BlogImages.Where(b => b.ImageId == ImageId).FirstOrDefaultAsync();
            if (blogImage == null)
            {
                return NotFound(new { error = "Blog image not found." });
            }

            try
            {
                // Thực hiện xác thực với Firebase Auth
                var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                // Xóa ảnh trên Firebase Storage
                var oldImageReference = blogImage.ImageUrl.Substring(blogImage.ImageUrl.IndexOf("blog/")); // Đường dẫn của ảnh trên Firebase

                var deletionTask = new FirebaseStorage(
                    Bucket,
                    new FirebaseStorageOptions
                    {
                        AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken), // Sử dụng token xác thực
                        ThrowOnCancel = true
                    })
                    .Child(oldImageReference) // Đường dẫn đến ảnh cần xóa
                    .DeleteAsync();

                await deletionTask; // Chờ quá trình xóa ảnh

                // Xóa bản ghi ảnh trong cơ sở dữ liệu
                _context.BlogImages.Remove(blogImage);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Blog image deleted successfully." });
            }
            catch (FirebaseStorageException ex)
            {
                // Xử lý lỗi Firebase
                return BadRequest(new { error = $"Firebase Storage error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung
                return BadRequest(new { error = $"Unexpected error: {ex.Message}" });
            }
        }

        [HttpPut("update/Blog/blogImages")]
        public async Task<IActionResult> UpdateBlogImage([FromForm] FileUploadViewModel file, int ImageId, [FromQuery] string userId)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload == null || fileUpload.Length <= 0)
            {
                return BadRequest(new { error = "File is required." });
            }

            // Tìm ảnh blog trong cơ sở dữ liệu
            var blogImage = await _context.BlogImages.Where(b => b.ImageId == ImageId).FirstOrDefaultAsync();
            if (blogImage == null)
            {
                return NotFound(new { error = "Blog image not found." });
            }

            try
            {
                // Thực hiện xác thực với Firebase Auth
                var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                // Xóa ảnh cũ trên Firebase Storage nếu tồn tại
                if (!string.IsNullOrEmpty(blogImage.ImageUrl))
                {
                    var oldImageReference = blogImage.ImageUrl.Substring(blogImage.ImageUrl.IndexOf("blog/")); // Đường dẫn của ảnh cũ trên Firebase

                    var oldImageDeletionTask = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken), // Sử dụng token xác thực
                            ThrowOnCancel = true
                        })
                        .Child(oldImageReference) // Đường dẫn đến ảnh cũ cần xóa
                        .DeleteAsync();

                    await oldImageDeletionTask; // Chờ quá trình xóa ảnh
                }

                // Tạo tên file mới với ngày giờ hiện tại để đảm bảo tên không trùng lặp
                string fileNameWithDate = $"{Path.GetFileNameWithoutExtension(fileUpload.FileName)}_{DateTime.Now:yyyyMMdd_HHmmss}{Path.GetExtension(fileUpload.FileName)}";

                // Firebase uploading stuffs
                using (var stream = fileUpload.OpenReadStream())
                {
                    var cancellation = new CancellationTokenSource();

                    var uploadTask = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("blog")
                        .Child("blogImages")
                        .Child(userId)  // Thư mục theo userId
                        .Child(fileNameWithDate)  // Sử dụng tên file kèm ngày giờ
                        .PutAsync(stream, cancellation.Token);

                    var newImageUrl = await uploadTask; // Link Firebase của ảnh mới

                    // Cập nhật đường dẫn ảnh mới vào cơ sở dữ liệu
                    blogImage.ImageUrl = $"blog/blogImages/{userId}/{fileNameWithDate}";

                    // Cập nhật bản ghi trong cơ sở dữ liệu
                    _context.BlogImages.Update(blogImage);
                    await _context.SaveChangesAsync(); // Lưu thay đổi

                    return Ok(new { newImageUrl });
                }
            }
            catch (FirebaseStorageException ex)
            {
                // Xử lý lỗi Firebase
                return BadRequest(new { error = $"Firebase Storage error: {ex.Message}" });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung
                return BadRequest(new { error = $"Unexpected error: {ex.Message}" });
            }
        }

        [HttpPost("upload/Product/ProductThumbnail")]
        public async Task<IActionResult> ProductThumbnail([FromForm] FileUploadViewModel file, [FromQuery] string userId, int productId)
        {
            // Kiểm tra ModelState
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fileUpload = file.File;

            // Kiểm tra nếu tệp có tồn tại và không rỗng
            if (fileUpload != null && fileUpload.Length > 0)
            {
                // Tạo thư mục dựa trên userId
                string foldername = $"firebaseFiles/{userId}";
                string path = Path.Combine(_env.WebRootPath, $"images/{foldername}");

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                // Tạo tên file với ngày giờ hiện tại để đảm bảo tên không trùng lặp
                string fileNameWithDate = $"{Path.GetFileNameWithoutExtension(fileUpload.FileName)}_{DateTime.Now:yyyyMMdd_HHmmss}{Path.GetExtension(fileUpload.FileName)}";

                // Tạo đường dẫn cho FileStream
                using (FileStream fs = new FileStream(Path.Combine(path, fileNameWithDate), FileMode.Create))
                {
                    // Sao chép dữ liệu từ tệp tải lên vào FileStream
                    await fileUpload.CopyToAsync(fs);

                    // Đặt lại vị trí con trỏ của FileStream về đầu
                    fs.Seek(0, SeekOrigin.Begin);

                    // Firebase uploading stuffs
                    var auth = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
                    var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

                    var cancellation = new CancellationTokenSource();

                    var task = new FirebaseStorage(
                        Bucket,
                        new FirebaseStorageOptions
                        {
                            AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                            ThrowOnCancel = true
                        })
                        .Child("product")
                        .Child("productThumbnails")
                        .Child(userId)  // Thư mục theo userId
                        .Child(fileNameWithDate)  // Sử dụng tên file kèm ngày giờ
                        .PutAsync(fs, cancellation.Token);

                    try
                    {
                        var link = await task;
                        //var product = await _productRepository.GetProductsByProductID(productId);

                        //product.Thumbnail = $"product/productThumbnails/{userId}/{fileNameWithDate}";

                        //// Cập nhật shop trong cơ sở dữ liệu
                        //_context.Products.Update(product);
                        //await _context.SaveChangesAsync(); // Lưu thay đổi
                        return Ok(new { link });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { error = $"Exception was thrown: {ex.Message}" });
                    }
                }
            }
            return BadRequest(new { error = "File is required." });
        }
    }
}
