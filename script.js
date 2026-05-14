document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const tasksContainer = document.getElementById('tasks-container');
  const allTasksContainer = document.getElementById('all-tasks-container');
  const newTaskInput = document.getElementById('new-task');
  const addBtn = document.getElementById('add-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('.view-section');

  // Stats & Progress Elements
  const statTotal = document.getElementById('stat-total');
  const statCompleted = document.getElementById('stat-completed');
  const progressCircle = document.getElementById('progress-circle');
  const progressText = document.getElementById('progress-text');
  const successPopup = document.getElementById('success-popup');
  const weeklyChart = document.getElementById('weekly-chart');

  // Animation Elements
  const particleContainer = document.getElementById('particle-container');
  const mascot = document.getElementById('mascot');
  const welcomeScreen = document.getElementById('welcome-screen');
  const startBtn = document.getElementById('start-journey-btn');

  // State
  let tasks = JSON.parse(localStorage.getItem('lunalist_tasks')) || [];
  let notes = JSON.parse(localStorage.getItem('lunalist_notes')) || [];
  let audioCtx = null;

  // Sound Effect
  function playMagicalChime() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(1600, t + 0.3);

    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.3, t + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.6);
  }

  // --- WELCOME SCREEN LOGIC ---
  if(startBtn && welcomeScreen) {
    startBtn.addEventListener('click', () => {
      welcomeScreen.classList.add('fade-out');
      playMagicalChime();
      
      // Add a burst of particles on start
      const rect = startBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloatingParticle(centerX, centerY, 'star'), i * 50);
      }
      
      setTimeout(() => {
        welcomeScreen.style.display = 'none';
      }, 1000);
    });
  }

  // --- ROUTING (SPA) ---
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const viewId = item.dataset.view;
      
      viewSections.forEach(sec => {
        sec.classList.remove('active');
        if(sec.id === `view-${viewId}`) sec.classList.add('active');
      });

      if(viewId === 'calendar') renderCalendar();
      if(viewId === 'notes') renderNotes();
    });
  });

  // --- ANIMATED PLACEHOLDER ---
  const placeholders = ["Wake up early 🌅", "Complete coding practice 💻", "Drink enough water 💧", "Evening yoga 🌸"];
  let pIdx = 0; let cIdx = 0; let isDeleting = false;
  function typePlaceholder() {
    const currentText = placeholders[pIdx];
    if (isDeleting) {
      newTaskInput.setAttribute('placeholder', currentText.substring(0, cIdx - 1));
      cIdx--;
    } else {
      newTaskInput.setAttribute('placeholder', currentText.substring(0, cIdx + 1));
      cIdx++;
    }
    
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && cIdx === currentText.length) {
      speed = 2000; isDeleting = true;
    } else if (isDeleting && cIdx === 0) {
      isDeleting = false; pIdx = (pIdx + 1) % placeholders.length; speed = 500;
    }
    setTimeout(typePlaceholder, speed);
  }
  setTimeout(typePlaceholder, 1000);

  // --- CORE TASK LOGIC ---
  function saveTasks() {
    localStorage.setItem('lunalist_tasks', JSON.stringify(tasks));
  }

  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    const pendingElem = document.getElementById('stat-pending');
    if (pendingElem) pendingElem.textContent = total - completed;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressText.textContent = `${percent}%`;

    const circumference = 314; // 2 * pi * 50
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    updateAnalyticsGraph();
  }

  function updateAnalyticsGraph() {
    // Generate a beautiful pastel bar chart based on recent tasks
    weeklyChart.innerHTML = '';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    days.forEach((day, index) => {
      // Fake variation for magic feel, normally based on real historical data
      const baseHeight = 30 + Math.random() * 60; 
      const height = index === new Date().getDay() - 1 ? (tasks.filter(t=>t.completed).length * 10 + 20) : baseHeight;
      const hStr = Math.min(100, Math.max(10, height)) + '%';
      
      const barWrap = document.createElement('div');
      barWrap.className = 'bar-wrap';
      barWrap.innerHTML = `
        <div class="bar" style="height: ${hStr}"></div>
        <div class="bar-label">${day}</div>
      `;
      weeklyChart.appendChild(barWrap);
    });
  }

  function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card glass-panel ${task.completed ? 'completed' : ''}`;
    card.dataset.id = task.id;

    card.innerHTML = `
      <label class="checkbox-wrapper">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="custom-checkbox"></span>
      </label>
      <div class="task-content">
        <span class="task-title">${task.text}</span>
      </div>
      <div class="task-meta">
        <span class="task-date"><i class="ri-calendar-line"></i> ${task.dateDisplay || 'May 25, 2024'}</span>
      </div>
      <button class="delete-btn" aria-label="Delete"><i class="ri-delete-bin-line"></i></button>
    `;
    return card;
  }

  function renderTasks() {
    tasksContainer.innerHTML = '';
    allTasksContainer.innerHTML = '';
    
    tasks.forEach(task => {
      tasksContainer.appendChild(createTaskCard(task));
      allTasksContainer.appendChild(createTaskCard(task));
    });

    updateStats();
  }

  function showSuccessPopup() {
    successPopup.classList.add('show');
    setTimeout(() => { successPopup.classList.remove('show'); }, 3000);
  }

  function addTask(text) {
    if (!text.trim()) return;
    const now = new Date();
    tasks.unshift({
      id: Date.now().toString(),
      text: text,
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toISOString().split('T')[0],
      completed: false
    });
    saveTasks();
    renderTasks();
    newTaskInput.value = '';
    showSuccessPopup();
  }

  function toggleTask(id, cardElement, event) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = event.target.checked;
    saveTasks();
    
    if (task.completed) {
      triggerCompletionAnimation(cardElement);
    } else {
      cardElement.classList.remove('completed');
    }
    updateStats();
    setTimeout(renderTasks, 1500); 
  }

  // --- ANIMATIONS ---
  function createFloatingParticle(x, y, type) {
    const p = document.createElement('div');
    p.className = 'floating-particle';
    if (type === 'heart') p.innerHTML = '💖';
    else if (type === 'moon') p.innerHTML = '🌙';
    else p.innerHTML = '✨';
    
    p.style.left = `${x + (Math.random() - 0.5) * 80}px`;
    p.style.top = `${y + (Math.random() - 0.5) * 60}px`;
    p.style.fontSize = `${Math.random() * 20 + 20}px`;
    particleContainer.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }

  function triggerCompletionAnimation(taskCard) {
    const rect = taskCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    taskCard.classList.add('completed');
    playMagicalChime();

    // Burst of hearts, moons and stars
    const particleTypes = ['heart', 'moon', 'star'];
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        createFloatingParticle(centerX, centerY, type);
      }, i * 50);
    }

    confetti({
      spread: 80, ticks: 150, gravity: 0.6, decay: 0.94, startVelocity: 35,
      colors: ['#ff9a9e', '#fecfef', '#e0c3fc', '#8ec5fc'],
      particleCount: 50,
      origin: { x: centerX / window.innerWidth, y: centerY / window.innerHeight }
    });
  }

  // --- CALENDAR LOGIC ---
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('calendar-month-year');
    grid.innerHTML = '';
    
    const date = new Date(currentYear, currentMonth, 1);
    title.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const firstDayIndex = date.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for(let i=0; i<firstDayIndex; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-day empty';
      grid.appendChild(empty);
    }
    
    const today = new Date();
    for(let i=1; i<=daysInMonth; i++) {
      const day = document.createElement('div');
      day.className = 'calendar-day';
      if(i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        day.classList.add('today');
      }
      
      const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      const dayTasks = tasks.filter(t => t.date === dateStr);
      
      let dotsHtml = '';
      if(dayTasks.length > 0) {
        dotsHtml = '<div class="task-dots">';
        dayTasks.slice(0,3).forEach(t => {
          dotsHtml += `<div class="dot ${t.completed ? 'done' : ''}"></div>`;
        });
        if(dayTasks.length > 3) dotsHtml += '<span style="font-size:8px; line-height:6px;">+</span>';
        dotsHtml += '</div>';
      }
      
      day.innerHTML = `<span>${i}</span>${dotsHtml}`;
      grid.appendChild(day);
    }
  }
  
  document.getElementById('prev-month').addEventListener('click', () => { currentMonth--; if(currentMonth < 0) { currentMonth = 11; currentYear--; } renderCalendar(); });
  document.getElementById('next-month').addEventListener('click', () => { currentMonth++; if(currentMonth > 11) { currentMonth = 0; currentYear++; } renderCalendar(); });

  // --- FOCUS MODE LOGIC ---
  let focusInterval;
  let focusTimeLeft = 25 * 60;
  let focusRunning = false;
  const focusTimerEl = document.getElementById('focus-timer');
  const focusStartBtn = document.getElementById('focus-start');
  
  function updateFocusDisplay() {
    const m = Math.floor(focusTimeLeft / 60).toString().padStart(2, '0');
    const s = (focusTimeLeft % 60).toString().padStart(2, '0');
    focusTimerEl.textContent = `${m}:${s}`;
  }

  focusStartBtn.addEventListener('click', () => {
    if(focusRunning) {
      clearInterval(focusInterval);
      focusStartBtn.innerHTML = '<i class="ri-play-fill"></i> Start';
    } else {
      focusInterval = setInterval(() => {
        if(focusTimeLeft > 0) { focusTimeLeft--; updateFocusDisplay(); }
        else { clearInterval(focusInterval); playMagicalChime(); }
      }, 1000);
      focusStartBtn.innerHTML = '<i class="ri-pause-fill"></i> Pause';
    }
    focusRunning = !focusRunning;
  });

  document.getElementById('focus-reset').addEventListener('click', () => {
    clearInterval(focusInterval);
    focusRunning = false;
    focusTimeLeft = 25 * 60;
    updateFocusDisplay();
    focusStartBtn.innerHTML = '<i class="ri-play-fill"></i> Start';
  });

  // --- NOTES LOGIC ---
  const notesBoard = document.getElementById('notes-board');
  const addNoteBtn = document.getElementById('add-note-btn');
  const colors = ['note-yellow', 'note-pink', 'note-blue'];

  function saveNotes() { localStorage.setItem('lunalist_notes', JSON.stringify(notes)); }

  function renderNotes() {
    notesBoard.innerHTML = '';
    notes.forEach(note => {
      const el = document.createElement('div');
      el.className = `sticky-note ${note.color}`;
      el.innerHTML = `
        <textarea placeholder="Write a dreamy note...">${note.text}</textarea>
        <button class="delete-note"><i class="ri-close-circle-fill"></i></button>
      `;
      el.querySelector('textarea').addEventListener('input', (e) => {
        note.text = e.target.value; saveNotes();
      });
      el.querySelector('.delete-note').addEventListener('click', () => {
        notes = notes.filter(n => n.id !== note.id);
        saveNotes(); renderNotes();
      });
      notesBoard.appendChild(el);
    });
  }

  addNoteBtn.addEventListener('click', () => {
    notes.push({ id: Date.now().toString(), text: '', color: colors[Math.floor(Math.random()*colors.length)] });
    saveNotes(); renderNotes();
  });

  // --- GLOBAL EVENTS ---
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      const card = e.target.closest('.task-card');
      toggleTask(card.dataset.id, card, e);
    }
  });

  document.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      const card = deleteBtn.closest('.task-card');
      tasks = tasks.filter(t => t.id !== card.dataset.id);
      saveTasks(); renderTasks();
    }
  });

  addBtn.addEventListener('click', () => addTask(newTaskInput.value));
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(newTaskInput.value);
  });

  // Initial Run
  if (tasks.length === 0) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    tasks = [
      { id: '1', text: 'Wake up early 🌅', completed: false, dateDisplay: 'May 25, 2024', timestamp: '06:00 AM' },
      { id: '2', text: 'Complete coding practice 💻', completed: true, dateDisplay: 'May 24, 2024', timestamp: '09:00 AM' },
      { id: '3', text: 'Read 10 pages of a book 📖', completed: false, dateDisplay: 'May 25, 2024', timestamp: '10:00 AM' },
      { id: '4', text: 'Exercise for 30 minutes 💪', completed: true, dateDisplay: 'May 24, 2024', timestamp: '05:00 PM' },
      { id: '5', text: 'Finish JavaScript assignment 📝', completed: false, dateDisplay: 'May 26, 2024', timestamp: '02:00 PM' },
      { id: '6', text: 'Drink enough water 💧', completed: false, dateDisplay: 'May 26, 2024', timestamp: '08:00 AM' },
      { id: '7', text: 'Evening meditation 🌸', completed: false, dateDisplay: 'May 27, 2024', timestamp: '08:00 PM' },
      { id: '8', text: 'Clean my workspace ✨', completed: false, dateDisplay: 'May 27, 2024', timestamp: '10:00 AM' }
    ];
    saveTasks();
    renderTasks();
  } else {
    renderTasks();
  }
});
