// 반응형 웹의 JavaScript 에서 하는 일
// 1. HTML 요소 -> JS 변수로 가져온다.
// 2. 이벤트 처리한다.(click, focus, mouseup, ...)
// 3. class를 수정하여 style을 적용한다.

// HTML .nav-toggle -> js 변수      navToggleDiv
// HTML .nav-list -> js 변수        navListUl
// HTML .nav-toggle > i -> js 변수  toggleI

// navToggleDiv 클릭 이벤트 처리

    // navListUl을 보이자. show-menu 클래스 추가하자/제거하자
    // toggleI bi-list <-> bi-x-lg

function toggleMenu(){
    const navToggleDiv = document.getElementsByClassName("nav-toggle")[0];
    // const navToggleDiv = document.getElementById("nav-toggle");
    const navListUl = document.getElementsByClassName("nav-list")[0];
    const toggleI = navToggleDiv.getElementsByTagName("i")[0];

    navToggleDiv.onclick = (event) => {

        navListUl.classList.toggle("show-menu");
        // show-menu 클래스가 없으면 추가되어 #navList의 display가 block으로 변경되고, 메뉴가 보이게 됩니다.
        // show-menu 클래스가 있으면 제거되어 #navList의 display가 none으로 변경되고, 메뉴가 숨겨지게 됩니다.
        // navListUl.classList.add("show-menu");
        // navListUl.classList.remove("show-menu");

        toggleI.classList.toggle("bi-list");
        toggleI.classList.toggle("bi-x-lg");
        // navListUl.classList.remove("bi-x-lg");
        // navListUl.classList.add("bi-list");
        // navListUl.classList.remove("bi-x-lg");
        // navListUl.classList.add("bi-list");
    }
}
toggleMenu();