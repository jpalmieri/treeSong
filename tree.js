const treeSketch = p => {
  const plantBorder = 50;
  const nodeBorder = 0;
  const minBranchLength = 20;
  const maxBranchLength = 85;
  const minSizeMultiplier = .55;
  const treeId = 'tree';

  let plant;
  let plantX;
  let plantY;

  p.setup = function() {
    const { containerWidth, containerHeight} = getContainerDimensions();
    const canvas = p.createCanvas(containerWidth, containerHeight);
    canvas.parent(treeId);

    plantX = p.width / 2;
    plantY = p.height * .9;
    plant = new Node(null, 50, p.random(200, 255), p.TAU * 0.75);
    p.strokeWeight(0);
    circleColor = p.random(255);
  }

  p.draw = function() {
    p.background(255,255,255);

    plant.draw();
    plant.maybeGrow();

    p.noStroke();
    p.fill(120, 0, 0);
    p.quad(plantX - 25, plantY -140,
        plantX + 25, plantY -140,
        plantX + 25, plantY + 55,
        plantX - 25, plantY + 55);

    p.fill(0, 0, 0);
    p.noStroke();
  }

  p.mousePressed = function() {
    const clickedNode = plant.getClickedNode(p.mouseX, p.mouseY);
    if (clickedNode) {
      clickedNode.prune();
    }
  }

  class Node {

    constructor(parent, parentSize, parentG, angle) {
      this.parent = parent;
      this.parentSize = parentSize;
      this.size = p.random(parentSize * minSizeMultiplier, parentSize);
      this.angle = angle;
      this.branchLength = p.random(minBranchLength, maxBranchLength);
      this.children = [];

      this.x = parent ? this.getX(parent.x) : plantX;
      this.y = parent ? this.getY(parent.y) : plantY;

      this.g = parentG + p.random(-25, 25);
      this.g = p.constrain(this.g, 0, 255);
    }

    getX(parentX) {
      return parentX + p.cos(this.angle) *
        (this.parentSize / 2 + this.branchLength + this.size / 2);
    }

    getY(parentY) {
      return parentY + p.sin(this.angle) *
        (this.parentSize / 2 + this.branchLength + this.size / 2);
    }

    grow() {
      const childAngle = this.angle + p.random(-p.PI / 3, p.PI / 3);
      const child = new Node(this, this.size, this.g, childAngle);

      if (child.size < 5) {
        return false;
      }

      if(child.x < plantBorder || child.x > p.width - plantBorder){
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
        const randomChild = p.random(this.children);
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
      if (p.dist(this.x, this.y, clickedX, clickedY) < this.size / 2) {
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
        p.dist(this.x, this.y, otherNodeX, otherNodeY) <
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
      p.stroke(139, 69, 19);
      p.strokeWeight(1);
      for (const child of this.children) {
        p.line(this.x, this.y, child.x, child.y);
      }

      // circle
      p.noStroke();
      p.fill(circleColor);
      p.circle(this.x, this.y, this.size);

      if (p.mouseIsPressed) {
        circleColor = p.color(p.random (255), p.random(255), p.random(255));
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
}

new p5(treeSketch);
