<!DOCTYPE html>
<html>
<head>

<style>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
#map {
	height: 100%;
}
/* Optional: Makes the sample page fill the window. */
html,body {
	height: 100%;
	margin: 0;
	padding: 0;
}
</style>
<script async defer
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCT23pOlq8j-PCmuDVQFmcUB6xIBPrvREg&callback=initMap">
    </script>
</head>
<body>
	<div id="map"></div>
	<script>




/* Hjälper Johan

	mylist=[[1,40],[2,55],[3,70],[1,10]];
	var groupBy = function(xs, key) {
	  return xs.reduce(function(rv, x) {
	    (rv[x[key]] = rv[x[key]] || []).push(x);
	    return rv;
	  }, {});
	};
	console.log(groupBy(mylist,'0'));

*/
	setTimeout(function(){ 

	  loadJsonData("http://nhl-statistics.com/school/data.json");
		console.log("Väntar på google maps");
  }, 5000);
	 function getDataByKey(data, key)
	{
	  // returnerar hela jsontjofräset som en endimensionell array baserat på nyckel
	  var list = [];

	  for ( var i = 0; i < data.length; i++)
	  {
	    var nydata = data[i];
	    list[i] = nydata[key];

	  }
	  return list;
	}
		


	function myGoogleMaps(data)
	{
	  // Gör om arrayen till ett format som google maps gillar

	  var lat = getDataByKey(data, "latitude");
	  var long = getDataByKey(data, "longitude");
	  var latlong = [];
	  var jsondata = [];
	  for ( var i = 0; i < lat.length; i++)
	  {
	    var latte = lat[i];
	    var longe = long[i];
	    // latlong.push({latte,longe}) ;
	    jsondata.push({
	      geometry : {
	        type : "Point",
	        coordinates : [ latte, longe ]
	      }
	    });
	  }
	

	  for (var i=0;i<jsondata.length;i++)
	  {
		 // console.log(jsondata[i].geometry.coordinates);
		  var coords = jsondata[i].geometry.coordinates;
		  var lat=coords[0];
	//	  console.log(lat);
		  var long=coords[1];
		//  console.log(long);
		  
          var latLng = new google.maps.LatLng(lat.toString(), long.toString());
          var marker = new google.maps.Marker({
            position: latLng,
            title:data[i].room_type+" \nMinimum stay: "+data[i].minstay+"\nPrice: "+data[i].price,
            map: map
          });

 
       }
	  

     
	}//slut på function googlemaps
		
    function loadJsonData(url)
    {

      // Hämtar jsondatat och skickar det vidare main function
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function()
      {
        if (this.readyState == 4 && this.status == 200)
        {
          var myObj = JSON.parse(this.responseText);

          myGoogleMaps(myObj);

        }
      };

      xmlhttp.open("GET", url, true);
      xmlhttp.send();

    }


    
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: new google.maps.LatLng(61.2,-149.73),
          mapTypeId: 'terrain'
        });

      
      }

     
    </script>
	
</body>
</html>