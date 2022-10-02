const rootsSketch = p => {
  const containerId = 'roots';

  let roots = [];

  function init() {
    const { containerWidth, containerHeight} = getContainerDimensions();
    const canvas = p.createCanvas(containerWidth, containerHeight);
    canvas.parent(containerId);
  
    p.background(255);
  
    roots.push(new Root({ x: p.width / 2, y: 0, direction: { x: -1, y: 1 } }));
  }

  p.setup = function() {
    init();
  }
  
  class Root {
    x;
    y;
  
    length = 200;
  
    stepsTaken = 0;
  
    direction;

    babies = 0;
  
    constructor({ x, y, direction }) {
      this.x = x;
      this.y = y;
      this.direction = direction ? direction : { x: Math.random(1), y: Math.random(1) };
    }
  
    step() {
      if (this.stepsTaken >= this.length * 0.33333 && this.babies == 0) {
        const newRoot = new Root({ x: this.x, y: this.y });
        roots.push(newRoot);
        this.babies++;
      }

      if (this.stepsTaken >= this.length * 0.66666 && this.babies == 1) {
        const newRoot = new Root({ x: this.x, y: this.y });
        roots.push(newRoot);
        this.babies++
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
    if (restart) {
      roots = [];
      restart = false;
      init();
    };

    if (rootsAnimating) {
      roots.forEach(root => {
        root.step();
        root.display();
      })
    }
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