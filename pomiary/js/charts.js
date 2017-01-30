var config = {
    results: 1200
}

var api_key;

//function load_api_key() {
//    $.getScript('/js/api_key.js', function () {
//        this.api_key = api_key;
//    });
//}

function drawCharts() {

    //load_api_key();
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(load_page_data);
}




function load_page_data() {

    var outData = new google.visualization.DataTable();
    outData.addColumn('datetime', 'Time');
    outData.addColumn('number', 'Out');

    var inData = new google.visualization.DataTable();
    inData.addColumn('datetime', 'Time');
    inData.addColumn('number', 'Living');
    inData.addColumn('number', 'Bedroom');

    var powerData = new google.visualization.DataTable();
    powerData.addColumn('datetime', 'Time');
    powerData.addColumn('number', 'Power Temp');

    $.ajax({
        url: 'https://api.thingspeak.com/channels/107384/feeds.json', //?callback=?
        data: {
            'results': config.results,
            //            'api_key': api_key,
            'timezone': 'Europe/Warsaw'
        },
        success: function (data) {
            if (data) {
                $.each(data.feeds, function (i, row) {
                    outData.addRow([new Date(row.created_at),
                                          parseFloat(row.field2)
                                         ]);
                    inData.addRow([new Date(row.created_at),
                                          parseFloat(row.field1),
                                          parseFloat(row.field4)
                                         ]);
                    powerData.addRow([new Date(row.created_at),
                                          parseFloat(row.field3)
                                         ]);
                });
                drawOutChart(outData);
                drawInChart(inData);
                drawPowerChart(powerData);
            }
        },
    });
}

function drawOutChart(chart_data) {

    var options = {
        title: 'Out',
        curveType: 'function',
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal'
        },
        legend: {
            position: 'none'
        },
        hAxis: {
            format: 'HH:mm'
        }
    };

    var chart1_chart = new google.visualization.LineChart(document.getElementById('out_chart'));
    chart1_chart.draw(chart_data, options);
}

function drawInChart(chart_data) {

    var options = {
        title: 'In',
        curveType: 'function',
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
        },
        legend: {
            position: 'bottom'
        },
        hAxis: {
            format: 'HH:mm'
        }
    };

    var chart1_chart = new google.visualization.LineChart(document.getElementById('in_chart'));
    chart1_chart.draw(chart_data, options);
}

function drawPowerChart(chart_data) {

    var options = {
        title: 'Power',
        curveType: 'function',
        legend: {
            position: 'none'
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
        },
        hAxis: {
            format: 'HH:mm'
        }
    };

    var chart1_chart = new google.visualization.LineChart(document.getElementById('power_chart'));
    chart1_chart.draw(chart_data, options);
}
