using Domain.Models.Entity;
using Microsoft.EntityFrameworkCore;
using SWP391.KCSAH.Repository;

namespace Domain.Services
{
    public class OrderService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly KoiCareSystemAtHomeContext _context;
        public OrderService(UnitOfWork unitOfWork, KoiCareSystemAtHomeContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        public async Task<(int, int)> SetStatusSuccessfulOrderByShop(int orderId)
        {
            var order = await _unitOfWork.OrderRepository.GetByOrderIdAsync(orderId);
            foreach (var orderDetail in order.OrderDetails)
            {
                orderDetail.OrderDetailStatus = "Successful";
            }
            order.OrderStatus = "Successful";
            var result1 = await _unitOfWork.OrderRepository.UpdateAsync(order);


            List<Product> productSuccessfulList = await GetListProductSuccessful(order);

            var orderUser = await _unitOfWork.OrderRepository.GetOrderByUserIdAndCreateDate(order.UserId, order.CreateDate);
            if (orderUser != null)
            {
                // Tạo từ điển để tra cứu Product nhanh hơn
                var productIds = productSuccessfulList.Select(p => p.ProductId).ToHashSet();

                foreach (var orderDetail in orderUser.OrderDetails)
                {
                    if (productIds.Contains(orderDetail.ProductId))
                    {
                        orderDetail.OrderDetailStatus = "Successful";
                    }
                }
            }

            int flag = 1;
            foreach (var orderUserDetail in orderUser.OrderDetails)
            {
                if (orderUserDetail.OrderDetailStatus != "Successful")
                {
                    flag = 0;
                    break;
                }
            }
            if (flag == 1)
            {
                orderUser.OrderStatus = "Successful";
            }
            var result2 = await _unitOfWork.OrderRepository.UpdateAsync(orderUser);
            return (result1, result2);
        }

        public async Task<(int, int)> SetStatusSuccessfulOrderDetailByShop(int orderId, int productId)
        {
            var order = await _unitOfWork.OrderRepository.GetByOrderIdAsync(orderId);
            int orderDetailAllSuccess = 1;
            foreach (var orderDetail in order.OrderDetails)
            {
                if (orderDetail.ProductId == productId)
                {
                    orderDetail.OrderDetailStatus = "Successful";
                }

                if (orderDetail.OrderDetailStatus != "Successful")
                {
                    orderDetailAllSuccess = 0;
                    break;
                }

            }
            if (orderDetailAllSuccess == 1)
            {
                order.OrderStatus = "Successful";
            }
            var result1 = await _unitOfWork.OrderRepository.UpdateAsync(order);


            List<Product> productSuccessfulList = await GetListProductSuccessful(order);

            var orderUser = await _unitOfWork.OrderRepository.GetOrderByUserIdAndCreateDate(order.UserId, order.CreateDate);
            if (orderUser != null)
            {
                // Tạo từ điển để tra cứu Product nhanh hơn
                var productIds = productSuccessfulList.Select(p => p.ProductId).ToHashSet();

                foreach (var orderDetail in orderUser.OrderDetails)
                {
                    if (productIds.Contains(orderDetail.ProductId))
                    {
                        orderDetail.OrderDetailStatus = "Successful";
                    }
                }
            }

            int flag = 1;
            foreach (var orderUserDetail in orderUser.OrderDetails)
            {
                if (orderUserDetail.OrderDetailStatus != "Successful")
                {
                    flag = 0;
                    break;
                }
            }
            if (flag == 1)
            {
                orderUser.OrderStatus = "Successful";
            }
            var result2 = await _unitOfWork.OrderRepository.UpdateAsync(orderUser);
            return (result1, result2);
        }

        private async Task<List<Product>> GetListProductSuccessful(Order order)
        {
            List<Product> productList = new List<Product>();
            foreach (var item in order.OrderDetails)
            {
                if (item.OrderDetailStatus == "Successful")
                {
                    var product = await _context.Products.Where(p => p.ProductId == item.ProductId).FirstOrDefaultAsync();
                    productList.Add(product);
                }
            }

            return productList;
        }
    }
}
