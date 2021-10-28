import map from "./assets/map.png";
import reset from "./assets/reset.png";
import marker from "./assets/marker.png";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const MAP_WINDOW_WIDTH = 1024;
const MAP_WINDOW_HEIGHT = 768;

const SApp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WMap = styled.div`
  position: relative;
`;
const WReset = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
`;
const MapWindow = styled.div`
  width: ${MAP_WINDOW_WIDTH}px;
  height: ${MAP_WINDOW_HEIGHT}px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const MapImg = styled.img`
  position: absolute;
`;
const Marker = styled.img`
  position: absolute;
  top: 20px;
  width: 70px;
  height: 85px;
`;

function App() {
  const [mark, setMark] = useState([]);
  const mapRef = useRef();

  const [mapPosition, setMapPosition] = useState();

  useEffect(() => {
    setMapPosition({
      x: mapRef.current.clientWidth / 2 - MAP_WINDOW_WIDTH / 2,
      y: mapRef.current.clientHeight / 2 - MAP_WINDOW_HEIGHT / 2,
    });
  }, []);
  useEffect(() => {
    mapRef.current.style.left = `-${mapPosition?.x}px`;
    mapRef.current.style.top = `-${mapPosition?.y}px`;
  }, [mapPosition]);

  let posX = 0;
  let posY = 0;

  // const [posX, setPosX] = useState(0);
  // const [posY, setPosY] = useState(0);
  // setPotition에 오류가 있음.
  const onMoveMap = (e) => {
    // const mapClientX = e.clientX;
    // console.log("🚀 ~ file: App.js ~ line 72 ~ onMoveMap ~ e", e);
    // console.log("mapClientX :", mapClientX);
    // console.log("mapPosition :", mapPosition);
    // const mapClientY = e.clientY;
    console.log(e);
    console.log(
      "🚀 ~ file: App.js ~ line 82 ~ onMoveMap ~ e.target.offsetLeft",
      e.target.offsetLeft
    );

    console.log("1212", windowRef.current.getBoundingClientRect().x);

    if (e.clientX && e.clientY) {
      e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
      e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;

      posX = e.clientX;
      posY = e.clientY;
    }

    // setPosX(e.clientX);
    // setPosY(e.clientY);

    console.log("hello ");
    // if (mapClientX !== 0 || mapClientY !== 0) {
    //   setMapPosition((prev) => {
    //     return {
    //       x: e.target.offsetLeft + e.clientY - ,
    //       y: e.target.offsetTop + e.clientY - ,
    //     };
    //   });
    // }
    // window.addEventListener("mousemove", setPosition);
  };

  // const setPosition = (e) => {
  //   console.log("🚀 ~ file: App.js ~ line 88 ~ window.addEventListener ~ e", e);
  //   setMapPosition((prev) => {
  //     return { x: prev.x - e.x, y: prev.y + e.y };
  //   });
  // };
  // const onMoveEndMap = () => {
  //   console.log("end Drag");
  // };

  const windowRef = useRef();
  const onContextMenu = (e) => {
    blockContextMenu(e);
    const clientX = e.clientX;
    const clientY = e.clientY;

    const windowX = windowRef.current.getBoundingClientRect().x;
    const windowY = windowRef.current.getBoundingClientRect().y;
    // const windowX = e.target.offsetLeft;
    // const windowY = e.target.offsetTop;
    setMark((prev) => [
      ...prev,
      { top: clientY - windowY - 50, left: clientX - windowX - 30 },
    ]);
  };

  const blockContextMenu = (e) => e.preventDefault();

  return (
    <SApp>
      <WMap>
        <MapWindow ref={windowRef}>
          <MapImg
            ref={mapRef}
            // style={{
            //   top: `${mapPosition?.y}px`,
            //   left: `${mapPosition?.x}px`,
            // }}
            src={map}
            alt="map"
            onDrag={onMoveMap}
            // onDragEnd={onMoveEndMap}
            onContextMenu={onContextMenu}
          />
        </MapWindow>
        <WReset onClick={() => setMark([])}>
          <img src={reset} alt="reset" />
        </WReset>
        {mark?.map((mark) => (
          <Marker
            src={marker}
            onContextMenu={blockContextMenu}
            style={{ top: `${mark?.top}px`, left: `${mark?.left}px` }}
          />
        ))}
      </WMap>
    </SApp>
  );
}

export default App;
