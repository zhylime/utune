/*
  Every plugin initialization goes here.
 */
$(document).ready(function() {
  
 
  // homepage navigation
  $('[data-js-top-nav]').TopNav();



  $('[data-js-switch-tab]').SwitchTab();
  $('[data-js-skewing]').Skewing();
  $('[data-js-masonry]').MasonryGallery();
  $('[data-js-validate]').Validate();
  $('[data-js-stars]').Stars();

  // white box on contact page
  $('[data-js-white-box]').WhiteBox();
  
  // carousel on about-us page
  $('[data-js-owl-carousel]').OwlCarousel();

  // side bar
  $('[data-js-side-nav]').SideNav();

  // wedo-work popup gallery
  $.GalleryPopup();

  setTimeout(function(){
    $('[data-js-fullpage]').FullPage();
  }, 0);


  if($(".fancybox"))
    $(".fancybox").fancybox();

});