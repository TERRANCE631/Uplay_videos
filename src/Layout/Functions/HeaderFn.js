import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import { GlobalContext } from "../../Hooks/Context/useContext";

export function HeaderFn() {
    const [showSearch, setShowSearch] = useState(false);
    const [showProfile, setProfile] = useState(false);
    const { setValue, profileDetails, Loading } = GlobalContext()
    const token = JSON.parse(sessionStorage.getItem("userToken"));

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const { y: currentScrollY } = useWindowScroll();
    const scrollRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect
        (() => {
            const element = scrollRef.current

            if (currentScrollY > 0 && !darkMode) {
                element.classList.add("floating__header_lightMode")
                setProfile(false);
                setShowSearch(false);
                setValue("")

            } else if (currentScrollY === 0 && !darkMode) {
                element.classList.remove("floating__header_lightMode")
            } else if (currentScrollY > 0 && darkMode) {
                element.classList.add("floating__header_darkMode")
                setProfile(false);
                setShowSearch(false);
                setValue("")

            } else if (currentScrollY === 0 && darkMode) {
                element.classList.remove("floating__header_darkMode")
            };
            // eslint-disable-next-line 
        }, [currentScrollY, darkMode]);

    return {
        currentScrollY,
        darkMode,
        showProfile,
        profileDetails,
        showSearch,
        token,
        setDarkMode,
        Loading,
        setShowSearch,
        setProfile,
        scrollRef
    };
}
