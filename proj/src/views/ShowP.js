import React from "react";
import Products from "../Components/Show/Products";
import Axios from "axios";
import { useState } from "react";
import Navbar from "../Components/common/navbar";
function ShowP() {

    const [ProductsList, setProductsList] = useState([]);

    Axios.get('http://localhost:3003/store').then((respons) => {
        setProductsList(respons.data)
    })

    return (
        <div>
<Navbar />
            <h1 className=" navbar" >
                المتجر :
            </h1>

            <br />
            <div className="row">
                {ProductsList.map((val) => {

                    return (
                        <Products key={val.ItemID}
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

export default ShowP;