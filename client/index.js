function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocationToServer, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function sendLocationToServer(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const locationData = {
    lat: latitude,
    lng: longitude,
  };

  // Make a POST request to the server with the location data
  const response = axios.post(
    "http://localhost:5500/api/location",
    locationData
  );
  // Display the nearby places returned from the server
  response.then((res) => {
    res.data.map((name) => {
      console.log(name);
      document.getElementById("nearby-places").innerHTML = name.adress;
    });
  });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
