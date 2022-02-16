const classificationItem = document.querySelectorAll('.classification-item');
const classificationContainer = document.querySelector('.classification-container');
const overlay = document.querySelector('.overlay');
const classification = document.querySelector('.classification');
const expandButton = document.querySelector('.expand-button');

let isExpanded=false
// classification.forEach((e) => {
//   e.addEventListener('click', () => {
//     classification.forEach((ev,i)=> {
//       ev.style.marginTop = i * 22 + 'px'
//     })
//   })
// })

expandButton.addEventListener('click', (e) => {
  if (isExpanded == false) {
    classificationContainer.style.height = '25vw'
    // classificationContainer.style.display = 'block'
e.textContent = 'read less classification';

    isExpanded=true
  } else {
    classificationContainer.style.height = '4vw'
    // classificationContainer.style.display = 'none';
e.textContent = 'read more classification';

    isExpanded=false
  }
})
    




// function getJSON() {
//   var req = new XMLHttpRequest();						// XMLHttpRequest オブジェクトを生成する
  
//   request.open('GET', '../african-elephant.json');
//   request.send();


// 	req.onreadystatechange = function() {				// XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
// 		if(req.readyState == 4 && req.status == 200){	// サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合

// 			var data = JSON.parse(req.responseText);	// 取得した JSON ファイルの中身を変数へ格納
// 			var len = data.length;						// JSON のデータ数を取得

// 			// JSON のデータ数分処理
// 			for(var i=0; i<len; i++) {
// 				console.log("id: " + data[i].id + ", name: " + data[i].name);
// 			}

// 		}
// 	};
