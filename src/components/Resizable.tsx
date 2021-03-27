import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < innerWidth) {
          setInnerWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [innerWidth]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [width * 0.2, Infinity],
      maxConstraints: [width * 0.75, Infinity],
      height: Infinity,
      width: innerWidth,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setInnerWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 32],
      maxConstraints: [Infinity, height * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
