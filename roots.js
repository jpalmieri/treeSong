const rootsSketch = p => {
  const containerId = 'roots';

  let roots = [];

  function init() {
    const { containerWidth, containerHeight} = getContainerDimensions();
    const canvas = p.createCanvas(containerWidth, containerHeight);
    canvas.parent(containerId);
  
    p.background(255);
  
    roots.push(new Root({ location: p.createVector(p.width / 2, 0), direction: p.createVector(0, 1) }));
  }

  p.setup = function() {
    init();
  }
  
  class Root {
    length = 200;
  
    stepsTaken = 0;

    babies = 0;
  
    constructor({ location, direction }) {
      this.location = location;
      this.direction = direction ? direction : p.createVector(Math.random(1), Math.random(1));
    }
  
    step() {
      if (this.stepsTaken >= this.length * 0.33333 && this.babies == 0) {
        const newRoot = new Root({ location: p.createVector(this.location.x, this.location.y) });
        roots.push(newRoot);
        this.babies++;
      }

      if (this.stepsTaken >= this.length * 0.66666 && this.babies == 1) {
        const newRoot = new Root({ location: p.createVector(this.location.x, this.location.y) });
        roots.push(newRoot);
        this.babies++
      }
  
      if (this.stepsTaken < this.length) {
        this.location.x += this.direction.x;
        this.location.y += this.direction.y;
        this.stepsTaken++;
      }
  
      
    }
  
    display() {
      p.stroke(0);
      p.point(this.location.x,this.location.y);
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