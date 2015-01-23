/*    // GLOBAL VARIABLES
    var ageFrequency = [];
    var ageArray = [];

    var newsArray = [];
    var magArray = [];
    var browsingArray = [];

    var newsReplaceArray = [];
    var magReplaceArray = [];
    var browsingReplaceArray = [];
    var minimalNewsData = [];

    // LOAD DEPENCIES
    google.load("visualization", "1", {
    	packages: ["corechart"]
    });

    // GET DATA FROM JSON FILE
    $.ajax({
    	"url": "js/data.json",
    	"dataType": "json",
    	contentType: "application/json"
    }).done(function(data) {

    	// PUSH DATA IN ARRAYS
    	$.each(data.data, function() {
    		ageArray.push(Math.round(this[10]));
    		newsArray.push(this[0]);
    		magArray.push(this[1]);
    		browsingArray.push(this[2]);
    	});

    	// Convert News Data to Integers
    	newsReplaceArray = ["Printed newspapers", "Digital news", "TV", "I don't consume the news"];
    	magReplaceArray = ["Printed magazines", "Digital magazines", "I don't read magazines"];
    	browsingReplaceArray = ["Tablet", "Computer", "Smartphone"];

    	for (var j = 0; j < newsReplaceArray.length; j++) {
	    	for (var i = 0; i < newsArray.length; i++) {
			    newsArray[i] = newsArray[i].replace(newsReplaceArray[j], j);
			}
    	}
    	for (var j = 0; j < magReplaceArray.length; j++) {
	    	for (var i = 0; i < newsArray.length; i++) {
			    magArray[i] = magArray[i].replace(magReplaceArray[j], j);
			}
    	}
    	for (var j = 0; j < browsingReplaceArray.length; j++) {
	    	for (var i = 0; i < browsingArray.length; i++) {
			    browsingArray[i] = browsingArray[i].replace(browsingReplaceArray[j], j);
			}
    	}

    	// AGE CHART
    	function drawAgeChart() {
    		var dataBlock = getFrequency(ageArray);
    		dataBlock.unshift(["Age", "Frequency"]);
    		var data = google.visualization.arrayToDataTable(dataBlock);
    		var ageMin = Math.min.apply(null, dataBlock[0]),
    			ageMax = Math.max.apply(null, dataBlock[0]);
    		var freMin = Math.min.apply(null, dataBlock[1]),
    			freMax = Math.max.apply(null, dataBlock[1]);
    		var options = {
    			hAxis: {
    				title: 'AGE',
    				minValue: ageMin,
    				maxValue: ageMax,
    				baselineColor: '#C9CDD9',
    				gridlines: {
    					color: '#C9CDD9'
    				},
    				textStyle: {
    					color: '#98CC30'
    				},
    				titleTextStyle: {
    					color: '#98CC30',
    					italic: 0,
    					bold: 1
    				}
    			},
    			vAxis: {
    				title: '№ OF PARTICIPANTS',
    				minValue: 0,
    				maxValue: freMax,
    				baselineColor: '#C9CDD9',
    				gridlines: {
    					color: '#C9CDD9'
    				},
    				textStyle: {
    					color: '#98CC30'
    				},
    				titleTextStyle: {
    					color: '#98CC30',
    					italic: 0,
    					bold: 1
    				}
    			},
    			legend: 'none',
    			backgroundColor: {
    				fill: 'transparent'
    			},
    			colors: ['#98CC30'],
    			fontName: 'Proxima Nova'
    		};
    		var chart = new google.visualization.AreaChart(document.getElementsByClassName('main__chart--age-frequency')[0]);
    		chart.draw(data, options);
    	}

    	function drawNewsChart() {
    		var dataBlock = getFrequency(newsArray);

    		dataBlock[0][0] = newsReplaceArray[0];
    		dataBlock[1][0] = newsReplaceArray[1];
    		dataBlock[2][0] = newsReplaceArray[2];
    		dataBlock[3][0] = newsReplaceArray[3];
    		dataBlock.unshift(["Type", "Percentage"]);

    		minimalNewsData.push(["Type", "Percentage"]);
    		minimalNewsData.push([dataBlock[2][0], dataBlock[2][1]]);
    		minimalNewsData.push(["Others" , 200 - dataBlock[1][1]]);
    		console.log(minimalNewsData);

    		var minimalNewsDataPercent = Math.round(minimalNewsData[1][1] * 100 / (minimalNewsData[2][1] + minimalNewsData[1][1]));

    		$(".value__news--digital").html(minimalNewsDataPercent + "%");
   
			var data = google.visualization.arrayToDataTable(minimalNewsData);
			var options = { legend: 'none', backgroundColor: { fill: 'transparent' }, colors: ['#98CC31', '#E9F2D6'], fontName: 'Proxima Nova', pieHole: 0.3 };
			var chart = new google.visualization.PieChart(document.getElementsByClassName('main__chart--news')[0]);
			
			chart.draw(data, options);
			console.log(data);
		}

    	function drawMagChart() {
    		var dataBlock = getFrequency(magArray);

    		dataBlock[0][0] = magReplaceArray[0];
    		dataBlock[1][0] = magReplaceArray[1];
    		dataBlock[2][0] = magReplaceArray[2];
    		dataBlock.unshift(["Type", "Percentage"]);

			var data = google.visualization.arrayToDataTable(dataBlock);
			var options = { backgroundColor: { fill: 'transparent' }, colors: ['#E23867', '#FC5281', '#FF6B9A', '#FF85B4'], fontName: 'Proxima Nova', pieHole: 0.3 };
			var chart = new google.visualization.PieChart(document.getElementsByClassName('main__chart--magazines')[0]);
			
			chart.draw(data, options);
		}

		function drawBrowsingChart() {
    		var dataBlock = getFrequency(browsingArray);

    		dataBlock[0][0] = browsingReplaceArray[0];
    		dataBlock[1][0] = browsingReplaceArray[1];
    		dataBlock[2][0] = browsingReplaceArray[2];
    		dataBlock.unshift(["Type", "Percentage"]);

			var data = google.visualization.arrayToDataTable(dataBlock);
			var options = { backgroundColor: { fill: 'transparent' }, colors: ['#E23867', '#FC5281', '#FF6B9A', '#FF85B4'], fontName: 'Proxima Nova', pieHole: 0.3 };
			var chart = new google.visualization.PieChart(document.getElementsByClassName('main__chart--browsing')[0]);
			
			chart.draw(data, options);
		}


    	// DRAW CHARTS
    	google.setOnLoadCallback(drawAgeChart);
    	google.setOnLoadCallback(drawNewsChart);
    	google.setOnLoadCallback(drawMagChart);
    	google.setOnLoadCallback(drawBrowsingChart);

    	// ######################################################################################################

    });

    // Get Age FREQUENCY by counting the occourencies
    function getFrequency(a) {
    		var result = [];
    		var end = [];

    		for (i = 0; i < a.length; ++i) {
    			if (!result[a[i]]) result[a[i]] = 0;
    			++result[a[i]];
    		}

    		for (i = 0; i < result.length; ++i) {
    			if (result[i] !== undefined) {
    				end.push([i, result[i]]);
    			}
    		}
    		return end;
    }

    function getPercentage(a) {
    		var result = [];
    		var end = [];

    		var all = null;
    		var percent = null;

    		for (i = 0; i < a.length; ++i) {
    			all = all + a[i][1];
    		}

    		for (i = 0; i < a.length; ++i) {
    			percent = a[i][1] * 100 / all;
    			result.push([i, percent]);
    		}

    		for (i = 0; i < result.length; ++i) {
    			if (result[i] !== undefined) {
    				end.push([result[i][0], result[i][1]]);
    			}
    		}

    		return end;
    }

    */