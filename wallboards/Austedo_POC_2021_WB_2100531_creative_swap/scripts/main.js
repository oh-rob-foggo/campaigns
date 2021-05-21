var isDevice = false;
var HOST = 'http://127.0.0.1:8081/';

var animation;

function localPathURL(relativePath) {
    var dirs = document.location.pathname.split('/');
    console.log('dirs: '+dirs);
    var root = dirs[dirs.length - 2];
    console.log('root: '+root);
    return HOST+root+'/'+relativePath;
}

function goPI(){
    if (isDevice){
        WebViewCommunicator.sendJavascriptTo("main", "javascript:appRouter.homeView.openChildBrowser("+localPathURL('pdf/AUS-42838.pdf')+", '<div data-advtype=Prescribing-Information/>', 'timeoutMinutes: 2.5')");
    } else {
        window.open("./pdf/AUS-42838.pdf");
        console.log("not device");
    }      
}
         
function goMedguide(){
    if (isDevice){
        WebViewCommunicator.sendJavascriptTo("main", "javascript:appRouter.homeView.openChildBrowser("+localPathURL('pdf/AUS-42841.pdf')+", '<div data-advtype=Prescribing-Information/>', 'timeoutMinutes: 2.5')");
    } else {
        window.open("./pdf/AUS-42841.pdf");
        console.log("not device");
    }      
}

function goDocguide(){
    if (isDevice){
        WebViewCommunicator.sendJavascriptTo("main", "javascript:appRouter.homeView.openChildBrowser("+localPathURL('pdf/AUS-43311.pdf')+", '<div data-advtype=Prescribing-Information/>', 'timeoutMinutes: 2.5')");
    } else {
        window.open("./pdf/AUS-43311.pdf");
        console.log("not device");
    }      
}

window.addEventListener('load', function() {
	var detectMobile = window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	if (detectMobile) {
    	isDevice = true;
	}

	// VARIABLES
	const expandBtn = document.getElementById('expandBtn');
	const isi_container = document.getElementById('isi_container');
	const isi_containerContent = document.getElementById('isi_container-content');

	const image1 = document.getElementById('image1');
	const text1background = document.getElementById('text1');
	const text1 = document.getElementById('layer-1-text');
	const text2background = document.getElementById('text2');
	const text2 = document.getElementById('layer-2-text');
	const text3line1 = document.getElementsByClassName('line1');
	const text3line2 = document.getElementsByClassName('line2');
	const image3 = document.getElementById('image3');
	const image4 = document.getElementById('image4');
	const ok = document.getElementsByClassName('not-ok');
	const text4 = document.getElementById('text4');
	const text4words = text4.querySelectorAll('span');
	const highlightFirst = document.querySelector('.layer-4-highlight.first');
	const highlightSecond = document.querySelector('.layer-4-highlight.second');

	var scroll =  new TimelineMax({repeat: 0, repeatDelay: 0});
	runAnimation();
	//let expandTime = gsap.timeline({repeat: 0, repeatDelay: 0});

	// MISC FUNCTIONS
	expandBtn.addEventListener('click', function(e) {
		if(expandBtn.dataset.state === "closed") {
			isi_container.setAttribute("style", "height: 1788px; top: 0px; position: absolute;");
			isi_containerContent.setAttribute("style", "height: 1717px;");
			expandBtn.dataset.state = "open";
			expandBtn.innerHTML = "";
			expandBtn.innerHTML = "<div>COLLAPSE IMPORTANT SAFETY INFORMATION</div>";
		}
		else {
			isi_container.setAttribute("style", "height: 597px; position: relative;");
			isi_containerContent.setAttribute("style", "height: 526px;");
			expandBtn.dataset.state = "closed";
			expandBtn.innerHTML = "";
			expandBtn.innerHTML = "<div>EXPAND IMPORTANT SAFETY INFORMATION</div>";
		}
	});

	function animationCompleted(duration) {
		console.log("Animation complete: " + duration);
	}

	// ANIMATION TIMELINE
	function runAnimation() {
		animation = new TimelineMax({repeat: 0, repeatDelay: 0, paused:true});
		animation.set([],{autoAlpha: 0})

		.addLabel("frame1","")
		.to(text1background, 0.75, {width: 673, delay: 1}, "frame1")
		.to(text1, 0.75, {opacity: 1, delay: 1.5}, "frame1")
		.to(text1, 0.75, {opacity: 0, delay: 3}, "frame1")
		.to(text1background, 0.75, {width: 0, delay: 3.5}, "frame1")

		.addLabel("frame2","")
		.to(text2background, 0.75, {left: 235, delay: 3.5}, "frame2")
		.to(text2, 0.75, {opacity: 1, delay: 4}, "frame2")

		.addLabel("frame3", "")
		.to(image1, 0.5, {opacity: 0, delay: 6.5}, "frame3")
		.to(image3, 0.5, {opacity: 1, delay: 6.5}, "frame3")
		.to(ok, 0.5, {width: 517, delay: 7}, "frame3")
		.to(text3line1, 0.5, {width: 280, delay: 7.5}, "frame3")
		.to(text3line2, 0.5, {width: 224, delay: 8}, "frame3")

		.addLabel("frame4", "")
		.to(image3, 0.75, {autoAlpha: 0, delay: 10.5}, "frame4")
		.to(image4, 0.75, {autoAlpha: 1, delay: 11.25}, "frame4")
		.to(text4words, 0.5, {opacity: 1, y: -100, stagger: 0.15, delay: 11}, "frame4")
		.to(highlightFirst, 0.5, {width: 411, delay: 13}, "frame4")
		.to(highlightSecond, 0.5, {width: 588, delay: 13.25}, "frame4");

		animationCompleted(animation.duration());
	}

	// Auto scroll removed per account request 7/24

	// SCROLLING ISI
	// function runIsiScroll() {
	// 	bottomScreen = isi_containerContent.scrollHeight;
	// 	scroll.to(isi_containerContent, 26, {scrollTo: {y: bottomScreen, autoKill: false}, ease: "linear"});
	// }

	// isi_containerContent.addEventListener('touchstart', function(e) {
	// 	scroll.pause('');
	// });

	//runIsiScroll();

});

function onWallboardIdleSlideDisplay(){
        animation.play();
    }

    // function loadAnimationStaging() {
    //     var detectMobile = window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    //     if (detectMobile !== true) {
    //         onWallboardIdleSlideDisplay();
    //     }
    // }

    // loadAnimationStaging();

    function onWallboardIdleSlideTimerStop(){
        location.reload();
    }
