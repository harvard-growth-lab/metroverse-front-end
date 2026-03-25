import { extent } from "d3";

export type Latitude = number;
export type Longitude = number;
export type Coordinate = [Longitude, Latitude];

export const clusterSourceLayerId = "cluster_source";

export const togglePointer = (mapEl: any, cursor: string) => {
  mapEl.getCanvas().style.cursor = cursor;
};

export const removeWesternSahara = (map: any) => {
  // Hide disputed boundary between Morocco and Western Sahara.
  // The iso_3166_1 value is "EH-MA-dispute" for these features.
  const disputedBoundaryFilter: any[] = [
    "!=",
    ["get", "iso_3166_1"],
    "EH-MA-dispute",
  ];

  const boundaryLayers = [
    "admin-0-boundary",
    "admin-0-boundary-bg",
    "admin-0-boundary-disputed",
    "admin-0-boundary-disputed-bg",
    "admin-0-boundary-maritime-disputed",
    "admin-1-boundary",
    "admin-1-boundary-bg",
  ];

  boundaryLayers.forEach((id) => {
    if (map.getLayer(id)) {
      const old = map.getFilter(id);
      map.setFilter(
        id,
        old ? ["all", old, disputedBoundaryFilter] : disputedBoundaryFilter,
      );
    }
  });

  // Hide "Western Sahara" and "Laayoune" labels
  const nameFilter: any[] = [
    "!",
    [
      "in",
      ["get", "name_en"],
      ["literal", ["Western Sahara", "Laayoune", "Laâyoune"]],
    ],
  ];

  const nameFilter2: any[] = [
    "!",
    [
      "in",
      ["get", "name"],
      ["literal", ["Western Sahara", "Laayoune", "Laâyoune", "العيون", "الصحراء الغربية"]],
    ],
  ];

  const labelLayers = [
    "country-label",
    "country-label-lg",
    "country-label-md",
    "settlement-major-label",
    "settlement-minor-label",
    "settlement-subdivision-label",
    "state-label",
  ];

  labelLayers.forEach((id) => {
    if (map.getLayer(id)) {
      const old = map.getFilter(id);
      map.setFilter(
        id,
        old
          ? ["all", old, nameFilter, nameFilter2]
          : ["all", nameFilter, nameFilter2],
      );
    }
  });
};

export const applyWesternSaharaFilter = (map: any) => {
  if (map.isStyleLoaded()) {
    removeWesternSahara(map);
  } else {
    map.on("load", () => removeWesternSahara(map));
  }
};

export const getBounds = (
  coordinates: Coordinate[],
): [Coordinate, Coordinate] => {
  const allLatitudes: Latitude[] = [];
  const allLongitudes: Longitude[] = [];
  coordinates.forEach(([lng, lat]) => {
    allLatitudes.push(lat);
    allLongitudes.push(lng);
  });

  const [minLat, maxLat] = extent(allLatitudes);
  const [minLng, maxLng] = extent(allLongitudes);

  if (
    minLat === undefined ||
    maxLat === undefined ||
    minLng === undefined ||
    maxLng === undefined
  ) {
    return [
      [180, -90],
      [-180, 90],
    ];
  }

  return [
    [maxLng, minLat],
    [minLng, maxLat],
  ];
};
