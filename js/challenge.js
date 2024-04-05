const counterEl = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('list');
const likesList = document.querySelector('.likes'); // Select the likes list

let count = 0; // Current counter value
let isPaused = false; // Flag to track pause state
let likedNumbers = {}; // Object to store likes for each number
let intervalId = null; // Variable to store the timer interval

// Update the counter display
function updateCounter() {
  counterEl.textContent = count;
}

// Start the timer
function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      if (!isPaused) {
        count++;
        updateCounter();
      }
    }, 1000); // Update every second (1000 milliseconds)
  }
}

// Stop the timer
function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Handle click events for plus and minus buttons
plusBtn.addEventListener('click', () => {
  if (!isPaused) {
    count++;
    updateCounter();
  }
});

minusBtn.addEventListener('click', () => {
  if (!isPaused && count > 0) {
    count--;
    updateCounter();
  }
});

// Handle click event for the like button
heartBtn.addEventListener('click', () => {
  if (!isPaused) {
    const currentNumber = count;
    likedNumbers[currentNumber] = likedNumbers[currentNumber] ? likedNumbers[currentNumber] + 1 : 1;
    updateLikesList();
  }
});

// Update the list of liked numbers
function updateLikesList() {
  likesList.innerHTML = ""; // Clear existing list items
  for (const number in likedNumbers) {
    const likeItem = document.createElement('li');
    likeItem.textContent = `${number} (Likes: ${likedNumbers[number]})`;
    likesList.appendChild(likeItem);
  }
}

// Handle click event for the pause button
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  if (isPaused) {
    stopTimer();
    pauseBtn.textContent = "resume"; // Change button text
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    heartBtn.disabled = true;
  } else {
    startTimer();
    pauseBtn.textContent = "pause";
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    heartBtn.disabled = false;
  }
});

// Handle form submission for comments (basic example)
commentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  const comment = document.getElementById('comment-input').value.trim();
  if (comment) {
    const commentItem = document.createElement('li');
    commentItem.textContent = comment;
    commentList.appendChild(commentItem);
    document.getElementById('comment-input').value = ""; 
  }
});

startTimer();


