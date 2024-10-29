import React from 'react'
import "./index.css"


const ProductItem = ({data}) => {
  return (
   
      <div className="prodItem">

<h3>{data.name}</h3>
<img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="pp" />
<div>

<p>Price: ${data.price}</p>
<p>Rating: {data.rating}</p>

</div>

<button>Buy now</button>

</div>
  
  )
}

export default ProductItem
