
import * as My_db from './script.js?v=0.028'; // 引入 script.js 所有函數到 My_db 物件中

let score = 0; //打字分數
let currentLetter = ''; //目前要輸入的字母
let difficulty = '小學'; // 預設難度
let timerNumber ; ///計時器編號
let words_backup =[] ; ///放所有的英文單字，備份在本地端
let words =[] ; ///放所有的英文單字
let words_number = 0 ; //放 words[] 原本的陣列元素數量
let oneWord = '' ;  //單字字串
let chineseMean = '' ;  //單字中文意思
let charArray = [] ; ///字母陣列
let inputCorrectChar = false ; //輸入正確的字元 = true 
let userKeyPress = '' ; //使用者按下的按鍵
let timeOutTimer = null ; //提示用 timeOuter 計時器

let replay = false ; //重玩按鈕是否被按下
let replaySetTimeout ; //儲存 setTimeout ID 編號

///設定限制時間秒數
const timeLimits = {
    '小學': 15,
    '中學': 10,
    '大學': 5
};

//文件中 ID 為 startBtn 增加 click 事件，事件發生後，執行 startGame() 副程式
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('toppanel').addEventListener('click',()=>{
    let topPanel = document.getElementById("toppanel");
    ///顯示元素寬度與高度
    alert(` topPanel = ${topPanel.clientWidth}  ${topPanel.clientHeight}`);

    // words = My_db.getWordData() ; //取回所有字串  // OK
    // console.log( words ) ; //OK 可以正常使用
} ) ;
/*
在 JavaScript 中，HTMLElement 並沒有 width 和 height 屬性。
要獲取元素的寬度和高度，可以使用 clientWidth 和 clientHeight 屬性，
或者使用 getBoundingClientRect() 方法。這裡是修正後的代碼示例：
*/

//重新開始
document.querySelector('#rePlay').addEventListener(
    'click' ,
    event => {
        replay = true ;
        words =[] ; //初始化陣列
        charArray= [] ; //初始化陣列
        words = [...words_backup] ; // ... 展開運算子
        // words = await My_db.getCacheWordData() ; //取得快取資料 測試失敗，本機快取都找不到儲存的文件
        console.log( words );

        // 設定 5 秒鐘後，啟動 startTypingGame() 功能
        replaySetTimeout = setTimeout( startTypingGame , 5000 ) ;
    }
);


//開始遊戲副程序1
//要求輸入玩家名稱
//若有輸入玩家名稱，就從伺服器取回資料
//若有取回資料，就將資料轉換成 JSON 格式
//若資料已轉換成
// function startGame() {  // 單純使用PHP 時，用 fetch API 處理非同步程序
async function startGame() {
    const playerName = prompt("請輸入您的名稱:");
    // console.log( '輸入名稱為 ' + playerName );

    // 因為會使用到空白鍵當作輸入，所以開始按鈕，要先 disabled
    document.querySelector('#startBtn').disabled = true ;

    // 因為沒有按鈕在畫面上時，卷軸會接受到 焦點 ，當按下空白鍵時，就會往下捲動
    // ，但這不是我要的效果，所以用另一個按鈕處理
    // document.querySelector('#foucsBtn').focus();  //因為用 CSS overflow: hidden;  所以不用這個指令

    

    if (playerName) {
        // 使用 PHP 時，使用這部分語法，取得 MySQL 資料庫資料
            // fetch('getWords.php')
            // .then(response => response.json())
            // .then(data => {
            //     // console.log(data) ; //getWords.php 傳來的 JSON 資料  $words[] = ['word' => $row['word'],'chinese' => $row['chinese'] ];
            //     words = data ; //設定英文字母
            //     words_number = words.length ; //紀錄原始的單字數量
            //     // console.log(words.length) ; //關聯式陣列，的資料筆數
            //     // console.log(words[0]) ; //關聯式陣列，選擇第一筆資料
            //     // console.log(words[0]['word'] ) ; //關聯式陣列，欄位名稱
            //     // console.log(words[0]['chinese'] ) ; //關聯式陣列，欄位名稱
            //     // console.log(words.shift() ) ; //關聯式陣列，欄位名稱
            //     // console.log(words.length) ; //關聯式陣列，的資料筆數
            //     // console.log(words[0]) ; //關聯式陣列，選擇第一筆資料
            //     // console.log(words[0]['word'] ) ; //關聯式陣列，欄位名稱
            //     // console.log(words[0]['chinese'] ) ; //關聯式陣列，欄位名稱
            //     startTypingGame() ;
            // });
        //

        //使用 firebase 的 firestore database 資料庫時，增加下面指令
        //想要了解 非同步的順序  可以嘗試把 下面指令的 await 去掉
        //會發現 當列出 scirpt.js 中的 console.log() 時，後面就會列印 這裡的 .then() 程序內容
        //最後才會印出 95 ~ 97 的 console.log()
        words = await My_db.getWordData().then( data => {
            
            console.log( '這是在 then() 中列印出' , data );
            console.log( '這是在 then() 中列印出' , data.length );
            // console.log( '這是在 then() 中列印出' , typeof( data ) );
            // console.log( '這是在 then() 中列印出' , data[0]['word'] ); //OK
            // console.log( '這是在 then() 中列印出' , data[0]['chinese'] ); //OK
            
            words_backup = data.slice() ; //用切片方法，複製所有元素給 words_backup
            words_number = data.length ; //紀錄原始的單字數量
            
            console.log( '這是在 then() 中列印出' ,  words_backup.length );

            return data ;

        }); //取回所有字串，但被包在 JSON 格式中

        console.log( words ); //會傳回是個 Promise 非同步的物件
        console.log( typeof( words )); //會傳回是個 Promise 非同步的物件
        console.log( words.length ); //執行這行時，words 還不是陣列?!，所以是 undefined

        

        if( words ){//如果有資料，就開始遊戲
            startTypingGame();
        }

    }
}

//開始遊戲副程序2
//接收 JSON 格式的英文字題目 陣列
//並將目前分數清零
function startTypingGame() {
    //清除分數
    score = 0;
    document.getElementById('score').innerText = `分數: ${score}`;
    document.getElementById("userInput").innerText = '';

    //清除計時器
    clearTimeout( replaySetTimeout ) ;

    ///進入遊戲
    nextLetter();
}


//開始遊戲副程序3
//設定下一個字母，或設定英文字母組
function nextLetter() {
    //提醒玩家，要按下哪一個按鈕，並將該按鈕的文字，做顏色改變處理
    let  promptWordColorTimer ; // setInterval()
    let tempWord ;    

    //如果沒有英文單字與字母可輸入，代表遊戲結束
    if ( (words.length === 0) && (charArray.length === 0) ) {
        alert("遊戲結束！最終分數: " + score);
        return;
    }

    if (charArray.length===0){
        //顯示剩餘單字數量與輸入單字數量
        showWaitKeyInQty('wait_qty','keyin_qty');

        //當比對的字母長度為 0 時，要取得下一個字母的陣列
        //將第一個字串元素移出陣列，並設定給 currentLetter
        tempWord = words.shift()  ;
        oneWord = tempWord.word ;
        chineseMean = tempWord.chinese ;

        //將上次的單字保留在畫面上，並與目前的單字，間隔一個空白
        // var oldData = document.getElementById("userInput").innerText; //會把換行格式改掉
        var oldData = document.getElementById("userInput").innerHTML;
        //document.getElementById("userInput").innerHTML = oldData + '&nbsp;'; // 不換行空白 &#160;  &nbsp;
        document.getElementById("userInput").innerHTML = oldData + " <br> " ; // 不換行空白 &#160;  &nbsp;
        document.getElementById("userInput1").innerText = '' ;

        //將目前的英文單字字串，儲存在字元陣列中
        charArray = oneWord.split(''); // 這裡會把  單字 abcd 分割成 [ 'a' , 'b' , 'c' , 'd' ] 陣列
        currentLetter = charArray.shift();
    }else{
        //每次取陣列第一個元素，當作要測試英文打字的測試題目
        currentLetter = charArray.shift();
    }

   
    //在畫面上顯示要輸入的完整單字
    // document.getElementById('question').innerText = `目前的單字   ${oneWord}`;
    document.getElementById('question').innerText = `${oneWord}`; //1140622
    document.getElementById('chinese').innerText = `${chineseMean}`;

    // if( currentLetter == ' '){
    //     //如果是空白鍵，就設定中文字描述
    //     currentLetter = 'BLANK_KEY';
    // }

    //當字母需要，特殊符號時，在這裡設定
    switch ( currentLetter ) {
        case '-': //用 firebase 時，增加
        case ' ':
            //如果是空白鍵，就設定中文字描述
            currentLetter = 'BLANK_KEY';
            break;
        case ',':
            //如果是 逗號 ，就設定中文字描述
            currentLetter = 'COMMA';
            break;
        case '.':
            //如果是 小數點，就設定中文字描述
            currentLetter = 'DOT';
            break;
    }

    //在畫面上顯示目前要輸入的單字字母
    document.getElementById('questionProgress').innerText = `目前要輸入的字母   ${currentLetter}`;
    
    //提示玩家要按下哪個按鈕的視覺效果處理
    document.getElementById(currentLetter.toLocaleUpperCase()).classList.add("testword") ;




    //在選擇項目的類別樣式清單中，增加一個類名稱為 testword 名稱的樣式類別
    //在這裡，已經是類別清單了，所以前面不要加 . 號
    //在這裡要用 類別的CSS 設定名稱，且  不用加   .
    //document.querySelector("#B").classList.add("testword") ;


    // console.log( document.getElementById(currentLetter.toLocaleUpperCase).style.cssText  ) ;
    // highlightKey(currentLetter.toUpperCase() ,5000)
        
    
    

    let pText = document.getElementById('progressText') ;
    let pBS = document.getElementById('progressBarS') ;

    
    //遊戲進行計時器，用來顯示秒數
    let gameDelay = 0 ;
    
    ///遊戲開始，等待使用者輸入，並做出對應的反應
    timerNumber = setInterval(() => {

        //如果遊戲途中按下，重新開始紐，跳出
        if(replay) {
            //設定成沒按下，重新開始的狀態
            replay = false ;
            //清除目前定時器
            clearInterval(timerNumber);
            return 0 ;
        }
        

        //顯示計算的秒數
        gameDelay += 0.01 ; //每 10ms 執行一次，所以是 +0.01
        let proBP =  ((gameDelay / timeLimits[difficulty]) * 100 ) ; //依照等待秒數，計算百分比
        pBS.style.width = `${proBP.toFixed(0)}%`; //設定網頁百分比，toFixed(0)  表4捨5入?!  到個位數
        pText.style.color =  proBP>50 ? 'red' :'black'; //設定百分比顯示的文字顏色
        pText.innerText = proBP.toFixed(0) + '%' ; //設定百分比顯示的文字內容

        //在畫面上，顯示經過的時間
        document.getElementById("timeup").innerText = `經過時間 ${gameDelay.toFixed(2)} 秒`;


        //當按下按鈕時
        if (userKeyPress !== '' ){
            var oldData = document.getElementById("userInput").innerText;
            var oldData1 = document.getElementById("userInput1").innerText;
            console.log(charArray.length);
            //設定歷史單字輸入顯示介面
            document.getElementById("userInput").innerText = oldData + userKeyPress ;

            //設定單一字母顯示介面
            document.getElementById("userInput1").innerText = oldData1 + userKeyPress ;
            
            userKeyPress='' ; //清除輸入按鍵
        }

        if (inputCorrectChar === true){
            ///由鍵盤輸入事件，判斷輸入正確的字元
            inputCorrectChar = false ;
            clearInterval(timerNumber);
            console.log('輸入正確');
            nextLetter();
        }
        

        //計數 15 次 約為 15秒，就清除計時器
        //如果時間到還沒回答問題，就停止這次的問題，直接進入下一提
        //也要同時取消提示文字的 CSS 樣式
        if(gameDelay.toFixed(0) ==timeLimits[difficulty]){
            clearInterval(timerNumber);
            document.getElementById(currentLetter.toLocaleUpperCase()).classList.remove("testword");
            console.log(currentLetter);
            nextLetter();
        }
    }, 10 );
}




///在 HTML 按下按鈕的事件
document.addEventListener('keydown', (event) => {
    userKeyPress = event.key ;

    // console.log( event.key );
    // console.log( event.key == " " ); //按下空白鍵 value 是 " "
    
    
    // console.log( event.key == " " );
    // console.log( currentLetter == "BLANK_KEY" );

    console.log( event.key == ',' );
    console.log( currentLetter == "COMMA" );

    console.log( event.key == '.' );
    console.log( currentLetter == "DOT" );    

    if (event.key.toUpperCase() === currentLetter.toUpperCase()) {
        //輸入正確的字母
        score++; //增加分數

        //在畫面上顯示分數
        document.getElementById('score').innerText = `分數: ${score}`;

        //將提示的樣式清除
        document.querySelector('#'+ currentLetter.toUpperCase()).classList.remove('testword')  ;

        inputCorrectChar = true ; //輸入正確
    } else if( event.key == " " && currentLetter == "BLANK_KEY" ){
        //空白鍵的判斷
            //輸入正確的字母
            score++; //增加分數

            //在畫面上顯示分數
            document.getElementById('score').innerText = `分數: ${score}`;

            //將提示的樣式清除
            document.querySelector('#'+ currentLetter).classList.remove('testword')  ;
            
            inputCorrectChar = true ; //輸入正確
        //
    } else if( event.key == "," && currentLetter == "COMMA" ){
        //空白鍵的判斷
            //輸入正確的字母
            score++; //增加分數

            //在畫面上顯示分數
            document.getElementById('score').innerText = `分數: ${score}`;

            //將提示的樣式清除
            document.querySelector('#'+ currentLetter).classList.remove('testword')  ;
            
            inputCorrectChar = true ; //輸入正確
        //
    } else if( event.key == "." && currentLetter == "DOT" ){
        //空白鍵的判斷
            //輸入正確的字母
            score++; //增加分數

            //在畫面上顯示分數
            document.getElementById('score').innerText = `分數: ${score}`;

            //將提示的樣式清除
            document.querySelector('#'+ currentLetter).classList.remove('testword')  ;
            
            inputCorrectChar = true ; //輸入正確
        //        
    } else {
        score--;
        document.getElementById('score').innerText = `分數: ${score}`;
    }

    ///將按鈕設定為綠底白字
    highlightKey(event.key.toUpperCase(),500,"green","white");
});

///設定字母高亮度狀態
function highlightKey(key,delaytime,bgColor,fColor) {
    var delayT = delaytime ?? 10 ; //預設延遲 500ms
    var backgroundColor =bgColor ?? "black"; //預設延遲 黑色
    var fontColor = fColor ?? "red" ; //預設延遲 紅色

    //當按下特殊按鈕時 ( 空白鍵 ) 設定
    // if( key == " "){ key = "BLANK_KEY" ;} //因為都轉換成大寫，所以 id 也都改成用大寫

    //特殊字元按鍵，id 要另外轉換，因為字母都用大寫判斷，所以 id 也要用大寫
    switch(key){
        case " " :
            key = "BLANK_KEY" ;
            break;
        case "," :
            key = "COMMA" ;
            break;
        case "." :
            key = "DOT" ;
            break;
    }

    // DIV 按鍵區塊的 ID 是用英文字母為 ID
    const keyDiv = document.getElementById(key);
    if (keyDiv) {
        //如果有找到 這個 ID 就設定背景顏色與文字顏色
        keyDiv.style.backgroundColor = backgroundColor ;
        keyDiv.style.color = fontColor ;
        setTimeout(() => {
            keyDiv.style.backgroundColor = '';
            keyDiv.style.color = '';
        }, delayT );
    }
}

//顯示完成單字數、待輸入字數
function showWaitKeyInQty( waitqty_id  , keyinqty_id ){
    if (charArray.length == 0){
        document.querySelector(`#${keyinqty_id}`).innerHTML = `完成單字數: ${words_number -  words.length }` ;
    }    
    document.querySelector(`#${waitqty_id}`).innerHTML = `待輸入字數: ${words.length}` ;

}