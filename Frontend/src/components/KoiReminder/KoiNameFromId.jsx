import {useState, useEffect} from 'react'
import { getKoiById } from '../../Config/KoiApi'

const KoiNameFromId = (koiId) => {
    const [koiName, setKoiName] = useState('');
    const koiIdGetName = koiId.koiId;
    useEffect(() => {
        const fetchKoiName = async () => {
            try {
                const name = await getKoiById(koiIdGetName);
                setKoiName(name.name);
            } catch (error) {
                console.error('Error fetching koi name:', error);
            }
        };
        fetchKoiName();
    }, [koiIdGetName]);
    
  return (
    <>
    {koiName}
    </>
  )
}

export default KoiNameFromId