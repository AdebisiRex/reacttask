import React , {useRef}from "react";
import classes from "./styles/EachVideo.module.css";
import { useDrag, useDrop } from 'react-dnd'

const EachVideo = ({title, photo, user, like, id, moveVideoItem, index}) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveVideoItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))
  return (
    <>
      <div ref={dragDropRef} className="flex items-center border-slate-700  rounded-2xl border py-2 px-3 mb-4">
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
          <img src={photo} alt="" width={24} className="rounded-full mr-2 " />{" "}
          <p className="text-lime-700 font-light">{user}</p>
        </div>
        <p className=" text-right">
          {like} <span className="text-lime-400 font-bold">&uarr;</span>{" "}
        </p>
      </div>
    </>
  );
};

export default EachVideo;
