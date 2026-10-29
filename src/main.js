import './style.css';
import { QUESTIONS_DATA } from './data.js';
import { sound } from './sound.js';
import { triggerConfetti } from './confetti.js';

/* =========================================================
   GAME STATE (LINEAR SEQUENTIAL PROGRESSION 1 -> 20)
   ========================================================= */
let gameState = {
  currentIndex: 0, // 0 to 19 (Câu 1 đến Câu 20)
  scoreX: 0,
  scoreO: 0,
  currentTurn: 'X', // 'X' or 'O'
  assignTeam: 'X',  // 'X', 'O', or 'NONE'
  answeredQuestions: {}, // { [qId]: { team: 'X'|'O'|'NONE', isCorrect: bool, selectedKey: 'A'|'B'|'C'|'D' } }
  showLuckyMarkers: false
};

// Load saved state from localStorage
function loadSavedState() {
  try {
    const saved = localStorage.getItem('xo_game_state_linear_1975');
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState = { ...gameState, ...parsed };
    }
  } catch (e) {
    console.error('Cannot load saved state:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem('xo_game_state_linear_1975', JSON.stringify(gameState));
  } catch (e) {
    console.error('Cannot save state:', e);
  }
}

/* =========================================================
   INITIALIZATION
   ========================================================= */
window.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  renderLadder();
  renderScoreboard();
  renderCurrentQuestion();
  setupEventListeners();
});

function setupEventListeners() {
  // Sound toggle
  document.getElementById('btnSoundToggle').addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    document.getElementById('soundIcon').textContent = sound.enabled ? '🔊' : '🔇';
    if (sound.enabled) sound.playClick();
  });

  // Fullscreen
  document.getElementById('btnFullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Reset Game
  document.getElementById('btnResetGame').addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại trò chơi về Câu 1 (xóa điểm và kết quả)?')) {
      resetGame();
    }
  });

  // Toggle Lucky Marker visibility in the ladder
  document.getElementById('toggleLuckyVisibility').addEventListener('click', () => {
    gameState.showLuckyMarkers = !gameState.showLuckyMarkers;
    const ladder = document.getElementById('ladderScrollContainer');
    if (gameState.showLuckyMarkers) {
      ladder.classList.add('show-lucky');
      document.getElementById('luckyEyeIcon').textContent = '🔒';
    } else {
      ladder.classList.remove('show-lucky');
      document.getElementById('luckyEyeIcon').textContent = '👁️';
    }
    saveState();
  });

  // Turn selection buttons
  document.getElementById('btnSelectTurnX').addEventListener('click', () => setTurn('X'));
  document.getElementById('btnSelectTurnO').addEventListener('click', () => setTurn('O'));

  // Micro score adjustment buttons (+1, -1, x2, /2)
  document.querySelectorAll('[data-score-adj]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const team = e.currentTarget.getAttribute('data-team');
      const val = e.currentTarget.getAttribute('data-score-adj');
      adjustScore(team, val);
    });
  });

  // Navigation: Next (">") and Previous ("<")
  document.getElementById('btnNextQuestion').addEventListener('click', advanceToNextQuestion);
  document.getElementById('btnPrevQuestion').addEventListener('click', goToPrevQuestion);

  // Score assignment buttons for the current question
  document.getElementById('btnAssignX').addEventListener('click', () => setAssignTeam('X'));
  document.getElementById('btnAssignO').addEventListener('click', () => setAssignTeam('O'));
  document.getElementById('btnAssignNone').addEventListener('click', () => setAssignTeam('NONE'));

  // Draw Modal (Bốc thăm X/O)
  document.getElementById('btnOpenDrawModal').addEventListener('click', () => {
    openModal('drawModal');
    document.getElementById('drawCoinDisplay').textContent = '?';
    document.getElementById('drawCoinDisplay').style.color = 'var(--neon-gold)';
    document.getElementById('drawResultText').textContent = 'Nhấn nút bên dưới để bốc thăm!';
  });
  document.getElementById('btnCloseDrawModal').addEventListener('click', () => {
    closeModal('drawModal');
  });
  document.getElementById('btnSpinWheel').addEventListener('click', spinCoin);

  // Question 12 Special Action Modal
  document.getElementById('btnActionSteal').addEventListener('click', () => {
    applyStealAction();
    closeModal('specialActionModal');
  });
  document.getElementById('btnActionSwap').addEventListener('click', () => {
    applySwapAction();
    closeModal('specialActionModal');
  });
  document.getElementById('btnSkipSpecialAction').addEventListener('click', () => {
    const team = gameState.assignTeam;
    if (team === 'X') gameState.scoreX += 1;
    else if (team === 'O') gameState.scoreO += 1;
    renderScoreboard();
    saveState();
    closeModal('specialActionModal');
  });

  // Victory modal buttons
  document.getElementById('btnViewBoardAfterWin').addEventListener('click', () => {
    closeModal('victoryModal');
  });
  document.getElementById('btnRestartAfterWin').addEventListener('click', () => {
    resetGame();
  });
}

/* =========================================================
   SCOREBOARD RENDERING
   ========================================================= */
function renderScoreboard() {
  document.getElementById('teamXScore').textContent = gameState.scoreX;
  document.getElementById('teamOScore').textContent = gameState.scoreO;

  const cardX = document.getElementById('teamXCard');
  const cardO = document.getElementById('teamOCard');

  if (gameState.currentTurn === 'X') {
    cardX.classList.add('active-turn');
    cardO.classList.remove('active-turn');
  } else {
    cardO.classList.add('active-turn');
    cardX.classList.remove('active-turn');
  }

  // Update Turn pill above the stage screen
  const pill = document.getElementById('stageTurnPill');
  const turnText = document.getElementById('stageTurnText');
  pill.className = `meta-turn-pill ${gameState.currentTurn === 'X' ? 'team-x' : 'team-o'}`;
  turnText.textContent = `LƯỢT ĐỘI ${gameState.currentTurn} TRẢ LỜI`;
}

function setTurn(team) {
  gameState.currentTurn = team;
  gameState.assignTeam = team;
  sound.playClick();
  renderScoreboard();
  updateAssignButtons();
  saveState();
}

function adjustScore(team, delta) {
  sound.playClick();
  if (delta === 'x2') {
    if (team === 'X') gameState.scoreX = Math.max(0, gameState.scoreX * 2);
    else gameState.scoreO = Math.max(0, gameState.scoreO * 2);
  } else if (delta === '/2') {
    if (team === 'X') gameState.scoreX = Math.ceil(gameState.scoreX / 2);
    else gameState.scoreO = Math.ceil(gameState.scoreO / 2);
  } else {
    const num = parseInt(delta, 10);
    if (team === 'X') gameState.scoreX = Math.max(0, gameState.scoreX + num);
    else gameState.scoreO = Math.max(0, gameState.scoreO + num);
  }
  renderScoreboard();
  saveState();
}

function setAssignTeam(team) {
  sound.playClick();
  gameState.assignTeam = team;
  updateAssignButtons();

  // If already answered, update record
  const currentQ = QUESTIONS_DATA[gameState.currentIndex];
  if (gameState.answeredQuestions[currentQ.id]) {
    gameState.answeredQuestions[currentQ.id].team = team;
    renderLadder();
  }
  saveState();
}

function updateAssignButtons() {
  document.getElementById('btnAssignX').classList.toggle('active', gameState.assignTeam === 'X');
  document.getElementById('btnAssignO').classList.toggle('active', gameState.assignTeam === 'O');
  document.getElementById('btnAssignNone').classList.toggle('active', gameState.assignTeam === 'NONE');
}

/* =========================================================
   TOAST NOTIFICATION HELPER
   ========================================================= */
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('cyberToast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* =========================================================
   VERTICAL 1-20 LADDER ("1 DỌC CÁC CÂU TỪ 1 ĐẾN 20 CỨ ĐẨY DẦN")
   ========================================================= */
function renderLadder() {
  const container = document.getElementById('ladderScrollContainer');
  container.innerHTML = '';

  if (gameState.showLuckyMarkers) {
    container.classList.add('show-lucky');
    document.getElementById('luckyEyeIcon').textContent = '🔒';
  } else {
    container.classList.remove('show-lucky');
    document.getElementById('luckyEyeIcon').textContent = '👁️';
  }

  // Calculate highest unlocked index
  // A question is accessible if:
  // 1. It is already answered
  // 2. It is the active question
  // 3. Or it's the next question after the latest answered question
  let maxUnlockedIdx = 0;
  for (let i = 0; i < QUESTIONS_DATA.length; i++) {
    if (gameState.answeredQuestions[QUESTIONS_DATA[i].id]) {
      maxUnlockedIdx = Math.min(QUESTIONS_DATA.length - 1, i + 1);
    } else {
      break;
    }
  }

  QUESTIONS_DATA.forEach((q, idx) => {
    const step = document.createElement('div');
    step.className = 'ladder-step';
    step.id = `ladderStep_${q.id}`;

    const isCurrent = (idx === gameState.currentIndex);
    const isAnswered = !!gameState.answeredQuestions[q.id];
    const isUnlocked = idx <= maxUnlockedIdx;

    if (isCurrent) {
      step.classList.add('active');
    }

    if (!isUnlocked) {
      step.classList.add('locked');
    }

    // Answered stamp
    if (isAnswered) {
      const ans = gameState.answeredQuestions[q.id];
      if (ans.team === 'X') step.classList.add('win-x');
      else if (ans.team === 'O') step.classList.add('win-o');
      else step.classList.add('no-win');
    }

    let luckyBadge = '';
    if (q.special) {
      luckyBadge = `<span class="ladder-step-badge">${q.special.icon}</span>`;
    }

    let lockBadge = '';
    if (!isUnlocked) {
      lockBadge = `<span class="ladder-lock-tag" title="Chưa mở khóa">🔒</span>`;
    }

    step.innerHTML = `
      <div class="ladder-step-left">
        <span class="ladder-step-num">${q.id}</span>
        <span class="ladder-step-label">Câu ${q.id}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 6px;">
        ${luckyBadge}
        ${lockBadge}
      </div>
    `;

    // Click handler with strict progression check
    step.addEventListener('click', () => {
      if (!isUnlocked) {
        sound.playWrong();
        showToast(`🔒 Bắt buộc xong Câu ${gameState.currentIndex + 1} mới được sang Câu ${q.id}!`);
        step.classList.remove('shake-anim');
        void step.offsetWidth;
        step.classList.add('shake-anim');
        return;
      }

      // Can navigate to previously answered questions or current question
      gameState.currentIndex = idx;
      renderCurrentQuestion();
      renderLadder();
      saveState();
    });

    container.appendChild(step);
  });

  // Auto-scroll ladder to keep the current active question centered ("cứ đẩy dần")
  setTimeout(() => {
    const activeStep = document.getElementById(`ladderStep_${QUESTIONS_DATA[gameState.currentIndex]?.id}`);
    if (activeStep) {
      activeStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

/* =========================================================
   STAGE QUESTION DISPLAY (MATCHING REFERENCE SCREENSHOT)
   ========================================================= */
function renderCurrentQuestion() {
  const q = QUESTIONS_DATA[gameState.currentIndex];
  if (!q) return;

  // 1. Big 3D numeral in top-left (e.g. 1, 2, ... 20)
  const bigNumEl = document.getElementById('stageBigNumber');
  bigNumEl.innerHTML = `<span class="num-glow">${q.id}</span>`;

  // 2. Progress tag (e.g. CÂU 1 / 20)
  document.getElementById('stageProgressTag').textContent = `CÂU ${q.id} / 20`;

  // 3. Lucky Event Flash Badge
  const luckyBadge = document.getElementById('stageLuckyBadge');
  if (q.special) {
    luckyBadge.style.display = 'inline-flex';
    luckyBadge.className = `meta-lucky-badge ${q.special.type}`;
    document.getElementById('luckyIconDisplay').textContent = q.special.icon;
    document.getElementById('luckyTitleDisplay').textContent = `${q.special.name}: ${q.special.desc}`;
  } else {
    luckyBadge.style.display = 'none';
  }

  // 4. Question Text Box
  document.getElementById('stageQuestionText').textContent = q.question;

  // 5. Build Options A, B, C, D
  const optionsContainer = document.getElementById('stageOptionsContainer');
  optionsContainer.innerHTML = '';

  const answeredData = gameState.answeredQuestions[q.id];

  const keys = ['A', 'B', 'C', 'D'];
  keys.forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'option-card-btn';
    btn.id = `optCard_${key}`;
    btn.innerHTML = `
      <span class="opt-letter">${key}</span>
      <span class="opt-sentence">${q.options[key]}</span>
      <span class="opt-status-badge" id="optBadge_${key}"></span>
    `;

    // If already answered, re-render the state
    if (answeredData) {
      btn.classList.add('locked');
      if (key === q.correct) {
        btn.classList.add('state-correct');
        const badge = btn.querySelector('.opt-status-badge');
        badge.innerHTML = '✓ ĐÁP ÁN ĐÚNG';
      } else if (answeredData.selectedKey === key && !answeredData.isCorrect) {
        btn.classList.add('state-wrong');
        const badge = btn.querySelector('.opt-status-badge');
        badge.innerHTML = '✗ SAI RỒI';
      }
    } else {
      btn.addEventListener('click', () => {
        handleOptionClick(key, q);
      });
    }

    optionsContainer.appendChild(btn);
  });

  // 6. Explanation Box
  const expBox = document.getElementById('stageExplanationBox');
  const expText = document.getElementById('stageExplanationText');
  expText.textContent = q.explanation;
  if (answeredData) {
    expBox.classList.add('show');
  } else {
    expBox.classList.remove('show');
  }

  // 7. Update Host Assignment team defaults to currentTurn
  if (!answeredData) {
    gameState.assignTeam = gameState.currentTurn;
  } else {
    gameState.assignTeam = answeredData.team;
  }
  updateAssignButtons();

  // Next Button Label & Lock State
  const nextBtn = document.getElementById('btnNextQuestion');
  const nextLabel = nextBtn.querySelector('.next-label');
  if (gameState.currentIndex === QUESTIONS_DATA.length - 1) {
    nextLabel.textContent = 'KẾT THÚC';
  } else {
    nextLabel.textContent = 'CÂU TIẾP';
  }

  const isAnswered = !!gameState.answeredQuestions[q.id];
  if (isAnswered) {
    nextBtn.classList.remove('locked');
    nextBtn.classList.add('ready-pulse');
    nextBtn.title = "Đã xong câu này! Bấm để chuyển sang câu tiếp theo ▶";
  } else {
    nextBtn.classList.add('locked');
    nextBtn.classList.remove('ready-pulse');
    nextBtn.title = `Bắt buộc phải trả lời xong Câu ${q.id} mới được sang câu tiếp theo!`;
  }
}

/* =========================================================
   OPTION CLICK INTERACTION (EXACT GREEN/RED SPECIFICATION)
   ========================================================= */
function handleOptionClick(selectedKey, q) {
  // Lock options
  const allBtns = document.querySelectorAll('.option-card-btn');
  allBtns.forEach(b => b.classList.add('locked'));

  const isCorrect = (selectedKey === q.correct);
  const chosenBtn = document.getElementById(`optCard_${selectedKey}`);
  const correctBtn = document.getElementById(`optCard_${q.correct}`);

  if (isCorrect) {
    // CORRECT: Green + Checkmark
    chosenBtn.classList.add('state-correct');
    const badge = document.getElementById(`optBadge_${selectedKey}`);
    badge.innerHTML = '✓ CHÍNH XÁC';

    sound.playCorrect();
    triggerConfetti(70);

    applyAnswerScore(true, q);
  } else {
    // WRONG: Red + Cross, Correct lights up Green + Checkmark
    chosenBtn.classList.add('state-wrong');
    const wrongBadge = document.getElementById(`optBadge_${selectedKey}`);
    wrongBadge.innerHTML = '✗ SAI RỒI';

    if (correctBtn) {
      correctBtn.classList.add('state-correct');
      const correctBadge = document.getElementById(`optBadge_${q.correct}`);
      correctBadge.innerHTML = '✓ ĐÁP ÁN ĐÚNG';
    }

    sound.playWrong();
    applyAnswerScore(false, q);
  }

  // Save answered record
  gameState.answeredQuestions[q.id] = {
    team: gameState.assignTeam,
    isCorrect: isCorrect,
    selectedKey: selectedKey,
    timestamp: Date.now()
  };

  // Unlock Next button immediately with glowing pulse
  const nextBtn = document.getElementById('btnNextQuestion');
  nextBtn.classList.remove('locked');
  nextBtn.classList.add('ready-pulse');
  nextBtn.title = "Đã xong câu này! Bấm để chuyển sang câu tiếp theo ▶";

  // Reveal explanation
  setTimeout(() => {
    document.getElementById('stageExplanationBox').classList.add('show');
  }, 350);

  renderLadder();
  saveState();
}

function applyAnswerScore(isCorrect, q) {
  const team = gameState.assignTeam;

  if (isCorrect) {
    if (q.special) {
      if (q.special.type === 'gold') {
        // Câu 5 & 9: Ngôi sao Vàng (x2 Điểm)
        sound.playLucky();
        if (team === 'X') {
          gameState.scoreX = (gameState.scoreX > 0) ? gameState.scoreX * 2 : 2;
        } else if (team === 'O') {
          gameState.scoreO = (gameState.scoreO > 0) ? gameState.scoreO * 2 : 2;
        }
      } else if (q.id === 12) {
        // Câu 12: Ngôi sao Xanh (Cướp / Swap)
        setTimeout(() => {
          const desc = document.getElementById('specialActionDesc');
          if (desc) {
            desc.innerHTML = `Chúc mừng <strong style="color: ${team === 'X' ? 'var(--neon-cyan)' : 'var(--neon-pink)'}">ĐỘI ${team}</strong> đã trả lời đúng câu 12! Hãy chọn 1 đặc quyền:`;
          }
          openModal('specialActionModal');
        }, 600);
        return;
      } else {
        // +1 for normal correct
        if (team === 'X') gameState.scoreX += 1;
        else if (team === 'O') gameState.scoreO += 1;
      }
    } else {
      // Normal Question: +1 point
      if (team === 'X') gameState.scoreX += 1;
      else if (team === 'O') gameState.scoreO += 1;
    }
  } else {
    // WRONG PENALTIES FOR SPECIAL LUCKY QUESTIONS:
    if (q.id === 20) {
      // Câu 20: Ngôi sao Đỏ - VỀ MO (MẤT HẾT ĐIỂM)
      sound.playDanger();
      if (team === 'X') gameState.scoreX = 0;
      else if (team === 'O') gameState.scoreO = 0;
    } else if (q.id === 17) {
      // Câu 17: Ngôi sao Hồng - CHIA ĐÔI ĐIỂM (/2)
      sound.playDanger();
      if (team === 'X') gameState.scoreX = Math.ceil(gameState.scoreX / 2);
      else if (team === 'O') gameState.scoreO = Math.ceil(gameState.scoreO / 2);
    }
  }

  renderScoreboard();
  saveState();
}

/* =========================================================
   NAVIGATION (ĐẨY DẦN CÂU HỎI TIẾP THEO)
   ========================================================= */
function advanceToNextQuestion() {
  const currentQ = QUESTIONS_DATA[gameState.currentIndex];
  const isAnswered = !!gameState.answeredQuestions[currentQ.id];

  // STRICT RULE: Bắt buộc xong câu hiện tại mới được sang câu tiếp theo!
  if (!isAnswered) {
    sound.playDanger();
    showToast(`⚠️ Bắt buộc phải chọn đáp án cho Câu ${currentQ.id} mới được sang Câu ${currentQ.id + 1}!`);
    const frame = document.querySelector('.cyber-frame');
    if (frame) {
      frame.classList.remove('shake-anim');
      void frame.offsetWidth;
      frame.classList.add('shake-anim');
    }
    return;
  }

  sound.playClick();

  // If at question 20 and user clicks finish
  if (gameState.currentIndex >= QUESTIONS_DATA.length - 1) {
    showVictoryFinale();
    return;
  }

  // Alternate default turn for next question
  if (gameState.currentTurn === 'X') gameState.currentTurn = 'O';
  else gameState.currentTurn = 'X';
  gameState.assignTeam = gameState.currentTurn;

  // Advance index
  gameState.currentIndex += 1;

  renderScoreboard();
  renderLadder();
  renderCurrentQuestion();
  saveState();
}

function goToPrevQuestion() {
  if (gameState.currentIndex > 0) {
    sound.playClick();
    gameState.currentIndex -= 1;
    renderLadder();
    renderCurrentQuestion();
    saveState();
  }
}

/* =========================================================
   QUESTION 12 SPECIAL ACTIONS (CƯỚP / SWAP)
   ========================================================= */
function applyStealAction() {
  const team = gameState.assignTeam;
  sound.playLucky();
  if (team === 'X') {
    const stealAmount = Math.min(2, gameState.scoreO);
    gameState.scoreO = Math.max(0, gameState.scoreO - stealAmount);
    gameState.scoreX += (stealAmount > 0 ? stealAmount : 2);
  } else if (team === 'O') {
    const stealAmount = Math.min(2, gameState.scoreX);
    gameState.scoreX = Math.max(0, gameState.scoreX - stealAmount);
    gameState.scoreO += (stealAmount > 0 ? stealAmount : 2);
  }
  renderScoreboard();
  saveState();
}

function applySwapAction() {
  sound.playLucky();
  const temp = gameState.scoreX;
  gameState.scoreX = gameState.scoreO;
  gameState.scoreO = temp;
  renderScoreboard();
  saveState();
}

/* =========================================================
   BỐC THĂM X / O RANDOMIZER (WHEEL / COIN FLIP)
   ========================================================= */
function spinCoin() {
  const btn = document.getElementById('btnSpinWheel');
  const coin = document.getElementById('drawCoinDisplay');
  const text = document.getElementById('drawResultText');

  btn.disabled = true;
  coin.classList.add('spinning');
  sound.playCoinSpin();

  let counter = 0;
  const interval = setInterval(() => {
    coin.textContent = (counter % 2 === 0) ? 'X' : 'O';
    coin.style.color = (counter % 2 === 0) ? 'var(--neon-cyan)' : 'var(--neon-pink)';
    sound.playClick();
    counter++;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    coin.classList.remove('spinning');
    btn.disabled = false;

    const outcome = Math.random() < 0.5 ? 'X' : 'O';
    coin.textContent = outcome;
    coin.style.color = outcome === 'X' ? 'var(--neon-cyan)' : 'var(--neon-pink)';

    text.innerHTML = `🎉 KẾT QUẢ: <strong style="color: ${outcome === 'X' ? 'var(--neon-cyan)' : 'var(--neon-pink)'}">ĐỘI ${outcome}</strong> ĐƯỢC QUYỀN TRẢ LỜI!`;
    sound.playCorrect();

    setTurn(outcome);
  }, 1800);
}

/* =========================================================
   VICTORY FINALE
   ========================================================= */
function showVictoryFinale() {
  const title = document.getElementById('victoryWinnerTitle');
  const scoreX = document.getElementById('victoryScoreX');
  const scoreO = document.getElementById('victoryScoreO');

  scoreX.textContent = gameState.scoreX;
  scoreO.textContent = gameState.scoreO;

  if (gameState.scoreX > gameState.scoreO) {
    title.textContent = '🏆 ĐỘI X TOÀN THẮNG!';
    title.style.color = 'var(--neon-cyan)';
  } else if (gameState.scoreO > gameState.scoreX) {
    title.textContent = '🏆 ĐỘI O TOÀN THẮNG!';
    title.style.color = 'var(--neon-pink)';
  } else {
    title.textContent = '🤝 HAI ĐỘI HÒA NHAU!';
    title.style.color = 'var(--neon-gold)';
  }

  openModal('victoryModal');
  triggerConfetti(150);
  sound.playLucky();
}

function resetGame() {
  gameState = {
    currentIndex: 0,
    scoreX: 0,
    scoreO: 0,
    currentTurn: 'X',
    assignTeam: 'X',
    answeredQuestions: {},
    showLuckyMarkers: false
  };
  saveState();
  renderScoreboard();
  renderLadder();
  renderCurrentQuestion();
  closeModal('victoryModal');
}

/* =========================================================
   MODAL HELPERS
   ========================================================= */
function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
