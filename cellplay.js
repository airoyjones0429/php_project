import * as playJS from './play.js' ;

//為手機執行時，增加可以操作的事件
document.querySelectorAll('div[class="key"]').forEach(
    key => {
        key.addEventListener(
            'click' , 
            event => {
                console.log( event.target.id ) ;
                const keyName = event.target.id ;

                //因為 id 設定時，我都用大寫，所以就不用再 .toUpperCase() 了
                playJS.checkTypeInput( keyName , playJS.currentLetter ) ;

                ///將按鈕設定為綠底白字
                playJS.highlightKey(event.target.id ,500,"green","white");
            }
        )
    }
);

//增加空白鍵，用手機按下時，也要有對應的反應
//為手機執行時，增加可以操作的事件
document.querySelectorAll('div[class="blank_key"]').forEach(
    key => {
        key.addEventListener(
            'click' , 
            event => {
                console.log( event.target.id ) ;
                const keyName = event.target.id ;

                //因為 id 設定時，我都用大寫，所以就不用再 .toUpperCase() 了
                playJS.checkTypeInput( keyName , playJS.currentLetter ) ;

                ///將按鈕設定為綠底白字
                playJS.highlightKey(event.target.id ,500,"green","white");
            }
        )
    }
);