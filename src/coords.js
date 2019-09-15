(function () {
	var coords = location.pathname.match(/\/@-?\d{1,3}\.\d+?,-?\d{1,3}\.\d+?,\d+?\.?\d*?z\/?/g);
	if (coords !== null) {
		coords = coords[0].replace('@', '')
				.replace('z', '')
				.replace(/\//g, '')
				.split(',')
				.map(x => Number(x));
		var lat = coords[0];
		var long = coords[1];
		alert('Latitude = ' + lat + '\n' + 'Longitude = ' + long);
	} else alert('By some reason cannot get coordinates, sorry');
}());