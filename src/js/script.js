document.addEventListener('DOMContentLoaded', function () {
    // menu sanduiche
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    mobileMenu.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Quiz Functionality
    const quizData = [
        {
            question: "Qual o principal objetivo do NOÉ?",
            options: [
                "Monitorar tráfego urbano",
                "Alertar sobre riscos de enchente",
                "Controlar iluminação pública"
            ],
            answer: 1
        },
        {
            question: "Como os sensores do NOÉ funcionam?",
            options: [
                "Usam apenas câmeras",
                "Medem nível de água e enviam dados",
                "Dependem de satélites"
            ],
            answer: 1
        },
        {
            question: "Quanto tempo de antecedência o NOÉ pode alertar?",
            options: [
                "Até 12 horas",
                "Até 24 horas",
                "Até 48 horas"
            ],
            answer: 2
        },
        {
            question: "O aplicativo do NOÉ funciona sem internet?",
            options: [
                "Sim, em modo offline",
                "Não, precisa sempre de conexão",
                "Apenas em áreas urbanas"
            ],
            answer: 0
        },
        {
            question: "Qual canal NÃO é usado pelo NOÉ para alertas?",
            options: [
                "SMS",
                "WhatsApp",
                "Televisão"
            ],
            answer: 2
        },
        {
            question: "Quem pode usar o NOÉ?",
            options: [
                "Apenas governos",
                "Apenas comunidades",
                "Todos os públicos"
            ],
            answer: 2
        },
        {
            question: "Como as comunidades participam?",
            options: [
                "Apenas recebendo alertas",
                "Reportando alagamentos",
                "Instalando sensores"
            ],
            answer: 1
        },
        {
            question: "Qual benefício NÃO é do NOÉ?",
            options: [
                "Reduz danos materiais",
                "Aumenta o turismo",
                "Salva vidas"
            ],
            answer: 1
        },
        {
            question: "O NOÉ usa qual tecnologia para previsão?",
            options: [
                "Inteligência Artificial",
                "Apenas dados históricos",
                "Opinião de especialistas"
            ],
            answer: 0
        },
        {
            question: "Qual cor representa risco crítico?",
            options: [
                "Verde",
                "Amarelo",
                "Vermelho"
            ],
            answer: 2
        }
    ];

    const quizContainer = document.getElementById('quizContainer');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizQuestions = document.getElementById('quizQuestions');
    const quizResult = document.getElementById('quizResult');
    const startQuizBtn = document.getElementById('startQuiz');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const restartQuizBtn = document.getElementById('restartQuiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    restartQuizBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        quizIntro.style.display = 'none';
        quizQuestions.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const question = quizData[currentQuestion];
        questionElement.textContent = question.question;

        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(optionElement);
        });

        nextQuestionBtn.style.display = 'none';
        selectedOption = null;
    }

    function selectOption(index) {
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        selectedOption = index;
        nextQuestionBtn.style.display = 'block';
    }

    function nextQuestion() {
        if (selectedOption === null) return;

        if (selectedOption === quizData[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizQuestions.style.display = 'none';
        quizResult.style.display = 'block';

        const percentage = Math.round((score / quizData.length) * 100);

        if (percentage >= 80) {
            resultTitle.textContent = 'Excelente!';
            resultText.textContent = `Você acertou ${score} de ${quizData.length} perguntas! Você conhece muito sobre prevenção de enchentes.`;
        } else if (percentage >= 50) {
            resultTitle.textContent = 'Bom trabalho!';
            resultText.textContent = `Você acertou ${score} de ${quizData.length} perguntas! Você sabe o básico sobre o NOÉ.`;
        } else {
            resultTitle.textContent = 'Pode melhorar!';
            resultText.textContent = `Você acertou ${score} de ${quizData.length} perguntas. Aprenda mais sobre o NOÉ para se proteger melhor.`;
        }
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        quizResult.style.display = 'none';
        quizIntro.style.display = 'block';
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Por favor, insira seu nome';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Subject validation
        if (subjectInput.value === '') {
            subjectError.textContent = 'Por favor, selecione um assunto';
            subjectError.style.display = 'block';
            isValid = false;
        } else {
            subjectError.style.display = 'none';
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Por favor, insira sua mensagem';
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        if (isValid) {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        }
    });

});