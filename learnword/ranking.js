const http = new XMLHttpRequest();
const url = 'https://api.shinahin.com/api.php?type=English';
let responseJson;
let Correct = 0;
let Incorrect = 0;
let timems = 0;
let eej = ['', '日本語', '現在形', '過去形'];
let clickCount = 0;
let lastwordset;
let numexec = 0;
http.open('GET', url);
http.send();

http.onreadystatechange = (e) => {
  if (http.readyState === XMLHttpRequest.DONE) {
    if (http.status === 200) {
      responseJson = JSON.parse(http.responseText);
      console.log(responseJson);
    } else {
      alert('エラーが発生しました。原因は「' + String(http.status) + '」');
    }
  }
};
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
  seconds %= 60; // 追加: 分を除いた余りが秒

  let timerDisplay = document.getElementById('timer');
  if (minutes > 0) {
    timerDisplay.textContent = String(minutes) + 'm' + String(seconds) + 's';
  } else {
    timerDisplay.textContent = String(seconds) + 's';
  }
}
function submit() {
  clickCount = 0;
  document.getElementById('span0').textContent = responseJson[0]["日本語"];
  document.querySelector('label[for="pop0"]').textContent = "現在形";
  document.querySelector('label[for="pop1"]').textContent = "過去形";
  Correct = 0;
  if (numexec == 0) {
    starttime()
    numexec++;
  } else if (numexec > 0) {
    starttime()
    clearInterval(second1);
    let timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = '0s';
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
    let doc = document.getElementById('pop0');
    let val = doc.value;
    let doc2 = document.getElementById('pop1');
    let val2 = doc2.value;
    if (val == responseJson[clickCount]["現在形"] || val2 == responseJson[clickCount]["現在形"] ) {
      alert('正解');
      Correct++;
    } else {
      alert(`不正解。正解は${responseJson[clickCount][eej[i]]}`);
      Incorrect++;
    }
    clickCount++;
    restword = document.getElementById('remnantword');
    restword.textContent = String(clickCount) + '/100 単語';
    correctincorrect = document.getElementById('CorrectIncorrect');
    correctincorrect.textContent = String(Correct) + '/' + String(Incorrect) + '(正解/不正解)';
    document.getElementById('span0').textContent = responseJson[clickCount]["日本語"];
    for (let i = 0; i < 2; i++) {
      let textForm = document.getElementById('pop' + i);
      textForm.value = '';
    }
  }
}
function post() {
  let inputElement = document.getElementById("postname");
  let inputValue = inputElement.value;
  const http = new XMLHttpRequest();
  const url = 'https://api.shinahin.com/api.php?type=rankingpost&correct=' + Correct + '&name=' + inputValue + '&time=' + timems;
  http.open('GET', url);
  http.send();

  http.onreadystatechange = (e) => {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        alert('送信が完了しました。')
      } else {
        alert('エラーが発生しました。原因は「' + String(http.status) + '」');
      }
    }
  };

  console.log(timems)

  console.log("成功しました。")
}
document.addEventListener('keydown', function (event) {
  // キー操作
  if (event.key === 'ArrowUp') {
    // ↑の場合
    let textBox = document.getElementById('pop0');
    if (textBox) {
      textBox.select();
    }
    event.preventDefault();
  } else if (event.key === 'ArrowDown' || event.key === 'Enter' && !event.shiftKey) {
    // ↓の場合
    let textBox = document.getElementById('pop1');
    if (textBox) {
      textBox.select();
    }
    event.preventDefault();
  } else if (event.key === 'Enter' && event.shiftKey) {
    // Enterの場合
    let button = document.getElementById('submit0');
    if (button) {
      button.click();
    }
    event.preventDefault();
  }
});