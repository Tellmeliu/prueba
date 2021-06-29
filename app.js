(function () {
  function Busqueda(keyword) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=10`)
      .then(response => response.json());
  }

  function AnadaImg(img) {
    let $div = $('<div class="img-wrapper"></div>');
    $('<div class="inner"></div>').append(img).appendTo($div);
    $('#thumbs').append($div)
  }

  function Cargo() {
    $('.loader-wrapper').addClass('shown');
  }

  function Cargo_h() {
    $('.loader-wrapper').removeClass('shown');
  }

  function Img_Carg(img) {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
    });
  }

  (function listenOnFormSubmit() {
    $('#buscaForm').submit(async (ev) => {
      ev.preventDefault();

      let $input = $('#buscaInput');

      main($input.val());
    });
  })();

  async function main(keyword) {
    const resultado = await Busqueda(keyword);
    $('#thumbs').html('');
    Cargo();
    let promesa = [];
    resultado.data.forEach(gif => {
      let img = new Image();
      img.src = gif.images.original.url;
      promesa.push(Img_Carg(img));
      AnadaImg(img);
    });

    await Promise.all(promesa);
    Cargo_h();
  }
})();