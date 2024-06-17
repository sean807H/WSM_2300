//data.json -> js -> HTML

const setData = (data) => {
    let productContainerString = "";
    //data를 하나씩 꺼내서
    data.forEach(element => {
        //article 만들어서
        let articleString = `<article class="class product-item">
            <img src="images/${element.image}" alt="">
                <div class="name">${element.image}</div>
        </article>`;
        productContainerString += articleString;
        
    });
    //.product-container 추가
    const productContainerDiv = document.getElementsByClassName("product-container")[0];
    productContainerDiv.innerHTML = productContainerString;
}

const getData = () => {
    const filename = 'js/data.json';
    fetch(filename)                 // 백엔드 있을 떄는 여기에 백엔드 API URL 이 들어간다.
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
}

getData();