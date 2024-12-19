// 현재 날짜 구하자
currentDate = new Date();

// HTML -> js 변수 가져오자 #calendar-header h1
const calendarHeader = document.getElementById("calendar-header");
const calendarHeaderH1 = calendarHeader.getElementsByTagName("h1")[0];
// const calendarHeaderH1 = document.querySelector("#calendar-headar h1"); 위 두줄을 합친 것!!!
// getElementsByTagName, getElementsByClassName = 모든 요소 찾기. 배열처럼 접근 가능.

// CSS 선택자 규칙을 사용하여 더 다양한 방식으로 요소를 찾을 수 있기 때문입니다. 
const calendarContainerDiv = document.querySelector("#calendar-container");

// 이전/다음 버튼 클릭하면 이전달/다음달로 변경하자
// HTML -> js변수
// click event 발생했을 떄, 해야할 일 정하자
const prevMonthButton = document.getElementById("prev-month");

// 리턴값이 undefined => 클릭했을 때, 가만히 있으라
// arrow 함수 이렇게 적지마 -> [ prevMonthButton.addEventListener("click", console.log("이전")); ]
// 이유 : 해당 함수가 즉시 실행됩니다. 이 경우 addEventListener는 실행 결과(여기선 undefined)를 이벤트 핸들러로 등록하려 하므로 제대로 동작하지 않습니다.
// prevMonthButton.addEventListener("click", () => console.log("이전")); 화살표 함수로 이벤트가 발생할 때만 실행되도록 만듭니다.
prevMonthButton.addEventListener("click", () => changeMonth(-1));  // !!!!!!!!!!!!! 시험 (동일한 이벤트에 여러 핸들러를 등록할 수 있습니다.)
// function 출력해() {
//      return console.log("이전")
// }
const nextMonthButton = document.querySelector("#next-month");
nextMonthButton.onclick = () => changeMonth(1)  // !!!!!!!!!!!!!!! 시험

// diff: -1: 이전 달, 0: 현재 달, 1: 다음 달
const changeMonth = (diff) => {
    currentDate.setMonth(currentDate.getMonth() + diff);
    // 년 구하자
    const year = currentDate.getFullYear();
    // 월 구하자
    const month = currentDate.getMonth();     // 1월 : 0
    // 제목 바꾸자
    // console.log(`${year}년 ${month + 1}월`);

    // js 변수에 innerHTML = `${year}년 ${month + 1}월`
    calendarHeaderH1.innerHTML = `<i>${year}년 ${month + 1}월</i>`
    // 달력 새로 그리자
    setCalendar(currentDate);


}

const setCalendar = (date) => {

    // 현재년
    const year = date.getFullYear();
    // 현재월
    const month = date.getMonth();
    // 이번 달 마지막 날짜
    const lastDate = new Date(year, month + 1, 0);   // 다을달 1일의 전 날 => 현재년, 현재월 + 1, 1 - 1
    // 날짜를 0으로 설정하면, 지정된 달의 전날을 의미하므로, 이 경우 다음 달의 "1일 - 1일 = 마지막 날"이 됩니다.
    const lastDateDate = lastDate.getDate();
    // 이번 달 마지막 날짜의 요일
    const lastDay = lastDate.getDay();      //요일
    // 이번 달 마지막 날짜
    const prevMonthLastDate = new Date(year, month, 0); //이번 달 1일의 전 날
    const prevMonthLastDateDate = prevMonthLastDate.getDate();
    // 이번 달 첫날의 모임
    const firstDay = new Date(year, month, 1).getDay();

    // let weelNameString = `<div class="item week-name">일</div>
    // <div class="item week-name">월</div>
    // <div class="item week-name">화</div>
    // <div class="item week-name">수</div>
    // <div class="item week-name">목</div>
    // <div class="item week-name">금</div>
    // <div class="item week-name">토</div>`;

    // calendarContainerDiv.innerHTML = weelNameString

    let weekNameString = "";
    const weekNames = "일월화수목금토";
    const weekNamesArray = weekNames.split("");
    weekNamesArray.forEach((weekName) => {
        weekNameString += `<div class="item week-name">${weekName}</div>`;
    });

    calendarContainerDiv.innerHTML = weekNameString;

    // 이전 달의 뒷날짜 표시하자(?~이전 달 마지막 날짜 ? : 이전 달 마지막 날짜-이번 달 첫날의 요일+1)
    for (let date = prevMonthLastDateDate - firstDay + 1; date <= prevMonthLastDateDate; date++) {
        // (4월)지난 달의 마지막 날짜(30) - 이번 달 첫번째 날 (월)요일(1) + 1 | 지난달의 마지막 날짜까지 반복
        let currentMonthDateDiv = document.createElement("div");        // <div></div>
        currentMonthDateDiv.className = "item other-month";             // <div class = "item other-month"></div>
        currentMonthDateDiv.textContent = date;                         // <div class = "item other-month">날짜</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);          // <div id = "calendar-container"><div class = "item other-month">날짜</div></div>

    }

    // 이번 달의 모든 날짜 표시하자(1~이번 달 마지막 날짜)
    for (let date = 1; date <= lastDateDate; date++) {
        let currentMonthDateDiv = document.createElement("div");        // <div></div>
        currentMonthDateDiv.className = "item";                         // <div class = "item"></div>
        currentMonthDateDiv.textContent = date;                         // <div class = "item">날짜</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);          // <div id = "calendar-container"><div class = "item">날짜</div></div>

    }

    // 다음 달의 앞날짜 표시하자(1~? ?: 6~이번 달 마지막 날짜의 요일)
    for (let date = 1; date <= 6 - lastDay; date++) {
        // 달력 마지막 줄의 빈 칸을 채우기 위해 6 - 3 = 3 → 다음 달의 앞날짜는 1부터 3일까지 - 이번 달의 마지막 수요일(3)
        let currentMonthDateDiv = document.createElement("div");        // <div></div>
        currentMonthDateDiv.className = "item other-month";             // <div class = "item other-month"></div>
        currentMonthDateDiv.textContent = date;                         // <div class = "item other-month">날짜</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv);          // <div id = "calendar-container"><div class = "item other-month">날짜</div></div>

    }

}

changeMonth(0)      // 현재 달 출력하자
setCalendar(currentDate)        // 현재 달의 달력 보여주자