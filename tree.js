const plantBorder = 50;
const nodeBorder = 0;
const minBranchLength = 20;
const maxBranchLength = 85;
const minSizeMultiplier = .55;
const treeId = 'tree';

let plant;
let plantX;
let plantY;

function setup() {
  // createCanvas(400, 400);
  const { containerWidth, containerHeight} = getContainerDimensions();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(treeId);

  plantX = width / 2;
  plantY = height * .9;
  plant = new Node(null, 50, random(200, 255), TAU * 0.75);
  strokeWeight(0);
  circleColor = random(255);

}

function draw() {
  background(255,255,255);

  plant.draw();
  plant.maybeGrow();

  noStroke();
  fill(120, 0, 0);
  quad(plantX - 25, plantY -140,
       plantX + 25, plantY -140,
       plantX + 25, plantY + 55,
       plantX - 25, plantY + 55);

   
}

function mousePressed() {
  const clickedNode = plant.getClickedNode(mouseX, mouseY);
  if (clickedNode) {
    clickedNode.prune();
  }
}

class Node {

  constructor(parent, parentSize, parentG, angle) {
    this.parent = parent;
    this.parentSize = parentSize;
    this.size = random(parentSize * minSizeMultiplier, parentSize);
    this.angle = angle;
    this.branchLength = random(minBranchLength, maxBranchLength);
    this.children = [];

    this.x = parent ? this.getX(parent.x) : plantX;
    this.y = parent ? this.getY(parent.y) : plantY;

    this.g = parentG + random(-25, 25);
    this.g = constrain(this.g, 0, 255);
  }

  getX(parentX) {
    return parentX + cos(this.angle) *
      (this.parentSize / 2 + this.branchLength + this.size / 2);
  }

  getY(parentY) {
    return parentY + sin(this.angle) *
      (this.parentSize / 2 + this.branchLength + this.size / 2);
  }

  grow() {
    const childAngle = this.angle + random(-PI / 3, PI / 3);
    const child = new Node(this, this.size, this.g, childAngle);

    if (child.size < 5) {
      return false;
    }

    if(child.x < plantBorder || child.x > width - plantBorder){
      return false;
    }

    if (child.y < plantBorder || child.y > plantY - 25) {
      return false;
    }

    if (plant.intersects(this, child.x, child.y, child.size)) {
      return false;
    }

    this.children.push(child);
    return true;
  }

  maybeGrow() {
    const grew = this.grow();

    if (!grew) {
      const randomChild = random(this.children);
      if (randomChild) {
        randomChild.maybeGrow();
      }
    }
  }

  prune() {
    // can't prune the first node
    if (this == plant) {
      return;
    }
    const index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  }

  getClickedNode(clickedX, clickedY) {
    if (dist(this.x, this.y, clickedX, clickedY) < this.size / 2) {
      return this;
    }

    for (const child of this.children) {
      const clickedChildNode = child.getClickedNode(clickedX, clickedY);
      if (clickedChildNode) {
        return clickedChildNode;
      }
    }

    return null;
  }

  intersects(parentNode, otherNodeX, otherNodeY, otherNodeSize) {
    if (this != parentNode &&
      dist(this.x, this.y, otherNodeX, otherNodeY) <
           this.size / 2 + otherNodeSize / 2 + nodeBorder) {
      return true;
    }

    for (const child of this.children) {
      if (child.intersects(parentNode, otherNodeX, otherNodeY, otherNodeSize)) {
        return true;
      }
    }

    return false;
  }

  draw() {

    // branches
    stroke(139, 69, 19);
    strokeWeight(1);
    for (const child of this.children) {
      line(this.x, this.y, child.x, child.y);
    }

    // circle
      noStroke();
    fill(circleColor);
    circle(this.x, this.y, this.size);

 if (mouseIsPressed) {
  circleColor = color(random (255), random(255), random(255));
}

    // children
    for (const child of this.children) {
      child.draw();
    }
  }
}

function getContainerDimensions() {
  const container = document.getElementById(treeId);
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  return {
    containerWidth,
    containerHeight
  }
}
