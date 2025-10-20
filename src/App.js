import { useState } from "react";
import { Footer, Header, SideManu } from "./Layout";
import { SlideIn } from "./Layout/SlideIn";
import { AllRoutes } from "./Routes/AllRoutes";
import { CreatePost } from "./Pages";
import { Register } from "./Pages/User/Register";
import { LogIn } from "./Pages/User/LogIn";
import { GlobalContext } from "./Hooks/Context/useContext";
import { useEffect } from "react";
import { ClickVideoFn } from "./Pages/Home/Components/Functions/ClickVideoFn";
import { BiLoaderCircle } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { showLogin, setLogin, getUserDetails, getVideos, GetSubscribers } = GlobalContext();
  const { Loading } = ClickVideoFn();

  const [showRegister, setRegister] = useState(false);
  const [showManu, setShowManu] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => { getUserDetails(); getVideos(); GetSubscribers() }, []);

  if (Loading) return (
    <div className="flex dark:bg-gray-700 dark:text-white justify-center gap-1 items-center absolute inset-0">
      <BiLoaderCircle className="animate-spin h-8 w-8" />
      <span className="">Loading...</span>
    </div>
  );

  return (
    <div className="dark:bg-gray-700 min-h-screen overflow-hidden">
      <Header setShowManu={setShowManu} setLogin={setLogin} setRegister={setRegister} />
      <SideManu showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />
      {showCreatePost && <CreatePost setShowCreatePost={setShowCreatePost} />}
      {showRegister && <Register setRegister={setRegister} setLogin={setLogin} />}
      {showLogin && <LogIn setRegister={setRegister} setLogin={setLogin} />}
      {showManu && <SlideIn setShowManu={setShowManu} setShowCreatePost={setShowCreatePost} />}
      <main className="min-h-screen md:pt-[4.5rem] pt-[5rem] xl:pl-[4rem] md:pl-[8%] lg:pl-[6%] dark:text-white text-black">
        <AllRoutes />
      </main>
      <Footer />
      <ToastContainer theme="dark" position="top-center" hideProgressBar />
    </div>
  );
}

export default App;
