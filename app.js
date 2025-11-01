//---------------------------- Constants ----------------------------------------------

const questions = [
    //State Capitals
    {
        category: "State Capitals",
        prompt: 'What is the capital of Florida',
        correct: 'Tallahassee',
        options: ['Jacksonville', 'Tallahassee', 'Orlando', 'Miami']
    },
    {
        category: "State Capitals",
        prompt: 'What is the capital of Georgia',
        correct: 'Atlanta',
        options: ['Savannah', 'Macon', 'Athens', 'Atlanta']
    },
    {
        category: "State Capitals",
        prompt: 'What is the capital of Montana',
        correct: 'Helena',
        options: ['Billings', 'Helena', 'Bozeman', 'Missoula']
    },
    {
        category: "State Capitals",
        prompt:'What is the capital of West Virgina',
        correct: 'Charleston',
        options: ['Huntington', 'Morgantown', 'Wheeling', 'Charleston']
    },
    {
        category: "State Capitals",
        prompt:'What is the capital of Conneticut',
        correct: 'Hartford',
        options: ['hartford', 'New Haven', 'Bridgeport', 'Stamford']
    },
    // National Animals
    {
        category: 'National Animals',
        prompt: 'What is the National Animal of Italy?',
        correct: 'Italian Wolf',
        options: ['Italian Wolf', 'Brown Bear', 'Alpine Ibex', 'Italian Sparrow']
    },
    {
        category: 'National Animals',
        prompt: 'What is the National Animal of America?',
        correct: 'Bald Eagle',
        options: ['Bison', 'Bald Eagle', 'Blue Dolphin', 'Grizzly Bear']
    },
    {
        category: 'National Animals',
        prompt: 'What is the National Animal of Scotland?',
        correct: 'Unicorn',
        options: ['Highland Cow', 'Red Deer', 'Unicorn', 'Golden Eagle']
    },
    {
        category: 'National Animals',
        prompt: 'What is the National Animal of Ghana?',
        correct: 'Tawny Eagle',
        options: ['Tawny Eagle', 'Leopard', 'Lion', 'Black Starling']
    },
    {
        category: 'National Animals',
        prompt: 'What is the National Animal of Democrtaic Republic of Congo?',
        correct: 'Okapi',
        options: ['Hippopotamus', 'Okapi', 'Gorilla', 'Zebra']
    },
]

let remaining = []
let score = 0
let countdown = 10
let timerId = null
let acceptingAnswers = false



//----------------------------- Variables --------------------------------------------





//---------------------------- Cached Element References -----------------------------

const elTimer = document.getElementById("timer");
const elScore = document.getElementById("score")
const elCategory = document.getElementById("category")
const elfeedback = document.getElementById("feedback")
const elAnswers = document.getElementById("answers")




//---------------------------- Functions ----------------------------------------------

// const shuffleQuestions = questions.slice().sort(() => Math.random() - 0.5)
// remaining = questions.slice().sort(() => Math.random() - 0.5)
// const currentQuestion = remaining.pop()

function setTimerDisplay(){
    elTimer.textContent = String(value)
}

function setScoreDisplay(value) {
    elScore.textContent = `Score: ${value}`
}

function createTimer(durationSeconds, onExpireSound = Audio.buzzer) {
    let timerId = null
    let countdown = durationSeconds

    function start() {
        stop()
        countdown = durationSeconds
        setTimerDisplay(countdown)
        timerId = setInterval(()=>{
            countdown-=1
            setTimerDisplay(countdown)
            if(countdown <= 0){
                stop()
                if(typeof onExpireSound === 'function'){
                    onExpireSound()
                }
                if(typeof onTimeExpired === 'function'){
                    onTimeExpired()
                }
            }
        }, 1000)
    }
    function stop(){
        if(timerId !== null){
            clearInterval(timerId)
            timerId = null
        }
    }
    return {start, stop}
}

function handleAnswer(selectedOption, correctAnswer) {
    if (!acceptingAnswers) return
    acceptingAnswers= false
    stopTimer()

    if (selectedOption === correctAnswer){
        Audio.bell()
        score += 1
    } else {
        Audio.buzzer()
    }

    onAnswerProcessed()
}


function onTimeExpired() {
    if (!current) return
    acceptingAnswers = false
    markCorrectWrong(null)
    elfeedback.textContent= "Time's Up!"
    Audio.buzzer()
    setTimeout(nextQuestion, 10000)
}


function markCorrectWrong(selectedText) {
    const buttons = Array.from(document.querySelectorAll(".answer"))
    buttons.forEach(btn => {
        const text = btn.dataset.value
        if (text === current.correct){
            btn.classList.add("correct")
        } else if (selectedText && text === selectedText){
            btn.classList.add("Wrong")
        }
        btn.disabled = true
    })
}

function renderQuestion(q){
    elCategory.textContent = q.category
    elQuestion.textContent = q.prompt

    const options = shuffle(q.options)
    elAnswers.innerHTML = ""
    options.forEach(opt => {
        const btn = document.createElement("button")
        btn.className = "answer"
        btn.dataset.value = opt
        btn.textContent = opt
        btn.addEventListener("click", () => handleAnswer(opt))
        elAnswers.appendChild(btn)
    })

    elfeedback.textContent= ""
}






//---------------------------- Event Listeners ----------------------------------------