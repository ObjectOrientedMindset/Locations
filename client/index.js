function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocationToServer, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function sendLocationToServer(position) {
  const radius = document.getElementById("radius").value;
  // Check if radius is not empty
  if (radius === "") {
    alert("Please enter a radius");
    return;
  }
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const locationData = {
    lat: latitude,
    lng: longitude,
    rds: radius,
  };

  // Make a POST request to the server with the location data
  const response = await axios.post(
    "http://localhost:5500/api/location",
    locationData
  );
  console.log(response);
  // Display the nearby places returned from the server
  const nearbyPlaces = response.data.results;

  nearbyPlaces.forEach((place) => {
    place.poi.name === undefined
      ? (document.getElementById("place-name").innerHTML += "null" + "&nbsp;")
      : (document.getElementById("place-name").innerHTML +=
          place.poi.name + "&nbsp;");
    place.adress === undefined
      ? (document.getElementById("place-adress").innerHTML += "null" + "&nbsp;")
      : (document.getElementById("place-adress").innerHTML +=
          place.adress + "&nbsp;");
    place.position.latitude === undefined
      ? (document.getElementById("place-latitude").innerHTML +=
          "null" + "&nbsp;")
      : (document.getElementById("place-latitude").innerHTML +=
          place.position.latitude + "&nbsp;");
    place.position.longitude === undefined
      ? (document.getElementById("place-longitude").innerHTML +=
          "null" + "&nbsp;")
      : (document.getElementById("place-longitude").innerHTML +=
          place.position.longitude + "&nbsp;");

    console.log(place);
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
