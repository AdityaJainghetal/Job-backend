// import React from "react";

// const categories = [
//   {
//     name: "Security Guard",
//     icon: "/images/job/security-guard.png",
//   },
//   {
//     name: "Kitchen Master",
//     icon: "/images/job/kitchen.png",
//   },
//   {
//     name: "Sweeper",
//     icon: "/images/job/worker.png",
//   },
//   {
//     name: "Construction Labour",
//     icon: "/images/job/construction-worker.png",
//   },
//   {
//     name: "Painter",
//     icon: "/images/job/painter.png",
//   },
//   {
//     name: "Cook",
//     icon: "/images/job/kitchen.png",
//   },
//   {
//     name: "Chef",
//     icon: "/images/job/cooking.png",
//   },
//   {
//     name: "Plumber",
//     icon: "/images/job/plumber.png",
//   },
//   {
//     name: "Electrician",
//     icon: "/images/job/electrician.png",
//   },
//   {
//     name: "Driver",
//     icon: "/images/job/driver.png",
//   },

//   {
//     name: "Tailor",
//     icon: "/images/job/sewing.png",
//   },

//   {
//     name: "Office Boy",
//     icon: "/images/job/laptop.png",
//   },
//   // {
//   //   name: "Helper",
//   //   icon: "/images/job/helping.png",
//   // },
//   // {
//   //   name: "Trainer",
//   //   icon: "/images/job/trainer.png",
//   // },


// ];

// const JobCategories = () => {
//   return (
//     <>
//     <div style={{ backgroundColor:"#F5F5F5" }} className="bg-blend-luminosity  p-6 py-10">
//        <div className="text-center mb-10">
//         <h2 className="text-2xl font-extrabold text-[#1F2937] mb-4 drop-shadow-md">
//           <span className="text-[#0077B6]"> Explore Job Categories for</span> Skilled  & Unskilled Workers
//         </h2>
//         {/* <p className="text-gray-600 text-sm">
//            Browse a wide range of job categories tailored for skilled and unskilled professionals, including roles like electrician, plumber, cook, painter, and more.
//         </p> */}
//       </div>


//   {/* <h1 className="text-xl sm:text-3xl mb-4  md:text-2xl font-bold   text-gray-800 ">
//   <span className="text-blue-600">Skilled</span> & <span className="text-green-600">Unskilled</span> Workers
// </h1> */}

//      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 rounded-lg mx-auto ">

//       {categories.map((cat, index) => (
//         <div style={{ border:" 1px solid #b5ccfa" }}
//           key={index}
//           className="flex flex-col items-center justify-center gap-2 text-center px-4 py-5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50"
//         >
//           <img
//             src={cat.icon}
//             alt={cat.name}
//             className="w-12 h-12 object-contain"
//           />
//           <div className="text-sm font-semibold">{cat.name}</div>
//         </div>
//       ))}
//     </div>
//     </div>

//     </>

//   );
// };

// export default JobCategories;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const api = "http://localhost:8000/subcategory";

// const JobCategories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(api);
//         setCategories(res.data); // expecting array of { name, icon }
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <div style={{ backgroundColor: "#F5F5F5" }} className="bg-blend-luminosity p-6 py-10">
//         <div className="text-center mb-10">
//           <h2 className="text-2xl font-extrabold text-[#1F2937] mb-4 drop-shadow-md">
//             <span className="text-[#0077B6]"> Explore Job Categories for</span> Skilled & Unskilled Workers
//           </h2>
//         </div>

//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 rounded-lg mx-auto">
//           {categories.map((cat, index) => (
//             <div
//               key={index}
//               style={{ border: "1px solid #b5ccfa" }}
//               className="flex flex-col items-center justify-center gap-2 text-center px-4 py-5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50"
//             >
//               <img
//                 src={cat.image}
//                 alt={cat.name}
//                 className="w-12 h-12 object-contain"
//               />
//               <div className="text-sm font-semibold">{cat.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobCategories;


import React, { useEffect, useState  } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { fetchCategories } from "../../app/categories/categorythunk";

// const api = "http://localhost:8000/category";

// 🔥 Dummy Image Fallback

const DUMMY_IMAGE = "/images/job/worker.png";


const JobCategories = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();

  // const [categories, setCategories] = useState([]);
  const { categories , error, loading} = useSelector((state) => state.categories)

  useEffect(() => {

    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (id) =>{
    navigate()

  }

  if (loading) return <p> loading categoires...</p>
  if(error)  return <p>Error: {error}</p>



  return (
    <>
      <div
        style={{ backgroundColor: "#F5F5F5" }}
        className="bg-blend-luminosity p-6 py-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-[#1F2937] mb-4 drop-shadow-md">
            <span className="text-[#0077B6]"> Explore Job Categories for</span>{" "}
            Skilled & Unskilled Workers
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 rounded-lg mx-auto">
          {categories.map((cat) => (
            <div
              key={cat._id}
              style={{ border: "1px solid #b5ccfa" }}
              className="flex flex-col items-center justify-center gap-2 text-center px-4 py-5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50"
            >
              <img
                src={cat.image ? cat.image : DUMMY_IMAGE} // ✅ Use dummy if no image
                alt={cat.name}
                className="w-12 h-12 object-contain"
              />
              <div className="text-sm font-semibold">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobCategories;
