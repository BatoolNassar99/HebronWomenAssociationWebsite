import React from "react";
import StoreVisitor from "../Components/Show/StoreVisitor";
import Axios from "axios";
import { useState } from "react";
import AppNavbarVisitor from "../Components/common/navbar-visitor";


function ShowStoreVisitor() {

  const [ProductsList, setProductsList] = useState([]);

  Axios.get('http://localhost:3003/store').then((respons) => {
    setProductsList(respons.data)
  })

  return (
    <div>
      <AppNavbarVisitor />
      <h1 className=" navbar" >
        المتجر :
      </h1>

      <br />
      <div className="row">
        {ProductsList.map((val) => {

          return (
            <StoreVisitor key={val.ItemID}
              info={
                {
                  ItemID: val.ItemID,
                  img: val.ItemImage,
                  Name: val.Name,
                  Description: val.Description,
                  UserSSN: val.UserSSN,
                  Category: val.Category,
                  Price: val.Price,
                  Quantity: val.Quantity,
                  ProducerName: val.ProducerName,
                  ProducerPhone: val.ProducerPhone,
                }
              }
            />
          )
        })}
      </div>
    </div>
  );
}

export default ShowStoreVisitor;