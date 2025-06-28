
// Firebase 設定
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // 這是從我的 firebase 上，複製下來的設定，就像是資料庫連接字串一樣
    const firebaseConfig = {
        apiKey: "AIzaSyDjot0CMztQ3vPP2QGhfSz8urjgs_3lPDc", //專案Web API金鑰
        authDomain: "fir-flutter-codelab-9e89b.firebaseapp.com", //專案ID + ".firebaseapp.com"
        projectId: "fir-flutter-codelab-9e89b", //專案ID
        storageBucket: "fir-flutter-codelab-9e89b.firebasestorage.app", //專案ID + "firebasestorage.app"
        messagingSenderId: "1078239467689", //專案編號
        appId: "1:1078239467689:web:2fef5ba598fe6fb121b1b8", //應用程式 ID
        measurementId: "G-KTTK20PMRC"
    };
//

// 引入 Firebase 模組
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { 
        getFirestore, 
        collection, 
        addDoc , 
        doc , 
        setDoc , 
        Timestamp , 
        updateDoc ,
        serverTimestamp ,
        arrayUnion, 
        arrayRemove ,
        increment ,
        runTransaction ,
        deleteField ,
        getDoc ,
        getDocFromCache 

    } 
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 取得授權的網路資料庫 firebase 的實體
const db = getFirestore(app);

// 統一設定 collectionName 集合名稱
const collection_name = "game" ;

// 統一設定 docName 文件名稱
const document_name = "typeEnglish" ;

// 示例：新增一個文檔到 Firestore
export async function addData() {
    try {
        // addDoc() 會傳回 子集合名稱、子集合id 
        const docRef = await addDoc(
            //設定哪個資料庫的哪個集合，若集合不存在，就會自動建立
            collection(db, collection_name), 
            //設定要儲存的內容，必須用JSON格式，儲存內容
            {
                words: [
                        { 
                            word:       "abcdefg"  ,
                            chinese:    "測試"
                        }
                    ],
                
            }
        );
        console.log("文檔寫入成功，ID: ", docRef.id);
    } catch (e) {
        console.error("文檔寫入失敗: ", e);
    }
}

// 使用 firebase-firestore.js 中的 doc() setDoc() 方法，設定 firebase 內的文件
// 如果文件不存在，系統會建立該文件。如果文件確實存在，系統會將其內容覆寫為新提供的資料
export async function setData(){
    try {
        // Add a new document in collection "cities"
        // 新增一筆文件資料，在 cities 集合中 LA 文件
        await setDoc(
            //設定        主集合           子集合
            doc(db, collection_name , document_name), 
            //設定資料內容
            {
                // name: "Los Angeles",
                // state: "CA",
                // country: "USA" ,
                // capital: "will be delete" ,
                // nest: {
                //     name : "roy" ,
                //     age : 25
                // }
                words: [
                        { 
                            word:       "abcdefg"  ,
                            chinese:    "測試"
                        }
                ],                
            }
        );
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}

// 使用 firebase-firestore.js 中的 doc() setDoc() 方法，設定 firebase 內的文件
// 如果文件可能存在，使用下面設定，可以讓新資料合併到舊文件中，不會整筆覆寫
export async function setData1(){
    try {
        // 設定要寫入的文件內容
        const cityRef = doc(db, collection_name , document_name);
        
        await setDoc(
            cityRef,  //寫入文件
            { capital: true }, //寫入內容，都是 JSON 格式，或看成 JS 的物件型態
            { merge: true } //設定為合併到舊文件中
        );        

        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}

// 使用 firebase-firestore.js 中的 doc() setDoc() 方法，設定 firebase 內的文件
// 如果文件可能存在，使用下面設定，可以讓新資料合併到舊文件中，不會整筆覆寫
export async function setData2(){
    try {
        // 設定要寫入的文件內容
        const cityRef = doc(db, collection_name , document_name);
        
        await setDoc(
            cityRef,  //寫入文件
            { capital: true }, //寫入內容，都是 JSON 格式，或看成 JS 的物件型態
            { merge: false } //設定為覆蓋既有文件
        );        
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}

// 使用 firebase-firestore.js 中的 doc() setDoc() Timestamp() 方法，設定 firebase 內的文件
// 測試 firebase 可以儲存的資料型態 字串、布林值、數字、日期、空值、巢狀陣列和物件
// 數值一律以倍精度儲存在資料庫，不論在程式中為整數或小數
// 複寫與其他按鈕相同的文件
export async function setData3(){
    try {
        const docData = {
            stringExample: "Hello world!",
            booleanExample: true,
            numberExample: 3.14159265,
            dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
            arrayExample: [5, true, "hello"],
            nullExample: null,
            objectExample: {
                a: 5,
                b: {
                    nested: "foo"
                }
            }
        };
        await setDoc(
            doc(db, collection_name , document_name),
            docData
        );      
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}


// 設定文件容器，使用 doc() ，您必須為要建立的文件指定 ID
// const mydoc = doc( 資料庫實體變數 , "集合名稱" , "文件 id") ;

// 如果不要自己設定 "文件 id" 就使用 addDoc() ，直接提供集合名稱與文件就可以了
// const docRef = await addDoc( collection( 資料庫實體變數 , "集合名稱" ) , 文件內容變數  )

// 如果文件沒有有意義的 ID，Cloud Firestore 可以自動產生 ID。您可以呼叫下列語言專屬的 add() 方法：







// 使用 firebase-firestore.js 中的 doc() setDoc() collection() 方法，設定 firebase 內的文件
// 數值一律以倍精度儲存在資料庫，不論在程式中為整數或小數
// 複寫與其他按鈕相同的文件
export async function setData4(){
    try {
        // Add a new document with a generated id
        // 使用 doc() 也可以自動產生 子集合 id
        // 設定文件位置
        const newCityRef = doc(collection(db, collection_name ));

        // 儲存文件內容
        await setDoc(newCityRef, { name : 'Roy' });
        console.log("文檔寫入成功");
        console.log( newCityRef );
        console.log( newCityRef.id ); //列出文件 子集合名稱
        console.log( newCityRef.path ); //列出文件   集合名稱/子集合名稱
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}



// 更新文件
// 使用 updateDoc() 方法
// 如要更新文件的部分欄位，但不覆寫整個文件，使用 updateDoc() 方法：
// 如果文件不存在，會發生錯誤
export async function updateData1(){
    try {
        const washingtonRef = doc(db, collection_name, document_name );

        // Set the "capital" field of the city 'DC'
        await updateDoc(
            washingtonRef, 
            {
                capital: true
            }
        );
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}



// 伺服器時間戳記  使用 serverTimestamp() 方法
// 不用有欄位，也可以設定
export async function updateData2(){
    try {
        const docRef = doc(db, collection_name, document_name);

        // Update the timestamp field with the value from the server
        const updateTimestamp = await updateDoc(docRef, 
            {
                timestamp: serverTimestamp()
            }
        );
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }

}


//巢狀資料更新  範例
export async function updateData3(){
    try {

        // 產生資料，用來更新
        const laDocRef = doc(db, collection_name, document_name );
        await setDoc(laDocRef, {
            name: "Frank",
            favorites: { food: "Pizza", color: "Blue", subject: "recess" },
            baby1: { baby2: { baby3 : "good" } },
            age: 12
        });

        
        await updateDoc(laDocRef, {
            // 更新 LA 文件中 age 的內容
            "age": 13,
            // 更新 LA 文件中 favorites 的 color 內容
            "favorites.color": "Red" ,
            // 更新 巢狀資料
            "baby1.baby2.baby3" : "Great"
        });

        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}

//巢狀更新資料   錯誤的做法   不使用  .  符號  ， 會造成該欄位覆寫資料，全被覆寫成指定內容
export async function updateData4(){
    try {

        // 產生資料，用來更新
        const docRef = doc( db , collection_name , document_name ) ;
        const 
        data =  {
            name: "Frank",
            favorites: 
            {
                food: "Pizza",
                color: "Blue",
                subject: "Recess"
            },
            age: 12
        };
        //儲存資料
        setDoc( docRef , data ) ;

        //會覆蓋該欄位所有資料的更新方式，不使用 . 符號
        updateDoc( docRef ,  
            {
                //因為沒有用 "favorites.food" 更新巢狀資料，將會覆蓋先前 favorites 的所有內容
                favorites: {
                    food: "Ice Cream"
                }
            }
        ) ;
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}


// 更新陣列中的元素
// 如果文件包含陣列欄位，可以使用 arrayUnion() 和 arrayRemove()
// 新增及移除元素。
// arrayUnion() 會將元素新增至陣列，但只會新增尚未存在的元素。
// arrayRemove() 會移除每個指定元素的所有例項。
let array_index = 0 ;
export async function arrayAddData1(){
    try {
        const docRef = doc( db , collection_name , document_name ) ;
        array_index++ ;
        await updateDoc(docRef, 
            {
                // arrayUnion() 並不會增加，重複的項目
                regions: arrayUnion("greater_virginia" + array_index , "greater_virginia" + array_index + 1 )
            }
        );
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}

// 練習更新 英文單字陣列
export async function arrayAddData2(){
    try {
        //下面指令會產生一個可以連結到 firebase 既有集合下新的 文件名稱，但該文件名稱不能用來做讀取資料用，因為是新的...
        // const docRef = doc( collection( db , collection_name )  );

        const docRef = doc(  db , collection_name , document_name  );
        
        await updateDoc(docRef, 
            {
                // arrayUnion() 並不會增加，重複的項目
                // 我直接用 python 整理好的資料，一次放到陣列中，只會產生一筆寫入資料，只是資料約為 8KB
                words: arrayUnion( 
{  id_index: 1 , word: 'afternoon' , chinese: '\u4e0b\u5348'  },{  id_index: 2 , word: 'evening' , chinese: '\u508d\u665a'  },{  id_index: 3 , word: 'fine' , chinese: '\u7f8e\u597d\u7684'  },{  id_index: 4 , word: 'good' , chinese: '\u597d\u7684'  },{  id_index: 5 , word: 'goodbye' , chinese: '\u518d\u898b'  },{  id_index: 6 , word: 'hello' , chinese: '\u54c8\u56c9'  },{  id_index: 7 , word: 'morning' , chinese: '\u65e9\u4e0a'  },{  id_index: 8 , word: 'night' , chinese: '\u665a\u4e0a'  },{  id_index: 9 , word: 'thank' , chinese: '\u8b1d\u8b1d'  },{  id_index: 10 , word: 'book' , chinese: '\u66f8'  },{  id_index: 11 , word: 'book' , chinese: 'bag'  },{  id_index: 12 , word: 'chair' , chinese: '\u6905\u5b50'  },{  id_index: 13 , word: 'computer' , chinese: '\u96fb\u8166'  },{  id_index: 14 , word: 'desk' , chinese: '\u66f8\u684c'  },{  id_index: 15 , word: 'eraser' , chinese: '\u6a61\u76ae\u64e6'  },{  id_index: 16 , word: 'marker' , chinese: '\u9ea5\u514b\u7b46'  },{  id_index: 17 , word: 'notebook' , chinese: '\u7b46\u8a18\u672c'  },{  id_index: 18 , word: 'pen' , chinese: '\u539f\u5b50\u7b46'  },{  id_index: 19 , word: 'pencil' , chinese: '\u925b\u7b46'  },{  id_index: 20 , word: 'pencil-box' , chinese: '\u925b\u7b46\u76d2'  },{  id_index: 21 , word: 'ruler' , chinese: '\u5c3a'  },{  id_index: 22 , word: 'father' , chinese: '\u7236\u89aa'  },{  id_index: 23 , word: 'mother' , chinese: '\u6bcd\u89aa'  },{  id_index: 24 , word: 'dad' , chinese: '\u7238\u7238'  },{  id_index: 25 , word: 'mom' , chinese: '\u5abd\u5abd'  },{  id_index: 26 , word: 'grandfather' , chinese: '\u7956\u7236'  },{  id_index: 27 , word: 'grandmother' , chinese: '\u7956\u6bcd'  },{  id_index: 28 , word: 'grandma' , chinese: '\u5976\u5976'  },{  id_index: 29 , word: 'grandpa' , chinese: '\u723a\u723a'  },{  id_index: 30 , word: 'brother' , chinese: '\u5144\uff1b\u5f1f'  },{  id_index: 31 , word: 'sister' , chinese: '\u59d0\uff1b\u59b9'  },{  id_index: 32 , word: 'girl' , chinese: '\u5973\u5b69'  },{  id_index: 33 , word: 'boy' , chinese: '\u7537\u5b69'  },{  id_index: 34 , word: 'student' , chinese: '\u5b78\u751f'  },{  id_index: 35 , word: 'classmate' , chinese: '\u540c\u5b78'  },{  id_index: 36 , word: 'friend' , chinese: '\u670b\u53cb'  },{  id_index: 37 , word: 'Mr.' , chinese: '\u5148\u751f'  },{  id_index: 38 , word: 'arm' , chinese: '\u624b\u81c2'  },{  id_index: 39 , word: 'ear' , chinese: '\u8033\u6735'  },{  id_index: 40 , word: 'eye' , chinese: '\u773c\u775b'  },{  id_index: 41 , word: 'feet' , chinese: '\u96d9\u8173'  },{  id_index: 42 , word: 'foot' , chinese: '\u8173'  },{  id_index: 43 , word: 'hair' , chinese: '\u982d\u9aee'  },{  id_index: 44 , word: 'hand' , chinese: '\u624b'  },{  id_index: 45 , word: 'head' , chinese: '\u982d'  },{  id_index: 46 , word: 'leg' , chinese: '\u817f'  },{  id_index: 47 , word: 'mouth' , chinese: '\u5634'  },{  id_index: 48 , word: 'nose' , chinese: '\u9f3b'  },{  id_index: 49 , word: 'apple' , chinese: '\u860b\u679c'  },{  id_index: 50 , word: 'banana' , chinese: '\u9999\u8549'  },{  id_index: 51 , word: 'bread' , chinese: '\u9eb5\u5305'  },{  id_index: 52 , word: 'cake' , chinese: '\u86cb\u7cd5'  },{  id_index: 53 , word: 'egg' , chinese: '\u86cb'  },{  id_index: 54 , word: 'hamburger' , chinese: '\u6f22\u5821'  },{  id_index: 55 , word: 'hot' , chinese: 'dog'  },{  id_index: 56 , word: 'ice' , chinese: 'cream'  },{  id_index: 57 , word: 'juice' , chinese: '\u679c\u6c41'  },{  id_index: 58 , word: 'milk' , chinese: '\u725b\u5976'  },{  id_index: 59 , word: 'pizza' , chinese: '\u62ab\u85a9'  },{  id_index: 60 , word: 'sandwich' , chinese: '\u4e09\u660e\u6cbb'  },{  id_index: 61 , word: 'soup' , chinese: '\u6e6f'  },{  id_index: 62 , word: 'tea' , chinese: '\u8336'  },{  id_index: 63 , word: 'water' , chinese: '\u6c34'  },{  id_index: 64 , word: 'breakfast' , chinese: '\u65e9\u7c2a'  },{  id_index: 65 , word: 'dinner' , chinese: '\u665a\u9910'  },{  id_index: 66 , word: 'lunch' , chinese: '\u5348\u9910'  },{  id_index: 67 , word: 'one' , chinese: '\u4e00'  },{  id_index: 68 , word: 'two' , chinese: '\u4e8c'  },{  id_index: 69 , word: 'three' , chinese: '\u4e09'  },{  id_index: 70 , word: 'four' , chinese: '\u56db'  },{  id_index: 71 , word: 'five' , chinese: '\u4e94'  },{  id_index: 72 , word: 'six' , chinese: '\u516d'  },{  id_index: 73 , word: 'seven' , chinese: '\u4e03'  },{  id_index: 74 , word: 'eight' , chinese: '\u516b'  },{  id_index: 75 , word: 'nine' , chinese: '\u4e5d'  },{  id_index: 76 , word: 'ten' , chinese: '\u5341'  },{  id_index: 77 , word: 'eleven' , chinese: '\u5341\u4e00'  },{  id_index: 78 , word: 'twelve' , chinese: '\u5341\u4e8c'  },{  id_index: 79 , word: 'zero' , chinese: '\u96f6'  },{  id_index: 80 , word: 'bathroom' , chinese: '\u6d74\u5ba4'  },{  id_index: 81 , word: 'bedroom' , chinese: '\u81e5\u623f'  },{  id_index: 82 , word: 'bookstore' , chinese: '\u66f8\u5e97'  },{  id_index: 83 , word: 'classroom' , chinese: '\u6559\u5ba4'  },{  id_index: 84 , word: 'home' , chinese: '\u5bb6'  },{  id_index: 85 , word: 'kitchen' , chinese: '\u5eda\u623f'  },{  id_index: 86 , word: 'library' , chinese: '\u5716\u66f8\u9928'  },{  id_index: 87 , word: 'living' , chinese: 'room'  },{  id_index: 88 , word: 'park' , chinese: '\u516c\u5712'  },{  id_index: 89 , word: 'school' , chinese: '\u5b78\u6821'  },{  id_index: 90 , word: 'store' , chinese: '\u5546\u5e97'  },{  id_index: 91 , word: 'supermarket' , chinese: '\u8d85\u7d1a\u5e02\u5834'  },{  id_index: 92 , word: 'animal' , chinese: '\u52d5\u7269'  },{  id_index: 93 , word: 'bear' , chinese: '\u718a'  },{  id_index: 94 , word: 'bird' , chinese: '\u9ce5'  },{  id_index: 95 , word: 'cat' , chinese: '\u8c93'  },{  id_index: 96 , word: 'chicken' , chinese: '\u96de'  },{  id_index: 97 , word: 'dog' , chinese: '\u72d7'  },{  id_index: 98 , word: 'elephant' , chinese: '\u8c61'  },{  id_index: 99 , word: 'fish' , chinese: '\u9b5a'  },{  id_index: 100 , word: 'lion' , chinese: '\u7345\u5b50'  },{  id_index: 101 , word: 'monkey' , chinese: '\u7334\u5b50'  },{  id_index: 102 , word: 'pig' , chinese: '\u8c6c'  },{  id_index: 103 , word: 'rabbit' , chinese: '\u5154'  },{  id_index: 104 , word: 'snake' , chinese: '\u86c7'  },{  id_index: 105 , word: 'tiger' , chinese: '\u8001\u864e'  },{  id_index: 106 , word: 'zoo' , chinese: '\u52d5\u7269\u5712'  },{  id_index: 107 , word: 'black' , chinese: '\u9ed1\u8272\u7684'  },{  id_index: 108 , word: 'blue' , chinese: '\u85cd\u8272\u7684'  },{  id_index: 109 , word: 'brown' , chinese: '\u68d5\u8272\u7684'  },{  id_index: 110 , word: 'color' , chinese: '\u984f\u8272'  },{  id_index: 111 , word: 'green' , chinese: '\u7da0\u8272\u7684'  },{  id_index: 112 , word: 'orange' , chinese: '\u6a58\u8272\u7684'  },{  id_index: 113 , word: 'pink' , chinese: '\u7c89\u7d05\u8272\u7684'  },{  id_index: 114 , word: 'purple' , chinese: '\u7d2b\u8272\u7684'  },{  id_index: 115 , word: 'red' , chinese: '\u7d05\u8272\u7684'  },{  id_index: 116 , word: 'white' , chinese: '\u767d\u8272\u7684'  },{  id_index: 117 , word: 'yellow' , chinese: '\u9ec3\u8272\u7684'  },{  id_index: 118 , word: 'dress' , chinese: '\u6d0b\u88dd'  },{  id_index: 119 , word: 'hat' , chinese: '\u5e3d\u5b50'  },{  id_index: 120 , word: 'jacket' , chinese: '\u593e\u514b\uff1b\u5916\u5957'  },{  id_index: 121 , word: 'shirt' , chinese: '\u896f\u886b'  },{  id_index: 122 , word: 'shoes' , chinese: '\u978b\u5b50'  },{  id_index: 123 , word: 'shorts' , chinese: '\u77ed\u8932'  },{  id_index: 124 , word: 'skirt' , chinese: '\u88d9\u5b50'  },{  id_index: 125 , word: 'T-shirt' , chinese: '\u904b\u52d5\u6749'  },{  id_index: 126 , word: 'bad' , chinese: '\u4e0d\u597d\u7684'  },{  id_index: 127 , word: 'beautiful' , chinese: '\u7f8e\u9e97\u7684'  },{  id_index: 128 , word: 'big' , chinese: '\u5927\u7684'  },{  id_index: 129 , word: 'clean' , chinese: '\u4e7e\u6de8\u7684'  },{  id_index: 130 , word: 'cloudy' , chinese: '\u591a\u96f2\u7684'  },{  id_index: 131 , word: 'cold' , chinese: '\u51b7\u7684'  },{  id_index: 132 , word: 'cool' , chinese: '\u6dbc\u723d\u7684'  },{  id_index: 133 , word: 'cute' , chinese: '\u53ef\u611b\u7684'  },{  id_index: 134 , word: 'fat' , chinese: '\u80d6\u7684'  },{  id_index: 135 , word: 'handsome' , chinese: '\u82f1\u4fca\u7684'  },{  id_index: 136 , word: 'hot' , chinese: '\u71b1\u7684'  },{  id_index: 137 , word: 'long' , chinese: '\u9577\u7684'  },{  id_index: 138 , word: 'new' , chinese: '\u65b0\u7684'  },{  id_index: 139 , word: 'nice' , chinese: '\u4e0d\u932f\u7684'  },{  id_index: 140 , word: 'old' , chinese: '\u820a\u7684\uff1b\u8001\u7684'  },{  id_index: 141 , word: 'rainy' , chinese: '\u4e0b\u96e8\u7684'  },{  id_index: 142 , word: 'short' , chinese: '\u77ed\u7684'  },{  id_index: 143 , word: 'small' , chinese: '\u5c0f\u7684'  },{  id_index: 144 , word: 'smart' , chinese: '\u8070\u660e\u7684'  },{  id_index: 145 , word: 'sunny' , chinese: '\u6674\u6717\u7684'  },{  id_index: 146 , word: 'tall' , chinese: '\u9ad8\u7684'  },{  id_index: 147 , word: 'thin' , chinese: '\u7626\u7684'  },{  id_index: 148 , word: 'warm' , chinese: '\u6eab\u6696\u7684'  },{  id_index: 149 , word: 'windy' , chinese: '\u6709\u98a8\u7684'  },{  id_index: 150 , word: 'am' , chinese: '\u662f'  },{  id_index: 151 , word: 'are' , chinese: '\u662f'  },{  id_index: 152 , word: 'close' , chinese: '\u95dc'  },{  id_index: 153 , word: 'come' , chinese: '\u4f86'  },{  id_index: 154 , word: 'cook' , chinese: '\u716e'  },{  id_index: 155 , word: 'cut' , chinese: '\u5207'  },{  id_index: 156 , word: 'dance' , chinese: '\u8df3\u821e'  },{  id_index: 157 , word: 'draw' , chinese: '\u756b'  },{  id_index: 158 , word: 'drink' , chinese: '\u559d'  },{  id_index: 159 , word: 'eat' , chinese: '\u5403'  },{  id_index: 160 , word: 'fly' , chinese: '\u98db'  },{  id_index: 161 , word: 'get' , chinese: 'up'  },{  id_index: 162 , word: 'go' , chinese: '\u53bb'  },{  id_index: 163 , word: 'has' , chinese: '\u6709'  },{  id_index: 164 , word: 'have' , chinese: '\u6709'  },{  id_index: 165 , word: 'help' , chinese: '\u5e6b\u5fd9'  },{  id_index: 166 , word: 'is' , chinese: '\u662f'  },{  id_index: 167 , word: 'like' , chinese: '\u559c\u6b61'  },{  id_index: 168 , word: 'listen' , chinese: '\u807d'  },{  id_index: 169 , word: 'look' , chinese: '\u770b'  },{  id_index: 170 , word: 'meet' , chinese: '\u9047\u898b'  },{  id_index: 171 , word: 'open' , chinese: '\u958b'  },{  id_index: 172 , word: 'play' , chinese: '\u73a9'  },{  id_index: 173 , word: 'read' , chinese: '\u95b1\u8b80'  },{  id_index: 174 , word: 'run' , chinese: '\u8dd1'  },{  id_index: 175 , word: 'see' , chinese: '\u770b\u5230'  },{  id_index: 176 , word: 'sing' , chinese: '\u5531'  },{  id_index: 177 , word: 'sleep' , chinese: '\u7761'  },{  id_index: 178 , word: 'study' , chinese: '\u7814\u8b80'  },{  id_index: 179 , word: 'swim' , chinese: '\u6e38\u6cf3'  },{  id_index: 180 , word: 'take' , chinese: '\u62ff\uff1b\u642d'  },{  id_index: 181 , word: 'talk' , chinese: '\u8aaa'  },{  id_index: 182 , word: 'walk' , chinese: '\u8d70'  },{  id_index: 183 , word: 'want' , chinese: '\u60f3\u8981'  },{  id_index: 184 , word: 'wash' , chinese: '\u6d17'  },{  id_index: 185 , word: 'watch' , chinese: '\u770b'  },{  id_index: 186 , word: 'write' , chinese: '\u5beb'  },{  id_index: 187 , word: 'bike' , chinese: '\u8173\u8e0f\u8eca'  },{  id_index: 188 , word: 'bus' , chinese: '\u516c\u8eca'  },{  id_index: 189 , word: 'car' , chinese: '\u6c7d\u8eca'  },{  id_index: 190 , word: 'taxi' , chinese: '\u8a08\u7a0b\u8eca'  },{  id_index: 191 , word: 'train' , chinese: '\u706b\u8eca'  },{  id_index: 192 , word: 'he' , chinese: '\u4ed6'  },{  id_index: 193 , word: 'her' , chinese: '\u5979\u7684'  },{  id_index: 194 , word: 'his' , chinese: '\u4ed6\u7684'  },{  id_index: 195 , word: 'I' , chinese: '\u6211'  },{  id_index: 196 , word: 'it' , chinese: '\u5b83'  },{  id_index: 197 , word: 'me' , chinese: '\u6211'  },{  id_index: 198 , word: 'my' , chinese: '\u6211\u7684'  },{  id_index: 199 , word: 'she' , chinese: '\u5979'  },{  id_index: 200 , word: 'they' , chinese: '\u4ed6\u5011'  },{  id_index: 201 , word: 'we' , chinese: '\u6211\u5011'  },{  id_index: 202 , word: 'you' , chinese: '\u4f60\uff1b\u4f60\u5011'  },{  id_index: 203 , word: 'your' , chinese: '\u4f60\u7684\uff1b\u4f60\u5011\u7684'  },{  id_index: 204 , word: 'how' , chinese: '\u5982\u4f55'  },{  id_index: 205 , word: 'what' , chinese: '\u4ec0\u9ebc'  },{  id_index: 206 , word: 'when' , chinese: '\u4f55\u6642'  },{  id_index: 207 , word: 'where' , chinese: '\u54ea\u88e1'  },{  id_index: 208 , word: 'who' , chinese: '\u8ab0'  },{  id_index: 209 , word: 'art' , chinese: '\u7f8e\u8853'  },{  id_index: 210 , word: 'Chinese' , chinese: '\u4e2d\u6587'  },{  id_index: 211 , word: 'English' , chinese: '\u82f1\u6587'  },{  id_index: 212 , word: 'math' , chinese: '\u6578\u5b78'  },{  id_index: 213 , word: 'P.E.' , chinese: '\u9ad4\u80b2'  },{  id_index: 214 , word: 'baseball' , chinese: '\u68d2\u7403'  },{  id_index: 215 , word: 'basketball' , chinese: '\u7c43\u7403'  },{  id_index: 216 , word: 'dodgeball' , chinese: '\u8eb2\u907f\u7403'  },{  id_index: 217 , word: 'doctor' , chinese: '\u91ab\u751f'  },{  id_index: 218 , word: 'teacher' , chinese: '\u8001\u5e2b'  },{  id_index: 219 , word: 'fall' , chinese: '\u79cb\u5929'  },{  id_index: 220 , word: 'spring' , chinese: '\u6625\u5929'  },{  id_index: 221 , word: 'summer' , chinese: '\u590f\u5929'  },{  id_index: 222 , word: 'winter' , chinese: '\u51ac\u5929'  },{  id_index: 223 , word: 'January' , chinese: '\u4e00\u6708'  },{  id_index: 224 , word: 'February' , chinese: '\u4e8c\u6708'  },{  id_index: 225 , word: 'March' , chinese: '\u4e09\u6708'  },{  id_index: 226 , word: 'April' , chinese: '\u56db\u6708'  },{  id_index: 227 , word: 'May' , chinese: '\u4e94\u6708'  },{  id_index: 228 , word: 'June' , chinese: '\u516d\u6708'  },{  id_index: 229 , word: 'July' , chinese: '\u4e03\u6708'  },{  id_index: 230 , word: 'August' , chinese: '\u516b\u6708'  },{  id_index: 231 , word: 'September' , chinese: '\u4e5d\u6708'  },{  id_index: 232 , word: 'October' , chinese: '\u5341\u6708'  },{  id_index: 233 , word: 'November' , chinese: '\u5341\u4e00\u6708'  },{  id_index: 234 , word: 'December' , chinese: '\u5341\u4e8c\u6708'  },{  id_index: 235 , word: 'Monday' , chinese: '\u661f\u671f\u4e00'  },{  id_index: 236 , word: 'Tuesday' , chinese: '\u661f\u671f\u4e8c'  },{  id_index: 237 , word: 'Wednesday' , chinese: '\u661f\u671f\u4e09'  },{  id_index: 238 , word: 'Thursday' , chinese: '\u661f\u671f\u56db'  },{  id_index: 239 , word: 'Friday' , chinese: '\u661f\u671f\u4e94'  },{  id_index: 240 , word: 'Saturday' , chinese: '\u661f\u671f\u516d'  },{  id_index: 241 , word: 'Sunday' , chinese: '\u661f\u671f\u5929'  },{  id_index: 242 , word: 'at' , chinese: '\u5728\u2026'  },{  id_index: 243 , word: 'by' , chinese: '\u5728\u65c1'  },{  id_index: 244 , word: 'in' , chinese: '\u5728\u2026\u4e4b\u5167'  },{  id_index: 245 , word: 'on' , chinese: '\u5728\u2026\u4e4b\u4e0a'  },{  id_index: 246 , word: 'out' , chinese: '\u5411\u5916'  },{  id_index: 247 , word: 'outside' , chinese: '\u5916\u9762'  },{  id_index: 248 , word: 'under' , chinese: '\u4e0b\u9762'  },{  id_index: 249 , word: 'angry' , chinese: '\u751f\u6c23\u7684'  },{  id_index: 250 , word: 'happy' , chinese: '\u9ad8\u8208\u7684'  },{  id_index: 251 , word: 'hungry' , chinese: '\u9913\u7684'  },{  id_index: 252 , word: 'sad' , chinese: '\u60b2\u50b7\u7684'  },{  id_index: 253 , word: 'sick' , chinese: '\u751f\u75c5\u7684'  },{  id_index: 254 , word: 'sorry' , chinese: '\u62b1\u6b49\u7684'  },{  id_index: 255 , word: 'thirsty' , chinese: '\u6e34\u7684'  },{  id_index: 256 , word: 'tired' , chinese: '\u7d2f\u7684'  },{  id_index: 257 , word: 'a' , chinese: '\u4e00\u500b'  },{  id_index: 258 , word: 'an' , chinese: '\u4e00\u500b'  },{  id_index: 259 , word: 'and' , chinese: '\u548c'  },{  id_index: 260 , word: 'bag' , chinese: '\u888b\u5b50'  },{  id_index: 261 , word: 'ball' , chinese: '\u7403'  },{  id_index: 262 , word: 'bed' , chinese: '\u5e8a'  },{  id_index: 263 , word: 'birthday' , chinese: '\u751f\u65e5'  },{  id_index: 264 , word: 'box' , chinese: '\u76d2\u5b50'  },{  id_index: 265 , word: 'can' , chinese: '\u7f50\u982d'  },{  id_index: 266 , word: 'CD' , chinese: '\u5149\u789f'  },{  id_index: 267 , word: 'comic' , chinese: 'book'  },{  id_index: 268 , word: 'day' , chinese: '\u65e5\uff1b\u5929'  },{  id_index: 269 , word: 'do' , chinese: '\u505a'  },{  id_index: 270 , word: 'does' , chinese: '\u505a'  },{  id_index: 271 , word: 'dollar' , chinese: '\u5143'  },{  id_index: 272 , word: 'door' , chinese: '\u9580'  },{  id_index: 273 , word: 'flower' , chinese: '\u82b1'  },{  id_index: 274 , word: 'great' , chinese: '\u68d2\u7684'  },{  id_index: 275 , word: 'here' , chinese: '\u9019\u88e1'  },{  id_index: 276 , word: 'key' , chinese: '\u9470\u5319'  },{  id_index: 277 , word: 'kite' , chinese: '\u98a8\u7b8f'  },{  id_index: 278 , word: 'may' , chinese: '\u53ef\u4ee5'  },{  id_index: 279 , word: 'name' , chinese: '\u540d\u5b57'  },{  id_index: 280 , word: 'no' , chinese: '\u4e0d'  },{  id_index: 281 , word: 'not' , chinese: '\u4e0d'  },{  id_index: 282 , word: 'ok' , chinese: '\u597d'  },{  id_index: 283 , word: 'some' , chinese: '\u4e00\u4e9b'  },{  id_index: 284 , word: 'table' , chinese: '\u684c\u5b50'  },{  id_index: 285 , word: 'telephone' , chinese: '\u96fb\u8a71'  },{  id_index: 286 , word: 'that' , chinese: '\u90a3\u500b'  },{  id_index: 287 , word: 'the' , chinese: '\u9019\uff1b\u90a3'  },{  id_index: 288 , word: 'there' , chinese: '\u90a3\u88e1'  },{  id_index: 289 , word: 'these' , chinese: '\u9019\u4e9b'  },{  id_index: 290 , word: 'this' , chinese: '\u9019\u500b'  },{  id_index: 291 , word: 'those' , chinese: '\u90a3\u4e9b'  },{  id_index: 292 , word: 'today' , chinese: '\u4eca\u5929'  },{  id_index: 293 , word: 'too' , chinese: '\u4e5f\uff1b\u592a'  },{  id_index: 294 , word: 'toy' , chinese: '\u73a9\u5177'  },{  id_index: 295 , word: 'tree' , chinese: '\u6a39'  },{  id_index: 296 , word: 'TV' , chinese: '\u96fb\u8996'  },{  id_index: 297 , word: 'very' , chinese: '\u975e\u5e38'  },{  id_index: 298 , word: 'weather' , chinese: '\u5929\u6c23'  },{  id_index: 299 , word: 'window' , chinese: '\u7a97\u6236'  },{  id_index: 300 , word: 'yes' , chinese: '\u662f'  }
                )
            }
        );
        console.log( docRef );
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}



//根據增加索引，刪除資料
export async function arrayRemoveData1(){
    try {
        const docRef = doc( db , collection , document_name ) ;        
        await updateDoc(docRef, 
            {
                // arrayUnion() 並不會增加，重複的項目
                regions: arrayRemove("greater_virginia" + array_index , "greater_virginia" + array_index + 1 )
            }
        );
        array_index-- ;
        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}



// 逐步增加數值
// 您可以增加或減少數值欄位值，如以下範例所示。增量運算會將欄位的目前值增加或減少指定的金額

export async function incrementField(){
    try {
        const docRef = doc( db , collection_name , document_name ) ;
        updateDoc( docRef ,
            {   //增加 50
                age:increment(50)
            }
        );


        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}

// 交易和批次寫入作業

// Cloud Firestore 支援讀取和寫入資料的不可部分完成作業。在一系列不可分割的作業中，所有作業都會成功，或是全部不予套用。Cloud Firestore 中有兩種原子作業：
// 交易：交易是一或多個文件上的一組讀取和寫入作業。
// 批次寫入：批次寫入是指一或多份文件上的一組寫入作業。
// 使用交易時，請注意下列事項：
// 讀取作業必須在寫入作業之前執行。
// 如果並行編輯作業會影響交易讀取的文件，呼叫交易的函式 (交易函式) 可能會執行多次。
// 交易功能不應直接修改應用程式狀態。
// 當用戶端離線時，交易就會失敗。

export async function myRunTransaction(){
    
    //在資料庫中找到文件的位置       主集合            子集合
    const laDocRef = doc(db, collection_name,   document_name );

    try {
        await runTransaction(db, 
            async (transaction) => 
            {
                //取得文件
                const laDoc = await transaction.get(laDocRef);
                if (!laDoc.exists()) {
                    throw "Document does not exist!";
                }

                //取得 population 內容
                const newPopulation = laDoc.data().population + 1;
                transaction.update(laDocRef, { population: newPopulation });
            }
        );


        console.log("文檔寫入成功");
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}

//這個範例 示範  在交易中  回應資訊到外部
export async function myRunTransaction1(){
    
    //在資料庫中找到文件的位置         主集合           子集合
    const laDocRef = doc(db,  collection_name ,  document_name );

    try {
        const newPopulation = await runTransaction(db , 
            async (transaction) => {
                const laDoc = await transaction.get(laDocRef);
                if (!laDoc.exists()) {
                    throw "Document does not exist!";
                }

                console.log( laDoc.data().age ); //讀取第一層欄位資料 數值
                console.log( laDoc.data().favorites ); //讀取第一層欄位資料 物件
                console.log( laDoc.data().favorites.food ); //讀取第二層欄位資料 物件

                //設定要回傳的數值，數值最後會設定給 newPopulation
                const newPop = laDoc.data().population + 1;
                if (newPop <= 20) {
                    transaction.update(laDocRef, { population: newPop });
                    return newPop;
                } else {
                    return Promise.reject("Sorry! Population is too big"); //重點在這裡
                }
            }
        );

        console.log("文檔寫入成功" , newPopulation);
    } catch( e ) {
        console.error("文檔寫入失敗", e);
    }
}



// 交易失敗
// 交易失敗的原因如下：

// 交易包含寫入作業後的讀取作業。讀取作業必須一律在任何寫入作業之前執行。
// 交易讀取在交易外修改的文件。在這種情況下，系統會自動再次執行交易。交易會重試有限次數。
// 交易超出 10 MiB 的最大要求大小上限。

// 交易大小取決於交易修改的文件和索引項目大小。對於刪除作業，這包括目標文件的大小，以及在回應作業時刪除的索引項目大小。

// 失敗的交易會傳回錯誤，且不會將任何內容寫入資料庫。您不需要復原交易，Cloud Firestore 會自動執行這項操作。


// 刪除欄位
// 如要從文件中刪除特定欄位，請在更新文件時使用下列特定語言的 FieldValue.delete() 方法：
export async function myDeleteField() {

    //選擇文件
    const cityRef = doc(db, collection_name, document_name);

    try{
        //更新文件，刪除欄位 capital
        await updateDoc(
            cityRef, 
            {
                capital: deleteField() //刪除這個欄位，重複刪除，不會發生錯誤!!
            }
        );
    }catch( e ){
        console.log( '刪除欄位發生錯誤' , e ) ;
    }
}


// 從網路上的 firebase 資料庫中
// 讀取特定集合文件 words 欄位資料 
export async function getWordData(){
    
    //設定文件連結
    const docRef = doc(db, collection_name , document_name );

    //取得文件
    const docSnap = await getDoc(docRef);

    // 取得快取中的文件
    // const docSnap = await getDocFromCache(docRef);

    

    //如果文件存在，列出文件內容
    if (docSnap.exists()) {
        console.log("這是在 script.js 列印出來", docSnap.data()); //這會列出 JSON 中有一個 words 欄位內容是陣列
        console.log("這是在 script.js 列印出來",  docSnap.data().words ); //這會列出陣列格式
        return docSnap.data().words;
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    //沒資料時，傳回 null
    return null ;
}

// 從快取
// 讀取特定集合文件 words 欄位資料!!  目前我還沒有成功讀到快取的內容
export async function getCacheWordData(){
    
    //設定文件連結
    const docRef = doc(db, collection_name , document_name );

    try{
        // 取得快取中的文件
        const docCache = await getDocFromCache(docRef);

        // 傳回特定欄位資料
        return docCache.data().words;
    }catch(e){
        console.log("No such document!" , e);
    }

    //沒有資料回應 null
    return null ;
}