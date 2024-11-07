import { useState, useEffect } from "react";
import { getProductById } from "../../Config/ProductApi";
const AdminViewOrderDetailDialog = (props) => {
  const orderDetail = props.orderDetail;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      const prod = await getProductById(orderDetail.productId);
      setProduct(prod);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  if (loading) return <div>Loading ...</div>;
  return <></>;
};
export default AdminViewOrderDetailDialog;
