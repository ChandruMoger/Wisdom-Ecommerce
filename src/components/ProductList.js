import React from 'react';
import Product from "./Product";

const ProductList = (props) => {
  const { products } = props;
   
    return (        
        <div className="product-container">          
            {
               products.length  > 0 ? products.map((item)=><Product key={item.id} product={item}></Product>) :
               <p>No Products</p>
            }
            
        </div>
    )
}

export default ProductList
