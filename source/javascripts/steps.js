import $ from 'jquery';

var step = 1;
var $steps = $('#code-box');
var $steps_list = $('li', $steps);
var steps = $steps_list.length;

$steps_list.attr('contenteditable', 'true');

var rockUpdate = function () {
  var $li = $('li:nth-child(' + step + ')', $steps);
  $('#style-tag').html($li.html());
  $steps.removeClass().addClass('step' + step);
  $('.current-step').html(step);
};

var html =
  // Tag styls
  '<style id="style-tag"></style>' +

  // Step indicator
  '<div class="current-step">1</div>' +

  // Controls
  '<aside class="controls"><button class="back js-back">Back</button><button class="next js-next">Next</button></aside>';

$("body").append(html);

var $next = $('.controls .next');
var $back = $('.controls .back');

$next.on('click', function () {
  if (++step > steps) step = 1;
  rockUpdate();
});

$back.on('click', function () {
  if (--step < 1) step = steps;
  rockUpdate();
});

rockUpdate();

$('body').keyup(function () {
  rockUpdate();
});