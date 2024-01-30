var existingTable = document.querySelector('.table');

// 100回繰り返す
for (var i = 0; i < 100; i++) {
    // 行（tr）を作成
    var row = document.createElement('tr');

    // 3つのセル（td）を作成して行に追加
    for (var j = 0; j < 3; j++) {
      var cell = document.createElement('td');

      // セルの内容を設定
      if (j === 0) {
        // 最初のセルは "test" とする
        cell.textContent = 'test';
      } else {
        // それ以外のセルは "Cell 2 in Row 1" および "Cell 3 in Row 1" とする
        cell.textContent = 'Cell ' + (j + 1) + ' in Row ' + (i + 1);
      }

      row.appendChild(cell);
    }

    // 行を既存のテーブルに追加
    existingTable.appendChild(row);
  }