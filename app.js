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


let score = 0
let countdown = 10
let timerId = null
let acceptingAnswers = false



//----------------------------- Variables --------------------------------------------





//---------------------------- Cached Element References -----------------------------






//---------------------------- Functions ----------------------------------------------

const shuffleQuestions = questions.slice().sort(() => Math.random() - 0.5)
let remaining = questions.slice().sort(() => Math.random())
const currentQuestion = remaining.pop()


//---------------------------- Event Listeners ----------------------------------------