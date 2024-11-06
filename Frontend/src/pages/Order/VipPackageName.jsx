import { useEffect, useState } from 'react';
import { getVipPackageName } from '../../Config/VipPackageApi';

const VipPackageName = ({ vipId }) => {
    const [vipName, setVipName] = useState('');

    useEffect(() => {
        const fetchVipName = async () => {
            try {
                const name = await getVipPackageName(vipId);
                setVipName(name);
            } catch (error) {
                console.error('Error fetching vip name:', error);
            }
        };

        fetchVipName();
    }, [vipId]);

    return (
        <>
            {vipName}
        </>
    );
};

export default VipPackageName;