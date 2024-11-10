using AutoMapper;
using DinkToPdf;
using DinkToPdf.Contracts;
using Domain.Models.Entity;
using SWP391.KCSAH.Repository;
using System.Text;

namespace Domain.Services
{
    public class PdfGenerator
    {
        private readonly IConverter _converter;
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PdfGenerator(UnitOfWork unitOfWork, IMapper mapper, IConverter converter)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _converter = converter;
        }

        public byte[] GeneratePDF(string htmlContent)
        {
            var globalSettings = new GlobalSettings()
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings(10, 10, 10, 10),
                DocumentTitle = "Invoice"
            };
            var objectSettings = new ObjectSettings()
            {
                PagesCount = true,
                HtmlContent = htmlContent,
                WebSettings = { DefaultEncoding = "utf-8" },
                HeaderSettings = { FontSize = 12, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 },
                FooterSettings = { FontSize = 12, Line = true, Right = "©" + DateTime.Now.Year }
            };

            var document = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            return _converter.Convert(document);
        }

        public string GenerateHtmlContent(Order request)
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
        <div class='shop-slogan'>Specializing in providing food & medicine for Koi fish</div>
        <div class='invoice-title'>INVOICE</div>
    </div>
    <div class='two-columns'>");

            // Invoice Details (Left Column)
            htmlBuilder.Append($@"
            <div class='column'>
                <div class='info-group'>
                    <div class='info-label'>Order Id:</div>
                    <div class='info-value'>{request.OrderId}</div>
                </div>
                <div class='info-group'>
                    <div class='info-label'>Date:</div>
                    <div class='info-value'>{DateTime.Now:dd/MM/yyyy HH:mm}</div>
                </div>
            </div>");

            // Customer Details (Right Column)
            htmlBuilder.Append($@"
            <div class='column'>
                <div class='info-group'>
                    <div class='info-label'>Customer Information:</div>
                    <div class='info-value'>{request.FullName}</div>
                    <div class='info-value'>{request.Phone}</div>
                    <div class='info-value'>{request.Email}</div>
                    <div class='info-value'>{request.Street + " " + request.District + " " + request.City + " " + request.Country}</div>
                </div>
            </div>
        </div>");

            // Items Table
            if (request.isVipUpgrade == false)
            {
                htmlBuilder.Append(@"
    <table class='items-table'>
        <thead>
            <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Shop Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>");

                int index = 1;

                foreach (var item in request.OrderDetails)
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
            }
            else
            {
                htmlBuilder.Append(@"
    <table class='items-table'>
        <thead>
            <tr>
                <th>#</th>
                <th>Vip Name</th>
                <th>Vip Description</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>");

                int index = 1;
                foreach (var item in request.OrderVipDetails)
                {
                    var vip = _unitOfWork.VipPackageRepository.GetById(item.VipId);
                    htmlBuilder.Append($@"
            <tr>
                <td>{index++}</td>
                <td>{vip.Name}</td>
                <td>{vip.Description}</td>
                <td>{vip.Price:#,##0} đ</td>
            </tr>");
                }
            }

            htmlBuilder.Append("</tbody></table>");



            htmlBuilder.Append($@"
        <tr class='total-row'>
            <td>SubTotal:</td>
            <td class='text-right'>{total:#,##0} đ</td>
        </tr>
    </table>");

            // Footer
            htmlBuilder.Append(@"
</body>
</html>");

            return htmlBuilder.ToString();
        }
    }
}
