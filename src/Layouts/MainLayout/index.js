import React, { useEffect, useState } from "react";
import "./index.css";
import { data } from "../../server";
import ProductItem from "../../components/ProductItem";
import { Slider } from "antd";

const MainLayout = () => {
  const [filtered, setFiltered] = useState(data);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
    price: [0, Infinity],
    rating: ""
  });

  const applyFilters = () => {
    const filteredData = data.filter((item) => {
      const matchBrand = filters.brand ? item.brand === filters.brand : true;
      const matchCategory = filters.category ? item.category === filters.category : true;
      const matchPrice = item.price >= filters.price[0] && item.price <= filters.price[1];
      const matchRating = filters.rating ? item.rating == filters.rating : true;

      return matchBrand && matchCategory && matchPrice && matchRating;
    });

    // if(searchVal == ""){
    //     setFiltered(data);
    // }else{
    //     const searched = filteredData.filter(item =>
    //         item.name.toLowerCase().includes(searchVal.toLowerCase())
            
    //     );
        
    // setFiltered(searched);
    // }
    
    const searched = filteredData.filter(item =>
                item.name.toLowerCase().includes(searchVal.toLowerCase()) );

       setFiltered(searched);



  };

  const [searchVal, setSaerchVal] = useState("")


  useEffect(() => {
    applyFilters();
    console.log(filtered, ">>>>>>>>>>>>")
  }, [filters, searchVal]);

  // Handle Debounce
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };


//handle Search


const handleSearch = (e)=>{

const newval = e.target.value
 setSaerchVal(newval)

applyFilters()

}


// console.log(searchVal, ">>>>>>>>>>>")






  // Event Handlers
  //handle select
  const handleSelect = (e) => {
    console.log(e.target.value, "brand selected");
    setFilters((prev) => ({ ...prev, brand: e.target.value === "Select Brand" ? "" : e.target.value  }));
  };

  //handle Category
  const handleCategory = (e) => {
    console.log(e.target.value, "category selected");
    setFilters((prev) => ({ ...prev, category: e.target.value === "Select Category" ? "" : e.target.value }));
  };


  //handle Proce
  const handlePrice = (values) => {
    console.log(values, "price selected");
    setFilters((prev) => ({ ...prev, price: values }));
  };

  const debouncedHandlePrice = debounce(handlePrice, 2000);


  //handle Rating
  const handleRating = (e) => {
    setFilters((prev) => ({ ...prev, rating: e.target.value }));
  };

  const debouncedHandleRating = debounce(handleRating, 2000);


  const [isAsideOpen, setIsAsideOpen] = useState(true);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };




  return (
    <div className="Main_Layout_Container">

      <aside className="Nav">
        {/* <h2>Filter by</h2> */}


        {isAsideOpen &&
        <div className="aside">
        <div className="filterItem">
          <p>Brand Name</p>
          <select onChange={handleSelect}>
            <option>Select Brand</option>
            <option>Brand A</option>
            <option>Brand B</option>
            <option>Brand C</option>
          </select>
        </div>
        <div className="filterItem">
          <p>Category</p>
          <select onChange={handleCategory}>
            <option>Select Category</option>
            <option>Electronics</option>
            <option>Footwear</option>
            <option>Clothing</option>
          </select>
        </div>
        <div className="filterItem">
          <p>Rating</p>
          <input onChange={debouncedHandleRating} placeholder="Rating" />
        </div>
        <div className="filterItem">
          <p>Price</p>
          <Slider className="pricer" range defaultValue={[40, 100]} max={600} onChange={debouncedHandlePrice} />
        </div>
        </div>
        }

<button onClick={toggleAside}>
          {isAsideOpen ? "Collapse" : "Expand"}
</button>

      </aside>

      <div className="Content">
        <input onChange={(e)=>handleSearch(e)} value={searchVal} placeholder="Search Item" />
        <main>
          {filtered.map((item) => (
            <ProductItem data={item} key={item.id} />
          ))}
        </main>
      </div>


    </div>
  );
};

export default MainLayout;
