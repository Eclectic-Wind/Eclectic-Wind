// DOM Elements
const body = document.body;
const toggleModeButton = document.getElementById('toggleMode');
const headerScrollContainer = document.querySelector('.header-scroll-container');
const headerScroll = document.querySelector('.header-scroll');
const headerScrollImages = document.querySelectorAll('.header-scroll img');
const header = document.querySelector('header');
const content = document.querySelector('.content');
const title = document.querySelector('.title');

// Constants
const scrollThreshold = 300; // Adjust this value to set the desired threshold in pixels
const pauseDuration = 3000;
const transitionDuration = 500;

// Toggle Mode
function toggleMode() {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  toggleModeButton.textContent = body.classList.contains('dark-mode') ? '☼' : '☾';
  // Store the selected mode in local storage
  localStorage.setItem('selectedMode', body.classList.contains('dark-mode') ? 'dark' : 'light');
}
toggleModeButton.addEventListener('click', toggleMode);

// Check local storage on page load
function setInitialMode() {
  const selectedMode = localStorage.getItem('selectedMode');
  if (selectedMode === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.add('dark-mode');
  }
  toggleModeButton.textContent = body.classList.contains('dark-mode') ? '☼' : '☾';
}
setInitialMode();

// Header Image Scroll
let currentImageIndex = 0;
let scrollInterval;

function scrollToNextImage() {
  currentImageIndex = (currentImageIndex + 1) % (headerScrollImages.length + 1);
  headerScroll.style.transitionDuration = `${transitionDuration}ms`;
  headerScroll.style.transform = `translateX(-${currentImageIndex * 100}%)`;

  if (currentImageIndex === headerScrollImages.length) {
    setTimeout(() => {
      headerScroll.style.transitionDuration = '0s';
      headerScroll.style.transform = 'translateX(0)';
      currentImageIndex = 0;
    }, transitionDuration);
  }
}

function startImageScroll() {
  const firstImageClone = headerScrollImages[0].cloneNode(true);
  headerScroll.appendChild(firstImageClone);

  scrollInterval = setInterval(() => {
    scrollToNextImage();
  }, pauseDuration + transitionDuration);
}

// Start the image scroll on page load
startImageScroll();

function updateHeaderAndContent() {
  const scrollPosition = window.scrollY;
  const scrollProgress = Math.min(scrollPosition / scrollThreshold, 1);

  // Update header height
  const headerHeight = 4 - scrollProgress * 2.5;
  headerScrollContainer.style.height = `${headerHeight}in`;

  // Update title height
  const titleElement = document.querySelector('.title');
  titleElement.style.height = `${headerHeight}in`;

  // Update navigation bar position
  const navBarTop = headerHeight;
  nav.style.top = `${navBarTop}in`;

  // Update content padding top
  const contentPaddingTop = navBarTop + 1;
  content.style.paddingTop = `${contentPaddingTop}in`;

  // Store header height and title height in local storage
  localStorage.setItem('headerHeight', headerHeight);
  localStorage.setItem('titleHeight', headerHeight);
}

window.addEventListener('scroll', updateHeaderAndContent);

// Page Transition
function animatePageTransition() {
  const pageTransition = document.querySelector('.page-transition');
  pageTransition.classList.add('show');
}
window.addEventListener('load', animatePageTransition);

// Store scroll position and current image index before navigating to a new page
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPosition', window.scrollY);
  localStorage.setItem('currentImageIndex', currentImageIndex);
});

// Retrieve and apply the stored scroll position, header height, title height, and current image index when the new page loads
window.addEventListener('load', () => {
  const scrollPosition = localStorage.getItem('scrollPosition');
  const storedHeaderHeight = localStorage.getItem('headerHeight');
  const storedTitleHeight = localStorage.getItem('titleHeight');
  const storedImageIndex = localStorage.getItem('currentImageIndex');

  if (scrollPosition === '0') {
    // If scroll position is at the top, set header and title heights to full height
    headerScrollContainer.style.height = '4in';
    title.style.height = '4in';
  } else if (storedHeaderHeight && storedTitleHeight) {
    // If scroll position is not at the top and stored heights exist, apply them
    headerScrollContainer.style.height = `${storedHeaderHeight}in`;
    title.style.height = `${storedTitleHeight}in`;
  }

  // Apply the stored scroll position
  if (scrollPosition) {
    window.scrollTo(0, scrollPosition);
    localStorage.removeItem('scrollPosition');
  }

  // Apply the stored current image index
  if (storedImageIndex) {
    currentImageIndex = parseInt(storedImageIndex);
    headerScroll.style.transitionDuration = '0s';
    headerScroll.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    localStorage.removeItem('currentImageIndex');
  }

  // Update header and content after applying stored values
  updateHeaderAndContent();
});