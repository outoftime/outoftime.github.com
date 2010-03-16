$(function() {
	$slideShow = $('#slideShow');
	$slides = $slideShow.children('li');
  var $currentSlide;
  var slideCount = $slides.length;
  var currentIndex;

  var $keyControl = $('#keyControl input');
  $keyControl.focus();
  $('body').click(function() { setTimeout(function() { $keyControl.focus(); }, 100)});

  if (window.location.hash == '#last') {
    currentIndex = slideCount - 1;
  } else {
    currentIndex = 0;
  }

  var nextSlide = function() {
    if (currentIndex >= slideCount - 1) currentIndex = 0;
    else ++currentIndex;
    var $nextSlide = $slides.eq(currentIndex);
    $currentSlide.hide();
    $nextSlide.show();
    $currentSlide = $nextSlide;
  }

  var previousSlide = function() {
    if (currentIndex == 0) currentIndex = slideCount - 1;
    else --currentIndex;
    var $previousSlide = $slides.eq(currentIndex);
    $currentSlide.hide();
    $previousSlide.show();
    $currentSlide = $previousSlide;
  }

  $slideShow.click(nextSlide);

  $keyControl.keydown(function(eventObject) {
    switch (eventObject.keyCode) {
    case 39:
      nextSlide();
      break;
    case 37:
      previousSlide();
      break;
    }
  });

  viewportHeight = $(window).height();

	$slides.each(function(index) {
		var $slide = $(this);
    $headers = $slide.children('h1, h2, h3, h4, h5, h6');
    $content = $slide.children('p, ul, pre');
    headerHeight = 0;
    $headers.each(function(index) { headerHeight += $(this).outerHeight() });
    if ($content.length == 0) {
      $headers.eq(0).css('margin-top', (viewportHeight - headerHeight) / 3);
    } else {
      contentHeight = 0;
      $content.each(function() { contentHeight += $(this).outerHeight(); });
      $content.eq(0).css('margin-top', (viewportHeight - contentHeight) / 3 - headerHeight);
    }
		if (index != currentIndex) {
			$slide.hide();
		} else {
      $currentSlide = $slide;
    }
	});
});
