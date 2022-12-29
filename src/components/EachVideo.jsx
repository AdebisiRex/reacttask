import React from "react";
import classes from "./styles/EachVideo.module.css";

const EachVideo = ({title, photo, user, like, id}) => {
  return (
    <>
      <div className="flex items-center border-slate-600  rounded-2xl border h-20 px-3 mb-4">
        <div className="mr-6 ">{id}</div>
        <div className="w-6/12 mr-2  flex items-center">
          <img
            src={photo}
            className={classes.image_div + " rounded-lg mr-2 "}
            alt=""
          />
          <p className="text-xl font-light w-5/6">
            {title}
          </p>
        </div>
        <div className="mr-auto flex items-center">
          <img src={photo} alt="" width={24} className="rounded-full " />{" "}
          <p className="text-lime-400 font-light">{user}</p>
        </div>
        <p className=" text-right">
          {like} <span className="text-lime-400 font-bold">&uarr;</span>{" "}
        </p>
      </div>
    </>
  );
};

export default EachVideo;
