var domain = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/';
var iconTime = 0;
var navItemsOff = "-65px";
var navItemsOn = "0px"; 
var slideNum = 1;
var sectionType = "";
var sectionName = "intro";
var deviceState = "off";
var newWinWidth = $(window).width();
var newWinHeight = $(window).height();
var vid = document.getElementById("bgvid");
var audioPlay = "off";
var vidStatus = "on";
var startup = "natural";
var startPos = 0;
var sound = "";
var scPos = 0;
var previewMode = "on";
var previewSize = 0;
var preMsg = "on";
var galTimer;
var serTimer;
var sheight;
var btnTop = "30px";
var navClass;
var navPos = "off";
// XML //
var fwPos = -1;
var Title = [];
var Sub = [];
var Product = [];
var Building = [];
var Images = [];
var Images2 = [];
// NAV //
var navItems = ["Home","Our Business","Our People","Products","Board","Contact Us"];
var navUrl = ["#Home","#About","people.html","products.html","#Board","contact.html"];
//var navUrl = ["#Home","about/index.html","work/index.html","products/index.html","contact/"];

// LOAD PLUGINS //
$(document).ready(function(){
    // Load XML WORK //
    $.ajax({
        type: "GET",
        url: "home.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('Project').each(function(){
                Title.push($(this).find('Title').text());
                Sub.push($(this).find('Sub').text());
                Product.push($(this).find('Product').text());
                Building.push($(this).find('Building').text());
                Images.push($(this).find('Images').attr('Image'));
                Images2.push($(this).find('Images2').attr('Image2'));
            });
        }
    });
    
    // Load Audio //
    sound = new Howl({
        src: ['audio/sage-loop1.mp3'],
        loop:1,
        sprite: {
        main: [0, 100000, true]
    }
    });
    // Slick Slider //
    $(".slider").slick({
        accessibility : true,
        autoplay : true,
        touchMove : true,
        speed : 1000,
        infinite: true,
        pauseOnHover : false,
        prevArrow: $('.prev'),
        nextArrow: $('.next')
        
    });
    $(".mslider").slick({
        accessibility : false,
        autoplay : true,
        fade: true,
        speed : 1000,
        arrows: false,
        infinite: true,
        pauseOnHover : false
    });
    // Scrollify //
    $.scrollify({
        section : ".panel",
        easing: "easeInQuint",
        scrollSpeed: 1000,
        offset : 0,
        scrollbars: true,
        before:function() {},
        after:function() {
            findUrlpath();
        },
        afterResize:function() {}
    });
    // Open Stage Elements //
	(function($){
        $(window).on("load",function(){
            $(".homewrap").mCustomScrollbar({
                theme:"minimal",alwaysShowScrollbar: 2
            });
            
        });
    })(jQuery);
	
	(function($){
        $(window).on("load",function(){
            $(".homewrap2").mCustomScrollbar({
                theme:"minimal",alwaysShowScrollbar: 2
            });
            
        });
    })(jQuery);
	
    buildNavigation();
    //sound.play("main");
    //sound.fade(0, 1, 2000);
    previewSize = $('.preview-mode-container').width() - 107 + "px";
});

// PRELOADER //
//startup//

$(".pl-line1").animate({marginLeft: "-60px",opacity:1},800,"easeInQuint");
$(".pl-line2").animate({marginLeft: "-60px",opacity:1},800,"easeInQuint",function(){
    $(".pl-header").delay(100).animate({height: "61px"},800,"easeOutQuint",function(){
        $(".pl-info").animate({opacity: 1},1000,"easeOutQuint",function(){
            $(".pl-loader").animate({opacity:1},800,"easeInQuint");
        });
    });
});    

//onload//
$(window).load(function() {
    startupScreen();   
});

function startupScreen(){
    startPos = 1;
    $(".preloader").delay(2000).animate({opacity: 0},600,"easeInQuint",function(){
        videoPlayState();
        $(".top-curtain").animate({height: "0%"},2500,"easeOutQuint");
        $(".bottom-curtain").animate({height: "0%"},2500,"easeOutQuint",function(){
            $(".preloader").css("display", "none");
            intialiseSection("home-on");
        });
        togglePreviewMode("off");
        populateGallery1();
        populateProducts();
    });
}
// INTIALSE Fixed Elements //
function previewModeStart(){
    $(".pm-ball").animate({width: "8px",height: "8px"},800,"easeOutQuint",function(){
        $(".pm-bullets").find("li").each(function(){
            $(this).animate({opacity:0.2},500,"linear");
        });
        $(".pm-arrow").delay(300).animate({bottom: "-32px"},500,"linear",function(){
            $(".static-number").animate({marginTop: "0"},800,"easeOutBack");
            $(".counter-number").animate({marginTop: "0"},800,"easeOutBack");
            $(".sn2-2").animate({marginTop: "0"},600,"easeOutBack",function(){
                
                $(".sn2-1").animate({width: "100%"},800,"easeInQuint");
                $(".pt-outer-bar").delay(750).animate({width: previewSize},800,"easeInQuint",function(){
                    togglePreviewMode("on");
                });
                $(".ptc-ul").animate({opacity:1},500,"linear");
            });
        });
    });
}
function resizeElements(){
    var xnum1 = $(".sage-logo").width()
	//$(".text").width(xnum1);
    $(".sl-outline img").width(xnum1);
    $(".sl-solid img").width(xnum1);
    previewSize = $('.preview-mode-container').width() - 107 + "px";
}
// INTIALISE Section //
function intialiseSection(section){
    
    switch (section){
		case "start-up":
        $(".bottom-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".top-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".copyright-wrapper").animate({bottom: "0"},1200,"easeOutBack");
        $(".btn-menu").delay(450).animate({top: btnTop,opacity: 1},600,"easeOutBack",function(){
            previewModeStart();
        });
        break;
        case "home-on":
        resizeElements();
        $(".sl-outline").animate({width: "100%"},1000,"easeInQuint");
            $(".sl-solid").animate({width: "100%"},1200,"easeOutQuint");
            $(".sage-name img").animate({marginLeft: "0"},600,"easeOutQuint");
            $(".sage-slogan ").animate({marginLeft: "0"},600,"easeOutQuint");
            intialiseSection("start-up");
        
        /**case "start-up":
        $(".bottom-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".top-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".copyright-wrapper").animate({bottom: "0"},1200,"easeOutBack");
        $(".btn-menu").delay(450).animate({top: btnTop,opacity: 1},600,"easeOutBack",function(){
            previewModeStart();
        });
        break;
        case "home-on":
        resizeElements();
		$(".bottom-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".top-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".copyright-wrapper").animate({bottom: "0"},1200,"easeOutBack");
        $(".btn-menu").delay(450).animate({top: btnTop,opacity: 1},600,"easeOutBack",function(){
            previewModeStart();			
        });
		$(".sage-logo2 img").stop().animate({top: "0px"},500,"easeInQuint");
        $(".sl-outline").animate({width: "100%"},1000,"easeInQuint",function(){
            $(".sl-solid").animate({width: "100%"},1200,"easeOutQuint");
            $(".sage-name img").animate({marginLeft: "0"},600,"easeOutQuint");
            $(".sage-slogan img").animate({marginLeft: "0"},600,"easeOutQuint",function(){
                intialiseSection("start-up");
            });
			
        });*/	
        break;
        case "work":
        getFeaturedWork("up");
        break;
        case "service":
        rotateServices("up");
        break;
    }//navElements("show");
}
// NAVIGATION //
function buildNavigation(){
    for(var i = 0; i < navItems.length; i++) {
        $('#navCon').append(
            $('<li/>',{class: "nbtn"}).attr("data-nav-name",navUrl[i]).html(navItems[i]).append(
                $('<div/>',{class: "hover-nav"}).html(navItems[i])
            )
        );
        navClass = $('.nbtn');
        bindNavButton();
    }
}
function bindNavButton(){
    $(navClass).click(function(){
        var thisUrl = $(this).data("nav-name");
        getUrlPath(thisUrl);
		if(thisUrl=="#Home"){
			displayNavItems("hide");
        $(".menu-display img").stop().animate({top: "0px"},500,"easeInQuint");
        navPos = "off";
		}
			/*$("html, body").animate({
				scrollTop: $(thisUrl).offset().top
			});*/
        }).mouseover(function() {
            $(".hover-nav", this).stop().animate({width: "0%"},600,"easeOutQuint");
        }).mouseout(function() {
            $(".hover-nav", this).stop().animate({width: "100%"},600,"easeInQuint");   
    });
}
// ---------- //

// HOME GALLERY //
function getFeaturedWork(direction){
    switch(direction){
        case "up":
        fwPos ++;
        break;
        case "down":
        fwPos --;
        break;
    }
    if(fwPos>3){
        fwPos = 0;
    }else if(fwPos<0){
        fwPos = 3;
    }
    //var newImages = Images[fwPos].split('_');
	
	
	var newImages = ["images/pngs/6.jpg","images/pngs/7.jpg"];
	
	$(".feature-pic1").stop().animate({marginTop: "-200px",opacity: 0},800,"easeInQuint",function(){
        $(".feature-pic1").css('background-image', 'url(' + newImages[0] + ')');
        $(this).stop().delay(500).animate({marginTop: "0px",opacity: 1},800,"easeOutBack");
    });
    $(".feature-pic2").stop().animate({marginTop: "200px",opacity: 0},800,"easeInQuint",function(){
        $(".feature-pic2").css('background-image', 'url(' + newImages[1] + ')');
        $(this).stop().delay(500).animate({marginTop: "0px",opacity: 1},800,"easeOutBack");
        rotateGalleryCopy();
    });
	

    /**var newImages = ["images/work/car.jpg","images/work/station.png",
	"images/work/station.png","images/work/pump.jpg"];
	var newImages2 = ["images/work/repair.jpg","images/work/pump.jpg",
	"images/work/truck.jpg","images/work/truck.jpg"];

		$(".feature-pic1").stop().animate({marginTop: "-200px",opacity: 0},800,"easeInQuint",function(){
        $(".feature-pic1").css('background-image', 'url(' + newImages[fwPos] + ')');
        $(this).stop().delay(500).animate({marginTop: "0px",opacity: 1},800,"easeOutBack");
    });
    $(".feature-pic2").stop().animate({marginTop: "200px",opacity: 0},800,"easeInQuint",function(){
        $(".feature-pic2").css('background-image', 'url(' + newImages2[fwPos] + ')');
        $(this).stop().delay(500).animate({marginTop: "0px",opacity: 1},800,"easeOutBack");
        rotateGalleryCopy();
    });*/
}

// Automatic gallery Slide //
function startAutoGallery(){
    if(previewMode == "off"){
        stopAutoGallery();
    }else{
        galTimer = setTimeout(function(){getFeaturedWork("up");autoRotateGallery("on");}, 4500);
    }
}
function stopAutoGallery(){
     clearTimeout(galTimer);
}
function autoRotateGallery(autoMode){
    switch (autoMode){
        case "on":
        startAutoGallery();
        break;
        default:
        stopAutoGallery();
        break;
    }
}
// Rotate Project info //
function rotateGalleryCopy(){
    var sub1 = -(fwPos * 14)+"px";
    var tit1 = -(fwPos * 23)+"px";
	var tit2 = -(fwPos * 45)+"px";
    $(".pr-title-des ul").stop().animate({marginTop: sub1},600,"easeOutQuint");
    $(".pr-title-name ul").stop().animate({marginTop: tit1},600,"easeOutQuint");
    $(".pr-title-name2 ul").stop().animate({marginTop: sub1},600,"easeOutQuint"); 
	
	$(".wr-title-name ul").stop().animate({marginTop: tit2},600,"easeOutQuint");
}
// Populate Project Dom Elements //
function populateGallery1(){
    var i = 0;
    var k = 0;
    $( ".pr-title-des" ).find("li").each(function() {
        $( this ).html(Sub[i]);
        i++
    });
    $( ".pr-title-name" ).find("li").each(function() {
        $( this ).html(Title[k]);
        k++
    });
}
// END GALLERY //

// AUDIO CONTROLS //
function audioControl(){ 
    switch(audioPlay){
        case "on":
        sound.play();
        $(".menu-icon2 img").animate({top: "-20px"},800,"easeOutQuint");
        $(".menu-copy2").html("Music Off");
        audioPlay = "off";
        break;
        case "off":
        sound.pause();
        $(".menu-icon2 img").animate({top: "0px"},800,"easeOutQuint");
        $(".menu-copy2").html("Music On");
        audioPlay = "on";
        break;
        case "fadeout":
        sound.fade(1, 0, 1000);
        audioPlay = "on";
        break;
    }
}
// SCREEN POSITION FUNCTION //
function findUrlpath() 
{
    var hash = $(location).attr('href');
    switch(hash) {
		case domain:
        autoRotateGallery("off");
        navElements("show");
        scPos = 0;
        rotateScreenPosition();
        getNextScreenPos();
        break;
        case domain + "#Home":
        autoRotateGallery("off");
        navElements("show");
        scPos = 0;
        rotateScreenPosition();
        getNextScreenPos();
        break;
        case domain + "#About":
        autoRotateGallery("off");
        navElements("show");
        scPos = 1;
        rotateScreenPosition();
        getNextScreenPos();
        break;
        case domain + "#Work":
        navElements("show");
        intialiseSection("work");
        autoRotateGallery("on");
        scPos = 2;
        rotateScreenPosition();
        getNextScreenPos();
        break;
		case domain + "#Excellence":
		autoRotateGallery("off");
        navElements("show");
        scPos = 3;
        rotateScreenPosition();
        getNextScreenPos();
        break;
		case domain + "#Value":
		autoRotateGallery("off");
        navElements("show");
        scPos = 4;
        rotateScreenPosition();
        getNextScreenPos();
        break;
		case domain + "#Blueprint":
		autoRotateGallery("off");
        navElements("show");
        scPos = 5;
        rotateScreenPosition();
        getNextScreenPos();
        break;
        case domain + "#Products":
        autoRotateGallery("off");
        autoRotateServices("on");
        intialiseSection("service")
        navElements("show");
        scPos = 6;
        rotateScreenPosition();
        getNextScreenPos();
        break;
		case domain + "#Board":
		autoRotateGallery("off");
        navElements("show");
        scPos = 7;
        rotateScreenPosition();
        getNextScreenPos();
        break;
        /**case domain + "#Clients":
        autoRotateGallery("off");
        autoRotateServices("on");
        navElements("show");
        scPos = 7;
        rotateScreenPosition();
        getNextScreenPos();
        break;*/
        case domain + "#Contact":
        autoRotateGallery("off");
        navElements("show");
        scPos = 8;
        rotateScreenPosition();
        getNextScreenPos();
        break;
        default:
        scPos = 0;
        autoRotateGallery("off");
        navElements("hide");
        break;
    } 
}
// PREVIEW MODE //
//Mousewheel detect//

document.addEventListener("wheel",function(){
    // Disable Mouse Scrolling //
}); 

function previewMessage(msg){
    switch (msg){
        case "off":
        togglePreviewMode("off");
        $(".premode-alert p").html('Preview Mode Off');
        $(".premode-alert").css("display","block");
        $(".premode-alert p").stop().animate({opacity: 1},600,"easeOutQuint",function(){
            $(".premode-alert p").stop().delay(5000).animate({opacity: 0},3000,"easeOutQuint");
        });
        break;
        default:
        $(".premode-alert p").html('Preview Mode On');
        $(".premode-alert").css("display","block");
        $(".premode-alert p").stop().animate({opacity: 1},600,"easeOutQuint",function(){
            $(".premode-alert p").stop().delay(5000).animate({opacity: 0},3000,"easeOutQuint");
        });
        break;
    }
    
}
function startPreview(){
    if(scPos==8 && previewMode == "on"){
		$(".pt-inner-bar").animate({width: "100%"},15000,"linear",function(){
            $(".pt-inner-bar").css({width: "0"});
            resetPreview();
        });
        //resetPreview();
    }else if(previewMode == "off"){
        $(".pt-inner-bar").stop();
        $(".pt-inner-bar").animate({width: "0%"},600,"linear");
    }else if(scPos < 8 && previewMode == "on"){
        $(".pt-inner-bar").animate({width: "100%"},15000,"linear",function(){
            $(".pt-inner-bar").css({width: "0"});
            $.scrollify.next();
        });
    }
}
function resetPreview(){
    scPos = 0;
    $.scrollify.move("#Home");
    startPreview();
    $(".counter-number ul").stop().animate({marginTop: "0px"},600,"easeOutQuint",function(){
        $(".pm-highlight").css({left: "3px"});
    });
}
function getNextScreenPos(){
    var count2 = 3 + (scPos * 19) + "px";
    $(".pm-ball").animate({width: "0",height: "0"},800,"easeOutQuint",function(){
        $(".pm-highlight").css({left: count2});
        $(".pm-ball").animate({width: "8px",height: "8px"},800,"easeOutQuint");
    });
}
function rotateScreenPosition(){
    var count1 = -(scPos * 40)+"px";
    $(".counter-number ul").stop().animate({marginTop: count1},600,"easeOutQuint",function(){
        if(previewMode == "on"){
            startPreview();
        }
    });
}
function homePagination(){
    if(previewMode == "off"){
        rotateScreenPosition();
        getNextScreenPos();
    }
}
function togglePreviewMode(mode){
    switch(mode){
        case "off":
        previewMode = "off";
        $(".pm-on").css("color","#fff");
        $(".pm-off").css("color","#ffd700");
        $(".pt-inner-bar").stop();
        $(".pt-inner-bar").animate({width: "0%"},600,"linear");
        break;
        case "on":
        preMsg = 1;
        previewMode = "on";
        $(".pm-on").css("color","#ffd700");
        $(".pm-off").css("color","#fff");
        startPreview();
        break;
    }
}
// Hide / Show Logo & Footer//
function navElements(headpos){
    switch(headpos){
        case "hide":
        $(".sage-logo2 img").stop().animate({marginTop: "100px"},600,"easeInQuint");
        $(".sage-slogan2 img").stop().animate({marginLeft: "-200px"},600,"easeInQuint");
        $(".sage-name2 img").stop().animate({marginLeft: "-320px"},600,"easeInQuint");
        break;
        case "show":
        $(".sage-logo2 img").stop().animate({marginTop: "0px"},600,"easeInQuint");
        /**$(".sage-slogan2 img").stop().animate({marginLeft: "0px"},600,"easeInQuint");
        $(".sage-name2 img").stop().animate({marginLeft: "0px"},600,"easeInQuint");*/
        break;
    }
}
function toggleArrows(arrowpos){
    switch(arrowpos){
        case "hide":
        $(".btn-prev").animate({left: "-50px"},600,"easeInQuint");
        $(".btn-next").animate({right: "-50px"},600,"easeInQuint");
        break;
        case "show":
        $(".btn-prev").animate({left: "2.2%"},600,"easeInQuint");
        $(".btn-next").animate({right: "2.2%"},600,"easeInQuint");
        break;
    }
}


function transSection(transpos){
    $('.zi1').css('zIndex', '7');
    switch(transpos){
        case "hide":
        $(".top-curtain").stop().animate({height: "0"},1000,"easeOutQuint");
        $(".bottom-curtain").stop().animate({height: "0"},1000,"easeOutQuint");
        break;
        case "show":
        $(".top-curtain").stop().animate({height: "50%"},1000,"easeInBack");
        $(".bottom-curtain").stop().animate({height: "50%"},1000,"easeInBack");
        break;
        case "nav":
        $(".top-curtain").stop().animate({height: "50%"},1000,"easeInBack");
        $(".bottom-curtain").stop().animate({height: "50%"},1000,"easeInBack",function(){
            displayNavItems("show");
        });
        break;
    }
}
// SERVICE BEHAVIOURS //

function stopAutoServices(){
     clearTimeout(serTimer);
}
function autoRotateServices(autoMode){
    switch (autoMode){
        case "on":
        startAutoServices();
        break;
        default:
        stopAutoServices();
        break;
    }
}
// Automatic Services Slide //
function startAutoServices(){
    if(previewMode == "off"){
        stopAutoServices();
    }else{
        serTimer = setTimeout(function(){rotateServices("next");autoRotateServices("off");}, 4500);
    }
}
function rotateServices(direction){
    switch(direction){
        case "up":
        fwPos ++;
        break;
        case "down":
        fwPos --;
        break;
    }
    if(fwPos>3){
        fwPos = 0;
    }else if(fwPos<0){
        fwPos = 3;
    }
    //var newImages = Images2[fwPos].split('_');
	var newImages = ["images/products/pumpp.jpg","images/products/repair.jpg","_images/image3.jpg",
  "_images/image4.jpg","_images/image5.jpg","_images/image6.jpg"];
    $(".product1-pic1").stop().animate({marginTop: "-200px",opacity: 0},800,"easeInQuint",function(){
        $(".product1-pic1").css('background-image', 'url(' + newImages[0] + ')');
        $(this).stop().delay(500).animate({marginTop: "0px",opacity: 1},800,"easeOutBack");
    });
    $(".product2-pic1").stop().animate({marginTop: "200px",opacity: 0},800,"easeInQuint",function(){
        $(".product2-pic1").css('background-image', 'url(' + newImages[1] + ')');
        $(this).stop().delay(500).animate({marginTop: "0px",opacity: 1},800,"easeOutBack");
        rotateProductCopy();
    });
    
}
function rotateProductCopy(){
    var sub1 = -(fwPos * 14)+"px";
    var tit1 = -(fwPos * 23)+"px";
	
	var tit2 = -(fwPos * 45)+"px";
    $(".pr-title-des3 ul").stop().animate({marginTop: sub1},600,"easeOutQuint");
    $(".pr-title-name3 ul").stop().animate({marginTop: tit1},600,"easeOutQuint");
    $(".pr-title-name4 ul").stop().animate({marginTop: sub1},600,"easeOutQuint");
	
	$(".wr-title-name ul").stop().animate({marginTop: tit2},600,"easeOutQuint");
}
// Populate Project Dom Elements //
function populateProducts(){
    var i = 0;
    var k = 0;
    $( ".pr-title-des3" ).find("li").each(function() {
        $( this ).html(Building[i]);
        i++
    });
    $( ".pr-title-name3" ).find("li").each(function() {
        $( this ).html(Product[k]);
        k++
    });
}
//* NAVIGATION *//
$(".btn-menu").click(function(){
    if(navPos == "on"){
        displayNavItems("hide");
        $(".menu-display img").stop().animate({top: "0px"},500,"easeInQuint");
        navPos = "off";
    }else{
        menuMechanism("open");
        $(".menu-display img").stop().animate({top: "-40px"},500,"easeInQuint");
        navPos = "on";
    }
    
    }).mouseover(function() {
        if(navPos == "off"){
            $(".menu-display img").stop().animate({top: "-20px"},500,"easeInQuint");
        }
    }).mouseout(function() {
        if(navPos == "off"){
            $(".menu-display img").stop().animate({top: "0px"},500,"easeInQuint");
        }
});



// Menu Open //
function menuMechanism(menuPos){
    switch (menuPos){
        case "open":
        $("#darkBg").animate({opacity: 0.8},500,"easeOutQuint");
        transSection("nav");
        $("nav").css("display","block");
        break;
        case "close":  
        $("#darkBg").animate({opacity: 0.6},500,"easeOutQuint");
        $("nav").css("display","none");
        transSection("hide");
        break;
    }
} 
function displayNavItems(display){
    var k = 0;
    var t = 0;
    switch (display){
        case "show":
        t = 1000;
        $("#navCon li").each(function(){
            $(".nav-container").stop().animate({opacity: 1},400,"easeInQuint");
            $(this).delay(t).animate({top: "0px",opacity: 1},800,"easeInQuint");
            $(".hover-nav",this).css("display","block");
            if(k == 0){
                $(".hover-nav",this).css("display","none");
            }
            k++;
            t-=100;
        });
        break;
        case "hide":
        t = 800;
        $("#navCon li").each(function(){
            $(this).delay(t).animate({top: "-50px",opacity: 0},200,"easeOutQuint");
            if(k == 5){
                $(".nav-container").stop().animate({opacity: 0},400,"easeInQuint");
                menuMechanism("close");
            }
            k++;
            t+=100;
        });
        break;
    }
}
function checkNavPos(){
    var newURL = $(location).attr('href');
}
function checkPreviewMode(){
    switch (previewMode){
        case "on":
        togglePreviewMode("off");
        break;
    }
}

function getUrlPath(url) 
{
   
    window.location.href = domain + url;

}
/* BUTTONS */

$(".scroll-up").click(function(){
    checkPreviewMode();
    $.scrollify.previous();
    }).mouseover(function() {
    }).mouseout(function() {
});
$(".scroll-down").click(function(){
    checkPreviewMode();
    $.scrollify.next();
    }).mouseover(function() {
    }).mouseout(function() {
});
$(".exmenu").click(function(){
    menuMechanism("close");
    }).mouseover(function() {
    }).mouseout(function() {
});
$("#navClose").click(function(){
    displayNavItems("hide");
    }).mouseover(function() {
    }).mouseout(function() {
});
$(".btn-music").click(function(){
    audioControl();
});



// HORIZONTAL ARROW DISPLAY 1 //


function loadNewVideo()
{
    var vidEm1 = '<iframe id="video" width="100%" height="100%" src="//player.vimeo.com/video/'+vidurl+'?title=0&amp;byline=0&amp;portrait=1&amp;autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    $(".work-bg-pic").html(vidEm1);
}

function destroyVideo()
{
    var vidEm1 = '';
    $(".video-container").html(vidEm1);
}


/* MOBILE DETECT */
$( window ).resize(function() {
    getWinSize();
    resizeElements();
    $(".pt-outer-bar").width(previewSize);
});

function getWinSize(){
    newWinWidth = $(window).width();
    newWinHeight = $(window).height();
    if(newWinWidth < 650){
        destroyVideo();
        getDeviceSize();
        btnTop = "10px";
    }
}

function videoPlayState(){
    switch(vidStatus){
        case "on":
        vid.play();
        break;
        case "off":
        // do nothing //
        break;
    }
}

function getDeviceSize()
{
    //$.scrollify.destroy();
    //$('.panel').css("height", newWinHeight + "px");
    deviceState = "on";
    navItemsOff = "-120px";
    navItemsOn = "10px";
    scrollIconValue = "35px";
    vidStatus = "off";
}

getWinSize();
