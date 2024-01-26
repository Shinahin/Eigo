const http = new XMLHttpRequest();
const url = 'https://api.shinahin.com/api.php?type=English';
let responseJson;
let Correct = 0;
let timems = 0;
let clickCount = 0;
let numexec = 0;
http.open('GET', url);
http.send();

http.onreadystatechange = (e) => {
  if (http.readyState === XMLHttpRequest.DONE) {
    if (http.status === 200) {
      responseJson = JSON.parse(http.responseText);
      console.log(responseJson);
    } else {
      alert(`エラーが発生しました。原因は「${String(http.status)}」`);
    }
  }
};

function getcontent(metatag) {
  let doc = document.querySelector(metatag);
  return doc.value;
}

function editcontent(metatag, data) {
  document.querySelector(metatag).textContent = data;
}

function starttime() {
  let start = new Date();
  let time = start.getTime();
  second1 = setInterval(function () {
    nowtime(time);
  }, 1000);
}

function nowtime(startTime) {
  let currentTime = new Date();
  let currentTimeInMs = currentTime.getTime();
  let elapsedMillis = currentTimeInMs - startTime;

  let seconds = Math.floor(elapsedMillis / 1000);
  timems = seconds;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  if (minutes > 0) {
    editcontent('#timer', `${String(minutes)}分${String(seconds)}秒`);
  } else {
    editcontent('#timer', `${String(seconds)}秒`);
  }
}

function submit() {
  clickCount = 0;
  editcontent('#span0', responseJson[0]['日本語']);
  Correct = 0;
  if (numexec == 0) {
    starttime()
    numexec++;
  } else if (numexec > 0) {
    starttime()
    clearInterval(second1);
    editcontent('timer', '0s');
  }
  let myModal = new bootstrap.Modal(document.getElementById('learn'));
  myModal.show();
}

function inputform() {
  if (clickCount >= 100) {
    let myModal = new bootstrap.Modal(document.getElementById('post'));
    myModal.show();
    clearInterval(second1);
    return;
  } else {
    let val = getcontent('#pop0');
    let val2 = getcontent('#pop1');
    if (val == responseJson[clickCount]['現在形'] && val2 == responseJson[clickCount]['過去形']) {
      alert('正解');
      Correct++;
    } else if (val != responseJson[clickCount]['現在形']) {
      alert(`不正解。正解は${responseJson[clickCount]['現在形']}`);
      if (val != responseJson[clickCount]['過去形']) {
        alert(`不正解。正解は${responseJson[clickCount]['過去形']}`);
      }
    } else if (val != responseJson[clickCount]['過去形']) {
      alert(`不正解。正解は${responseJson[clickCount]['過去形']}`);
    }
    clickCount++;
    editcontent('#remnantword', `${String(clickCount)}/100 単語`);
    editcontent('#CorrectIncorrect', `${String(Correct)} / ${String(clickCount - Correct)} (正解/不正解)`);
    editcontent('#span0', responseJson[clickCount]['日本語']);
    for (let i = 0; i < 2; i++) {
      let textForm = document.getElementById('pop' + i);
      textForm.value = '';
    }
  }
}

function post() {
  let inputValue = getcontent('#postname');;
  const http = new XMLHttpRequest();
  const url = `https://api.shinahin.com/api.php?type=rankingpost&correct=${Correct}&name=${inputValue}&time=${timems}`;
  http.open('GET', url);
  http.send();

  http.onreadystatechange = (e) => {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        alert('送信が完了しました。')
      } else {
        alert(`エラーが発生しました。原因は「${String(http.status)}」`);
      }
    }
  };
}

document.addEventListener('keydown', function (event) {
  // キー操作
  if (event.key === 'ArrowUp') {
    // ↑の場合
    let textBox = document.getElementById('pop0');
    textBox.select();
    event.preventDefault();
  } else if (event.key === 'ArrowDown' || event.key === 'Enter' && !event.shiftKey) {
    // ↓の場合
    let textBox = document.getElementById('pop1');
    textBox.select();
    event.preventDefault();
  } else if (event.key === 'Enter' && event.shiftKey) {
    // Enterの場合
    let button = document.getElementById('submit0');
    button.click();
    event.preventDefault();
  }
});