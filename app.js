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
        prompt:'What is the capital of West Virginia',
        correct: 'Charleston',
        options: ['Huntington', 'Morgantown', 'Wheeling', 'Charleston']
    },
    {
        category: "State Capitals",
        prompt:'What is the capital of Connecticut',
        correct: 'Hartford',
        options: ['Hartford', 'New Haven', 'Bridgeport', 'Stamford']
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
        prompt: 'What is the National Animal of the Democratic Republic of the Congo?',
        correct: 'Okapi',
        options: ['Hippopotamus', 'Okapi', 'Gorilla', 'Zebra']
    },
]

let remaining = []
let score = 0
let countdown = 10
let timerId = null
let acceptingAnswers = false
let timer = null
let current = null
let selectedOption = null


//----------------------------- Variables --------------------------------------------

const Audio = {
    bell: ()=>  Audio('bell.mp3').play(),
    buzzer: ()=> Audio('buzzer.mp3').play()
}




//---------------------------- Cached Element References -----------------------------

const elTimer = document.getElementById("timer")
const elScore = document.getElementById("score")
const elCategory = document.getElementById("category")
const elfeedback = document.getElementById("feedback")
const elAnswers = document.getElementById("answers")
const startButtons =document.querySelectorAll('.start-btn')
const elQuestion = document.getElementById("question")



//---------------------------- Functions ----------------------------------------------

// const shuffleQuestions = questions.slice().sort(() => Math.random() - 0.5)
// remaining = questions.slice().sort(() => Math.random() - 0.5)
// const currentQuestion = remaining.pop()


function setScoreDisplay(value) {
    elScore.textContent = `Score: ${value}`
}

startButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category
        elCategory.textContent = selectedCategory

        //filter & sort
        remaining = questions
            .filter(q => q.category === selectedCategory)
            .sort(() => Math.random() - 0.5)

            start()
    })
})

function setTimerDisplay(value) {
    elTimer.textContent= String(value)
}

function start() {
    score=0
    setScoreDisplay(score)
    nextQuestion()
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
    timer.stop()

    if (selectedOption === correctAnswer){
        Audio.bell()
        score += 1
        elfeedback.textContent = "Correct"
    } else {
        Audio.buzzer()
        elfeedback.textContent= `The Correct answer was ${current.correct}`
    }

    markCorrectWrong(selectedOption)
    setScoreDisplay(score)
    setTimeout(nextQuestion, 1000)
    
}




// function onAnswerProcessed(selectedOption) {
//     markCorrectWrong(selectedOption)
//     setScoreDisplay(score)
//     setTimeout(nextQuestion, 1000)
// }



function onTimeExpired() {
    if (!current) return
    acceptingAnswers = false
    markCorrectWrong(null)
    elfeedback.textContent= "Time's Up!"
    Audio.buzzer()
    setTimeout(nextQuestion, 1000)
}


function markCorrectWrong(selectedText) {
    const buttons = Array.from(document.querySelectorAll(".answer"))
    buttons.forEach(btn => {
        const text = btn.dataset.value
        if (text === current.correct){
            btn.classList.add("correct")
        } else if (text === selectedText && text !== current.correct){
            btn.classList.add("wrong")
        }
        btn.disabled = true
    })
}


function nextQuestion() {
    elfeedback.textContent=""
    elAnswers.innerHTML=""

    if (remaining.length === 0) {
        elfeedback.textContent = "Game Over"
        return
    }

    current = remaining.pop()
    document.getElementById("question").textContent = current.prompt

    current.options.forEach(option => {
        const btn = document.createElement("button")
        btn.className = "answer"
        btn.textContent = option
        btn.dataset.value = option
        btn.addEventListener("click", () => handleAnswer(option, current.correct))
        elAnswers.appendChild(btn)
    })

    acceptingAnswers = true
    timer = createTimer(10, Audio.buzzer)
    timer.start()
}





//---------------------------- Event Listeners ----------------------------------------