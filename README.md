# index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SDN News - Highcharts Report</title>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <style>
        #container { height: 400px; max-width: 800px; margin: 0 auto; }
        .text-center { text-align: center; font-family: Arial, sans-serif; }
    </style>
</head>
<body>
    <div class="text-center">
        <h1>SDN NEWS - LIVE REPORT</h1>
        <p>Reported by: Jamil Ahmed Kalyal</p>
    </div>
    <div id="container"></div>
    <script>
        Highcharts.chart('container', {
            title: { text: 'Monthly Growth Data' },
            series: [{ data: [1, 3, 2, 4] }]
        });
    </script>
</body>
</html>
