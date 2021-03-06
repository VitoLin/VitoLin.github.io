let nonChart = document.getElementById('Nonconforming').getContext('2d');

    // get the stats
    var vendorQuickStats = JSON.parse(sessionStorage.getItem("vendorQuickStats"));
    // console.log(vendorQuickStats);

    //convert dictionary key and values to arrays
    var dictKeys = [];
    var dictValues = [];

    for (key in vendorQuickStats){
      dictKeys.push(key);
      dictValues.push(vendorQuickStats[key][1]);
    }

    dictKeys.shift();
    dictValues.shift();

    // console.log(vendorQuickStats);
    // console.log(dictKeys);
    // console.log(dictValues);

    var colors = randomColor({hue: 'random', count: dictKeys.length});

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Ubuntu';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#FFFFFF';

    let NonChart = new Chart(nonChart, {
      type:'horizontalBar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels: dictKeys,
        datasets:[{
          label:'Percent Nonconforming',
          data: dictValues,
          backgroundColor: colors,
          hoverBorderWidth: 3,
          hoverBorderColor:'#FFFFFF'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Percent Nonconforming per Vendor',
          fontSize:16
        },
        legend:{
          display: false,
          position:'right',
          alight: 'center',
          labels:{
            fontColor: "#FFFFFF"
          }
        },
        layout:{
          padding:{
            left:25,
            right:25,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        },
        scales: {
          xAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
      }
    });