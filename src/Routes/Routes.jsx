import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Detail from "../Components/Pages/Details/Detail";
import LissAll from "../Components/Pages/Home/ListAll/LissAll";
import Movies from "../Components/Pages/Home/Movies/Movies";
import Tv from "../Components/Pages/Home/TV/Tv";
const RLink = (props) => {
  var status = props.status;
  var reciveStatus = props.reciveStatus;
  return (
    <Routes basename="/movie-web">
      <Route
        path="/"
        element={<Movies status={status} reciveStatus={reciveStatus}></Movies>}
      ></Route>
      <Route
        path="/home/tv"
        element={<Tv status={status} reciveStatus={reciveStatus}></Tv>}
      ></Route>
      <Route
        path="/home/:cate/:id"
        element={<Detail status={status} reciveStatus={reciveStatus}></Detail>}
      ></Route>
      <Route
        path="/home/:cate/all"
        element={
          <LissAll status={status} reciveStatus={reciveStatus}></LissAll>
        }
      ></Route>
    </Routes>
  );
};
export default RLink;
