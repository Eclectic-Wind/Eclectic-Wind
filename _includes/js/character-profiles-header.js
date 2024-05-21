const profileLinks = document.querySelectorAll('.character-profiles li');
const intensity = 3; // Adjust this value to control the intensity of the effect (0.2 to 0.6 recommended)

function updateNumerals(event) {
  profileLinks.forEach(link => {
    const rect = link.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseX = event.clientX;
    const distance = Math.abs(mouseX - centerX);
    const maxDistance = 150 * intensity;
    const normalizedDistance = Math.min(1, distance / maxDistance);
    const inverseSquareDistance = 1 - Math.pow(normalizedDistance, 2);
    const zoomFactor = 1 + inverseSquareDistance * 0.1;
    const containerRect = link.parentElement.getBoundingClientRect();
    const pushDistance = Math.min(inverseSquareDistance * 5 * intensity, (containerRect.width - rect.width) / 2);
    const pushDirection = mouseX < centerX ? 1 : -1;
    const slowDownFactor = normalizedDistance < 0.05 ? 0.05 : 1;
    link.style.transform = `translateX(${pushDirection * pushDistance * slowDownFactor}px) scale(${zoomFactor})`;
  });
}

function resetNumerals() {
  profileLinks.forEach(link => {
    link.style.transform = 'translateX(0) scale(1)';
  });
}

document.addEventListener('mousemove', (event) => {
  const characterProfiles = document.querySelector('.character-profiles');
  const rect = characterProfiles.getBoundingClientRect();
  if (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  ) {
    updateNumerals(event);
  } else {
    resetNumerals();
  }
});

document.addEventListener('mouseout', () => {
  resetNumerals();
});

//FOR GLOWING
document.addEventListener('DOMContentLoaded', function() {
  var characterProfilesLinks = document.querySelectorAll('.character-profiles li a');
  var currentURL = window.location.pathname;

  characterProfilesLinks.forEach(function(link) {
    var linkURL = link.getAttribute('href');
    var glowingImage = link.querySelector('img');

    var linkPattern = new RegExp('^' + linkURL + '(?:/.*)?$');

    if (linkPattern.test(currentURL)) {
      glowingImage.classList.add('glow');
    } else {
      glowingImage.classList.remove('glow');
    }
  });
});