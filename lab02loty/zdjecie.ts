fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.getElementById('logo').setAttribute('src', data[data.length - 1].author.avatar_url);
    console.log(data[data.length - 1].author.avatar_url);
  });