var domain = "./";
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
var scPos = 2;
var previewMode = "on";
var previewSize = 0;
var preMsg = "on";
var galTimer;
var timerPos = "on";
var sheight;
var anyClass;
var btnTop = "30px";
var navPos = "off";
// XML //
var fwPos = -1;
var Title = [];
var Sub = [];
var Des = [];
var Architect = [];
var Value = [];
var Loc = [];
var Images = [];
var csNum = 0;
var aniNum = 0;
//WORK//
var bgTitle;
var bgLoc;
var newImages=[];
// NAV //
var navItems = ["Home","Our Business","Our People","Products","Board","Contact Us"];
var navUrl = ["#Home","#About","people.html","products.html","#Board","contact.html"];

// LOAD PLUGINS //
$(document).ready(function(){
    // Load XML WORK //
    $.ajax({
        type: "GET",
        url: "work.xml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('Project').each(function(){
                Title.push($(this).find('Title').text());
                Sub.push($(this).find('Sub').text());
                Des.push($(this).find('Description').text());
                Value.push($(this).find('Value').text());
                Architect.push($(this).find('Architect').text());
                Loc.push($(this).find('Location').text());
                Images.push($(this).find('Images').attr('Image'));
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
    $(".cs-slider").slick({
        accessibility : false,
        autoplay : true,
        speed : 1000,
        arrows: false,
        infinite: true,
        pauseOnHover : false
    });
    // Slick Slider //
    $(".slider").slick({
        accessibility : false,
        autoplay : true,
        speed : 1000,
        arrows: false,
        infinite: true,
        pauseOnHover : false
    });
    
    // Open Stage Elements //
    (function($){
        $(window).on("load",function(){
            $(".prowrap").mCustomScrollbar({
                theme:"minimal"
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
            populateWorkBg();
        });
    });
});    


//onload//
$(window).load(function() {
    startupScreen();   
});

function startupScreen(){
    startPos = 1;
    //$(".preloader").delay(2000).animate({opacity: 0},600,"easeInQuint",function(){
        $(".top-curtain").animate({height: "0%"},2500,"easeOutQuint");
        $(".bottom-curtain").animate({height: "0%"},2500,"easeOutQuint",function(){
            //$(".preloader").css("display", "none");
            intialiseSection("start-up");
        });
    //});
}

// INTIALISE Section //
function intialiseSection(section){
    
    switch (section){
        case "start-up":
        $(".bottom-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".top-stroke").animate({height: "150px"},800,"easeOutBack");
        $(".copyright-wrapper").animate({bottom: "0"},1200,"easeOutBack");
        $(".btn-menu").delay(450).animate({top: btnTop,opacity: 1},600,"easeOutBack",function(){
            navElements("show");
        });
        break;
        
    }
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
        }).mouseover(function() {
            $(".hover-nav", this).stop().animate({width: "0%"},600,"easeOutQuint");
        }).mouseout(function() {
            $(".hover-nav", this).stop().animate({width: "100%"},600,"easeInQuint");   
    });
}
// ---------- //
// HOME GALLERY //

function bindButton(){
    $(anyClass).click(function(){
        csNum = $(this).data("number");
        intialiseProjects("case study");
        }).mouseover(function() {
            $(".blue-bg", this).stop().animate({width: "100%"},800,"easeOutQuint");
        }).mouseout(function() {
            $(".blue-bg", this).stop().animate({width: "0%"},800,"easeOutQuint");   
    });
}
function transWorkSections(section){
    switch (section){
        case "work1":
        $('.cs-slider').slick('slickPause');
        animateGalCopy("break");
        toggleButtons("view-hide");
        $(".big-header").stop().animate({top: "-150px"},800,"easeInQuint",function(){
            createWorkElements();
        });
        break;
    }
}
function toggleButtons(button){
    switch (button){
        case "view-show":
        $(".view-button").stop().animate({width: "toggle"},800,"easeOutQuint",function(){
            $(this).css("display","block");
            $(".view-button p").stop().animate({opacity: 1},800,"easeInQuint");
        });
        break;
        case "view-hide":
        $(".view-button p").stop().animate({opacity: 0},800,"easeOutQuint",function(){
            $(this).css("display","none");
            $(".view-button").stop().animate({width: "0%"},800,"easeInQuint");
        });
        break;
        case "project-show":
        $(".project-button").css({display: "block"});
        $(".pbtn1").stop().animate({marginTop: "2px",opacity: 1},600,"easeOutQuint");
        $(".pbtn2").stop().animate({marginTop: "2px",opacity: 1},800,"easeOutQuint");
        $(".pbtn3").stop().animate({marginTop: "2px",opacity: 1},1000,"easeOutQuint");
        break;
        case "project-hide":
        $(".pbtn1").stop().animate({marginTop: "50px",opacity: 0},600,"easeOutQuint");
        $(".pbtn2").stop().animate({marginTop: "50px",opacity: 0},800,"easeOutQuint");
        $(".pbtn3").stop().animate({marginTop: "50px",opacity: 0},1000,"easeOutQuint",function(){
            $(".project-button").css({display: "none"});
        });
        break;
    }
}
function intialiseProjects(project){
    switch (project){
        case "gallery":
        $(".project-container").stop().animate({top: "12%"},800,"easeOutQuint");
        break;
        case "gallery-back":      
        $(".projects-info-box").stop().animate({opacity: 0},800,"easeOutQuint",function(){
            $(".projects-info-box").css("display","none");
            $('#mCSB_1_container').css("top","0");
            $(".inner-pb").css("display", "block");
            $(".inner-pb").stop().animate({opacity: 1},1000,"easeInQuint");
        });
        break;
        case "case study":
        //vid.pause();
        $(".inner-pb").stop().animate({opacity: 0},1000,"easeInQuint",function(){
            $(this).css("display", "none");
            $('#mCSB_1_container').css("top","0");
            createCaseStudy();
            toggleCaseStudy("green");
            toggleButtons("project-show");
            $('.projects-info-box').css("display", "block");
            $(".projects-info-box").stop().animate({opacity: 1},800,"easeOutQuint");
            $(".pb-box-head1").stop().animate({width: "0%"},800,"easeOutQuint",function(){
                $(this).css("display","none");
                $(".pb-box-head2").css("display","block");
                $(".pb-box-head2").stop().animate({width: "100%"},800,"easeOutQuint");
            });
        });
        break;
    }
}
function createWorkElements(){
    $('#mCSB_1_container').append($('<div/>', {'class': 'inner-pb'}));

		newImages = ["images/products/repair.jpg","images/products/car.jpg","images/products/truck.jpg",
		"images/products/station.png"];
		var Title = ["VEHICON","REELAX",
		"SLGAS","BUSINESS TO BUSINESS"];
		var Sub = ["VEHICLE MAINTENANCE AND CONCIERGE SERVICES","ONE-STOP LIFESTYLE HUB",
		"SUPERIOR LIQUIFIED GAS","B2B-ES"];
		
	for(var i = 0; i < Title.length; i++) {
        //var newImages = Images[i].split(" ");
        $('.inner-pb').append(
            $('<div/>', {'class': 'project-box'}).attr("data-number",i)
            .append(
                $('<div/>', {'class': 'pb-wrapper','style': 'background-image:url("'+newImages[i]+'")'})
                .append(
                    '<img src="images/pngs/spacer-320x210.png">',
                     $('<div/>', {'class': 'blue-bg','style': 'width: 0%'})
                    ),
                $('<div/>', {'class': 'project-des','style': 'opacity:1'}).append(
                    $('<p/>', {'class': 'pd-head'}).html(Title[i]),
                    $('<p/>', {'class': 'pd-sub'}).html(Sub[i])
                )
               
            )
        );
    }
    anyClass = $(".project-box");
    bindButton();
    intialiseProjects("gallery");
}
function toggleCSTitle(condition){
    switch (condition){
        case "hide":
        $(".pb-sub1").stop().animate({marginBottom: "50px",opacity: 0},600,"easeOutQuint",function(){
            createCaseStudy();
            setTimeout(function(){toggleCSTitle("show")},800);
        });
        $(".pb-title1").delay(200).animate({marginBottom: "50px",opacity: 0},600,"easeOutQuint");
        break;
        case "show":
        $(".pb-sub1").stop().animate({marginBottom: "0px",opacity: 1},1000,"easeInQuint",function(){
            toggleCaseStudy("green");
        });
        $(".pb-title1").delay(200).animate({marginBottom: "0px",opacity: 1},600,"easeOutQuint");
        break;
    }
    
}
function toggleCaseStudy(condition){
    var xy = 1000;
    var yx = 1000;
    switch (condition){
        case "green":
        $(".cs-box-head").each(function(){
            $(this).stop().animate({width: "100%"},xy,"easeOutQuint");
            xy+=350;
        });
        $(".cs-info").each(function(){
            $(this).stop().animate({opacity: 1},yx,"easeOutQuint");
            yx+=350;
        });
        break;
        case "red":
        $(".cs-box-head").each(function(){
            $(this).stop().animate({width: "0%"},xy,"easeOutQuint");
            xy+=350;
        });
        $(".cs-info").each(function(){
            $(this).stop().animate({opacity: 0},yx,"easeOutQuint");
            yx+=350;
        });
        break;
    }
}
function toggleWork(pos){
    if(pos == "up"){
        if(csNum >= (newImages.length)-1){
            // do something //
        }else{
            csNum+=1;
            $('#mCSB_1_container').css("top","0");
            toggleCaseStudy("red");
            toggleCSTitle("hide");
        }
    }else if(pos == "down"){
        if(csNum <= 0){
            // do something //
        }else{
            csNum-=1;
            $('#mCSB_1_container').css("top","0");
            toggleCaseStudy("red");
            toggleCSTitle("hide");
        }
    }else if(pos == "back"){
        toggleButtons("project-hide");
        toggleCaseStudy("red");
        intialiseProjects("gallery-back");
    }
}

function createCaseStudy(){
	
    var k = 0;
	
	var csImages = ["images/products/repair.jpg","images/products/car.jpg","images/products/truck.jpg",
	"images/products/station.png","images/pngs/pump.jpg","images/pngs/pump2.jpg"];
	var csImages2 = ["images/products/car.jpg","images/products/pump.jpg","images/products/station.png",
	"images/products/pump2.jpg","images/pngs/truck.jpg","images/pngs/repair.jpg"];
	var csImages3 = ["images/products/truck.jpg","images/products/pump.jpg","images/products/pump2.jpg",
	"images/products/station.png","images/pngs/pump.jpg","images/pngs/pump2.jpg"];
	var csImages4 = ["images/products/station.png","images/products/repair.jpg","images/products/car.jpg",
	"images/products/pump.jpg","images/pngs/truck.jpg","images/pngs/pump2.jpg"];
	
	var Title = ["VEHICON","REELAX",
	"SLGAS","BUSINESS TO BUSINESS","_images/image6.jpg"];
	var Sub = ["VEHICLE MAINTENANCE AND CONCIERGE SERVICES","ONE-STOP LIFESTYLE HUB",
	"SUPERIOR LIQUIFIED GAS","B2B-ES","_images/image6.jpg","_images/image6.jpg"];
	var Des = ["VEHICON","REELAX",
	"SLGAS","BUSINESS TO BUSINESS","_images/image6.jpg"];
	var Architect = ["VEHICLE MAINTENANCE AND CONCIERGE SERVICES","ONE-STOP LIFESTYLE HUB",
	"SUPERIOR LIQUIFIED GAS","B2B-ES","_images/image6.jpg","_images/image6.jpg"];
	var Value = ["VEHICON","REELAX",
	"SLGAS","BUSINESS TO BUSINESS","_images/image6.jpg"];
	var Loc = ["VEHICLE MAINTENANCE AND CONCIERGE SERVICES","ONE-STOP LIFESTYLE HUB",
	"SUPERIOR LIQUIFIED GAS","B2B-ES","_images/image6.jpg","_images/image6.jpg"];
    animateGalCopy("break");
    //var csImages = Images[csNum].split(" ");
	
    $(".pb-title1").html(Title[csNum]);
    $(".pb-sub1").html(Sub[csNum]);
    $(".cs-des p").html(Des[csNum]);
    $(".cs-arch p").html(Architect[csNum]);
    $(".cs-value p").html(Value[csNum]);
    $(".cs-location p").html(Loc[csNum]);
    $(".csd-pic").each(function(){
		var f;
	if (csNum == 0){ f = csImages; }
	if (csNum == 1) { f = csImages2; }
	if (csNum == 2) { f = csImages3; }
	if (csNum == 3) { f = csImages4; }
        $(this).css("background-image",'url(' + f[k] + ')');
        $(this).css({opacity:0});
        $(this).stop().animate({opacity: 1},800,"easeInQuint");
        k++;
    });
}
function populateWorkBg(){
    for(var i=0;i<= 1;i++){
        //var bgImages = Images[i].split(" ");
		var bgImages = ["images/products/repair.jpg"];
		var Title = ["OUR MOST PRIZED ASSET","OUR MOST PRIZED ASSET"];
		var Loc = ["ENYO Retail and Supply","ENYO Retail and Supply"];
		/**var Title = ["VEHICON","REELAX",
		"SLGAS","BUSINESS TO BUSINESS"];
		var Loc = ["VEHICLE MAINTENANCE AND CONCIERGE SERVICES","ONE-STOP LIFESTYLE HUB",
		"SUPERIOR LIQUIFIED GAS","B2B-ES"];*/
        $('.cs-slider').slick('slickAdd','<div class="bg-item-container" style="background-image:url('+bgImages[i]+')" data-wname="'+Title[i]+'" data-wloc="'+Loc[i]+'"></div>');
    }
}
$('.cs-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    bgTitle = $(slick.$slides[nextSlide]).data("wname");
    bgLoc = $(slick.$slides[nextSlide]).data("wloc");
    animateGalCopy('off');
});

function animateGalCopy(position){
    switch (position){
        case "on":
        $(".animate-text1").stop().animate({width: "100%"},800,"easeInQuint");
        $(".animate-line").stop().animate({width: "100%"},1000,"easeInQuint");
        $(".animate-text2").stop().animate({width: "100%"},1200,"easeInQuint");
        break;
        case "off":
        $(".animate-text1").stop().animate({width: "0%"},800,"easeOutQuint");
        $(".animate-line").stop().animate({width: "0%"},1000,"easeOutQuint");
        $(".animate-text2").stop().animate({width: "0%"},1200,"easeOutQuint",function(){
            populateAniCopy();
            animateGalCopy('on');
        });
        break;
        case "break":
        $(".animate-text1").stop().animate({width: "0%"},800,"easeOutQuint");
        $(".animate-line").stop().animate({width: "0%"},1000,"easeOutQuint");
        $(".animate-text2").stop().animate({width: "0%"},1200,"easeOutQuint");
        break;
    }
    
}
/*
function setGalTimer(){
    galTimer = setTimeout(function(){animateGalCopy('off');},4500);
}
function clearGalTimer(){
    clearTimeout(galTimer);
}
*/
function populateAniCopy(){
    $(".t-copy").html(bgTitle);
    $(".l-copy").html(bgLoc);
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

// PREVIEW MODE //
//Mousewheel detect//
 

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
            if(k == scPos){
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
            if(k == 4){
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
    getSectionUrl('About');
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
    setService();
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
