const sendLocation = async (latitude, longitude, areaHectares, path,crop, field_name, farmer_id) => {
    const url = "http://localhost:8000/api/v1/user/getLocation";
  
    const bodyData = {
      latitude,
      longitude,
      area: areaHectares,
      path,
      crop,
      field_name,
      farmer_id
    };
  
    try {
      const response = await fetch(url, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Inform the server that we're sending JSON
        },
        body: JSON.stringify(bodyData), // Convert the data object to a JSON string
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json(); // Parse the response data as JSON
      console.log("Response:", result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  export default sendLocation;