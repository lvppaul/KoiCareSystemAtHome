import React, { useEffect, useState } from 'react';
import { getProductNameById } from '../../Config/ProductApi';

const ProductNameComponent = ({ productId }) => {
    const [productName, setProductName] = useState('');

    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const name = await getProductNameById(productId);
                setProductName(name);
            } catch (error) {
                console.error('Error fetching product name:', error);
            }
        };

        fetchProductName();
    }, [productId]);

    return (
        <>
            {productName}
        </>
    );
};

export default ProductNameComponent;