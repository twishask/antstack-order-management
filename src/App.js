import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Orders from './Orders.js'

function App() {

  const [pincode, setPincode] = useState(0)
  const [date, setDate] = useState("")
  const [filteredOrders, setFilteredOrders] = useState([])

  const handlePincode = (e) => {
  //  setPincode(e.target.value)
    //console.log(pincode);
    if (e.target.value > 99999 && e.target.value < 1000000){
      //console.log("valid pin");
      //console.log(pincode);
      const inputPincode = Number(e.target.value)
      const filteredOrders = []
      Orders.map(order => {
        if (order.deliveryPincode === inputPincode) {
          filteredOrders.push(order)
        }
      })
      setFilteredOrders(filteredOrders)
      console.log(filteredOrders);
    }
  }

  const handleDate = (e) => {
    setDate(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
      Pincode:
      <input type="text"
        onChange={handlePincode}
      />
      Date:
      <input type="text" onChange={handleDate} />
      <table>
      <tr>
      <th>Order Id</th>
      <th>Customer Id</th>
      <th>Pincode</th>
      <th>Order Date</th>
      <th>Items</th>
      </tr>
      {Orders.map(order => {
        const items = order.items.split(";")
        return<tr>
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

/*
import CSVReader from 'react-csv-reader';
import Papa from 'papaparse';
import data from './Orders.csv';
import FileViewer from 'react-file-viewer';
const fs = require('fs');

const objData = Papa.parse(data)
const file = './sample.docx'
const type = 'docx'
console.log(file);
console.log(objData);
console.log(fs);
const error = () =>{
  console.log("error function");
}

<CSVReader onFileLoaded={data => console.log(data)} />
<img src="/bag.jpeg" />

<FileViewer
fileType={type}
filePath={file}
onError={error()}/>
*/
