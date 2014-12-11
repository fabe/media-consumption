    var ageFrequency = [];
    var ageArray = [];

    google.load("visualization", "1", {
    	packages: ["corechart"]
    });

    $.ajax({
    	"url": "js/data.json?callback=kimonoCallback",
    	"dataType": "json",
    	contentType: "application/json"
    }).done(function(data) {

    	$.each(data.data, function() {
    		ageArray.push(Math.round(this[10]));
    	});

    	function getAgeFrequency(a) {
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
    		end.unshift(["Age", "Frequency"]);
    		return end;
    	}

    	function drawChart() {
    		var dataBlock = getAgeFrequency(ageArray);

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
    					color: '#3A436A'
    				},
    				titleTextStyle: {
    					color: '#3A436A',
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
    					color: '#3A436A'
    				},
    				titleTextStyle: {
    					color: '#3A436A',
    					italic: 0,
    					bold: 1
    				}
    			},
    			legend: 'none',
    			backgroundColor: {
    				fill: 'transparent'
    			},
    			colors: ['#3A436A'],
    			fontName: 'Proxima Nova'
    		};

    		var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));

    		chart.draw(data, options);
    	}

    	google.setOnLoadCallback(drawChart);

    	// ######################################################################################################

    });

    $(function() {

    });