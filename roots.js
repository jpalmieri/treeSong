const rootsSketch = p => {
  const containerId = 'roots';

  let roots = [];

   p.setup = function() {
    const { containerWidth, containerHeight} = getContainerDimensions();
    const canvas = p.createCanvas(containerWidth, containerHeight);
    canvas.parent(containerId);
  
    p.background(255);
  
    roots.push(new Root({ x: p.width / 2, y: 0 }));
  }
  
  class Root {
    x;
    y;
  
    length = 200;
  
    stepsTaken = 0;
  
    direction;
  
    constructor({ x, y, direction = {
      x: 1,
      y: 1
    } }) {
      this.x = x;
      this.y = y;
      this.direction = direction;
    }
  
    step() {
      if (this.stepsTaken == this.length / 2) {
        console.log("new ROot")
        const direction = { x: -this.direction.x, y: this.direction.y };
        const newRoot = new Root({ direction, x: this.x, y: this.y });
        roots.push(newRoot);
      }
  
      if (this.stepsTaken < this.length) {
        this.x += this.direction.x;
        this.y += this.direction.y;
        this.stepsTaken++;
      }
  
      
    }
  
    display() {
      p.stroke(0);
      p.point(this.x,this.y);
    }
  }
  
  p.draw = function() {
    roots.forEach(root => {
      root.step();
      root.display();
    })
  }
  
  // This Redraws the Canvas when resized
  windowResized = function () {
    const { containerWidth, containerHeight} = getContainerDimensions();
    resizeCanvas(containerWidth, containerHeight);
  };
  
  function getContainerDimensions() {
    const container = document.getElementById(containerId);
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    return {
      containerWidth,
      containerHeight
    }
  }
};

new p5(rootsSketch);