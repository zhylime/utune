/*
  Every plugin initialization goes here.
 */
$(document).ready(function() {
  
  // console.log('%c Welcome to FELab, a MullenLowe Profero product. ', 'background: #c3a90a;\ncolor: #ffffff;\nfont-size: 18px;\nfont-family: "Helvetica Neue";\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px');
  
  $('[data-js-top-nav]').TopNav();

  $('[data-js-masonry]').MasonryGallery();

  setTimeout(function(){
    $('[data-js-fullpage]').FullPage();
  }, 0);
  
  

});