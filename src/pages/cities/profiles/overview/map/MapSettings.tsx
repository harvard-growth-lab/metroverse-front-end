import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { applyWesternSaharaFilter } from "../../../../../components/map/Utils";

interface Props {
  map: any;
}

const MapSettings = ({ map }: Props) => {
  useEffect(() => {
    if (map) {
      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();
      applyWesternSaharaFilter(map);
    }
  }, [map]);
  return <></>;
};

export default MapSettings;
