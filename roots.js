const rootsSketch = p => {
  const containerId = 'roots';

  let roots = [];

  function init() {
    const { containerWidth, containerHeight} = getContainerDimensions();
    const canvas = p.createCanvas(containerWidth, containerHeight);
    canvas.parent(containerId);
  
    p.background(255);
  
  
    roots.push(new Root({ location: p.createVector(p.width / 2, 0), velocity: p.createVector(-0.50, 0.15) }));
    roots.push(new Root({ location: p.createVector(p.width / 2, 0), velocity: p.createVector(-0.25, 0.15) }));
    roots.push(new Root({ location: p.createVector(p.width / 2, 0), velocity: p.createVector(0, 0.15) }));
    roots.push(new Root({ location: p.createVector(p.width / 2, 0), velocity: p.createVector(0.25, 0.15) }));
    roots.push(new Root({ location: p.createVector(p.width / 2, 0), velocity: p.createVector(0.50, 0.15) }));
  }

  p.setup = function() {
    init();
  }
  
  class Root {
    length = 200;
  
    stepsTaken = 0;

    babies = 0;
    topSpeed = 1;
  
    constructor({ location, velocity }) {
      this.location = location;
      this.goLeft = Math.random(1) > 0.5 ? true : false;
      this.velocity = velocity ? velocity : p.createVector(this.goLeft ? -Math.random(1) : Math.random(1), Math.random(0.15));
    }
  
    step() {
      if (this.stepsTaken >= this.length * 0.33333 && this.babies == 0) {
        const location = p.createVector(this.location.x, this.location.y);
        const newRoot = new Root({ location });
        roots.push(newRoot);
        this.babies++;
      }

      if (this.stepsTaken >= this.length * 0.66666 && this.babies == 1) {
        const location = p.createVector(this.location.x, this.location.y);
        const newRoot = new Root({ location });
        roots.push(newRoot);
        this.babies++
      }
  
      if ((Math.round(Math.random() * 100) % 3) === 0) {
        if (this.stepsTaken < this.length) {
          const acceleration = p5.Vector.random2D();
          acceleration.mult(p.random(0.15));
          this.velocity.x += acceleration.x;
          this.velocity.y += acceleration.y;
          this.velocity.limit(this.topspeed)
          this.location.add(this.velocity);
          this.stepsTaken++;
        }
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

    if (rootsAnimating && roots.length <= 1000) {
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