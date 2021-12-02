$.ajax({
      url: 'https://cuaca-gempa-rest-api.vercel.app/weather/jambi/bulian',
      type: 'GET',
      dataType: 'json',
      // data: {
      //       apikey: '5ec2693a9b97c33b19190cfeb2455edb',
      //       country: 'id',
      // },
      success: function (result) {
            if (result.success) {
                  let song = result.data['params'][6]['times'];
                  console.log(song);
                  $.each(song, function (i, data) {
                        $('#isi').append(
                              `
                        <div class="box">
                        <div class="image">
                            <img src="assets/image/2.png">
                        </div>
                        <div class="judul">
                            <p>` +
                                    data.name +
                                    `</p>
                        </div>
                    </div>`
                        );
                  });
            }
      },
});
