import React from "react";
import { useEffect, useState } from "react";
import EachVideo from "../components/EachVideo";
import user from "../user.png";

const AdminDashboardPage = () => {
  const [viewPage, setViewPage] = useState(1);
  const [videos, setVideos] = useState([]);
  let date = new Date();
  let hour = date
    .getHours()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 });
  let minute = date
    .getMinutes()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 });

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let displayedDate = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  useEffect(() => {
    const getVideos = async () => {
      const headers = {
        "Content-Type": "application/json",
        "x-project":
          "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const endPoint = `https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE`;
      const payload = { payload: {}, page: viewPage, limit: 10 };
      const response = await fetch(endPoint, {
        method: "post",
        headers: headers,
        body: JSON.stringify(payload),
      });
      const videosArray = await response.json();
      console.log(videosArray.list)
      setVideos(videosArray.list);
    };

    getVideos();
  }, [viewPage]);

  return (
    <>
      <div className="w-full flex justify-center items-center text-gray-700 ">
        <div className="bg-black p-6 px-10 w-10/12 mb-10">
          <div className="flex justify-between mb-16">
            <p className="text-white text-4xl font-extrabold">APP</p>
            <button className="py-3 rounded-full px-6 bg-lime-400 ">
              <img src={user} className="inline-block mr-1" width={20} alt="" />
              Logout
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-thin text-3xl text-gray-600 m-0 ">
              Today's leatherboard
            </h1>
            <div className="flex p-2 bg-gray-900 items-center text-md rounded-xl font-thin">
              <p className="m-0 mx-2 text-gray-600  ">{displayedDate}</p>
              <p className="bg-lime-400  px-2 rounded-lg m-0 mx-2">
                SUBMISSION
              </p>
              <p className="m-0 text-gray-600 text-md mx-2">{`${hour}:${minute}`}</p>
            </div>
          </div>

          <div className="flex mb-3 px-3">
            <p className="mr-6">#</p>
            <p className="w-6/12">Title</p>
            <p className="mr-auto">Author</p>
            <p className=" text-right">Most Liked &or;</p>
          </div>

          {videos.map((item, index) => (
            <EachVideo key={index} title={item.title} photo={item.photo} user={item.username} like={item.like} id={item.id} />
          ))}

          <div className="mt-6 flex justify-between p-2 mb-4 ">
              <button onClick={()=>setViewPage(()=>{viewPage>0? viewPage-1: null})} className="text-lg font-bold hover:text-lime-400">&larr; Previous</button>
              <button onClick={()=>setViewPage(()=>{viewPage>0? viewPage+1: null})} className="text-lg font-bold hover:text-lime-400">  Next &rarr;</button>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
