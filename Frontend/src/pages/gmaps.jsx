
// import React, { useEffect, useRef } from "react";

// const MapComponent = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     let map;
//     let drawingManager;

//     // Define the initMap function globally
//     window.initMap = () => {
//       const center = { lat: -25.7479, lng: 28.2293 }; // Center of the map

//       // Initialize the map
//       map = new google.maps.Map(mapContainerRef.current, {
//         center,
//         zoom: 15,
//         mapTypeId: "satellite",
//       });

//       // Define polygon options
//       const polygonOptions = {
//         strokeColor: "#FF0000", // Border color of the polygon
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: "#FF0000", // Fill color of the polygon
//         fillOpacity: 0.35,
//         editable: true, // Allow editing of the polygon
//         draggable: true, // Allow dragging of the polygon
//       };

//       // Initialize the Drawing Manager
//       drawingManager = new google.maps.drawing.DrawingManager({
//         drawingMode: google.maps.drawing.OverlayType.POLYGON, // Set to polygon drawing mode
//         drawingControl: false, // Hide drawing controls
//         polygonOptions, // Apply the polygon options
//       });

//       // Attach the Drawing Manager to the map
//       drawingManager.setMap(map);

//       // Optional: Add an event listener for when the polygon is completed
//       google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
//         if (event.type === google.maps.drawing.OverlayType.POLYGON) {
//           console.log("Polygon drawn:", event.overlay.getPath().getArray());
//         }
//       });
//     };

//     // Dynamically load the Google Maps script with the drawing library
//     const script = document.createElement("script");
//     script.src =
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyBSkTG-2LWanM_u_1szwHqpnb8g-xDPa5I&libraries=drawing&callback=initMap";
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup script and Drawing Manager when component unmounts
//     return () => {
//       document.body.removeChild(script);
//       delete window.initMap;
//     };
//   }, []);

//   return (
//     <div
//       ref={mapContainerRef}
//       style={{ width: "100%", height: "500px", borderRadius: "8px" }}
//     >
//       {/* Map will be rendered inside this div */}
//     </div>
//   );
// };

// export default MapComponent;


// import React, { useEffect, useRef } from "react";
import calculateHectaresFromCoordinates from "./calculateHectares";
import sendLocation from "./sendLocation.js";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';





// const sendLocationData = async (latitude, longitude, areaHectares, path,crop, field_name, farmer_id) => {
//   const url = "http://localhost:8000/api/v1/user/getLocation";

//   const bodyData = {
//     latitude,
//     longitude,
//     area: areaHectares,
//     path,
//     crop,
//     field_name,
//     farmer_id
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST", // HTTP method
//       headers: {
//         "Content-Type": "application/json", // Inform the server that we're sending JSON
//       },
//       body: JSON.stringify(bodyData), // Convert the data object to a JSON string
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.json(); // Parse the response data as JSON
//     console.log("Response:", result);
//   } catch (error) {
//     console.error("Error sending data:", error);
//   }
// };

import React, { useEffect, useRef, useState } from "react";

const MapComponent = () => {
  const navigate = useNavigate()
  const handleSubmit = (latitude, longitude, areaHectares, path,crop,field_name,farmer_id) => {
    sendLocation(latitude, longitude, areaHectares, path,crop,field_name,farmer_id);
    navigate("/dashboard")
  };

  const mapContainerRef = useRef(null);
  const [path,setPath]=useState([[0,0]]);
  const [area, setArea] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [crop, setCrop] = useState("");
  const [field_name, setFieldName] = useState("");
  const farmer_id = "67938155990ec09219d061a5";


  // let area=0,latitude=0,longitude=0;
  useEffect(() => {
    let map;
    let drawingManager;
    let polygon = null; // Holds the user-drawn polygon

    // Define the initMap function globally
    window.initMap = () => {
      const center = { lat: -25.7479, lng: 28.2293 }; // Center of the map

      // Initialize the map
      map = new google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 15,
        mapTypeId: "satellite",
      });

      // Define polygon options
      const polygonOptions = {
        strokeColor: "#FF0000", // Border color of the polygon
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000", // Fill color of the polygon
        fillOpacity: 0.35,
        editable: true, // Allow editing of the polygon
        draggable: true, // Allow dragging of the polygon
      };

      // Initialize the Drawing Manager
      drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON, // Set to polygon drawing mode
        drawingControl: false, // Hide drawing controls
        polygonOptions, // Apply the polygon options
      });

      // Attach the Drawing Manager to the map
      drawingManager.setMap(map);

      // Add an event listener for polygon drawing completion
      google.maps.event.addListener(drawingManager, "overlaycomplete", (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          // Clear any existing user-drawn polygon before drawing a new one
          if (polygon) polygon.setMap(null);

          polygon = event.overlay;

          const paths = polygon
            .getPath()
            .getArray()
            .map((point) => [point.lat(), point.lng()]);

          console.log("Polygon drawn:", paths); // Print the polygon coordinates to the console
          // area = calculateHectaresFromCoordinates(paths);
          setPath(paths);
          setArea(calculateHectaresFromCoordinates(paths));
          console.log("Area: ",area);
          calculateAndSetAverages(paths);
          // Disable further drawing after one polygon
          drawingManager.setDrawingMode(null);

          // Enable editing for the drawn polygon
          enablePolygonEditing(polygon);
        }
      });

      // Initialize autocomplete for location search
      initializeAutocomplete(map);
    };

    // Enable editing for the drawn polygon
    const enablePolygonEditing = (polygon) => {
      google.maps.event.addListener(polygon.getPath(), "set_at", () => {
        const paths = polygon
          .getPath()
          .getArray()
          .map((point) => [point.lat(), point.lng()]);
        console.log("Polygon edited:", paths);
        // area = calculateHectaresFromCoordinates(paths);
        calculateAndSetAverages(paths);
        setPath(paths);
        setArea(calculateHectaresFromCoordinates(paths));
      });

      google.maps.event.addListener(polygon.getPath(), "insert_at", () => {
        const paths = polygon
          .getPath()
          .getArray()
          .map((point) => [point.lat(), point.lng()]);
        console.log("Polygon edited (new point added):", paths);
        // area = calculateHectaresFromCoordinates(paths);
        calculateAndSetAverages(paths);
        setPath(paths);
        setArea(calculateHectaresFromCoordinates(paths));

      });
    };

    // Initialize autocomplete functionality
    const initializeAutocomplete = (map) => {
      const input = document.createElement("input");
      input.id = "search-input";
      input.placeholder = "Search location";
      input.style =
        "position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 300px; padding: 10px; z-index: 5;";

      document.body.appendChild(input);

      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          console.error("Place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
      });
    };

    // Dynamically load the Google Maps script with the drawing and places libraries
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBSkTG-2LWanM_u_1szwHqpnb8g-xDPa5I&libraries=drawing,places&callback=initMap";
    script.async = true;
    document.body.appendChild(script);


    const calculateAndSetAverages = (paths) => {
      let totalLatitude = 0;
      let totalLongitude = 0;

      paths.forEach(([lat, lng]) => {
        totalLatitude += lat;
        totalLongitude += lng;
      });

      setLatitude(totalLatitude / paths.length);
      setLongitude (totalLongitude / paths.length);

      console.log("Average Latitude:", latitude);
      // sendLocationData(latitude,longitude,area);
      console.log("Average Longitude:", longitude);
    };


    // Cleanup script and event listeners when component unmounts
    return () => {
      document.body.removeChild(script);
      delete window.initMap;
    };


    


  }, []);

  // return (
  //   <div>

  //       <div>
  //         <label htmlFor="crop">Crop Name:</label>
  //         <input
  //           type="text"
  //           id="crop"
  //           placeholder="Enter crop name"
  //           value={crop}
  //           onChange={(e) => setCrop(e.target.value)}
  //         />

  //         <label htmlFor="field_name">Field Name:</label>
  //         <input
  //           type="text"
  //           id="fieldName"
  //           placeholder="Enter field name"
  //           value={field_name}
  //           onChange={(e) => setFieldName(e.target.value)}
  //         />

  //         <button onClick={() =>handleSubmit(latitude, longitude, area, path,crop,field_name,farmer_id)}>Submit</button>
  //       </div>

      
  //   <div
  //     ref={mapContainerRef}
  //     style={{ width: "100%", height: "500px", borderRadius: "8px" }}
  //   >
  //     {/* Map will be rendered inside this div */}
  //   </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-white text-white p-8">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mx-auto bg-white text-black rounded-lg shadow-lg p-6 mb-8 flex justify-between"
  >
   <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
  Crop Information
</h2>
<div className="flex flex-col items-center justify-center gap-6">
  {/* Form Container */}
  <div className="flex items-center justify-between w-full max-w-4xl gap-6">
    {/* Crop Name Input */}
    <div className="flex flex-col w-1/3">
      <label
        htmlFor="crop"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Crop Name:
      </label>
      <motion.input
        whileFocus={{ scale: 1.05 }}
        type="text"
        id="crop"
        placeholder="Enter crop name"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
      />
    </div>

    {/* Field Name Input */}
    <div className="flex flex-col w-1/3">
      <label
        htmlFor="fieldName"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Field Name:
      </label>
      <motion.input
        whileFocus={{ scale: 1.05 }}
        type="text"
        id="fieldName"
        placeholder="Enter field name"
        value={field_name}
        onChange={(e) => setFieldName(e.target.value)}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
      />
    </div>
  </div>

  {/* Submit Button */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() =>
      handleSubmit(latitude, longitude, area, path, crop, field_name, farmer_id)
    }
    className="px-6 py-3 bg-orange-500 text-white text-sm font-semibold rounded-md hover:bg-orange-600 transition duration-300 ease-in-out shadow-md"
  >
    Submit
  </motion.button>
</div>

  </motion.div>

  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="relative w-full h-[500px] rounded-lg overflow-hidden"
  >
    <div
      ref={mapContainerRef}
      className="w-full h-full"
    >
      {/* Map will be rendered inside this div */}
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md"
    >
      <h3 className="text-lg font-semibold">Field Map</h3>
    </motion.div>
  </motion.div>
</div>
  );
};

export default MapComponent;

