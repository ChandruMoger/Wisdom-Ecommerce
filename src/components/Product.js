import React from 'react'

const Product = (props) => {
    const { product } = props
    return (
        <div>
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                        <strong>Item Price <span>&#8377;</span>{product.unitPrice}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Product
