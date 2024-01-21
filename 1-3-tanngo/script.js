const http = new XMLHttpRequest();
const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=aL2PHDimKv-ZKE1eWVfGi6U2M3L3pV7nTlvBbkipIop3uNROxu7TYMc13NHORVIgPZHTYW4U5RsiNaIFQEPfAvpDzYXAmmn6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDdnxg-ta8cIrLVQ74o-Lv5SUAamuhphEjA0jLz33o1I5LeFhWnztY55qLBd_6bmxrlH0TkzzxT8tGP6QvPzsXkI8FORk_ThrQ&lib=Me2XBtisIDSB6edzLeR841ULjNT7Gy-LT';
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
    var newOnclickContent = 'inputform(' + num + ');';
    var submitButton = document.getElementById('sub0');
    submitButton.onclick = new Function(newOnclickContent);
}