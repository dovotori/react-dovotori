function MousePicker() {
  this.rayon = new vec4(0, 0, 0, 0);
  this.margeTop = 0;
}

MousePicker.prototype.setup = function() {
  this.resize();
};

MousePicker.prototype.resize = function() {
  // calcul marge du haut
  var elem = document.getElementById("canvas3d");
  while (elem.offsetTop != null) {
    this.margeTop += elem.offsetTop;
    elem = elem.parentNode;
  }
};

MousePicker.prototype.update = function(event, camera) {
  //var relX = event.clientX / event.target.offsetWidth;
  //var relY = event.clientY-(this.margeTop - window.pageYOffset) / event.target.offsetHeight;
  var relX = map(event.clientX, 0, window.innerWidth, -1, 1);
  var relY = map(event.clientY, 0, window.innerHeight, 1, -1);
  this.rayon.set(relX, relY, -1.0, 1.0); // -1 en z pour pointer "devant"

  var proj = new mat4();
  proj.egale(camera.getProjection());
  proj.inverser();
  this.rayon.egale(this.rayon.multiplierMatrice(proj));
  this.rayon.set(this.rayon.x, this.rayon.y, -1.0, 0.0);

  var view = new mat4();
  view.egale(camera.getView());
  view.inverser();
  this.rayon.egale(this.rayon.multiplierMatrice(view));
  this.rayon.normaliser();
};

MousePicker.prototype.getRayon = function() {
  return this.rayon;
};
