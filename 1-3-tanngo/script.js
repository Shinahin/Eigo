const http = new XMLHttpRequest();
const url = 'http://api.shinahin.com/englishapi';
let responseJson;
let eej = ['', '日本語', '現在形', '過去形']
document.querySelector('label[for="pop1"]').style.display = "none";
document.getElementById('pop1').style.display = "none";
http.open('GET', url);
http.send();

http.onreadystatechange = (e) => {
    if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
            responseJson = JSON.parse(http.responseText);
            console.log(responseJson);

            //   for (let i = 1; i < 99; i++){
            //     let tmp = i - 1;
            //     if (Array.isArray(responseJson) && responseJson.length > tmp) {
            //       const japaneseWord = responseJson[tmp]['日本語'];
            //       console.log(japaneseWord);
            //     }
            //   }

        } else {
            console.error('エラーが発生しました。原因は「', http.status, '」');
        }
    }
};

function submit() {
    let one;
    let truenum = 0;
    for (let i = 0; i < 3; i++) {
        let doc = document.getElementById('select' + i);
        let val = Number(doc.value);
        if (val != 0 && one != val && i < 2) {
            truenum++;
            one = val
        } else if (val === 0 && i < 2) {
            alert('選択してください')
            return;
        } else if (one === val) {
            alert('同じ内容は使用できません')
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
        var newOnclickContent = 'inputform(0);';
        var submitButton = document.getElementById('sub0');
        submitButton.onclick = new Function(newOnclickContent);
        let doc = document.getElementById('select0');
        let val = Number(doc.value);
        document.getElementById('span0').textContent = responseJson[0][eej[val]];
        let doc2 = document.getElementById('select1');
        let val2 = Number(doc2.value);
        document.querySelector('label[for="pop0"]').textContent = eej[val2]; //成功
        let doc3 = document.getElementById('select2');
        let val3 = Number(doc3.value);
        if (val3 != 0) {
            document.querySelector('label[for="pop1"]').style.display = "block";
            document.getElementById('pop1').style.display = "block";
            document.querySelector('label[for="pop1"]').textContent = eej[val3];
        }
        const button = document.querySelector('.mini');
        button.click()
    }
}

function inputform(num) {
    for (let i = 1; i <= 2; i++) {
        let doc = document.getElementById(`select${i}`);
        let val = Number(doc.value);
        let doc2 = document.getElementById(`pop${i - 1}`);
        let val2 = doc2.value;
    
        if (val != 0) {
            val2 = doc2.value;
            let index = i - 1;
    
            if (val2 == responseJson[num][eej[val]]) {
                alert("正解");
            } else {
                alert(`不正解。正解は${responseJson[num][eej[val]]}`);
            }
        }
    }    
    let doc = document.getElementById('select0');
    let val = Number(doc.value);
    num++;
    document.getElementById('span0').textContent = responseJson[num][eej[val]];
    for (var i = 0; i < 2; i++) {
        var textForm = document.getElementById("pop" + i);
        if (textForm) {
          textForm.value = '';
        }
      }
    var newOnclickContent = 'inputform(' + num + ');';
    var submitButton = document.getElementById('sub0');
    submitButton.onclick = new Function(newOnclickContent);
}

document.addEventListener('keydown', function(event) {
    // キーが ↑ (ArrowUp) かどうかを確認
    if (event.key === "ArrowUp") {
        // テキストボックスを選択する処理を追加

        // 例: テキストボックスのIDが 'textBox' の場合
        var textBox = document.getElementById('pop0');
        
        // テキストボックスを選択する
        if (textBox) {
            textBox.select();
        }

        // イベントの伝播を停止して通常の ↑ キーの動作を無効化
        event.preventDefault();
    } else if (event.key === "ArrowDown") {
        // テキストボックスを選択する処理を追加

        // 例: テキストボックスのIDが 'textBox' の場合
        var textBox = document.getElementById('pop1');
        
        // テキストボックスを選択する
        if (textBox) {
            textBox.select();
        }

        // イベントの伝播を停止して通常の ↑ キーの動作を無効化
        event.preventDefault();
    } else if (event.key === "Enter") {
        // テキストボックスを選択する処理を追加

        // 例: テキストボックスのIDが 'textBox' の場合
        var button = document.getElementById('sub0');
        
        // テキストボックスを選択する
        if (button) {
            button.click();
        }

        // イベントの伝播を停止して通常の ↑ キーの動作を無効化
        event.preventDefault();
    } 
});