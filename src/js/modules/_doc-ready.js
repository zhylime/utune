/*
  Every plugin initialization goes here.
 */
$(document).ready(function() {
  
  // console.log('%c Welcome to FELab, a MullenLowe Profero product. ', 'background: #c3a90a;\ncolor: #ffffff;\nfont-size: 18px;\nfont-family: "Helvetica Neue";\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px');
  
  $('[data-js-top-nav]').TopNav();
  $('[data-js-switch-tab]').SwitchTab();
  $('[data-js-skewing]').Skewing();
  $('[data-js-masonry]').MasonryGallery();
  //canvas的id名，星星颜色(hsla的hue色调)，星星数量，星星半径比，星星移动范围(值越大范围越小)，星星移动速度(值越大速度越慢),星星拖尾效果(0~1值越小拖尾越明显)  
  canvas('stars',0,100,60,2,500000,0.5);
  setTimeout(function(){
    $('[data-js-fullpage]').FullPage();
  }, 0);
  
  

});