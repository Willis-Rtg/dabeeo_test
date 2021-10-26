import map from "./assets/map.png";
import reset from "./assets/reset.png";
import marker from "./assets/marker.png";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

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
const Map = styled.div`
  width: 1024px;
  height: 768px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MapImg = styled.img``;
const Marker = styled.img`
  position: absolute;
  top: 20px;
  width: 70px;
  height: 85px;
`;

function App() {
  const [mark, setMark] = useState([]);
  const mapRef = useRef();

  const onMoveMap = (e) => {
    console.log(e);
    const mapClientX = e.clientX;
    const mapClientY = e.clientY;
  };

  const onContextMenu = (e) => {
    blockContextMenu(e);
    const clientX = e.clientX;
    const clientY = e.clientY;

    const mapx = mapRef.current.getBoundingClientRect().x;
    const mapY = mapRef.current.getBoundingClientRect().y;
    setMark((prev) => [
      ...prev,
      { top: clientY - mapY - 50, left: clientX - mapx - 30 },
    ]);
  };

  const blockContextMenu = (e) => e.preventDefault();

  return (
    <SApp>
      <WMap>
        <Map ref={mapRef}>
          <MapImg
            src={map}
            alt="map"
            onDrag={onMoveMap}
            onContextMenu={onContextMenu}
          />
        </Map>
        <WReset onClick={() => setMark([])}>
          <img src={reset} alt="reset" />
        </WReset>
        {mark?.map((make) => (
          <Marker
            src={marker}
            onContextMenu={blockContextMenu}
            style={{ top: `${make?.top}px`, left: `${make?.left}px` }}
          />
        ))}
      </WMap>
    </SApp>
  );
}

export default App;
