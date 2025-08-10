import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Pages/Home/HomePage";
import { SearchResultsPage, UserDetails, VideoPlayer } from "../Pages";
import { SecuredRoute } from "./SecuredRoute";

export function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/videoPlayer/:id" element={<SecuredRoute><VideoPlayer /></SecuredRoute>}></Route>
        <Route path="/Home/User/profile/:id" element={<SecuredRoute><UserDetails /></SecuredRoute>}></Route>
        <Route path="/Home/search results/" element={<SearchResultsPage />}></Route>
      </Routes>
    </>
  );
}
