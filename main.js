const formHeader = document.querySelector('.formHeader');
const formDes = document.querySelector('.formDes');
const header = document.querySelector('.header');
//form Header
formHeader.addEventListener('click', handleClick);
formDes.addEventListener('click', handleClick);

const headerData = JSON.parse(localStorage.getItem('header'));
formHeader.textContent = headerData.head;
formDes.textContent = headerData.des;

function handleClick(e) {
  const pNode = e.target.parentNode;
  header.style.background = '#dfdfdf';
  const headerText = pNode.querySelector('h1');
  const desText = pNode.querySelector('p');
  const input1 = document.createElement('input');
  const input2 = document.createElement('input');
  input1.style.setProperty('margin-bottom', '10px');

  input1.type = 'text';
  input1.value = headerText.textContent;
  pNode.insertBefore(input1, headerText);
  pNode.removeChild(headerText);

  input2.type = 'text';
  input2.value = desText.textContent;
  pNode.insertBefore(input2, desText);
  pNode.removeChild(desText);

  input1.focus();
  document.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown(e) {
    // console.log(e.target);
    // console.log(formHeader);
    if (!header.contains(e.target)) {
      document.removeEventListener('mousedown', handleMouseDown);
      header.style.background = '#ffffff';
      handleBlur();
    }
  }
  function handleBlur() {
    headerText.textContent = input1.value;
    pNode.insertBefore(headerText, input1);
    desText.textContent = input2.value;
    pNode.insertBefore(desText, input2);
    pNode.removeChild(input1);
    pNode.removeChild(input2);
    localStorage.setItem(
      'header',
      JSON.stringify({ head: headerText.textContent, des: desText.textContent })
    );
  }
}

//add new button
const addBtn = document.getElementById('add-question');
const choiceContainer = document.querySelector('.choices-container');
const btnContainer = document.querySelector('.btnContainer');
let questionNumber = 1;
addBtn.addEventListener('click', function () {
  choiceContainer.classList.toggle('show');
});

// mcq button
const mcqBtn = document.getElementById('choice-btn-mcq');
mcqBtn.addEventListener('click', () => {
  generateMcqForm();
});
// text question button
const textBtn = document.getElementById('choice-btn-text');
textBtn.addEventListener('click', () => {
  generateTextForm();
});
//rating question buutton
const ratingBtn = document.getElementById('choice-btn-rating');
ratingBtn.addEventListener('click', () => {
  generateRatingForm();
});
//date question button
const dateBtn = document.getElementById('choice-btn-date');
dateBtn.addEventListener('click', () => {
  generateDateForm();
});
// question form data initialization
const formContainer = document.querySelector('.form-container');
const textQuestion = document.querySelector('.formText');
const ratingQuestion = document.querySelector('.formRating');
const dateQuestion = document.querySelector('.formDate');
const qNo = document.querySelector('.qNo');
const body = document.querySelector('body');
const questions = document.querySelector('.questions');
let questionContainerArr = JSON.parse(localStorage.getItem('data')) || [];

//handle btn click when editing other form
function handleBtnClickWhenEdit(e) {
  if (mcqBtn.contains(e)) {
    generateMcqForm();
  } else if (textBtn.contains(e)) {
    generateTextForm();
  } else if (ratingBtn.contains(e)) {
    generateRatingForm();
  } else if (dateBtn.contains(e)) {
    generateDateForm();
  }
}

// 1. show mcq form
// render
function renderMcqQuestion(qId, question, optionsArr) {
  let optionsHtml = '';
  optionsArr.forEach((option) => {
    optionsHtml += `
    <label>
      <input type="radio" name="answer" value="a" />
      ${option}
    </label>`;
  });
  questions.innerHTML += `
  <div class="formMcqDisplay item" id="${qId}" draggable="true">
    <div id="question"> <span>${qId}.</span> ${question}?</div>
    <div id="answers">
      ${optionsHtml}
    </div>
  </div>`;

  questionNumber++;
}
//generate
const formMcq = document.querySelector('.formMcq');
function generateMcqForm() {
  formMcq.classList.toggle('show');
  choiceContainer.classList.toggle('show');

  const topIcons = `
    <div class="topIcons">
      <span class="material-symbols-outlined"> content_copy </span>
      <span class="material-symbols-outlined delete"> delete </span>
      <span class="material-symbols-outlined"> arrow_downward </span>
      <span class="material-symbols-outlined"> arrow_upward </span>
    </div>
  `;
  const question = `
    <div class="question">
      <h4 class="qNo">${questionNumber}. </h4>
      <input type="text" id="question-input" placeholder="Input your question title here..." value="Question" />
      <span class="material-symbols-sharp"> add_photo_alternate </span>
    </div>
  `;
  const options = `
    <div class="options">
      <div class="option">
        <input type="radio" name="option" checked />
        <input type="text" placeholder="Option A..." value="Option A" />
        <span class="material-symbols-sharp"> add_photo_alternate </span>
      </div>
      <div class="option">
        <input type="radio" name="option" />
        <input type="text" placeholder="Option B..." value="Option B" />
        <span class="material-symbols-sharp"> add_photo_alternate </span>
      </div>
    </div>
  `;
  const optionDiv = `
    <div class="optionDiv">
      <button class="optionBtn">
        <span class="material-symbols-sharp span"> add </span>
        <p>Add Option</p>
      </button>
      <button class="optionBtn addOtherOption">
        <p>Add "Other" option</p>
      </button>
    </div>
  `;
  const functionalityBtns = `
    <div class="functionalityBtns">
      <div class="fnBtn">
        <span class="material-symbols-outlined"> toggle_off </span>
        <p>Multiple answers</p>
      </div>
      <div class="fnBtn">
        <span class="material-symbols-outlined"> toggle_off </span>
        <p>Required</p>
      </div>
      <div class="fnBtn">
        <span class="material-symbols-outlined"> more_horiz </span>
      </div>
    </div>
  `;
  formMcq.innerHTML =
    topIcons +
    '<div class="mcqQuestion">' +
    question +
    options +
    optionDiv +
    '</div>' +
    functionalityBtns;

  const optionsContainer = formMcq.querySelector('.options');
  const addOption = () => {
    const newOption = `
      <div class="option">
        <input type="radio" name="option">
        <input type="text" placeholder="Option..." value="Option">
        <span class="material-symbols-sharp"> add_photo_alternate </span>
      </div>
    `;
    optionsContainer.insertAdjacentHTML('beforeend', newOption);
  };
  const optionBtn = formMcq.querySelector('.optionBtn');
  optionBtn.addEventListener('click', addOption);
  body.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(e) {
    if (!formMcq.contains(e.target) && !addBtn.contains(e.target)) {
      body.removeEventListener('mousedown', handleMouseDown);
      handleBlur();
    }

    function handleBlur() {
      const question = document.querySelector('#question-input');
      const options = Array.from(document.querySelectorAll('.option')).map(
        (option) => option.querySelectorAll('input')[1].value
      );
      const questionObj = {
        qId: questionNumber,
        question: question.value,
        options: options,
        answer: '',
        formHtml: formMcq.innerHTML,
        type: 'mcq',
      };
      questionContainerArr.push(questionObj);
      localStorage.setItem('data', JSON.stringify(questionContainerArr));
      formMcq.classList.toggle('show');
      renderMcqQuestion(questionNumber, question.value, options);
      handleBtnClickWhenEdit(e.target);
    }
  }
}
// edit question & re render
questions.addEventListener('click', (e) => {
  e.preventDefault();
  const clickedElement = e.target;
  if (clickedElement.closest('.formMcqDisplay')) {
    const formMcqDisplay = clickedElement.closest('.formMcqDisplay');
    questionContainerArr.forEach((ques) => {
      console.log(formMcqDisplay.id, ques.qId);
      if (formMcqDisplay.id == ques.qId) {
        const editForm = document.createElement('div');
        editForm.className = 'editForm';
        editForm.id = `${ques.qId}`;
        editForm.innerHTML = ques.formHtml;
        editForm.querySelector('h4').textContent = `${ques.qId}.`;
        const options = editForm.querySelectorAll('.option');
        const q1 = editForm.querySelector('#question-input');
        q1.value = ques.question;
        for (let i = 0; i < ques.options.length; i++) {
          let option = options[i].querySelector('input[type = text]');
          option.value = ques.options[i];
        }
        questions.insertBefore(editForm, formMcqDisplay);
        formMcqDisplay.classList.toggle('none');
        editForm.classList.toggle('show');

        // add options and mouse down
        const optionsContainer = document.querySelector('.options');
        const addOption = () => {
          const newOption = `
          <div class="option">
            <input type="radio" name="option">
            <input type="text" placeholder="Option..." value="Option">
            <span class="material-symbols-sharp"> add_photo_alternate </span>
          </div>
          `;
          optionsContainer.insertAdjacentHTML('beforeend', newOption);
        };
        const optionBtn = document.querySelector('.optionBtn');
        optionBtn.addEventListener('click', addOption);
        //delete button
        const deleteBtn = editForm.querySelector('.delete');
        deleteBtn.addEventListener('click', (e) => {
          deleteBtn.disabled = true;
          setTimeout(() => {
            deleteBtn.disabled = false;
          }, 2000);
          deleteFunction(e, editForm, formMcqDisplay);
          body.removeEventListener('mousedown', handleMouseDown);
        });
        // mouse down event
        body.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e) {
          if (!editForm.contains(e.target) && !addBtn.contains(e.target)) {
            body.removeEventListener('mousedown', handleMouseDown);
            handleBlur();
          }
          function handleBlur() {
            const question = editForm.querySelector('#question-input');
            const options = editForm.querySelectorAll('.option');
            const optionsArr = [];
            for (let i = 0; i < options.length; i++) {
              const option = options[i].querySelectorAll('input')[1];
              optionsArr.push(option.value);
            }
            questionContainerArr.forEach((q) => {
              if (q.qId == ques.qId) {
                q.question = question.value;
                q.options = optionsArr;
                q.formHtml = editForm.innerHTML;
              }
            });
            localStorage.setItem('data', JSON.stringify(questionContainerArr));
            let optionsHtml = '';
            optionsArr.forEach((option) => {
              optionsHtml += `
                <label>
                  <input type="radio" name="answer" value="a" />
                  ${option}
                </label>`;
            });
            formMcqDisplay.innerHTML = `
                  <div id="question"><span>${ques.qId}.</span> ${question.value}?</div>
                  <div id="answers">
                    ${optionsHtml}
                  </div>`;
            editForm.remove();
            formMcqDisplay.classList.toggle('none');
          }
        }
      }
    });
  }
});

//delete option
function deleteFunction(e, editForm, formType) {
  e.preventDefault();
  const qIdForDelete = e.target.parentNode.parentNode.id;
  questionContainerArr.splice(qIdForDelete - 1, 1);
  let targetedDiv;
  if (formType.classList.contains('formMcqDisplay')) {
    targetedDiv = document.querySelectorAll('.formMcqDisplay');
  } else if (formType.classList.contains('formTextDisplay')) {
    targetedDiv = document.querySelectorAll('.formTextDisplay');
  } else if (formType.classList.contains('formRatingDisplay')) {
    targetedDiv = document.querySelectorAll('.formRatingDisplay');
  } else if (formType.classList.contains('formDateDisplay')) {
    targetedDiv = document.querySelectorAll('.formDateDisplay');
  }
  let target;
  targetedDiv.forEach((element) => {
    console.log(element.id);
    if (element.id === `${qIdForDelete}`) {
      target = element;
    }
  });
  target.remove();
  editForm.remove();

  let idx = 1;
  questionContainerArr.forEach((question) => {
    question.qId = idx++;
  });
  const questionsDiv = document.querySelectorAll('.item');
  let i = 0;
  questionsDiv.forEach((ques) => {
    ques.id = questionContainerArr[i].qId;
    const qsn = ques.querySelector('#question');
    qsn.textContent = `${ques.id}. ${questionContainerArr[i].question}`;
    i++;
  });
  questionNumber--;
  localStorage.setItem('data', JSON.stringify(questionContainerArr));
}
// 2. show text form
//render
function renderTextQuestion(qId, question) {
  questions.innerHTML += `
  <div class="formTextDisplay item" id="${qId}" draggable="true">
    <div id="question"><span>${qId}.</span> ${question}?</div>
      <div id="answers">
        <input
          type="text"
          name="answer"
          placeholder="Enter your answer"
          disabled
        />
      </div>
  </div>`;
  questionNumber++;
}
//generate
function generateTextForm() {
  formMcq.classList.toggle('show');
  choiceContainer.classList.toggle('show');
  formMcq.innerHTML = `
      <div class="topIcons">
      <span class="material-symbols-outlined"> content_copy </span>
      <span class="material-symbols-outlined delete"> delete </span>
      <span class="material-symbols-outlined"> arrow_downward </span>
      <span class="material-symbols-outlined"> arrow_upward </span>
    </div>
    <div class="mcqQuestion">
      <div class="question">
        <h4 class='qNo'>${questionNumber}.</h4>
        <input
          type="text"
          id="question-input"
          placeholder="Input your question title here..."
          value="Question"
        />
        <span class="material-symbols-sharp"> add_photo_alternate </span>
      </div>
      <div class="question">
        <!-- <h3>Question:</h3> -->
        <input
          type="text"
          id="question-input"
          placeholder="Enter your answer"
          value=""
          readonly
        />
      </div>
      <!-- <hr /> -->

      <hr />
      <div class="functionalityBtns">
        <div class="fnBtn">
          <span class="material-symbols-outlined"> toggle_off </span>
          <p>Long answers</p>
        </div>
        <div class="fnBtn">
          <span class="material-symbols-outlined"> toggle_off </span>
          <p>Required</p>
        </div>
        <div class="fnBtn">
          <span class="material-symbols-outlined"> more_horiz </span>
        </div>
      </div>
    </div>
    `;
  // mouse down event
  body.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(e) {
    if (!formMcq.contains(e.target) && !addBtn.contains(e.target)) {
      body.removeEventListener('mousedown', handleMouseDown);
      handleBlur();
    }
    function handleBlur() {
      const question = document.querySelector('#question-input');
      questionContainerArr.push({
        qId: questionNumber,
        question: question.value,
        options: '',
        answer: '',
        formHtml: formMcq.innerHTML,
        type: 'text',
      });
      localStorage.setItem('data', JSON.stringify(questionContainerArr));
      formMcq.classList.toggle('show');
      renderTextQuestion(questionNumber, question.value);
      handleBtnClickWhenEdit(e.target);
    }
  }
}
// edit question & re render
questions.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(questionContainerArr);
  questionContainerArr = JSON.parse(localStorage.getItem('data')) || [];
  const clickedElement = e.target;
  if (clickedElement.closest('.formTextDisplay')) {
    const formTextDisplay = clickedElement.closest('.formTextDisplay');

    questionContainerArr.forEach((ques) => {
      if (formTextDisplay.id == ques.qId) {
        const editForm = document.createElement('div');
        editForm.className = 'editForm';
        editForm.id = `${ques.qId}`;
        editForm.innerHTML = ques.formHtml;

        // populate question
        editForm.querySelector('h4').textContent = `${ques.qId}.`;
        const q1 = editForm.querySelector('#question-input');
        q1.value = ques.question;
        questions.insertBefore(editForm, formTextDisplay);
        formTextDisplay.classList.toggle('none');
        editForm.classList.toggle('show');
        //delete button
        const deleteBtn = editForm.querySelector('.delete');
        deleteBtn.addEventListener('click', (e) => {
          // editForm.remove();
          deleteBtn.disabled = true;
          setTimeout(() => {
            deleteBtn.disabled = false;
          }, 2000);
          deleteFunction(e, editForm, formTextDisplay);
          body.removeEventListener('mousedown', handleMouseDown);
        });
        // mouse down event
        body.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e) {
          if (!editForm.contains(e.target) && !addBtn.contains(e.target)) {
            body.removeEventListener('mousedown', handleMouseDown);
            handleBlur();
          }
          function handleBlur() {
            const question = editForm.querySelector('#question-input');
            questionContainerArr.forEach((q) => {
              if (q.qId == ques.qId) {
                q.question = question.value;
                q.options = '';
                q.formHtml = editForm.innerHTML;
              }
            });
            localStorage.setItem('data', JSON.stringify(questionContainerArr));
            formTextDisplay.innerHTML = `
            <div id="question"><span>${ques.qId}.</span> ${question.value}?</div>
            <div id="answers">
              <input
                type="text"
                name="answer"
                placeholder="Enter your answer"
                disabled
              />
            </div>`;
            editForm.remove();
            // renderTextQuestion(ques.qId, question.value);
            formTextDisplay.classList.toggle('none');
          }
        }
      }
    });
  }
});
// 3. show rating form
//render
function renderRatingQuestion(qId, question) {
  questions.innerHTML += `
    <div class="formRatingDisplay item" id="${qId}" draggable="true">
      <div id="question"><span>${qId}.</span> ${question}?</div>
        <div class="stars">
          <span class="material-symbols-rounded"> star </span>
          <span class="material-symbols-rounded"> star </span>
          <span class="material-symbols-rounded"> star </span>
          <span class="material-symbols-rounded"> star </span>
          <span class="material-symbols-rounded"> star </span>
        </div>
    </div>`;
  questionNumber++;
}
// generate
function generateRatingForm() {
  formMcq.classList.toggle('show');
  choiceContainer.classList.toggle('show');
  formMcq.innerHTML = `
      <div class="topIcons">
        <span class="material-symbols-outlined"> content_copy </span>
        <span class="material-symbols-outlined delete"> delete </span>
        <span class="material-symbols-outlined"> arrow_downward </span>
        <span class="material-symbols-outlined"> arrow_upward </span>
      </div>
      <div class="mcqQuestion">
        <div class="question">
          <h4 class="qId">${questionNumber}.</h4>
          <input
            type="text"
            id="question-input"
            placeholder="Input your question title here..."
            value="Question"
          />
          <span class="material-symbols-sharp"> add_photo_alternate </span>
        </div>
        <div class="starRating">
          <div class="stars">
            <span class="material-symbols-rounded"> star </span>
            <span class="material-symbols-rounded"> star </span>
            <span class="material-symbols-rounded"> star </span>
            <span class="material-symbols-rounded"> star </span>
            <span class="material-symbols-rounded"> star </span>
          </div>
          <div class="function">
            <div class="levels">
              <label for="myDropdown">Levels:</label>
              <select id="myDropdown">
                <option value="option1">2</option>
                <option value="option2">3</option>
                <option value="option3">4</option>
                <option value="option1">5</option>
                <option value="option2">6</option>
                <option value="option3">7</option>
                <option value="option1">8</option>
                <option value="option2">9</option>
                <option value="option3">10</option>
              </select>
            </div>
            <div class="symbol">
              <label for="myDropdown">Symbol:</label>
              <select id="myDropdown">
                <!-- <span class="material-symbols-outlined"> star </span> -->
                <option value="option1">Star</option>
                <option value="option2">Number</option>
                <option value="option3">Heart</option>
                <option value="option1">Ribbon</option>
                <option value="option2">Thumb like</option>
                <option value="option3">Smile face</option>
                <option value="option1">Flag</option>
                <option value="option2">Lightbulb</option>
                <option value="option3">Trophy</option>
                <option value="option3">Checkmark</option>
              </select>
            </div>
          </div>
        </div>
        <hr />

        <div class="functionalityBtns">
          <div class="fnBtn">
            <span class="material-symbols-outlined"> toggle_off </span>
            <p>Required</p>
          </div>
          <div class="fnBtn">
            <span class="material-symbols-outlined"> more_horiz </span>
          </div>
        </div>
      </div>
    `;
  // mouse down event
  body.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(e) {
    if (!formMcq.contains(e.target) && !addBtn.contains(e.target)) {
      body.removeEventListener('mousedown', handleMouseDown);
      handleBlur();
    }
    function handleBlur() {
      const question = document.querySelector('#question-input');
      questionContainerArr.push({
        qId: questionNumber,
        question: question.value,
        options: '',
        answer: '',
        formHtml: formMcq.innerHTML,
        type: 'rating',
      });
      localStorage.setItem('data', JSON.stringify(questionContainerArr));
      formMcq.classList.toggle('show');
      renderRatingQuestion(questionNumber, question.value);

      // console.log(choiceContainer);
      handleBtnClickWhenEdit(e.target);
    }
  }
}
// edit question & re render
questions.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log(questionContainerArr);
  const clickedElement = e.target;
  if (clickedElement.closest('.formRatingDisplay')) {
    const formRatingDisplay = clickedElement.closest('.formRatingDisplay');

    questionContainerArr.forEach((ques) => {
      if (formRatingDisplay.id == ques.qId) {
        const editForm = document.createElement('div');
        editForm.className = 'editForm';
        editForm.id = `${ques.qId}`;
        editForm.innerHTML = ques.formHtml;

        // populate question
        editForm.querySelector('h4').textContent = `${ques.qId}.`;
        const q1 = editForm.querySelector('#question-input');
        q1.value = ques.question;
        questions.insertBefore(editForm, formRatingDisplay);
        formRatingDisplay.classList.toggle('none');
        editForm.classList.toggle('show');
        //delete button
        const deleteBtn = editForm.querySelector('.delete');
        deleteBtn.addEventListener('click', (e) => {
          // editForm.remove();
          deleteBtn.disabled = true;
          setTimeout(() => {
            deleteBtn.disabled = false;
          }, 2000);
          console.log(e.target);
          deleteFunction(e, editForm, formRatingDisplay);
          body.removeEventListener('mousedown', handleMouseDown);
        });
        // mouse down event
        body.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e) {
          if (!editForm.contains(e.target) && !addBtn.contains(e.target)) {
            body.removeEventListener('mousedown', handleMouseDown);
            handleBlur();
          }
          function handleBlur() {
            const question = editForm.querySelector('#question-input');
            questionContainerArr.forEach((q) => {
              if (q.qId == ques.qId) {
                q.question = question.value;
                q.options = '';
                q.formHtml = editForm.innerHTML;
              }
            });
            localStorage.setItem('data', JSON.stringify(questionContainerArr));
            formRatingDisplay.innerHTML = `
              <div id="question"><span>${ques.qId}.</span> ${question.value}?</div>
                <div class="stars">
                  <span class="material-symbols-rounded"> star </span>
                  <span class="material-symbols-rounded"> star </span>
                  <span class="material-symbols-rounded"> star </span>
                  <span class="material-symbols-rounded"> star </span>
                  <span class="material-symbols-rounded"> star </span>
                </div>`;
            editForm.remove();
            formRatingDisplay.classList.toggle('none');
          }
        }
      }
    });
  }
});
// 4. show date form
function renderDateQuestion(qId, question) {
  questions.innerHTML += `
  <div class="formDateDisplay item" id="${qId}" draggable="true">
    <div id="question"><span>${qId}.</span> ${question}?</div>
    <div class="answers">
      <input
        type="text"
        name="answer"
        placeholder="Please input date (M/d/yyyy)"
        disabled
      />
      <span class="material-symbols-outlined"> calendar_month </span>
    </div>
  </div>`;
  questionNumber++;
}
function generateDateForm() {
  formMcq.classList.toggle('show');
  choiceContainer.classList.toggle('show');
  formMcq.innerHTML = `
  <div class="topIcons">
  <span class="material-symbols-outlined"> content_copy </span>
  <span class="material-symbols-outlined delete"> delete </span>
  <span class="material-symbols-outlined"> arrow_downward </span>
  <span class="material-symbols-outlined"> arrow_upward </span>
</div>
<div class="mcqQuestion">
  <div class="question">
  <h4 class="qId">${questionNumber}.</h4>
    <input
      type="text"
      id="question-input"
      placeholder="Input your question title here..."
      value="Question"
    />
    <span class="material-symbols-sharp"> add_photo_alternate </span>
  </div>
  <div class="question answer">
    <!-- <h3>Question:</h3> -->
    <input
      type="text"
      id="question-input"
      placeholder="Please input date (M/d/yyyy)"
      value=""
      readonly
    />
    <span class="material-symbols-outlined"> calendar_month </span>
  </div>
  <!-- <hr /> -->

  <hr />
  <div class="functionalityBtns">
    <div class="fnBtn">
      <span class="material-symbols-outlined"> toggle_off </span>
      <p>Required</p>
    </div>
    <div class="fnBtn">
      <span class="material-symbols-outlined"> more_horiz </span>
    </div>
  </div>
</div>
    `;
  // mouse down event
  body.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(e) {
    if (!formMcq.contains(e.target) && !addBtn.contains(e.target)) {
      body.removeEventListener('mousedown', handleMouseDown);
      handleBlur();
    }
    function handleBlur() {
      const question = document.querySelector('#question-input');
      questionContainerArr.push({
        qId: questionNumber,
        question: question.value,
        options: '',
        answer: '',
        formHtml: formMcq.innerHTML,
        type: 'date',
      });
      localStorage.setItem('data', JSON.stringify(questionContainerArr));
      formMcq.classList.toggle('show');
      renderDateQuestion(questionNumber, question.value);

      // console.log(choiceContainer);
      handleBtnClickWhenEdit(e.target);
      // if (mcqBtn.contains(e.target)) {
      //   generateMcqForm();
      // } else if (textBtn.contains(e.target)) {
      //   generateTextForm();
      // } else if (ratingBtn.contains(e.target)) {
      //   generateRatingForm();
      // } else if (dateBtn.contains(e.target)) {
      //   generateDateForm();
      // }
    }
  }
}
// edit question & re render
questions.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log(questionContainerArr);
  const clickedElement = e.target;
  if (clickedElement.closest('.formDateDisplay')) {
    const formDateDisplay = clickedElement.closest('.formDateDisplay');
    console.log(formDateDisplay);
    questionContainerArr.forEach((ques) => {
      if (formDateDisplay.id == ques.qId) {
        const editForm = document.createElement('div');
        editForm.className = 'editForm';
        editForm.id = `${ques.qId}`;
        editForm.innerHTML = ques.formHtml;

        // populate question
        editForm.querySelector('h4').textContent = `${ques.qId}.`;
        const q1 = editForm.querySelector('#question-input');
        q1.value = ques.question;
        questions.insertBefore(editForm, formDateDisplay);
        formDateDisplay.classList.toggle('none');
        editForm.classList.toggle('show');
        console.log(editForm);
        //delete button
        const deleteBtn = editForm.querySelector('.delete');
        deleteBtn.addEventListener('click', (e) => {
          // editForm.remove();
          deleteBtn.disabled = true;
          setTimeout(() => {
            deleteBtn.disabled = false;
          }, 2000);
          deleteFunction(e, editForm, formDateDisplay);
          body.removeEventListener('mousedown', handleMouseDown);
        });
        // mouse down event
        body.addEventListener('mousedown', handleMouseDown);

        function handleMouseDown(e) {
          if (!editForm.contains(e.target) && !addBtn.contains(e.target)) {
            body.removeEventListener('mousedown', handleMouseDown);
            handleBlur();
          }
          function handleBlur() {
            const question = editForm.querySelector('#question-input');
            questionContainerArr.forEach((q) => {
              if (q.qId == ques.qId) {
                q.question = question.value;
                q.options = '';
                q.formHtml = editForm.innerHTML;
              }
            });
            localStorage.setItem('data', JSON.stringify(questionContainerArr));
            formDateDisplay.innerHTML = `
              <div id="question"><span>${ques.qId}.</span> ${question.value}?</div>
              <div class="answers">
                <input
                  type="text"
                  name="answer"
                  placeholder="Please input date (M/d/yyyy)"
                  disabled
                />
                <span class="material-symbols-outlined"> calendar_month </span>
              </div>`;
            editForm.remove();
            formDateDisplay.classList.toggle('none');
          }
        }
      }
    });
  }
});

// render questions
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
}
renderQuestions();

// draggggg
// const sortable = new Sortable(questions, {
//   animation: 350,
//   onEnd: function (evt) {
//     const items = document.querySelectorAll('.item');
//     let i = 1,
//       idx = 1,
//       flg = 1;
//     questionContainerArr.forEach((ques) => {
//       ques.bool = 'false';
//     });
//     items.forEach((item) => {
//       console.log(item.id);
//       const str = item.querySelector('span');
//       str.textContent = `${i++}.`;
//       questionContainerArr.forEach((ques) => {
//         if (item.id == ques.qId && ques.bool == 'false') {
//           ques.qId = flg++;
//           ques.bool = 'true';
//         }
//       });
//     });
//     questionContainerArr.sort((a, b) => a.qId - b.qId);
//     localStorage.setItem('data', JSON.stringify(questionContainerArr));
//     items.forEach((item) => {
//       item.id = idx++;
//     });
//   },
// });

// draggggggggggggggggggggggggg
function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  enableDragList(Array.from(sortableLists)[0]);
}
function enableDragList(list) {
  Array.from(list.children).forEach((item) => {
    enableDragItem(item);
  });
}
function enableDragItem(item) {
  item.setAttribute('draggable', true);
  item.addEventListener('drag', handleDrag);
  item.addEventListener('dragend', handleDrop);
}
function handleDrag(event) {
  const selectedItem = event.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;
  console.log(list);
  selectedItem.classList.add('drag-sort-active');
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);
  if (list === swapItem.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

function handleDrop(e) {
  e.target.classList.remove('drag-sort-active');
  const items = document.querySelectorAll('.item');
  let i = 1,
    idx = 1,
    flg = 1;
  questionContainerArr.forEach((ques) => {
    ques.bool = 'false';
  });
  items.forEach((item) => {
    // console.log(item.id);
    const str = item.querySelector('span');
    str.textContent = `${i++}.`;
    questionContainerArr.forEach((ques) => {
      if (item.id == ques.qId && ques.bool == 'false') {
        ques.qId = flg++;
        ques.bool = 'true';
      }
    });
  });
  questionContainerArr.sort((a, b) => a.qId - b.qId);
  localStorage.setItem('data', JSON.stringify(questionContainerArr));
  items.forEach((item) => {
    item.id = idx++;
  });
}

(() => {
  enableDragSort('questions');
})();

// preview button
const preview = document.getElementById('preview');
preview.addEventListener('click', () => {
  window.location.href = '/previewPage.html';
});
