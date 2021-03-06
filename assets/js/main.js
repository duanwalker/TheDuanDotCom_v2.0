
(function($) {

	var settings = {

		// Speed to resize panel.
			resizeSpeed: 600,

		// Speed to fade in/out.
			fadeSpeed: 300,

		// Size factor.
			sizeFactor: 11.5,

		// Minimum point size.
			sizeMin: 15,

		// Maximum point size.
			sizeMax: 20

	};

	var $window = $(window);

	$window.on('load', function() {

		skel
			.breakpoints({
				desktop: '(min-width: 737px)',
				mobile: '(max-width: 736px)'
			})
			.viewport({
				breakpoints: {
					desktop: {
						width: 1080,
						scalable: false
					}
				}
			})
			.on('+desktop', function() {

				var	$body = $('body'),
					$main = $('#main'),
					$panels = $main.find('.panel'),
					$hbw = $('html,body,window'),
					$footer = $('#footer'),
					$wrapper = $('#wrapper'),
					$nav = $('#nav'), $nav_links = $nav.find('a'),
					$jumplinks = $('.jumplink'),
					$form = $('form'),
					panels = [],
					activePanelId = null,
					firstPanelId = null,
					isLocked = false,
					hash = window.location.hash.substring(1);

				if (skel.vars.mobile) {

					settings.fadeSpeed = 0;
					settings.resizeSpeed = 0;
					$nav_links.find('span').remove();

				}

				// Body.
					$body._resize = function() {
						var factor = ($window.width() * $window.height()) / (1440 * 900);
						$body.css('font-size', Math.min(Math.max(Math.floor(factor * settings.sizeFactor), settings.sizeMin), settings.sizeMax) + 'pt');
						$main.height(panels[activePanelId].outerHeight());
						$body._reposition();
					};

					$body._reposition = function() {
						if (skel.vars.mobile && (window.orientation == 0 || window.orientation == 180))
							$wrapper.css('padding-top', Math.max((($window.height() - (panels[activePanelId].outerHeight() + $footer.outerHeight())) / 2) - $nav.height(), 30) + 'px');
						else
							$wrapper.css('padding-top', ((($window.height() - panels[firstPanelId].height()) / 2) - $nav.height()) + 'px');
					};

				// Panels.
					$panels.each(function(i) {
						var t = $(this), id = t.attr('id');

						panels[id] = t;

						if (i == 0) {

							firstPanelId = id;
							activePanelId = id;

						}
						else
							t.hide();

						t._activate = function(instant) {

							// Check lock state and determine whether we're already at the target.
								if (isLocked
								||	activePanelId == id)
									return false;

							// Lock.
								isLocked = true;

							// Change nav link (if it exists).
								$nav_links.removeClass('active');
								$nav_links.filter('[href="#' + id + '"]').addClass('active');

							// Change hash.
								if (i == 0)
									window.location.hash = '#';
								else
									window.location.hash = '#' + id;

							// Add bottom padding.
								var x = parseInt($wrapper.css('padding-top')) +
										panels[id].outerHeight() +
										$nav.outerHeight() +
										$footer.outerHeight();

								if (x > $window.height())
									$wrapper.addClass('tall');
								else
									$wrapper.removeClass('tall');

							// Fade out active panel.
								$footer.fadeTo(settings.fadeSpeed, 0.0001);
								panels[activePanelId].fadeOut(instant ? 0 : settings.fadeSpeed, function() {

									// Set new active.
										activePanelId = id;

										// Force scroll to top.
											$hbw.animate({
												scrollTop: 0
											}, settings.resizeSpeed, 'swing');

										// Reposition.
											$body._reposition();

										// Resize main to height of new panel.
											$main.animate({
												height: panels[activePanelId].outerHeight()
											}, instant ? 0 : settings.resizeSpeed, 'swing', function() {

												// Fade in new active panel.
													$footer.fadeTo(instant ? 0 : settings.fadeSpeed, 1.0);
													panels[activePanelId].fadeIn(instant ? 0 : settings.fadeSpeed, function() {

														// Unlock.
															isLocked = false;

													});
											});

								});

						};

					});

				// Nav + Jumplinks.
					$nav_links.add($jumplinks).click(function(e) {
						var t = $(this), href = t.attr('href'), id;

						if (href.substring(0,1) == '#') {

							e.preventDefault();
							e.stopPropagation();

							id = href.substring(1);

							if (id in panels)
								panels[id]._activate();

						}

					});

				// Window.
					$window
						.resize(function() {

							if (!isLocked)
								$body._resize();

						});

					$window
						.on('orientationchange', function() {

							if (!isLocked)
								$body._reposition();

						});

					if (skel.vars.IEVersion < 9)
						$window
							.on('resize', function() {
								$wrapper.css('min-height', $window.height());
							});

				// Fix: Placeholder polyfill.
					$('form').placeholder();

				// Prioritize "important" elements on mobile.
					skel.on('+mobile -mobile', function() {
						$.prioritize(
							'.important\\28 mobile\\29',
							skel.breakpoint('mobile').active
						);
					});

				// CSS polyfills (IE<9).
					if (skel.vars.IEVersion < 9)
						$(':last-child').addClass('last-child');

				// Init.
					$window
						.trigger('resize');

					if (hash && hash in panels)
						panels[hash]._activate(true);

					$wrapper.fadeTo(400, 1.0);

			})
			.on('-desktop', function() {

				window.setTimeout(function() {
					location.reload(true);
				}, 50);

			});
			// gallery category
	        $('.duan-gallery-category a').click(function(e){
	            e.preventDefault(); 
	             $(this).parent().children('a').removeClass('active');
	             $(this).addClass('duan-service');	            
	            var linkClass = $(this).attr('href');
	            $('.gallery').each(function(){
	                if($(this).is(":visible") == true){
	                   $(this).hide();
	                };
	            });
	            $(linkClass).fadeIn();  
	        });

	        //sticky nav bar
	        $(window).scroll(function () {

	      //use console .log to determine when you want the 
	      //nav bar to stick.  
	     		// console.log($(window).scrollTop())
	    		if ($(window).scrollTop() > 63) {
	     		 $('#nav').addClass('navbar-fixed');
	   		 }
	    		if ($(window).scrollTop() < 64) {
	     		 $('#nav').removeClass('navbar-fixed');
	   		 }
	 		 });

		$('#LogicAppsRow').hover(
			function () {
				$('.la-bar').addClass('laHover');
				$('.la-notch').addClass('hover-la-notch')
			}
		)
		$('#FnAppsRow').hover(
			function () {
				$('.fn-bar').addClass('fnHover');
				$('.fn-notch').addClass('hover-fn-notch')
			}
		)
		$('#AppSvcRow').hover(
			function () {
				$('.AppSvc-bar').addClass('AppSvcHover');
				$('.AppSvc-notch').addClass('hover-AppSvc-notch')
			}
		)
		$('#AzSQLRow').hover(
			function () {
				$('.AzSQL-bar').addClass('AzSQLHover');
				$('.AzSQL-notch').addClass('hover-AzSQL-notch')
			}
		)
	    $('#ASPdotNetRow').hover(
       			function(){ 
       				$('.asp-bar').addClass('aspHover');
       				$('.asp-notch').addClass('hover-asp-notch')
       			 }
		)
		$('#cSharpRow').hover(
       			function(){ 
       				$('.cSharp-bar').addClass('cSharpHover');
       				$('.cSharp-notch').addClass('hover-cSharp-notch')
       			 }
		) 
		$('#SQLRow').hover(
       			function(){ 
       				$('.SQL-bar').addClass('SQLHover');
       				$('.SQL-notch').addClass('hover-SQL-notch')
       			 }
		)        
		$('#VSRow').hover(
       			function(){ 
       				$('.VS-bar').addClass('VSHover');
       				$('.VS-notch').addClass('hover-VS-notch')
       			 }
		)                   
	    $('#htmlRow').hover(
       			function(){ 
       				$('.html-bar').addClass('htmlHover');
       				$('.html-notch').addClass('hover-html-notch')
       			 }
		)
		$('#cssRow').hover(
		       function(){ 
		       	$('.css-bar').addClass('cssHover')
		       	$('.css-notch').addClass('hover-css-notch')
		       	 }
		)
		$('#bootStrapRow').hover(
		       function(){ 
		       	$('.bootStrap-bar').addClass('bootStrapHover')
		       	$('.bootStrap-notch').addClass('hover-bootStrap-notch')
		       	 }
		)
		$('#jsRow').hover(
		       function(){ 
		       	$('.js-bar').addClass('jsHover')
		       	$('.js-notch').addClass('hover-js-notch')	
		        }
		)
		$('#jQueryRow').hover(
		       function(){ 
		       	$('.jq-bar').addClass('jqHover')
		       	$('.jq-notch').addClass('hover-jq-notch')
		       	 }
		)
		$('#nodeRow').hover(
		       function(){ 
		       	$('.node-bar').addClass('nodeHover')
		       	$('.node-notch').addClass('hover-node-notch')
		       	 }
		)
		$('#ngRow').hover(
		       function(){ 
		       	$('.ng-bar').addClass('ngHover')
		       	$('.ng-notch').addClass('hover-ng-notch')
		       	 }
		)
		$('#GitRow').hover(
		       function(){ 
		       	$('.Git-bar').addClass('GitHover')
		       	$('.Git-notch').addClass('hover-Git-notch')
		       	 }
		)
		$('#PwrBIRow').hover(
			function () {
				$('.PwrBI-bar').addClass('PwrBIHover')
				$('.PwrBI-notch').addClass('hover-PwrBI-notch')
			}
		)
	});

})(jQuery);