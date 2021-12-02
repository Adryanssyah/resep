// ambil key yang sudah dikirim tadi di URL
function getParameter(parameterName) {
      let parameters = new URLSearchParams(window.location.search);
      return parameters.get(parameterName);
}
let k = getParameter('key');

$.ajax({
      url: 'https://masak-apa.tomorisakura.vercel.app/api/recipe/:' + k,
      type: 'GET',
      dataType: 'json',

      success: function (result) {
            let hasil = result.results;
            let gambar = 'assets/image/default.jpg';
            if ((hasil.length !== 0) == true) {
                  if (hasil.thumb !== null) {
                        gambar = hasil.thumb;
                  }
                  $('#judul').append(
                        `
                              ` +
                              hasil.title +
                              `
                        `
                  );

                  // Menampilkan detail ke html
                  $('#detail').append(
                        `
                  <div class="ket">
                        <div class="left">
                              <h2>` +
                              hasil.title +
                              `</h2>
                              <div class="page">/detail-resep</div>
                              <div class="author">
                                    <div><b>Author: </b> ` +
                              hasil.author.user +
                              `</div>
                                    <div class="b2"><b>Tanggal Upload: </b> ` +
                              hasil.author.datePublished +
                              `</div>
                              </div>
                              <div class="kesulitan">
                                    <span><i class="fad fa-clock"></i> ` +
                              hasil.times +
                              ` </span>
                                    <span class="mid"><i class="fas fa-hat-chef"></i> ` +
                              hasil.dificulty +
                              ` </span>
                                    <span><i class="fas fa-concierge-bell"></i> ` +
                              hasil.servings +
                              ` </span>
                              </div>
                              <div class="special">
                                    <b>Special Item:</b>
                                    <div class="special-item" id="special-item">
                                         
                                    </div>
                              </div>
                        </div>
                        <div class="gambar">
                              <img src="` +
                              gambar +
                              `" />
                        </div>
                  </div>

                  <div class="deskripsi">
                        <div class="basabasi">
                              <h4>Deskripsi</h4>
                              <p>
                              ` +
                              hasil.desc +
                              `
                               </p>
                        </div>
                        <div class="basabasi">
                              <h4>Bahan-bahan</h4>
                              <div class="langkah" id="bahan">
                                   
                              </div>
                        </div>
                        <div class="basabasi">
                              <h4>Langkah-langkah</h4>
                              <div class="langkah" id="langkah">
                                   
                              </div>
                              
                        </div>
                        <div class="basabasi">
                              <h4>Video Terkait</h4>
                        </div>
                  </div>
                  
                  `
                  );

                  let bahan = hasil.ingredient;
                  let langkah = hasil.step;
                  let special = hasil.needItem;

                  // special item
                  for (let i = 0; i < special.length; i++) {
                        $('#special-item').append(
                              `
                              <img src="` +
                                    special[i].thumb_item +
                                    `" title="` +
                                    special[i].item_name +
                                    `"/>
                               `
                        );
                  }

                  // BAHAN2
                  for (let i = 0; i < bahan.length; i++) {
                        $('#bahan').append(
                              `
                              <div>
                                    <span><i class="fas fa-mitten"></i></span>
                                    <p>` +
                                    bahan[i] +
                                    `</p>
                              </div>
                               `
                        );
                  }

                  // LANGKAH2
                  for (let i = 0; i < langkah.length; i++) {
                        const nomor = i + 1;
                        const sub = nomor.toString;
                        $('#langkah').append(
                              `
                              <div>
                                    <span>` +
                                    nomor +
                                    `</span>
                                    <p>` +
                                    langkah[i].substring(sub.length + 1) +
                                    `</p>
                              </div>
                               `
                        );
                  }
            }
      },
});

// rekomendasi
$.ajax({
      url: 'https://masak-apa.tomorisakura.vercel.app/api/recipes-length/?limit=5',
      type: 'GET',
      dataType: 'json',
      success: function (result) {
            if (result.status) {
                  let resep = result['results'];

                  $.each(resep, function (i, data) {
                        $('#isi').append(
                              `
                              <div class="box" data-id="` +
                                    data.key +
                                    `">
                      <div class="image">
                          <img src="` +
                                    data.thumb +
                                    `">
                      </div>
                      <div>
                          <p title="` +
                                    data.title +
                                    `">` +
                                    data.title.substr(0, 40) +
                                    `...` +
                                    `</p>
                      </div>
                  </div>`
                        );
                  });
            }
      },
});

// ketika menekan satu menu arahkan ke page detail.html
$('#isi').on('click', '.box', function () {
      let k = $(this).data('id');
      // alihkan ke page detail.html
      window.location.href = 'detail.html?key=' + k;
});

// YOUTUBE
$.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      dataType: 'json',
      data: {
            part: 'snippet',
            q: k,
            key: 'AIzaSyAAfzQhIHtanryOh2r-_qV4Kg2x6Jz_akM',
            maxResults: '1',

            //key 1= AIzaSyC0NeW507C5fIPjCyj0GwiGspZTVxyiRzg
            //key 2= AIzaSyAAfzQhIHtanryOh2r-_qV4Kg2x6Jz_akM
            //key 3= AIzaSyC91smxr3g3_rgD4Zbr-GUfu3Gh0Lg3l0A
            //key 4= AIzaSyCzr5lqs9dCkAl-XKPY8ASl8GomTAEzBwY
      },

      success: function (result) {
            let banyak = result['items'];

            for (let i = 0; i < banyak.length; i++) {
                  let hasil = result['items'][i]['id']['videoId'];
                  let title = result['items'][i]['snippet']['title'];

                  $('#video-yt').append(
                        `
                        <iframe src="https://www.youtube.com/embed/` +
                              hasil +
                              `?rel=0" title="YouTube video" allowfullscreen></iframe>
                              <div class="title">
                               </div>
                         `
                  );
            }
      },
});
