/**
 * Template Name: iPortfolio - v3.7.0
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
	'use strict';

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener);
	};

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true);
	const navbarlinksActive = () => {
		let position = window.scrollY + 200;
		navbarlinks.forEach((navbarlink) => {
			if (!navbarlink.hash) return;
			let section = select(navbarlink.hash);
			if (!section) return;
			if (
				position >= section.offsetTop &&
				position <= section.offsetTop + section.offsetHeight
			) {
				navbarlink.classList.add('active');
			} else {
				navbarlink.classList.remove('active');
			}
		});
	};
	window.addEventListener('load', navbarlinksActive);
	onscroll(document, navbarlinksActive);

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos,
			behavior: 'smooth',
		});
	};

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top');
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active');
			} else {
				backtotop.classList.remove('active');
			}
		};
		window.addEventListener('load', toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function (e) {
		select('body').classList.toggle('mobile-nav-active');
		this.classList.toggle('bi-list');
		this.classList.toggle('bi-x');
	});

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on(
		'click',
		'.scrollto',
		function (e) {
			if (select(this.hash)) {
				e.preventDefault();

				let body = select('body');
				if (body.classList.contains('mobile-nav-active')) {
					body.classList.remove('mobile-nav-active');
					let navbarToggle = select('.mobile-nav-toggle');
					navbarToggle.classList.toggle('bi-list');
					navbarToggle.classList.toggle('bi-x');
				}
				scrollto(this.hash);
			}
		},
		true
	);

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash);
			}
		}
	});

	/**
	 * Hero type effect
	 */
	const typed = select('.typed');
	if (typed) {
		let typed_strings = typed.getAttribute('data-typed-items');
		typed_strings = typed_strings.split(',');
		new Typed('.typed', {
			strings: typed_strings,
			loop: true,
			typeSpeed: 100,
			backSpeed: 50,
			backDelay: 2000,
		});
	}

	/**
	 * Skills animation
	 */
	let skilsContent = select('.skills-content');
	if (skilsContent) {
		new Waypoint({
			element: skilsContent,
			offset: '80%',
			handler: function (direction) {
				let progress = select('.progress .progress-bar', true);
				progress.forEach((el) => {
					el.style.width = el.getAttribute('aria-valuenow') + '%';
				});
			},
		});
	}

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: '.portfolio-item',
			});

			let portfolioFilters = select('#portfolio-flters li', true);

			on(
				'click',
				'#portfolio-flters li',
				function (e) {
					e.preventDefault();
					portfolioFilters.forEach(function (el) {
						el.classList.remove('filter-active');
					});
					this.classList.add('filter-active');

					portfolioIsotope.arrange({
						filter: this.getAttribute('data-filter'),
					});
					portfolioIsotope.on('arrangeComplete', function () {
						AOS.refresh();
					});
				},
				true
			);
		}
	});

	/**
	 * Initiate portfolio lightbox
	 */
	const portfolioLightbox = GLightbox({
		selector: '.portfolio-lightbox',
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	/**
	 * Testimonials slider
	 */
	new Swiper('.testimonials-slider', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},

			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});

	/**
	 * Animation on scroll
	 */
	window.addEventListener('load', () => {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false,
		});
	});
})();

// Contact Form
const contactForm = document.querySelector('.contact-form');
const fullNameInput = document.querySelector('#fullName');
const emailAddressInput = document.querySelector('#emailAddress');
const messageInput = document.querySelector('#message');

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const emailMessage = getEmailMessage({
		fullName: fullNameInput.value,
		emailAddress: emailAddressInput.value,
		message: messageInput.value,
	});

	fetch('https://sendmail-api-docs.vercel.app/api/send', {
		method: 'POST',
		body: JSON.stringify({
			to: 'obaidashurbaji99@gmail.com', // replace it with your email address (the email you want to receive messages at)
			subject: 'Message From Portfolio Contact Form',
			message: emailMessage,
		}),
	})
		.then((res) => res.json())
		.then(() => {
			// Clear form inputs
			fullNameInput.value = '';
			emailAddressInput.value = '';
			messageInput.value = '';

			// Show pop-up notification
			Swal.fire({
				title: 'Message Sent!',
				text: 'We will get back to you soon!',
				icon: 'success',
				customClass: {
					popup: 'success-popup',
					title: 'success-title',
					content: 'success-content',
				},
			});
		});
});

const getEmailMessage = ({ fullName, emailAddress, message } = {}) => {
	return `
        <p>You have received a new message from your contact form website:</p>
        <div style="background-color: #fbfbfb; color: #101010; padding: 12px">
            <p style="margin: 0;">Full Name: ${fullName}</p>
            <p style="margin: 12px 0;">Email Address: ${emailAddress}</p>
            <p style="margin: 0;">Message: ${message}</p>
        </div>
    `;
};
