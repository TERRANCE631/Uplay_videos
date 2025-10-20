import { GlobalContext } from "../../../../Hooks/Context/useContext";

export function ClickVideoFn() {
    const { user, Loading, videos, getVideos } = GlobalContext();
    const Rtext = "<Upl"
    const Ltext = "ay />"

    return { Ltext, Rtext, Loading, videos, getVideos, user }
}
