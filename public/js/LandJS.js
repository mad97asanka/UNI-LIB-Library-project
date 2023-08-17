
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
      targetSection.scrollIntoView({
          behavior: "smooth"
      });

      // Update URL and navigation history
      history.pushState(null, null, `#${sectionId}`);
  }
}

const contentContainer = document.querySelector(".aboutback");

contentContainer.addEventListener("wheel", (event) => {
  if (event.deltaY !== 0) {
      event.preventDefault();
  }
});

//-----------------------------------------------------------------

const textElement = document.getElementById('text');
const cursorElement = document.getElementById('cursor');
const textToType = 'Explore The World Beyond You...';
let index = 0;

function typeText() {
if (index < textToType.length) {
  textElement.textContent += textToType[index];
  index++;
  setTimeout(typeText, 100); // typing speed
} else {
  cursorElement.style.display = 'none';
  setTimeout(resetAnimation, 2000); // reset time
}
}

function resetAnimation() {
textElement.textContent = '';
cursorElement.style.display = 'inline';
index = 0;
typeText();
}

typeText();
