import React, {useState, useEffect} from 'react';
import './App.css';
import Orders from './Orders.js'

function App() {

  const [pincode, setPincode] = useState(0)
  const [date, setDate] = useState("")
  const [filteredOrders, setFilteredOrders] = useState(Orders)

  useEffect(() => {
    applyfilters();
  }, [pincode, date]);

  const handlePincode = (e) => {
    if (e.target.value > 99999 && e.target.value < 1000000){
      setPincode(Number(e.target.value))
    }
    else if (e.target.value==="") {
      setPincode(0)
    }
  }

  const handleDate = (e) => {
    const inputDate = e.target.value
    const dateFormat =  /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/;
    if (inputDate.match(dateFormat)){
      setDate(e.target.value)
    }
    else {
      setDate("")
    }
  }

  const applyfilters = () => {
    var filteredOrders = []
    if (pincode!==0 && date!==""){
      Orders.map(order => {
        if (order.deliveryPincode===pincode && order.orderDate===date) {
          filteredOrders.push(order)
        }
      })
    }
    else if (pincode!==0) {
      Orders.map(order => {
        if (order.deliveryPincode === pincode) {
          filteredOrders.push(order)
        }
      })
    }
    else if (date!==""){
      Orders.map(order => {
        if (order.orderDate === date) {
          filteredOrders.push(order)
        }
      })
    }
    else {
      filteredOrders = Orders
    }

    setFilteredOrders(filteredOrders)
  }

  const sort = () => {
    const sortedOrders = [].concat(filteredOrders).sort((a, b) => a.customerId > b.customerId)
    setFilteredOrders(sortedOrders)
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="Filters">
      Pincode:&nbsp;
      <input type="text" onChange={handlePincode}/>
      &nbsp;&nbsp;&nbsp;
      Date:&nbsp;
      <input type="text" onChange={handleDate} />
      &nbsp;&nbsp;
      <input type="button" onClick={sort} value="Sort by Customer ID" />
      </div>
      <table>
      <tr>
      <th>Order Id</th>
      <th>Customer Id</th>
      <th>Pincode</th>
      <th>Order Date</th>
      <th>Items</th>
      </tr>
      {filteredOrders.map(order => {
        const items = order.items.split(";")
        return <tr>
          <td>{order["orderId"]}</td>
          <td>{order["customerId"]}</td>
          <td>{order["deliveryPincode"]}</td>
          <td>{order["orderDate"]}</td>
          <td>{items.map(item => {
            return (<div>{item}</div>)
          })}</td>
          </tr>
      })
      }
      </table>
      </header>
    </div>
  );
}

export default App;
