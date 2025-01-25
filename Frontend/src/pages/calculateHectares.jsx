import * as turf from "@turf/turf";

// Function to calculate hectares from coordinates
const calculateHectaresFromCoordinates = (coordinates) => {
  try {
    // Ensure the coordinates form a closed polygon by repeating the first point at the end
    if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || 
        coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
      coordinates.push(coordinates[0]);
    }

    // Create a polygon using the coordinates
    const polygon = turf.polygon([coordinates]);

    // Validate if the polygon is valid
    if (!turf.booleanValid(polygon)) {
      throw new Error("Invalid polygon geometry.");
    }

    // Calculate area in square meters
    const areaSqMeters = turf.area(polygon);

    // Convert area to hectares (1 hectare = 10,000 square meters)
    const areaHectares = areaSqMeters / 10000;

    return areaHectares;
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    return NaN;
  }
};

export default calculateHectaresFromCoordinates;
