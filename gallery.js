(function () {
  var dialog = document.querySelector('.podglad-zdjecia');
  if (!dialog) return;

  var preview = dialog.querySelector('img');
  var caption = dialog.querySelector('figcaption');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.galeria-zdjecie'));
  var currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + buttons.length) % buttons.length;
    var image = buttons[currentIndex].querySelector('img');
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    caption.textContent = image.alt;
  }

  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      showImage(index);
      dialog.showModal();
    });
  });

  dialog.querySelector('.poprzednie-zdjecie').addEventListener('click', function () {
    showImage(currentIndex - 1);
  });
  dialog.querySelector('.nastepne-zdjecie').addEventListener('click', function () {
    showImage(currentIndex + 1);
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showImage(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(currentIndex + 1);
    }
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
}());
