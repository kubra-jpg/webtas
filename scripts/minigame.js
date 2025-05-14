document.addEventListener('DOMContentLoaded', () => {
    const questions = [
      {
        question: 'Yeniden doğuş anlamına gelen akım hangisidir?',
        options: ['Rönesans', 'Barok', 'Empresyonizm'],
        answer: 0
      },
      {
        question: 'Hangi akım nesneleri geometrik şekillerle betimler?',
        options: ['Sürrealizm', 'Kübizm', 'Modernizm'],
        answer: 1
      },
      {
        question: 'Duygusal yoğunluk ve dramatik efektlerle bilinen akım hangisidir?',
        options: ['Barok', 'Empresyonizm', 'Rönesans'],
        answer: 0
      },
      {
        question: 'Bilinçaltı düşünceleri ve rüyaları sanat yoluyla ifade eden akım hangisidir?',
        options: ['Modernizm', 'Sürrealizm', 'Kübizm'],
        answer: 1
      },
      {
        question: 'Işık ve renk oyunlarına odaklanan akım hangisidir?',
        options: ['Empresyonizm', 'Barok', 'Modernizm'],
        answer: 0
      },
      {
        question: '20. yüzyılın başlarında soyutlama ve toplumsal eleştiri içeren akım hangisidir?',
        options: ['Modernizm', 'Rönesans', 'Sürrealizm'],
        answer: 0
      }
    ];
  
    let current = 0;
    const userAnswers = [];
    const container = document.getElementById('quiz-container');
  
    function showQuestion() {
      container.innerHTML = '';
      const q = questions[current];
  
      // Soru başlığı
      const h2 = document.createElement('h2');
      h2.textContent = `Soru ${current + 1}. ${q.question}`;
      container.appendChild(h2);
  
      // Form ve seçenekler
      const form = document.createElement('form');
      form.id = 'quiz-form';
  
      q.options.forEach((opt, idx) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = idx;
        radio.required = true;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${String.fromCharCode(65 + idx)}) ${opt}`));
        form.appendChild(label);
      });
  
      // Buton
      const btn = document.createElement('button');
      btn.type = 'submit';
      btn.textContent = current < questions.length - 1 ? 'Sonraki' : 'Sonuçları Gör';
      form.appendChild(btn);
  
      form.addEventListener('submit', e => {
        e.preventDefault();
        const selected = Number(new FormData(form).get('option'));
        userAnswers.push(selected);
        current++;
        if (current < questions.length) showQuestion();
        else showResults();
      });
  
      container.appendChild(form);
    }
  
    function showResults() {
      container.innerHTML = '';
      const correctCount = userAnswers.reduce(
        (sum, ans, i) => sum + (ans === questions[i].answer ? 1 : 0),
        0
      );
      const incorrectCount = questions.length - correctCount;
  
      // Özet
      const summary = document.createElement('div');
      summary.className = 'result-summary';
      summary.innerHTML = `
        Doğru: <strong>${correctCount}</strong><br>
        Yanlış: <strong>${incorrectCount}</strong>
      `;
      container.appendChild(summary);
  
      // Detaylar
      questions.forEach((q, i) => {
        const your = userAnswers[i];
        const correct = q.answer;
        const div = document.createElement('div');
        div.className = 'result-item ' + (your === correct ? 'correct' : 'incorrect');
        div.innerHTML = `
          <strong>Soru ${i + 1}:</strong> ${q.question}<br>
          <span class="your-answer">Senin cevabın: ${q.options[your]}</span>
        `;
        if (your !== correct) {
          const cor = document.createElement('div');
          cor.className = 'correct-answer';
          cor.textContent = `Doğru cevap: ${q.options[correct]}`;
          div.appendChild(cor);
        }
        container.appendChild(div);
      });
    }
  
    // Oyunu başlat
    showQuestion();
  });