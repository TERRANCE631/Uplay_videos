import { BiMoon, BiSearch, BiSun } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SearchBar } from "./components/SearchBar";
import { MobileSearchBar } from "./components/MobileSearchBar";
import ProfileDropdownLoggedOut from "./ProfileDropdownLoggedOut";
import { ProfileDropdown } from "./ProfileDropdown";
import { HeaderFn } from "./Functions/HeaderFn";

export function Header({ setShowManu, setLogin, setRegister }) {
  const { currentScrollY,
    darkMode,
    showProfile,
    profileDetails,
    showSearch,
    userId,
    setDarkMode,
    Loading,
    setShowSearch,
    setProfile,
    scrollRef,
    user
  } = HeaderFn();

  return (
    <header className="fixed z-50">
      <nav ref={scrollRef} className="fixed backdrop-blur-2xl z-20 transition-all inset-x-0 duration-300
       dark:text-white h-[4.5rem] flex 
      justify-between items-center px-4">
        <section className="flex items-center">
          <div
            onClick={() => setShowManu(true)}
            role="button"
            className="rounded-full hover:bg-gray-500/70 bg-gray-500/30 px-2 py-[3px] text-white scale-[130%] md:scale-[140%]">
            &#9776;
          </div>
          <Link to="/">
            <span className="md:mx-5 mx-2 flex items-center md:scale-125 tracking-wider">
              <span className="text-4xl text-red-500 font-extrabold">U</span>
              <span className="text-xl">play</span>
            </span>
          </Link>
        </section>
        <SearchBar />

        <section className="flex items-center md:gap-4 gap-2">
          <section className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="md:hidden block text-2xl bg-gray-500/30 rounded-full p-[0.4rem]"
            >
              <BiSearch />
            </button>

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              disabled={currentScrollY === 0 ? "" : "disabled"}
              className={`${currentScrollY === 0
                ? "md:scale-[170%] scale-[155%] bg-gray-500/30 p-1 rounded-full hover:bg-gray-500/50 mx-2"
                : "md:scale-[170%] opacity-40 cursor-not-allowed scale-[155%] bg-gray-500/30 p-1 rounded-full hover:bg-gray-500/50 mx-2"}`}
            >
              {darkMode ? <BiMoon color="white" /> : <BiSun color="white" />}
            </button>
          </section>

          <button onClick={() => setProfile((prev) => !prev)} className="md:h-11 md:w-11 w-10 h-10 rounded-full border hover:opacity-70">
            <img src={user ? user.profile_image : "/Assets/profile.png"} onError={(e) => { e.target.src = "/Assets/profile.png" }}
              alt="" className="object-cover object-center h-full w-full rounded-full" />
          </button>
        </section>
      </nav>
      {
        Loading &&
        <div className="w-full h-[3.4px] rounded-full bg-red-200 absolute z-50 overflow-hidden">
          <div className="md:w-[45%] w-[100%] rounded-full h-full shadow-xl transition-transform duration-500 animate-loading-bar"></div>
        </div>
      }

      {!Loading && !user && showProfile && <ProfileDropdownLoggedOut setLogin={setLogin} setRegister={setRegister} setProfile={setProfile} />}
      {!Loading && user && showProfile && <ProfileDropdown profileDetails={profileDetails} setProfile={setProfile} />}

      <MobileSearchBar currentScrollY={currentScrollY} showSearch={showSearch} />

    </header>
  )
}
