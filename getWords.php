<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "words_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT word , chinese FROM words";
$result = $conn->query($sql);

$words = []; //建立關聯式陣列   (字典)

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // 將每個單詞及其對應的中文放入關聯陣列
        $words[] = [
            'word' => $row['word'],
            'chinese' => $row['chinese']
        ];
    }
}

$conn->close();
echo json_encode($words); //這樣就算是回傳資料給客戶端
?>