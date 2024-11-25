'use strict';

function confetti() {
  // Globals
  var random = Math.random,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      PI2 = PI * 2,
      confetti = [];

  var particles = 500,  // Increased number of confetti
      sizeMin = 3,
      sizeMax = 12 - sizeMin,
      deviation = 100,
      dyMin = -0.3,  // Negative values to make confetti go upward
      dyMax = -0.6,
      dThetaMin = 0.4,
      dThetaMax = 0.7 - dThetaMin;

  // Color themes
  var colorThemes = [
    function () {
      return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
    },
    function () {
      return color(200, 100, 200 * random() | 0);
    }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Create the overarching container
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style, innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' + cos(360 * random()) + ',' + cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    // Start from either left or right
    this.x = random() < 0.5 ? -deviation : window.innerWidth + deviation;
    this.y = window.innerHeight * random();
    this.dx = this.x < 0 ? 1 : -1; // Move inward
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta * 0.2;
      this.y += this.dy * delta; // Move upward
      this.theta += this.dTheta * delta;

      outerStyle.left = this.x + 'px';
      outerStyle.top = this.y + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';

      // Remove confetto if it moves out of view
      return this.y < -deviation || this.x < -deviation || this.x > window.innerWidth + deviation;
    };
  }

  function poof() {
    // Append the container
    document.body.appendChild(container);

    // Add confetti
    var theme = colorThemes[0];
    for (var i = 0; i < particles; i++) {
      var confetto = new Confetto(theme);
      confetti.push(confetto);
      container.appendChild(confetto.outer);
    }

    // Start the loop
    var prev = undefined;
    requestAnimationFrame(function loop(timestamp) {
      var delta = prev ? timestamp - prev : 0;
      prev = timestamp;

      for (var i = confetti.length - 1; i >= 0; --i) {
        if (confetti[i].update(window.innerHeight, delta)) {
          container.removeChild(confetti[i].outer);
          confetti.splice(i, 1);
        }
      }

      if (confetti.length) {
        requestAnimationFrame(loop);
      } else {
        // Cleanup
        document.body.removeChild(container);
      }
    });
  }

  poof();
}