var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("zoom");

function setTransform() {
  if (scale * zoom.clientHeight >= (window.innerHeight / 1.5)) {
    zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
  }
  if (scale * zoom.clientHeight < (window.innerHeight / 1.5)) {
    scale = (window.innerHeight / 1.5) / zoom.clientHeight;
  }
}

zoom.onmousedown = function (e) {
  e.preventDefault();
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
  zoom.style.cursor = 'grabbing';
}

zoom.onmouseup = function (e) {
  panning = false;
  zoom.style.cursor = 'grab';
}

zoom.onmousemove = function (e) {
  e.preventDefault();
  if (!panning) return;
  pointX = (e.clientX - start.x);
  pointY = (e.clientY - start.y);
  setTransform();
}

zoom.onwheel = function (e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
      ys = (e.clientY - pointY) / scale,
      delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
  (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;
  setTransform();
}

document.getElementById('toggleMetro').addEventListener('change', function () {
  document.getElementById('metroLayer').style.display = this.checked ? 'block' : 'none';
});
document.getElementById('toggleArea').addEventListener('change', function () {
    document.getElementById('areaLayer').style.display = this.checked ? 'block' : 'none';
  });

// Add more event listeners for other checkboxes if needed
