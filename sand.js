function make2Darray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < cols; i++) {
		arr[i] = new Array(rows);
		for (let j = 0; j < rows; j++) {
			arr[i][j] = 0;
		}
	}
	return arr;
}

function withinCols(i) {
	return i > 0 && i < cols - 1;
}

function withinRows(i) {
	return i > 0 && i < rows - 1;
}

let grid;
let w = 10;
let cols, rows;
let hueValue = 200;

function setup() {
	createCanvas(570, 890);
	colorMode(HSB, 360, 255, 255);

	cols = width / w;
	rows = height / w;
	grid = make2Darray(cols, rows);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = 0;
		}
	}
}


function mouseDragged() {
	let mouseCol = floor(mouseX / w);
	let mouseRow = floor(mouseY / w);

	let sign = -1;
	let matrix = 3;
	let extent = floor(matrix / 2);
	for (let i = -extent; i <= extent; i++) {
		for (let j = -extent; j <= extent; j++) {
			if (random(1) < 0.75) {
				let col = mouseCol + i;
				let row = mouseRow + j;
				if (withinCols(col) && withinRows(row)) {
					grid[col][row] = hueValue;
				}
			}
		}
	}
	hueValue += 0.5
	if (hueValue === 360) {
		hueValue = 1;
	}
}

function draw() {
	background(0);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			noStroke(); // optional
			if (grid[i][j] > 0) {
				//stroke(45);
				fill(grid[i][j], 255, 255);
				let x = i * w;
				let y = j * w;
				square(x, y, w);
			}
		}
	}

	let nextGrid = make2Darray(cols, rows);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let state = grid[i][j];
			if (state > 0) {
				let below = grid[i][j+1];

				let dir = Math. sign (random(1) - 0.5);
				let belowA, belowB;

				if (i + dir >= 0 && i + dir <= cols - 1) {
					belowA = grid[i+dir][j+1];
				}
				if (i - dir >= 0 && i - dir <= cols - 1) {
					belowB = grid[i-dir][j+1];
				}

				if (below === 0) {
					nextGrid[i][j+1] = grid[i][j];
				} else if (belowB === 0) {
					nextGrid[i-dir][j] = grid[i][j];
				} else if (belowA === 0) {
					nextGrid[i+dir][j] = grid[i][j];
				} else {
					nextGrid[i][j] = grid[i][j];
				}
			}
		}
	}
	grid = nextGrid;
}
