<?php
?>
<!DOCTYPE html>
<html lang="sv-se">
<head>
<meta charset="utf-8">
<link rel='stylesheet' type='text/css'
	href=' http://nhl-statistics.com/school/inl1/mycss.css?v=11sllllaadsasaddgsdssda3'>
<link href='http://www.favicon.cc/logo3d/52110.png' rel='icon'
	type='image/x-icon' />
<meta name='description' content='Skolprojekt'>
<script src="plotly-latest.min.js"></script>
<title>JavaScript</title>
</head>
<body>
	<div id=mainheader>
		<header>
			<a href='index.php'> <img
				src='http://zstor.de/images/zstor/Hersteller/Mellanox/Spectrum_Logo_small.png'
				title='logo' alt='logo'></a>
			<h1>Plotly and Google Maps with AirBnB</h1>
			<p>Just beacause we can</p>
		</header>
	</div>
	<nav>
		<ul>
			<li><a href="">Home</a></li>
			<li><a href="">Link</a></li>
			<li><a href="">Another</a></li>
			<li><a href="">Fourth</a></li>
		</ul>
	</nav>
	<div id=pricerev class=plotlydiagram></div>
	<div id=histogram class=plotlydiagram></div>
		<div id=boxplot class=plotlydiagram></div>
				<div id=pie class=plotlydiagram></div>
		<div id=mapsss><iframe src="http://nhl-statistics.com/school/testinggooglemaps.php"></iframe></div>
	
	<div id=bigsection>
		<input type=text name=rutan id=rutan placeholder="Skriv in ett nummer" onfocusout="calc()">
		<input type=text id=changebg onfocusout='changeBg()' placeholder='Ändra bakgrund'>

		
	</div>

	<footer>
		<h1>Slut på det roliga</h1>
	</footer>
</body>
<script type="text/javascript" src=minjscript.js?v=j<?php print rand(0,1009990);?>>
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCT23pOlq8j-PCmuDVQFmcUB6xIBPrvREg&callback=initMap">
    </script>
</html>