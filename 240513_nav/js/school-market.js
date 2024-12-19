//data.json -> js -> HTML

let allDate;


const showData = (data) => {
    let productContainerString = "";
    //data를 하나씩 꺼내서
    data.forEach(element => {
        //article 만들어서
        let articleString = `<article class="class product-item">
            <img src="images/${element.image}" alt="">
                <div class="name">${element.name}</div>
        </article>`;
        productContainerString += articleString;
        
    });
    //.product-container 추가
    const productContainerDiv = document.getElementsByClassName("product-container")[0];
    productContainerDiv.innerHTML = productContainerString;
}

const setData = (data) =>{
    allData = data;                 // 처음 한번 전체 data 보관하자
    showData(data);
}

const getData = () => {     // 시험 !!!!!!!!!!
    const filename = 'js/data.json';  // 불러올 파일 또는 API URL을 지정
    fetch(filename)  // fetch()는 파일을 비동기적으로 가져오는 함수
        .then((response) => response.json())  // 응답을 JSON 형태로 파싱
        .then((data) => setData(data))  // 파싱된 데이터를 setData 함수로 처리
        .catch((error) => console.log(error));  // 에러 발생 시 에러를 콘솔에 출력
}

getData();

const searchData = (query) => {     // data.json 파일에 있는 키 값을 활용해서 검색
    if(query === "") showData(allData);                 // 아무것도 입력하지 않으면, 전체 data 보여주자
    // 전체 data에서 하나 꺼내어 name에 query가 있는지 확인하자
    let data = allData.filter((oneData) => oneData["name"].includes(query) || oneData["category"].includes(query));
    showData(data);
}