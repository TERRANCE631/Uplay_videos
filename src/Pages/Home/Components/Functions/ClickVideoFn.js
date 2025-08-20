import { GlobalContext } from "../../../../Hooks/Context/useContext";
import { useEffect } from "react";

export function ClickVideoFn() {
    const { user, Loading, videos, getVideos } = GlobalContext();
    const Rtext = "<Upl"
    const Ltext = "ay />"


    const reloadPage = () => {
        window.location.reload();
    }

    return { Ltext, Rtext, Loading, videos, getVideos, user }
}
