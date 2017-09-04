/*
  Every plugin initialization goes here.
 */
$(document).ready(function() {
  
  // console.log('%c Welcome to FELab, a MullenLowe Profero product. ', 'background: #c3a90a;\ncolor: #ffffff;\nfont-size: 18px;\nfont-family: "Helvetica Neue";\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px');
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


  if($(".fancybox").length)
    $(".fancybox").fancybox({
        loop : true ,
        prevEffect: 'elastic',
        nextEffect: 'elastic',
        helpers : {
            title : null
        }

    });
    $('.js-fancybox-thumb').on('click', function(evt) {
        evt.preventDefault();
        $(evt.target).siblings(".js-fancybox-img").trigger("click")
    });
  });





