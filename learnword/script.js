const http = new XMLHttpRequest();
const url = 'https://api.shinahin.com/api.php?type=English&ver=1';
let responseJson;
let Correct = 0;
let Incorrect = 0;
let eej = ['', '日本語', '現在形', '過去形'];
let clickCount = 0;
let lastwordset;
let numexec = 0;
document.querySelector('label[for="pop1"]').style.display = 'none';
document.getElementById('pop1').style.display = 'none';
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
  let one;
  let truenum = 0;
  for (let i = 0; i < 3; i++) {
    let doc = document.getElementById('select' + i);
    let val = Number(doc.value);
    if (val != 0 && one != val && i < 2) {
      truenum++;
      one = val;
    } else if (val === 0 && i < 2) {
      alert('選択してください');
      return;
    } else if (one === val) {
      alert('同じ内容は使用できません');
      return;
    }
  }
  for (let i = 0; i < 2; i++) {
    let doc = document.getElementById('select' + i);
    let val = Number(doc.value);
    let doc2 = document.getElementById('select2');
    let val2 = Number(doc2.value);
    if (val === val2) {
      return;
    }
  }
  if (truenum === 2) {
    clickCount = 0;
    let doc = document.getElementById('select0');
    let val = Number(doc.value);
    document.getElementById('span0').textContent = responseJson[0][eej[val]];
    let doc2 = document.getElementById('select1');
    let val2 = Number(doc2.value);
    document.querySelector('label[for="pop0"]').textContent = eej[val2]; //成功
    let doc3 = document.getElementById('select2');
    let val3 = Number(doc3.value);
    if (val3 != 0) {
      document.querySelector('label[for="pop1"]').style.display = 'block';
      document.getElementById('pop1').style.display = 'block';
      document.querySelector('label[for="pop1"]').textContent = eej[val3];
    }
    lastwordset = document.getElementById('formnumber').value;
    restword = document.getElementById('remnantword');
    restword.textContent = '0/' + String(lastwordset) + '単語';
    Correct = 0;
    let checkbox = document.querySelector('.enable');
    if (checkbox.checked) {
      starttime()
      numexec++;
    } else if (numexec > 0) {
      clearInterval(second1);
      let timerDisplay = document.getElementById('timer');
      timerDisplay.textContent = '0s';
    }
    let myModal = new bootstrap.Modal(document.getElementById('learn'));
    myModal.show();
  }
}

function inputform() {
  let doc3 = document.getElementById('select2');
  let val3 = Number(doc3.value);
  let testtimer = 0;
  for (let i = 1; i <= 2; i++) {
    let doc = document.getElementById(`select${i}`);
    let val = Number(doc.value);
    let doc2 = document.getElementById(`pop${i - 1}`);
    let val2 = doc2.value;
    let testtimer = 0;
    if (val != 0) {
      val2 = doc2.value;

      if (val2 == responseJson[clickCount][eej[val]]) {
        alert('正解');
        Correct++;
      } else {
        alert(`不正解。正解は${responseJson[clickCount][eej[val]]}`);
        Incorrect++;
      }
    }
  }

  if (clickCount >= lastwordset) {
    alert('終わりました');
    clearInterval(second1);
    return;
  } else {
    let doc = document.getElementById('select0');
    let val = Number(doc.value);
    clickCount++;
    restword = document.getElementById('remnantword');
    restword.textContent = String(clickCount) + '/' + String(lastwordset) + '単語';
    correctincorrect = document.getElementById('CorrectIncorrect');
    correctincorrect.textContent = String(Correct) + '/' + String(Incorrect) + '(正解/不正解)';
    document.getElementById('span0').textContent =
      responseJson[clickCount][eej[val]];
    for (let i = 0; i < 2; i++) {
      let textForm = document.getElementById('pop' + i);
      if (textForm) {
        textForm.value = '';
      }
    }
  }
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