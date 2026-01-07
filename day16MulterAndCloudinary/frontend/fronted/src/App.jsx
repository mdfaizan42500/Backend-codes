import "./App.css";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/blogs";
import Signup from "./Pages/signup";
import Signin from "./Pages/signin";
import CreateBlog from "./components/createBlog";


function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Blogs/>} ></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/create-blog" element={<CreateBlog/>}></Route>
      <Route path="*" element={<h1>Not found</h1>}></Route>
    </Routes>
  );
}

export default App;
