gsap.registerPlugin(Draggable);

function moveArrayIndex(array, oldIndex, newIndex) {
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

function checkPositions(elem) {
    // Find the location in our array of the element
    let rowIndex = -1,
        imgIndex = -1;
    imgRep.forEach((row, i) => {
        row.forEach((img, j) => {
            if (elem.isSameNode(img)) {
                rowIndex = i;
                imgIndex = j;
            }
        });
    });

    // Element not found, return
    if (rowIndex === -1) return;

    // Reposition elements as necessary so that our element is in the center
    // Reposition the rows as necessary
    if (rowIndex < rowMidIndex) {
        for (let i = rowIndex; i < rowMidIndex; i++) {
            // Update the row's actual position
            let rowY = gsap.getProperty(rowArray[0], 'y');

            if (rowArray.length % 2 === 1) {
                // Odd number of rows means we have to handle offset
                let row = rowArray[rowArray.length - 1];
                if (row.dataset.offset === 'true') {
                    gsap.set(row, { y: rowY - gutter - boxHeight, x: '+=' + boxWidth / 2 });
                    row.dataset.offset = 'false';
                } else {
                    gsap.set(row, { y: rowY - gutter - boxHeight, x: '-=' + boxWidth / 2 });
                    row.dataset.offset = 'true';
                }
            } else {
                // Equal number of rows; don't have to handle offset
                gsap.set(rowArray[rowArray.length - 1], { y: rowY - gutter - boxHeight });
            }

            // Update our representations
            moveArrayIndex(imgRep, imgRep.length - 1, 0);
            moveArrayIndex(rowArray, rowArray.length - 1, 0);
        }
    } else if (rowIndex > rowMidIndex) {
        for (let i = rowMidIndex; i < rowIndex; i++) {
            // Update the row's actual position
            let rowY = gsap.getProperty(rowArray[rowArray.length - 1], 'y');

            if (rowArray.length % 2 === 1) {
                // Odd number of rows means we have to handle offset
                let row = rowArray[0];
                if (row.dataset.offset === 'true') {
                    gsap.set(row, { y: rowY + gutter + boxHeight, x: '-=' + boxWidth / 2 });
                    row.dataset.offset = 'false';
                } else {
                    gsap.set(row, { y: rowY + gutter + boxHeight, x: '+=' + boxWidth / 2 });
                    row.dataset.offset = 'true';
                }
            } else {
                // Equal number of rows; don't have to handle offset
                gsap.set(rowArray[0], { y: rowY + gutter + boxHeight });
            }

            // Update our representations
            moveArrayIndex(imgRep, 0, imgRep.length - 1);
            moveArrayIndex(rowArray, 0, rowArray.length - 1);
        }
    }

    // Reposition the images as necessary
    if (imgIndex < imgMidIndex) {
        for (let rowNum = 0; rowNum < rows.length; rowNum++) {
            // Do it for every row
            let row = imgRep[rowNum];

            for (let i = imgIndex; i < imgMidIndex; i++) {
                // Update the images's actual position
                let imgX = gsap.getProperty(row[0], 'x');

                gsap.set(row[row.length - 1], { x: imgX - gutter - boxWidth });

                // Update our representation
                moveArrayIndex(row, row.length - 1, 0);
            }
        }
    } else if (imgIndex > imgMidIndex) {
        for (let rowNum = 0; rowNum < rows.length; rowNum++) {
            // Do it for every row
            let row = imgRep[rowNum];

            for (let i = imgMidIndex; i < imgIndex; i++) {
                // Update the images's actual position
                let imgX = gsap.getProperty(row[imgNum - 1], 'x');

                gsap.set(row[0], { x: imgX + gutter + boxWidth });

                // Update our representation
                moveArrayIndex(row, 0, row.length - 1);
            }
        }
    }
}

function centerGrid() {
    let bcr = lastCenteredElem.getBoundingClientRect();
    let midX = bcr.x + bcr.width / 2;
    let midY = bcr.y + bcr.height / 2;

    let x = winMidX - midX;
    let y = winMidY - midY;

    gsap.to(containerSelector, {
        ease: 'sine.inOut',
        duration: 0.7,
        x: '+=' + x,
        y: '+=' + y,
    });
}

function updateCenterElem() {
    let elems = document.elementsFromPoint(winMidX, winMidY);
    elems.forEach((elem) => {
        if (elem.matches(imageSelector) && !lastCenteredElem.isSameNode(elem)) {
            lastCenteredElem = elem;
            checkPositions(lastCenteredElem);
        }
    });
}

const containerId = 'imageContainer';
const containerSelector = '#' + containerId;
const rowClass = 'row';
const rowSelector = '.' + rowClass;
const imageClass = 'sliderImage';
const imageSelector = '.' + imageClass;
const imgURLArray = null;
const imgURLArrayLength = imgURLArray ? imgURLArray.length : -1;
const rowNum = 3;
const imgNum = 9;
const imgWidth = 350;
const imgHeight = 500;
const topBar = document.querySelector('.topBar');
const bottomBar = document.querySelector('.bottomBar');
const leftBar = document.querySelector('.leftBar');
const rightBar = document.querySelector('.rightBar');

let rows, imgMidIndex, rowMidIndex;
const rowArray = [];
const imgRep = [];

let boxWidth, boxHeight, gutter, horizSpacing, vertSpacing, horizOffset, vertOffset, winMidX, winMidY, lastCenteredElem;

function createImageGrid() {
    for (let y = 0; y < rowNum; y++) {
        let row = document.createElement('div');
        row.className = rowClass;
        for (let x = 0; x < imgNum; x++) {
            let image = document.createElement('div');
            image.className = imageClass;
            row.appendChild(image);
        }
        document.querySelector(containerSelector).appendChild(row);

        // Add the images to our representation
        imgRep.push(gsap.utils.toArray(row.querySelectorAll(imageSelector)));
    }

    (rows = document.querySelectorAll(rowSelector)), (imgMidIndex = Math.floor(imgNum / 2)), (rowMidIndex = Math.floor(rowNum / 2));
}

function createMask() {
    let mask = document.createElement('div');
    mask.className = 'mask';
    document.body.appendChild(mask);

    gsap.set(mask, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        // backgroundColor: 'green',
        // opacity: '0.2',
    });
}

function resize() {
    winMidX = innerWidth / 2;
    winMidY = innerHeight / 2;
    boxWidth = imgWidth;
    boxHeight = imgHeight;
    gutter = innerWidth * 0.05;
    horizSpacing = boxWidth + gutter;
    vertSpacing = boxHeight + gutter;
    horizOffset = -(imgMidIndex * horizSpacing + boxWidth / 2) + winMidX;
    vertOffset = -(rowMidIndex * vertSpacing + boxHeight / 2) + winMidY;

    // Reset our container and rows
    gsap.set(containerSelector, { x: 0, y: 0 });

    rows.forEach(function (row, i) {
        gsap.set(row, {
            attr: {
                'data-offset': function () {
                    if (i % 2 === 0) return false;
                    else return true;
                },
            },
            x: function () {
                if (i % 2 === 0) return horizOffset;
                else return horizOffset - boxWidth / 2;
            },
            y: function () {
                return i * vertSpacing + vertOffset;
            },
        });

        gsap.set(row.querySelectorAll(imageSelector), {
            width: boxWidth,
            height: boxHeight,
            x: function (index) {
                return index * horizSpacing;
            },
        });

        // Update our representation of the rows
        rowArray[i] = row;
    });
}

function setStyles() {
    gsap.set('body', {
        margin: 0,
        overflow: 'hidden',
    });

    gsap.set(imageSelector, {
        backgroundImage: function (index) {
            if (imgURLArray) {
                return imgURLArray[index % imgURLArrayLength];
            } else return `url(https://picsum.photos/${imgWidth}/${imgHeight}?random=${index})`;
        },
        position: 'absolute',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        top: 0,
        left: 0,
    });

    gsap.set(rowSelector, {
        position: 'absolute',
    });
}

function applyInertia(vx, vy) {
    let friction = 0.9; // Réduction progressive de la vitesse (ajuster entre 0.9 et 0.99)
    let duration = Math.max(Math.abs(vx), Math.abs(vy)) / 50; // Durée ajustée selon la vitesse
    duration = Math.min(duration, 2); // Empêche une inertie trop longue

    function animateInertia() {
        vx *= friction;
        vy *= friction;

        gsap.to(containerSelector, {
            x: '+=' + vx,
            y: '+=' + vy,
            ease: 'none',
            duration: 0.05,
            onUpdate: updateCenterElem,
            onComplete: function () {
                if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
                    animateInertia(); // Continue tant que la vitesse est significative
                }
            },
        });
    }

    animateInertia();
}

function createDraggable() {
    const allImgs = document.querySelectorAll('.sliderImage');
    let velocityX = 0,
        velocityY = 0,
        lastX = 0,
        lastY = 0;

    return Draggable.create(containerSelector, {
        trigger: '.mask',
        type: 'x,y',
        edgeResistance: 0.65, // Résistance sur les bords
        dragResistance: 0.2,
        resistance: 400,
        onDragStart: function () {
            gsap.killTweensOf(containerSelector); // Stoppe l'inertie actuelle s'il y en a une
            lastX = this.x;
            lastY = this.y;
        },
        onDrag: function () {
            let dx = this.x - lastX;
            let dy = this.y - lastY;
            velocityX = dx;
            velocityY = dy;
            lastX = this.x;
            lastY = this.y;

            allImgs.forEach((img) => {
                img.style.backgroundSize = '110%';
            });
            topBar.style.top = '0';
            bottomBar.style.bottom = '0';
            leftBar.style.left = '0';
            rightBar.style.right = '0';
            updateCenterElem();
        },
        onDragEnd: function () {
            allImgs.forEach((img) => {
                img.style.backgroundSize = '100%';
            });
            topBar.style.top = '-70px';
            bottomBar.style.bottom = '-70px';
            leftBar.style.left = '-70px';
            rightBar.style.right = '-70px';
            applyInertia(velocityX, velocityY);
        },
    });
}

function init() {
    gsap.set(containerSelector, { willChange: 'transform' });

    createImageGrid();
    createMask();
    lastCenteredElem = document.querySelectorAll(imageSelector)[(rowMidIndex - 1) * imgNum + imgMidIndex];

    createDraggable();

    setStyles();

    resize();
    window.addEventListener('resize', resize);
}

init();
