    function startSimulation() {
      document.getElementById('titlePage').classList.remove('active');
      document.getElementById('step1').classList.add('active');
      document.getElementById('step1').scrollIntoView({ behavior: 'smooth' });
    }

    function nextSection(id) {
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
      const target = document.getElementById(id);
      if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

document.getElementById('submitQuiz').addEventListener('click', function() {
  let score = 0;
  const totalQuestions = 5;
  const answers = document.querySelectorAll('#quizForm input[type="radio"]:checked');

  answers.forEach(ans => {
    if (ans.value === 'correct') {
      score++;
    }
  });

  const result = document.getElementById('quizResult');
  if (answers.length < totalQuestions) {
    result.textContent = "Please answer all questions!";
    result.style.color = "red";
  } else {
    result.textContent = `You scored ${score} out of ${totalQuestions}!`;
    result.style.color = score === totalQuestions ? "green" : "#b30000";
  }
});

function finishsimulation() {
  alert('Simulation complete! See you :3');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById('titlePage').classList.add('active');
}