/* global $ moment showUsage */

var startDate = moment().subtract(29, 'days')
var endDate = moment()
var points = 'days'

$('#daterange')
  .daterangepicker({
    ranges: {
      'Last 7 Days': [moment().subtract(6, 'days'), new Date()],
      'Last 30 Days': [moment().subtract(29, 'days'), new Date()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      'This Year': [moment().startOf('year'), moment().endOf('year')],
      'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
    },
    opens: 'right',
    locale: {
      format: 'MMM D, YYYY'
    },
    startDate: startDate,
    endDate: endDate,
    alwaysShowCalendars: true
  }, function (start, end) {
    $('#daterange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })
  .on('apply.daterangepicker', showDateRange)

showUsage()

function showDateRange (event, picker) {
  startDate = picker.startDate
  endDate = picker.endDate
  showUsage()
}

$('#points button').on('click', function () {
  $(this).siblings().removeClass('active')
  $(this).addClass('active')
  points = $(this).val()
  showUsage()
})
