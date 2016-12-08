/* global c3 moment startDate endDate points */

var usage = {}

function setUsage (data) {
  usage = data
}

function showUsage () {
  var start = startDate.format('YYYY-MM-DD')
  var end = endDate.format('YYYY-MM-DD')
  var columns = [['x'], ['Users'], ['Searches']]
  var i = 0
  usage.forEach(function (day) {
    var date = moment(day.date).add(106, 'days').format('YYYY-MM-DD')
    if (date >= start && date <= end) {
      if (points === 'days') {
        i++
      } else if (points === 'months') {
        if (date.substr(-2) === '01') {
          i++
        }
        date = new Date(date.substr(0, 8) + '01').getTime()
      }
      if (i) {
        columns[0][i] = date
        columns[1][i] = (columns[1][i] || 0) + day.users
        columns[2][i] = (columns[2][i] || 0) + day.searches
      }
    }
  })
  c3.generate({
    data: {
      x: 'x',
      xFormat: '%Y-%m-%d',
      columns: columns,
      types: {
        Users: 'area',
        Searches: 'area'
      },
      axes: {
        Users: 'y',
        Searches: 'y2'
      },
      colors: {
        Users: '#5b5',
        Searches: '#08c'
      }
    },
    point: {
      r: 4
    },
    axis: {
      x: {
        type: points === 'days' ? 'timeseries' : undefined,
        tick: {
          format: points === 'days' ? '%Y-%m-%d' : function (x) {
            return (new Date(x)).toISOString().substr(0, 7)
          }
        }
      },
      y: {
        label: {
          text: 'Users',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true,
        label: {
          text: 'Searches',
          position: 'outer-middle'
        }
      }
    },
    legend: {
      position: 'top'
    }
  })
}
