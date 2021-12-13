

const url = document.getElementById('url');
const urlBtn = document.getElementById('urlBtn');


urlBtn.addEventListener('click', updateUrl);



function updateUrl() {
  console.log(url.value);


  var regex = url.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  //REGEX DISABLED FOR TESTING PURPOSE

  if (true) {
        post(url.value, '/admin/update/url')
    } else {
        console.log("Invalid");
  }




}







async function post (data, URL) {

    fetch(URL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        data: data,
      })
    }) .then(res => {
      return res.json()
    })


}
