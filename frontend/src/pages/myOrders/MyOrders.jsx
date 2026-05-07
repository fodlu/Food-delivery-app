import { useEffect } from 'react';
import './myorders.css'
import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {assets} from '../../assets/assets/frontend_assets/assets'

const MyOrders = () => {
    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
      const response = await axios.post(url + '/api/order/userorders', {}, {headers: {token}});
      setData(response.data.data);
    }

    useEffect(()=> {
      if(token) {
        fetchOrders()
      }
    }, [token])
  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((item, index) => {
          return(
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <p>{item.items.map((order, index)=> {
                if(index === order.items.length - 1) {
                  return item.name + ' x ' + item.quantity
                } else {
                  return item.name + ' x ' + item.quantity + ", "
                }
              })}</p>
              <p>${item.amount}.00</p>
              <p>Item: {item.items.length}</p>
              <p><span>&#x25cf;</span> <b>{item.status}</b></p>
              <button onClick={fetchOrders()}>Track Order</button>
          </div>)
        })}
      </div>
    </div>
  )
}

export default MyOrders
