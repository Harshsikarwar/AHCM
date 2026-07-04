import MedicineStock from '../components/MedicineStock/MedicineStock';
import MedicineStockHistory from '../components/MedicineStockHistroy/MedicineStockHistroy';
import '../styles/medicine.css';
export default function Medicine(){
    return(
        <>
        <div className='MCard2'>
            <MedicineStock/>
        </div>
        <div className='MCard2'>
            <MedicineStockHistory/>
        </div>
        </>
    )
}