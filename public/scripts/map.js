
    function initMap() {
      const location = { lat: 9.05107525009733, lng: -79.50457309325427 };
      const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 12,
        fullscreenControl: true // Enables fullscreen button
      });
    }
    window.onload = initMap;
  