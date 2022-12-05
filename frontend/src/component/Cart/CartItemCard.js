import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MWOnQxk10thewl26n0vckbNQdbKhfhfnJA&usqp=CAU" alt="ssa" /> */}
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
