import './style.css';
import { QUESTIONS_DATA } from './data.js';
import { sound } from './sound.js';
import { triggerConfetti } from './confetti.js';

/* =========================================================
   GAME STATE (SINGLE PLAYER / CLASS QUIZ)
   ========================================================= */
let gameState = {
  currentIndex: 0, // 0 to 19 (Câu 1 đến Câu 20)
  score: 0,
  correctCount: 0,
  answeredQuestions: {}, // { [qId]: { isCorrect: bool, selectedKey: 'A'|'B'|'C'|'D' } }
  showLuckyMarkers: false
};

// Load saved state from localStorage
function loadSavedState() {
  try {
    const saved = localStorage.getItem('ls_dang_quiz_state_custom_rules_1975');
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
    localStorage.setItem('ls_dang_quiz_state_custom_rules_1975', JSON.stringify(gameState));
  } catch (e) {
    console.error('Cannot save state:', e);
  }
}

/* =========================================================
   INITIALIZATION
   ========================================================= */
window.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  renderHeaderStats();
  renderLadder();
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
    if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ bài thi về Câu 1?')) {
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

  // Navigation: Next (">") and Previous ("<")
  document.getElementById('btnNextQuestion').addEventListener('click', advanceToNextQuestion);
  document.getElementById('btnPrevQuestion').addEventListener('click', goToPrevQuestion);

  // Milestone Book Modal (Câu 12: x2 hoặc Cướp điểm)
  document.getElementById('btnBookDouble').addEventListener('click', () => {
    gameState.score = (gameState.score > 0) ? gameState.score * 2 : 2;
    sound.playLucky();
    triggerConfetti(90);
    showToast("📖 BẢO BỐI: Bạn đã chọn NHÂN ĐÔI (X2) ĐIỂM SỐ!");
    closeModal('bookModal');
    renderHeaderStats();
    saveState();
  });

  document.getElementById('btnBookSteal').addEventListener('click', () => {
    gameState.score += 3;
    sound.playLucky();
    triggerConfetti(90);
    showToast("⚔️ BẢO BỐI: Bạn đã CƯỚP ĐƯỢC +3 ĐIỂM THƯỞNG!");
    closeModal('bookModal');
    renderHeaderStats();
    saveState();
  });

  // Milestone Gamble Modal (Câu 17: x2 hoặc Lấy 50% số điểm)
  document.getElementById('btnGambleDouble').addEventListener('click', () => {
    gameState.score = (gameState.score > 0) ? gameState.score * 2 : 2;
    sound.playLucky();
    triggerConfetti(90);
    showToast("⚡ THỬ THÁCH: Bạn đã chọn NHÂN ĐÔI (X2) ĐIỂM SỐ!");
    closeModal('gambleModal');
    renderHeaderStats();
    saveState();
  });

  document.getElementById('btnGambleHalf').addEventListener('click', () => {
    gameState.score = Math.ceil(gameState.score / 2);
    sound.playDanger();
    showToast("📉 THỬ THÁCH: Bạn đã lấy 50% SỐ ĐIỂM (CHIA ĐÔI)!");
    closeModal('gambleModal');
    renderHeaderStats();
    saveState();
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
   HEADER STATS
   ========================================================= */
function renderHeaderStats() {
  document.getElementById('headerScore').textContent = gameState.score;
  document.getElementById('headerCorrect').textContent = `${gameState.correctCount} / ${QUESTIONS_DATA.length}`;
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

    // Answered status stamp: Green check (✓) or Red cross (✗)
    if (isAnswered) {
      const ans = gameState.answeredQuestions[q.id];
      if (ans.isCorrect) {
        step.classList.add('win-correct');
      } else {
        step.classList.add('win-wrong');
      }
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

  // 3. Special Event Flash Badge (if milestone question)
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

  // 7. Navigation Status & Next Button Lock State
  const nextBtn = document.getElementById('btnNextQuestion');
  const nextLabel = nextBtn.querySelector('.next-label');
  const statusText = document.getElementById('questionStatusText');

  if (gameState.currentIndex === QUESTIONS_DATA.length - 1) {
    nextLabel.textContent = 'XEM KẾT QUẢ';
  } else {
    nextLabel.textContent = 'CÂU TIẾP';
  }

  const isAnswered = !!answeredData;
  if (isAnswered) {
    nextBtn.classList.remove('locked');
    nextBtn.classList.add('ready-pulse');
    nextBtn.title = "Đã xong câu này! Bấm để chuyển sang câu tiếp theo ▶";
    statusText.textContent = answeredData.isCorrect ? "✅ Câu trả lời chính xác!" : "❌ Chưa chính xác, xem giải thích bên dưới.";
    statusText.style.color = answeredData.isCorrect ? "var(--neon-green)" : "var(--neon-red)";
  } else {
    nextBtn.classList.add('locked');
    nextBtn.classList.remove('ready-pulse');
    nextBtn.title = `Bắt buộc phải trả lời xong Câu ${q.id} mới được sang câu tiếp theo!`;
    statusText.textContent = "Chọn 1 đáp án để tiếp tục";
    statusText.style.color = "var(--text-muted)";
  }
}

/* =========================================================
   OPTION CLICK INTERACTION & SPECIAL RULES LOGIC
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

    gameState.correctCount += 1;
    gameState.score += 1; // +1 cơ bản
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
  }

  // Save answered record
  gameState.answeredQuestions[q.id] = {
    isCorrect: isCorrect,
    selectedKey: selectedKey,
    timestamp: Date.now()
  };

  /* =========================================================
     CÁC MỐC LUẬT ĐẶC BIỆT THEO YÊU CẦU:
     - Xong câu 5: Mặc định được x2 điểm
     - Xong câu 12: Mở book chọn 1 trong 2: x2 hoặc Cướp điểm
     - Xong câu 17: Chọn x2 hoặc Lấy 50% số điểm
     - Xong câu 20: Reset điểm về 0
     ========================================================= */
  if (q.id === 5) {
    // Câu 5: Mặc định x2 điểm
    gameState.score = (gameState.score > 0) ? gameState.score * 2 : 2;
    sound.playLucky();
    triggerConfetti(90);
    setTimeout(() => {
      showToast("🌟 MỐC CÂU 5: Bạn mặc định được NHÂN ĐÔI (X2) ĐIỂM SỐ!");
    }, 400);
  } else if (q.id === 12) {
    // Câu 12: Mở book chọn x2 hoặc cướp điểm
    setTimeout(() => {
      openModal('bookModal');
    }, 600);
  } else if (q.id === 17) {
    // Câu 17: Chọn x2 hoặc lấy 50% số điểm
    setTimeout(() => {
      openModal('gambleModal');
    }, 600);
  } else if (q.id === 20) {
    // Câu 20: Reset điểm về 0
    gameState.score = 0;
    sound.playDanger();
    setTimeout(() => {
      showToast("🚨 CÂU 20: Toàn bộ điểm số đã bị RESET VỀ 0!");
    }, 400);
  }

  // Unlock Next button immediately with glowing pulse
  const nextBtn = document.getElementById('btnNextQuestion');
  nextBtn.classList.remove('locked');
  nextBtn.classList.add('ready-pulse');
  nextBtn.title = "Đã xong câu này! Bấm để chuyển sang câu tiếp theo ▶";

  const statusText = document.getElementById('questionStatusText');
  statusText.textContent = isCorrect ? "✅ Câu trả lời chính xác!" : "❌ Chưa chính xác, xem giải thích bên dưới.";
  statusText.style.color = isCorrect ? "var(--neon-green)" : "var(--neon-red)";

  // Reveal explanation
  setTimeout(() => {
    document.getElementById('stageExplanationBox').classList.add('show');
  }, 350);

  renderHeaderStats();
  renderLadder();
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

  // Advance index
  gameState.currentIndex += 1;

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
   VICTORY FINALE
   ========================================================= */
function showVictoryFinale() {
  const total = QUESTIONS_DATA.length;
  const percent = Math.round((gameState.correctCount / total) * 100);

  document.getElementById('victoryFinalScore').textContent = `${gameState.score}`;
  document.getElementById('victoryPercent').textContent = `${percent}%`;

  openModal('victoryModal');
  triggerConfetti(150);
  sound.playCorrect();
}

function resetGame() {
  gameState = {
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    answeredQuestions: {},
    showLuckyMarkers: false
  };
  saveState();
  renderHeaderStats();
  renderLadder();
  renderCurrentQuestion();
  closeModal('victoryModal');
  closeModal('bookModal');
  closeModal('gambleModal');
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
