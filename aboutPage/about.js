function displayDrawer() {
    if (document.getElementById("drawer").style.display == "none") {
      document.getElementById("drawer").style.display = "block";
    } else {
      document.getElementById("drawer").style.display = "none";
    }
  }


  const owners = document.querySelector('.owners');
let ownersNames = ['AbdullahLaham', 'MostafaBalousha123', 'naghamabuwarda', 'moayed-nabahin']

ownersNames.forEach(name => {
    fetcData(name)
})
function fetcData(userName) {
    fetch(`https://api.github.com/users/${userName}`).then(resp => resp.json()).then(data => {
    console.log(data)
    showData(data)
})
}
function showData(data) {
    let owner = document.createElement('div')
    owner.classList.add('owner')
    let image = document.createElement('img');
    image.src = data.avatar_url;
    
    owner.appendChild(image)
    owner.onclick = () => {
        window.open(data.html_url)
    };
    let para = document.createElement('p')
    para.innerText = data.login;
    owner.appendChild(para)
    owners.appendChild(owner)
    
}
function showProfile(url) {
    window.open(url)
}
