import {useState, useEffect} from 'react'
import { getKoiById, getKoiName } from '../../Config/KoiApi'

const KoiNameFromId = (koiId) => {
    const [koiName, setKoiName] = useState('');

    useEffect(() => {
        const fetchKoiName = async () => {
            try {
                const name = await getKoiName(koiId.koiId);
                setKoiName(name);
            } catch (error) {
                console.error('Error fetching koi name:', error);
            }
        };
        fetchKoiName();
    }, [koiId]);
    
  return (
    <>
    {koiName}
    </>
  )
}

export default KoiNameFromId