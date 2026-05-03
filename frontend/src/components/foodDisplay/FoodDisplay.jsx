import { useContext } from 'react'
import './foodDisplay.css'
import FoodItem from '../foodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({category}) => {

    const {foodList} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {foodList.map((item, index) => {
                if (category === 'All' || category === item.category) {
                    return <FoodItem key={index} item={item} />
                }
            })}
        </div>

    </div>
  )
}

export default FoodDisplay
