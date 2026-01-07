// no use

// import React, { useState } from "react";

// function SignUp() {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   async function handleForm(e) {
//     e.preventDefault();
//      try {
//        const data = await fetch("http://localhost:3000/api/v1/signup", {
//         method : "POST",
//         body : JSON.stringify(userData),
//         headers : {
//           "Content-Type" : "application/json",
//         }
//       })

//       const res = await data.json()
//       console.log(res)
//      } catch (error) {
//       console.log(error)
//      }
//   }
//   return (
//     <div className="flex flex-col gap-5 w-[30%]">
//       <h1 className="text-2xl">Sign up</h1>
//       <form className="flex flex-col gap-5" action="" onSubmit={handleForm}>
//         <input
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, name: e.target.value }))
//           }
//           className="rounded-xl bg-gray-800 text-xl w-full text-white p-1"
//           type="name"
//           placeholder="Enter your name"
//         />
//         <input
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, email: e.target.value }))
//           }
//           className="rounded-xl bg-gray-800 text-xl w-full text-white p-1"
//           type="email"
//           placeholder="Enter your email"
//         />
//         <input
//           onChange={(e) =>
//             setUserData((prev) => ({ ...prev, password: e.target.value }))
//           }
//           className="rounded-xl bg-gray-800 text-xl w-full text-white p-1"
//           type="password"
//           placeholder="Enter your password"
//         />
//         <button className="rounded-xl bg-gray-800 text-xl text-white p-1">
//           {" "}
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;
