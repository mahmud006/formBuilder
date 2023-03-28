const back = document.getElementById('back');
const questions = document.querySelector('.questions');
back.addEventListener('click', () => {
  window.location.href = './index.html';
});
// header
const formHeader = document.querySelector('.formHeader');
const formDes = document.querySelector('.formDes');
const headerData = JSON.parse(localStorage.getItem('header'));
formHeader.textContent = headerData.head;
formDes.textContent = headerData.des;

// render mcq questions
function renderMcqQuestion(qId, question, optionsArr) {
  let optionsHtml = '';
  optionsArr.forEach((option) => {
    optionsHtml += `
      <label>
        <input type="radio" name="${qId}" value="a" />
        <span>${option}</span>
      </label>`;
  });
  questions.innerHTML += `
    <div class="formMcqDisplay item" id="${qId}" draggable="true">
      <div id="question"> <span>${qId}.</span> ${question}?</div>
      <div id="answers" class="${qId}">
        ${optionsHtml}
      </div>
    </div>`;
  // }
}
//render text questions
function renderTextQuestion(qId, question) {
  questions.innerHTML += `
    <div class="formTextDisplay item" id="${qId}" draggable="true">
      <div id="question"><span>${qId}.</span> ${question}?</div>
        <div id="answers">
          <input
            type="text"
            name="answer"
            id="input"
            placeholder="Enter your answer"
            autofocus
          />
        </div>
    </div>`;
}
//render rating questions
function renderRatingQuestion(qId, question) {
  questions.innerHTML += `
      <div class="formRatingDisplay item" id="${qId}" draggable="true">
        <div id="question"><span>${qId}.</span> ${question}?</div>
          <div class="stars">
          <input type="radio" name="rating" value="1" id="star1">
          <label for="star1"> <span class="material-symbols-rounded star"> star </span></label>
          <input type="radio" name="rating" value="2" id="star2">
          <label for="star2"> <span class="material-symbols-rounded star"> star </span></label>
          <input type="radio" name="rating" value="3" id="star3">
          <label for="star3"> <span class="material-symbols-rounded star"> star </span></label>
          <input type="radio" name="rating" value="4" id="star4">
          <label for="star4"> <span class="material-symbols-rounded star"> star </span></label>
          <input type="radio" name="rating" value="5" id="star5">
          <label for="star5"> <span class="material-symbols-rounded star"> star </span></label>
          </div>
      </div>`;
}
//render date questions
function renderDateQuestion(qId, question) {
  questions.innerHTML += `
  <div class="formDateDisplay item" id="${qId}" draggable="true">
    <div id="question"><span>${qId}.</span> ${question}?</div>
    <div id="answers">
      <input
        type="date"
        name="answer"
        id="input"
        placeholder="Please input date (M/d/yyyy)"
        autofocus
        />
    
    </div>
  </div>`;
}
// const questionContainerArr = JSON.parse(localStorage.getItem('data'));
// console.log(questionContainerArr);
function renderQuestions() {
  const items = JSON.parse(localStorage.getItem('data')) || [];
  console.log(items);
  items.forEach((item) => {
    if (item.type == 'mcq') {
      renderMcqQuestion(item.qId, item.question, item.options);
    } else if (item.type == 'text') {
      renderTextQuestion(item.qId, item.question);
    } else if (item.type == 'rating') {
      renderRatingQuestion(item.qId, item.question);
    } else if (item.type == 'date') {
      renderDateQuestion(item.qId, item.question);
    }
  });
  questions.innerHTML += `
  <button class="submitBtn">Submit</button>
  `;
}
renderQuestions();

// input field
const myInput = document.getElementById('input');
console.log(myInput);
myInput.addEventListener('focus', function (e) {
  e.target.setSelectionRange(0, 0);
});

// star rating
const ratingInputs = document.querySelectorAll('input[name = "rating"]');
console.log(ratingInputs);
ratingInputs.forEach((input) => {
  console.log(ratingInputs);
  console.log(input.value);
  input.addEventListener('click', (e) => {
    const selectedRating = parseInt(e.target.value);
    console.log(selectedRating);
    console.log(ratingInputs);

    ratingInputs.forEach((input) => {
      if (parseInt(input.value) <= selectedRating) {
        input.checked = true;
        console.log(input.checked);
      } else {
        input.checked = false;
      }
    });
  });
});
