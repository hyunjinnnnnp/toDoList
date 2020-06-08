const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //로컬스토리지투두리스트를 투두스에 저장할 거야

let toDos = []; //배열에 저장할 건데 초기값은 비어있다

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos(); //로컬스토리지에 저장해
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  //커런트밸류 - 텍스트를 받아서 보여준다
  const li = document.createElement("li"); //html에 없는 엘리먼트를 만들거야
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; //id 1부터~~

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span); //list에(father) span(child)을 첨부할 거야
  //list 에도 id 부여
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    //배열 만들기 전에 오브젝트를 만들자
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); //toDos배열에 투두 오브젝을 넣는다!!
  saveToDos(); //배열에 저장한 후에 불러와야함.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value; //submit 이벤트를 받아서 들어온 벨류를 저장한다
  paintToDo(currentValue); //커런트벨류를 보여준다
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //로컬 스토리지에서 투두리스트를 받아와서
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();

/* 

1. 이벤트리스너로 서브밋텍스트를 받아서 보여준다(리스트 형태)
2. to do list는 배열에 저장된다 - html에 없는 클래스 생성, appenChild, push
3. 오브젝트생성->배열에 저장. 아이디 부여. 
4. 로컬스토리지에 저장
!! 로컬스토리지에는 자바스크립트 데이터를 저장할 수 없음. only string
 JSON.stringify() to string
 JSON = javascript Object Notation
 불러온 내용이 스트링일 때 

       console.log(loadedToDos)
      const parsedToDos=JSON.parse(loadedToDos)
     console.log(parsedToDos);
5.parsing된 투두스를 화면에 보여준다(엑박+할일 목록)
  
배열에 사용하는 문 parsedToDos.forEach(function) 
배열 하나하나에 function을 수행한다

6.저장된 투두를 삭제하는 방법, 이벤트리스너
어떤 버튼이 선택된지 모르니까 - event.target
부모 클래스를 찾아야해. (리스트 자체를 죽일 거야)
 console.dir 로 찾음 ㅋㅋ 

function deleteToDo(event) {
  const btn = event.target; //이벤트의 타겟이 되는 아이를 찾음
  const li = btn.parentNode; //그 버튼의 부모를 찾음
  toDoList.removeChild(li); //그 리스트의 아이를 죽임
}

--> 새로고침해보면 삭제된 게 로컬스토리지엔 아직 반영안됨
  const cleanToDos = toDos.filter(function)
forEach처럼 모든 어레이의 모든 아이템을 통해 함수를 실행
값이 트루인 아이템만 가지고 새로운 어레이를 만들 거야

--->li에 없는 id를 체크해서 죽일 거야!
const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== li.id;
    의 경우    넘버   !==   스트링 이기때문에 비교불가능
    때문에 parseInt();로 감싸줌
  });
  
  
  let toDos = []; 초기값을 let으로 바꿔줘야
  toDos = cleanToDos; 투두 값을 클린투두로 바꿔줄 수 있음
 

 saveToDos
  */
