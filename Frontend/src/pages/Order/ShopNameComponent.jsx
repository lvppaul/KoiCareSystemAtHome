import React, { useEffect, useState } from 'react';
import { getShopNameByShopId } from '../../Config/ShopApi';

const ShopNameComponent = ({ shopId }) => {
    const [shopName, setShopName] = useState('');

    useEffect(() => {
        const fetchShopName = async () => {
            try {
                const name = await getShopNameByShopId(shopId);
                console.log("Shop Name: ", name);
                setShopName(name);
            } catch (error) {
                console.error('Error fetching Shop name:', error);
            }
        };

        fetchShopName();
    }, [shopId]);

    return (
        <>
            {shopName}
        </>
    );
};

export default ShopNameComponent;