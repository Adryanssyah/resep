$.ajax({
      url: 'https://masak-apa.tomorisakura.vercel.app/api/recipes',
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

function searchResep() {
      $('#isi').html('');
      $.ajax({
            url: 'https://masak-apa.tomorisakura.vercel.app/api/search/?',
            type: 'GET',
            dataType: 'json',
            data: {
                  q: $('#search-input').val(),
            },
            success: function (result) {
                  let hasil = result.results;
                  if ((hasil.length !== 0) == true) {
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
                            <p>` +
                                          data.title.substr(0, 40) +
                                          `...` +
                                          `</p>
                        </div>
                    </div>`
                              );
                        });
                        // $('#search-input').val('');
                  } else {
                        $('#isi').html(
                              `
                        <div class="empty"> 
                              <img src="assets/image/empty.png">
                              <p>Resep Tidak Ditemukan!</p>
                        </div>
                      `
                        );
                        // $('#search-input').val('');
                  }
                  return result;
            },
      });
}

// fungsi event jika button search ditekan
$('#search-button').on('click', function () {
      searchResep();
});

// fungsi jika tombol enter di tekan
$('#search-input').on('keyup', function (e) {
      if (e.keyCode === 13) {
            searchResep();
      }
});

// ketika menekan satu menu arahkan ke page detail.html
$('#isi').on('click', '.box', function () {
      let k = $(this).data('id');
      // alihkan ke page detail.html
      window.location.href = 'detail.html?key=' + k;
});
