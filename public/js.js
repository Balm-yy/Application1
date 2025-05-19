const questionDisplay = document.getElementById('questionDisplay');
const seeAnswerBtn = document.getElementById('answerBtn');
const answerDisplay = document.getElementById('answerDisplay');
const validateBtn = document.getElementById('validateBtn');
const errorBtn = document.getElementById('errorBtn');
const hiraganaBtn = document.getElementById('hiraganaBtn');
const wordsBtn = document.getElementById('contentBtn');

let errorCompteur = 0;
let validateCompteur = 0;

let choixBtn = "";

let content = [
    ["あかい", "RED"],
    ["コート", "COAT"],
    ["かさ", "UMBRELLA"],
    ["がくせい", "STUDENT"],
    ["みず", "WATER"],
    ["こんにちわ", "HELLO"],
    ["かわいい", "CUTE"],
    ["かこいい", "COOL / GOOD LOOKING"],
    ["だいがく (大学)", "UNIVERSITY"],
    ["さん (三)", "THREE / THIRD"],
    ["きっぷ", "TICKET"],
    ["おちや (お茶)", "TEA / GREEN TEA"],
    ["ください", "PLEASE"],
    ["すし", "SUSHI"],
    ["ごはん", "MEAL / RICE"],
    ["と", "AND / THAT / DOOR"],
    ["いしゃ", "DOCTOR"],
    ["せんせい", "TEACHER"],
    ["やさしい", "NICE / KIND / EASY"],
    ["べんごし (弁護士)", "LAWYER"],
    ["ひと (人)", "PEOPLE / PERSON"],
    ["くうこう (空港)", "AIRPORT"],
    ["ちす (地図)", "MAP"],
    ["すみません", "SORRY / EXCUSE ME"],
    ["ちかてつ (地下鉄)", "SUBWAY"],
    ["いち (一)", "ONE"],
    ["いま (今)", "NOW"],
    ["に (二)", "TWO"],
    ["じ (時)", "O'CLOCK"],
    ["おもしろい", "FUNNY / FUN / INTERESTING"],
    ["に", "TO / IN / AS (a)"],
    ["かわいい", "CUTE / PRETTY"],
    ["その", "THE / THAT / ITS"],
    ["くつ", "SHOE(S)"],
    ["この", "THIS / THESE"],
    ["しろい (白い)", "WHITE"],
    ["ぼうし", "HAT"],
    ["えき (駅)", "STATION(S) / TRAIN STATION"],
    ["そこ", "THERE"],
    ["ここ", "HERE"],
    ["デパート", "DEPARTMENT STORE"],
    ["ホテル", "HOTEL"],
    ["バスてい (バス停)", "BUS STOP"],
    ["どこ", "WHERE"],
    ["コンビニ", "CONVENIENCE STORE"],
    ["イギリスじん (イギリス人)", "BRITISH"],
    ["ブラジルじん (ブラジル人)", "BRAZILIAN"],
    ["イギリス", "BRITAIN / UK"],
    ["ブラジル", "BRAZIL"],
    ["カナダ", "CANADA"],
    ["にほんじん (日本語)", "JAPANESE"],
    ["ちいさい (小さい)", "SMALL / LITTLE"],
    ["アメリカ", "AMERICA"],
    ["か", "OR / IS IT ? / THAT"],
    ["おおきい (大きい)", "BIG / LARGE"],
    ["はい", "YES"],
    ["いいえ", "NO"],
    ["ピザ", "PIZZA"],
    ["ケーキ", "CAKE"],
    ["これ", "THAT (one) / THESE / THIS"],
    ["さん", "Mr / Miss / Mrs"],
    ["は", "IS / WITH / REGARDING"],
    ["カレー", "CURRY"],
    ["じゃあね", "SEE YOU LATER / BYE"],
    ["ラーメン (拉麺)", "RAMEN"],
    ["それ", "THIS (one) / IT / THAT"],
    ["おいしい", "TASTY / DELICIOUS"]
]


let hiragana = [
    ["あ", "A"],
    ["か", "KA"],
    ["さ", "SA"],
    ["た", "TA"],
    ["な", "NA"],
    ["は", "HA"],
    ["ま", "MA"],
    ["や", "YA"],
    ["ら", "RA"],
    ["わ", "WA"],
    ["が", "GA"],
    ["ざ", "ZA"],
    ["だ", "DA"],
    ["ば", "BA"],
    ["ぱ", "PA"],
    ["い", "I"],
    ["き", "KI"],
    ["し", "SHI"],
    ["ち", "CHI"],
    ["に", "NI"],
    ["ひ", "HI"],
    ["み", "MI"],
    ["り", "RI"],
    ["ぎ", "GI"],
    ["じ", "JI"],
    ["ぢ", "DJI"],
    ["び", "BI"],
    ["ぴ", "PI"],
    ["う", "U"],
    ["く", "KU"],
    ["す", "SU"],
    ["つ", "TSU"],
    ["ぬ", "NU"],
    ["ふ", "FU"],
    ["む", "MU"],
    ["ゆ", "YU"],
    ["る", "RU"],
    ["ぐ", "GU"],
    ["ず", "ZU"],
    ["づ", "DZU"],
    ["ぶ", "BU"],
    ["ぷ", "PU"],
    ["え", "E"],
    ["け", "KE"],
    ["せ", "SE"],
    ["て", "TE"],
    ["ね", "NE"],
    ["へ", "HE"],
    ["め", "ME"],
    ["れ", "RE"],
    ["げ", "GE"],
    ["ぜ", "ZE"],
    ["で", "DE"],
    ["べ", "BE"],
    ["ぺ", "PE"],
    ["お", "O"],
    ["こ", "KO"],
    ["そ", "SO"],
    ["と", "TO"],
    ["の", "NO"],
    ["ほ", "HO"],
    ["も", "MO"],
    ["よ", "YO"],
    ["ろ", "RO"],
    ["を", "WO"],
    ["ご", "GO"],
    ["ぞ", "ZO"],
    ["ど", "DO"],
    ["ぼ", "BO"],
    ["ぽ", "PO"],
    ["ゔ", "V"],
    ["ん", "N"],






]

let partyBin = [];
let currentQuestionIndex = null;


const showQuestion = () => {
    if (choixBtn.length > 0 ) {
    currentQuestionIndex = Math.floor(Math.random() * choixBtn.length);
    questionDisplay.textContent = `${choixBtn[currentQuestionIndex][0]}`;
    } else {
        questionDisplay.textContent = "You've finished !"
    }
}

const showAnswer = () => {
        answerDisplay.textContent = `${choixBtn[currentQuestionIndex][1]}`;
}

const removeQNA = () => {
    partyBin.push(choixBtn.splice(currentQuestionIndex, 1))[0];
    //console.log(partyBin)
}








hiraganaBtn.addEventListener("click", () => {
    choixBtn = hiragana
    showQuestion();
})

wordsBtn.addEventListener('click', () => {
    choixBtn = content;
    showQuestion();
})

errorBtn.addEventListener("click", () => {
    //if (!answerDisplay.classList.contains("hide")) { // Si "hide" n'est pas déjà dans la liste des classes
       // answerDisplay.classList.toggle("hide"); // Cacher la réponse
    //}
    answerDisplay.className = "";
    answerDisplay.classList.add("hide")
    removeQNA();
    showQuestion();
})

validateBtn.addEventListener("click", () => {
    answerDisplay.className = "";
    answerDisplay.classList.add("hide")
    removeQNA();
    showQuestion();
})

seeAnswerBtn.addEventListener("click", () => {
    if (choixBtn.length > 0 ) {
    answerDisplay.className = "";
    answerDisplay.classList.add("show")
    showAnswer();
    } else {
    answerDisplay.className = "";
    answerDisplay.classList.add("hide")
    }
})