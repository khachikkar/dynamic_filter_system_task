import React, { useEffect, useState } from "react";
import "./index.css";

import { data } from "../../server";
import ProductItem from "../../components/ProductItem";
import {Slider} from "antd"
const MainLayout = () => {


const [filtered, setFiltered] = useState(data)


const [filters, setFilters] = useState({
    name:"",
    category:"",
    brand: "",
    price: [0, Infinity],
    rating: ""
})

const applyFilters = ()=>{
    const filteredd = data.filter((item)=>{
        const matchBrand = filters.brand ? item.brand === filters.brand : true
       
        const matchCategory = filters.category && filters.category !== "Select Category" 
                              ? item.category === filters.category 
                              : true;
       
        // const matchCategory = filters.category ? item.category === filters.category : true
        const matchPrice = item.price >=  filters.price[0] && item.price <= filters.price[1]
        const matchRaiting = filters.rating ? item.rating == filters.rating : true

        return matchBrand && matchCategory && matchPrice && matchRaiting


    })
    setFiltered(filteredd)
   
}


useEffect(()=>{
    applyFilters()
},[filters])





// handle Debounce
function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }



// handle Selecting brand
const handleSelect = (e)=>{
    console.log(e.target.value , "brand selected");
    // const filtered = data.filter(item=> item.brand === e.target.value)
    setFilters(prev=>({...prev, brand: e.target.value}))
    applyFilters()


}


//handle Categorization
const handleCategory = (e)=>{
    console.log(e.target.value , "category selected");
    // const filtered = data.filter(item=> item.category === e.target.value)
    setFilters(prev=>({...prev, category: e.target.value }))
    applyFilters()

}


//handle PriceRange
const handlePrice = (values)=>{
    console.log(values , "price selected");
    // values = [10,455]

// const filtered = data.filter((item)=>  item.price >= values[0] && item.price <= values[1])
setFilters(prev=>({...prev, price: values}))
applyFilters()


}
const debouncedHandlePrice = debounce(handlePrice,2000);



// handle rainting
const handleRaiting = (e)=>{

// const rating = e.target.value

// console.log(rating, ">>>>>")

// if(rating === "") setFiltered(data)

// const filtered = data.filter(item=> item.rating == rating)
// if(filtered.length === 0){
//     alert("no item found")
//     setFiltered(data)
// }else{
// setFiltered(filtered)
// }

setFilters(prev=>({...prev, rating: e.target.value}))
applyFilters()
}
const debouncedHandleRaiting = debounce(handleRaiting, 2000);


///////////////


  return (
    <div className="Main_Layout_Container">

      <aside className="Nav">
        navvv
        <h2>Filter by</h2>
        <div className="filterItem">
          <p>Brand Name</p>
          <select onChange={(e)=>handleSelect(e)}>
          <option>Select Brand</option>
            <option>Brand A</option>
            <option>Brand B</option>
            <option>Brand C</option>
          </select>
        </div>
        <div className="filterItem">
          <p>Category</p>
          <select onChange={(e)=>handleCategory(e)}>
          <option>Select Category</option>
            <option>Electronics</option>
            <option>Footwear</option>
            <option>Clothing</option>
          </select>
        </div>
        <div className="filterItem">
          <p>Rating</p>

          <input onChange={debouncedHandleRaiting} placeholder="Rating" />
          {/* <button>Search</button> */}
        </div>
        <div className="filterItem">
            <p>Price</p>
        <Slider className="pricer" range defaultValue={[40, 100]} max={600} onChange={debouncedHandlePrice} />
        </div>
      </aside>

    <div className="Content">
    <input placeholder="Search Item" />

<main>

{
filtered.map((item)=> <ProductItem data={item} key={item.id} />)
}


</main>
    </div>

    </div>
  );
};

export default MainLayout;
