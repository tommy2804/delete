import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizable.css';
import { useState, useEffect } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}
const Resizable: React.FunctionComponent<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerWidth);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;

    const resizeWindow = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75); // to handle the bug of the resize library to resizing correctly
        }
      }, 100);
    };
    window.addEventListener('resize', resizeWindow);

    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      width,
      height: Infinity,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        console.log(data); // this function is to handle the stop of the screen resizing
        setWidth(data.size.width); // and set the screen width to the new width
        // its to keep track on the screen size when resizing
      },
    };
  } else {
    resizableProps = {
      className: 'resize-vertical',
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
