using AutoMapper;
using DinkToPdf;
using DinkToPdf.Contracts;
using Domain.Models.Dto.Response;
using SWP391.KCSAH.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class PdfGenerator
    {
        private readonly IConverter _converter;
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PdfGenerator(UnitOfWork unitOfWork, IMapper mapper, IConverter converter) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _converter = converter;
        }

        public byte[] GeneratePDF(string htmlContent)
        {
            var globalSettings = new GlobalSettings()
            {
                ColorMode= ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings(10,10,10,10),
                DocumentTitle = "Invoice"
            };
            var objectSettings = new ObjectSettings()
            {
                PagesCount = true,
                HtmlContent = htmlContent,
                WebSettings = {DefaultEncoding = "utf-8"},
                HeaderSettings = {FontSize =12,Right ="Page [page] of [toPage]",Line=true,Spacing=2.812},
                FooterSettings = {FontSize = 12, Line = true,Right= "©" + DateTime.Now.Year}
            };

            var document = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

           return _converter.Convert(document);
        }

        public string GenerateHtmlContent(OrderDTO request)
        {
            var total = request.TotalPrice;

            var htmlBuilder = new StringBuilder();
            htmlBuilder.Append(@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Hóa Đơn Mua Hàng</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 40px;
            color: #1a1a1a;
        }
        .invoice-header {
            margin-bottom: 40px;
            text-align: center;
        }
        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }
        .shop-name {
            font-size: 28px;
            font-weight: bold;
            color: #e63946;
            margin-bottom: 10px;
        }
        .shop-slogan {
            color: #457b9d;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .invoice-title {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 30px;
        }
        .two-columns {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }
        .column {
            flex: 1;
        }
        .info-group {
            margin-bottom: 20px;
        }
        .info-label {
            font-size: 13px;
            color: #666;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .info-value {
            font-size: 14px;
            color: #1a1a1a;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .items-table th {
            background-color: #457b9d;
            padding: 12px;
            text-align: left;
            font-weight: 500;
            color: white;
            border: 1px solid #ddd;
        }
        .items-table td {
            padding: 12px;
            border: 1px solid #ddd;
        }
        .items-table tr:nth-child(even) {
            background-color: #f8f8f8;
        }
        .amounts-table {
            width: 100%;
            max-width: 400px;
            margin-left: auto;
            border-collapse: collapse;
            font-size: 14px;
        }
        .amounts-table td {
            padding: 8px 12px;
        }
        .amounts-table .total-row {
            font-weight: 600;
            font-size: 16px;
            border-top: 2px solid #457b9d;
            color: #e63946;
        }
        .amounts-table .discount-row {
            color: #2a9d8f;
        }
        .vip-badge {
            background-color: #ffd700;
            color: #000;
            padding: 5px 10px;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 10px;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        .payment-info {
            margin-top: 30px;
            padding: 15px;
            background-color: #f8f8f8;
            border-radius: 5px;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>");

            // Header
            htmlBuilder.Append($@"
    <div class='invoice-header'>
        <div class='shop-name'>KOI SHOP</div>
        <div class='shop-slogan'>Chuyên cung cấp thức ăn & thuốc cho cá Koi</div>
        <div class='invoice-title'>HÓA ĐƠN {(request.isVipUpgrade ? "NÂNG CẤP VIP" : "MUA HÀNG")}</div>
    </div>
    <div class='two-columns'>");

            // Invoice Details (Left Column)
            htmlBuilder.Append($@"
            <div class='column'>
                <div class='info-group'>
                    <div class='info-label'>Mã hóa đơn:</div>
                    <div class='info-value'>{request.OrderId}</div>
                </div>
                <div class='info-group'>
                    <div class='info-label'>Ngày:</div>
                    <div class='info-value'>{DateTime.Now:dd/MM/yyyy HH:mm}</div>
                </div>
            </div>");

            // Customer Details (Right Column)
            htmlBuilder.Append($@"
            <div class='column'>
                <div class='info-group'>
                    <div class='info-label'>Thông tin khách hàng:</div>
                    <div class='info-value'>{request.FullName}</div>
                    <div class='info-value'>{request.Phone}</div>
                    <div class='info-value'>{request.Email}</div>
                    <div class='info-value'>{request.Street +" "+ request.District + " "+ request.City + " " + request.Country}</div>
                </div>
            </div>
        </div>");

            // Items Table
            htmlBuilder.Append(@"
    <table class='items-table'>
        <thead>
            <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Cửa hàng</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>
        </thead>
        <tbody>");

            int index = 1;

            foreach (var item in request.orderDetails)
            {
                var itemTotal = item.Quantity * item.UnitPrice;
                var product = _unitOfWork.ProductRepository.GetById(item.ProductId);
                var shop = _unitOfWork.ShopRepository.GetById(product.ShopId);
                htmlBuilder.Append($@"
            <tr>
                <td>{index++}</td>
                <td>{product.Name}</td>
                <td>{shop.ShopName}</td>
                <td>{item.Quantity}</td>
                <td>{item.UnitPrice:#,##0} đ</td>
                <td>{itemTotal:#,##0} đ</td>
            </tr>");
            }

            htmlBuilder.Append("</tbody></table>");

            // Totals
            //        htmlBuilder.Append($@"
            //<table class='amounts-table'>
            //    <tr>
            //        <td>Tạm tính:</td>
            //        <td class='text-right'>{subtotal:#,##0} đ</td>
            //    </tr>");

            //    if (request.DiscountPercent.HasValue)
            //    {
            //        htmlBuilder.Append($@"
            //<tr class='discount-row'>
            //    <td>Giảm giá ({request.DiscountPercent}%):</td>
            //    <td class='text-right'>-{(subtotal * request.DiscountPercent.Value / 100):#,##0} đ</td>
            //</tr>");
            //    }

            //    if (request.DiscountAmount.HasValue && request.DiscountAmount.Value > 0)
            //    {
            //        htmlBuilder.Append($@"
            //<tr class='discount-row'>
            //    <td>Giảm giá trực tiếp:</td>
            //    <td class='text-right'>-{request.DiscountAmount.Value:#,##0} đ</td>
            //</tr>");
            //    }

            htmlBuilder.Append($@"
        <tr class='total-row'>
            <td>Tổng thanh toán:</td>
            <td class='text-right'>{total:#,##0} đ</td>
        </tr>
    </table>");

            // Payment Info
            if (request.isVipUpgrade)
            {
                htmlBuilder.Append($@"
    <div class='payment-info'>
        <div class='info-label'>Quyền lợi VIP:</div>
        <ul>
            <li>Giảm 10% cho mọi đơn hàng</li>
            <li>Tích điểm x2 khi mua hàng</li>
            <li>Ưu tiên tư vấn và hỗ trợ kỹ thuật</li>
            <li>Quà tặng sinh nhật đặc biệt</li>
        </ul>
    </div>");
            }

            // Footer
            htmlBuilder.Append(@"
    <div class='footer'>
        <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
        <p>Website: www.koishop.com | Facebook: fb.com/koishop</p>
    </div>
</body>
</html>");

            return htmlBuilder.ToString();
        }
    }
}
