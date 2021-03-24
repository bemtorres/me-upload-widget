var API_KEY = '';
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');

axios.get(URL)
  .then(function (response) {
    if (parseInt(response.data.totalHits) > 0)
      $.each(response.data.hits, function(i, hit){ console.log(hit.pageURL); });
    else
      console.log('No hits');
  })
  .catch(function (error) {
    console.log(error);
  });

