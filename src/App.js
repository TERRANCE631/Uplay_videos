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
  const { showLogin, setLogin, getUserDetails, getVideos, GetSubscribers, showRegister, setRegister } = GlobalContext();
  const { Loading } = ClickVideoFn()

  const [showManu, setShowManu] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  // eslint-disable-next-line
  useEffect(() => { getUserDetails(); getVideos(); GetSubscribers() }, []);

  if (Loading) return (
    <section className="dark:bg-gray-700 dark:text-white min-h-screen flex flex-col">
      <section className="fixed backdrop-blur-2xl z-20 transition-all inset-x-0 duration-300 h-[4.5rem] flex 
       items-center px-4">
        <div to="/">
          <span className="md:mx-5 mx-2 flex items-center md:scale-125 tracking-wider">
            <span className="text-4xl text-red-500 font-extrabold">U</span>
            <span className="text-xl">play</span>
          </span>
        </div>
      </section>

      <div className="flex dark:bg-gray-700 dark:text-white justify-center gap-1 items-center absolute inset-0">
        <BiLoaderCircle className="animate-spin h-8 w-8" />
        <span className="">Loading...</span>
      </div>
    </section>
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
