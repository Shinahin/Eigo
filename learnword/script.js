try {
  const http = new XMLHttpRequest();
  const url = "https://api.shinahin.com/api.php?type=English&ver=1";
  let responseJson;
  let eej = ["", "日本語", "現在形", "過去形"];
  let clickCount = 0;
  let lastwordset;
  document.querySelector('label[for="pop1"]').style.display = "none";
  document.getElementById("pop1").style.display = "none";
  document.querySelector(".invalidate").style.display = "block";
  http.open("GET", url);
  http.send();

  http.onreadystatechange = (e) => {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        responseJson = JSON.parse(http.responseText);
        console.log(responseJson);
      } else {
        alert("エラーが発生しました。原因は「"+String(http.status)+"」");
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
  function nowtime(time) {}
  function submit() {
    let one;
    let truenum = 0;
    for (let i = 0; i < 3; i++) {
      let doc = document.getElementById("select" + i);
      let val = Number(doc.value);
      if (val != 0 && one != val && i < 2) {
        truenum++;
        one = val;
      } else if (val === 0 && i < 2) {
        alert("選択してください");
        return;
      } else if (one === val) {
        alert("同じ内容は使用できません");
        return;
      }
    }
    for (let i = 0; i < 2; i++) {
      let doc = document.getElementById("select" + i);
      let val = Number(doc.value);
      let doc2 = document.getElementById("select2");
      let val2 = Number(doc2.value);
      if (val === val2) {
        return;
      }
    }
    if (truenum === 2) {
      clickCount = 0;
      let doc = document.getElementById("select0");
      let val = Number(doc.value);
      document.getElementById("span0").textContent = responseJson[0][eej[val]];
      let doc2 = document.getElementById("select1");
      let val2 = Number(doc2.value);
      document.querySelector('label[for="pop0"]').textContent = eej[val2]; //成功
      let doc3 = document.getElementById("select2");
      let val3 = Number(doc3.value);
      if (val3 != 0) {
        document.querySelector('label[for="pop1"]').style.display = "block";
        document.getElementById("pop1").style.display = "block";
        document.querySelector('label[for="pop1"]').textContent = eej[val3];
      }
      let checkbox = document.querySelector(".enable");
      console.log(checkbox.checked);
      if (checkbox.checked) {
        document.querySelector(".invalidate").style.display = "none";
      }
      lastwordset = document.getElementById('formnumber').value;
      restword = document.getElementById("remnantword");
      restword.textContent = "0/" + String(lastwordset) + "単語";
      let myModal = new bootstrap.Modal(document.getElementById('learn'));
      myModal.show();
    }
  }

  function inputform() {
    for (let i = 1; i <= 2; i++) {
      let doc = document.getElementById(`select${i}`);
      let val = Number(doc.value);
      let doc2 = document.getElementById(`pop${i - 1}`);
      let val2 = doc2.value;

      if (val != 0) {
        val2 = doc2.value;
        let index = i - 1;

        if (val2 == responseJson[clickCount][eej[val]]) {
          alert("正解");
        } else {
          alert(`不正解。正解は${responseJson[clickCount][eej[val]]}`);
        }
      }
    }
    if (clickCount >= lastwordset) {
      alert("終わりました");
      return;
    } else {
      let doc = document.getElementById("select0");
      let val = Number(doc.value);
      clickCount++;
      restword = document.getElementById("remnantword");
      restword.textContent = String(clickCount) + "/" + String(lastwordset) + "単語";
      document.getElementById("span0").textContent =
        responseJson[clickCount][eej[val]];
      for (let i = 0; i < 2; i++) {
        let textForm = document.getElementById("pop" + i);
        if (textForm) {
          textForm.value = "";
        }
      }
    }
  }

  document.addEventListener("keydown", function (event) {
    // キー操作
    if (event.key === "ArrowUp") {
      // ↑の場合
      let textBox = document.getElementById("pop0");
      if (textBox) {
        textBox.select();
      }
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      // ↓の場合
      let textBox = document.getElementById("pop1");
      if (textBox) {
        textBox.select();
      }
      event.preventDefault();
    } else if (event.key === "Enter") {
      // Enterの場合
      let button = document.getElementById("submit0");
      if (button) {
        button.click();
      }
      event.preventDefault();
    }
  });
} catch (error) {
  alert("エラーが発生しました原因は「"+String(error)+"」");
}
