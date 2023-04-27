let color = 'black';
let clicked = false;
let screenSize = 16;

function setScreen(size) {
	screenSize = size;
	let screen = document.getElementById('screen');
	let pixels = screen.querySelectorAll('div');
	pixels.forEach((div) => div.remove());
	screen.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`);

	let qty = size * size;
	for (let i = 0; i < qty; i++) {
		let pixel = document.createElement('div');
		pixel.addEventListener('mouseover', setColor);
		pixel.setAttribute('style', 'background: #dadada;');
		screen.insertAdjacentElement('beforeend', pixel);
	}
}

function setScreenColor() {
	let pixel = document.createElement('div');
	pixel.addEventListener('mouseover', setColor);
	pixel.setAttribute('style', 'background: #dadada;');
	screen.insertAdjacentElement('beforeend', pixel);
}

setScreen(screenSize);

function setSize(val) {
	screenSize = val;
	// Validate size input is 2 to 100 inclusive
	if (screenSize >= 2 && screenSize < 101) {
		document.querySelector('.error').style.display = 'none';
		setScreen(screenSize);
	} else {
		const error = document.querySelector('.error');
		error.style.display = 'flex';
		// Timer to remove sizing error message
		setTimeout(() => {
			// display none after timeout
			error.style.display = 'none';
		}, 2000); // 👈️ time in milliseconds

		// If screen input is less than 2, set screen size to 2 pixels
		if (screenSize < 2) {
			document.querySelector('.set-size').value = 2;
			setScreen(2);
			// Else if screen input is greater than 100, set screen size to 100 pixels
		} else if (screenSize > 100) {
			document.querySelector('.set-size').value = 100;
			setScreen(100);
		}
	}
}

// Set pixel color
function setColor() {
	if (clicked) {
		if (color === 'rainbow') {
			this.style.backgroundColor = getRandomColor();
		} else {
			this.style.backgroundColor = color;
		}
	}
}

// Get selected color from button
function getColor(colorChoice) {
	color = colorChoice;
	const blackBtn = document.querySelector('.black-btn');
	const rainbowBtn = document.querySelector('.rainbow-btn');
	const eraseBtn = document.querySelector('.erase-btn');
	if (color === 'black') {
		blackBtn.style = 'color: var(--yellow)';
	} else {
		blackBtn.style = 'color: #dadada';
	}
	if (color === 'rainbow') {
		rainbowBtn.style = 'color: var(--yellow)';
	} else {
		rainbowBtn.style = 'color: #dadada';
	}
	if (color === '#dadada') {
		eraseBtn.style = 'color: var(--yellow)';
	} else {
		eraseBtn.style = 'color: #dadada';
	}
}

// Creates a random rgb color
function getRandomColor() {
	let color = [];
	for (let i = 0; i < 3; i++) {
		color.push(Math.floor(Math.random() * 256));
	}
	return 'rgb(' + color.join(', ') + ')';
}

// Resets the screen to default background color
function reset() {
	document.querySelector('.error').style.display = 'none';
	setScreen(screenSize);
}

// Click event for setting color mode
document.querySelector('.screen').addEventListener('click', () => {
	clicked = !clicked;
	if (clicked) {
		document.querySelector('.mode-state').textContent = 'Active';
	} else {
		document.querySelector('.mode-state').textContent = 'Not active';
	}
});
