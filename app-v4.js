// ==================== ROBOQUEST STATE CONTROLLER ====================

const DEFAULT_STATE = {
  xp: 350,
  coins: 120,
  gems: 25,
  streak: 1,
  lastStreakClaim: null, // ISO Date String
  nickname: "RoboCoder",
  avatarColor: "blue",
  completedMissions: [], // [1, 2, etc]
  pushedProjects: [], // [{ name, tech, date, url }]
  spinCount: 1,
  tasksCompleted: 0
};

let STATE = { ...DEFAULT_STATE };

// Save and Load State helpers
function saveStateToStorage() {
  localStorage.setItem("roboquest_state", JSON.stringify(STATE));
}

function loadStateFromStorage() {
  const data = localStorage.getItem("roboquest_state");
  if (data) {
    try {
      STATE = JSON.parse(data);
      // Fallback for missing keys from older schemas
      for (let key in DEFAULT_STATE) {
        if (STATE[key] === undefined) {
          STATE[key] = DEFAULT_STATE[key];
        }
      }
    } catch (e) {
      STATE = { ...DEFAULT_STATE };
    }
  }
}

// ==================== TOPIC SYLLABUS DATA ====================

const SYLLABUS = {
  variables: {
    level: 1,
    id: "variables",
    title: "Mission 1: Understanding Variables",
    youtubeId: "sJyPyObGp14", // Popular JS variables video ID
    concept: "Variables are named containers used to store data values. In JavaScript, we declare them using <code>let</code>, <code>const</code>, or <code>var</code>. Think of variables as identifiers pointing to memory cells. Memory allocation happens behind the scenes, letting you focus on assigning values.",
    analogy1: "Think of variables like cardboard storage boxes in your bedroom. You label a box 'myToys' (variable name) and put a shiny 'Robot' (variable value) inside. Whenever you ask for 'myToys', you get the 'Robot'. If you decide to replace it with a 'ToyCar', the label stays the same, but the content inside changes!",
    analogy2: "Think of variables like lockers in a school hallway. Each locker has a unique locker number written on the door (the variable name). Inside the locker, you store a backpack (the variable value). You can open the locker and change the backpack inside anytime, but the locker number remains exactly the same.",
    question: "Initialize a variable named <code>weapon</code> and assign it the string value <code>'Laser Beam'</code>. Then initialize a variable named <code>ammo</code> and assign it the number value <code>100</code>.",
    defaultCode: `// Write your Javascript code below\n`,
    validate: (code) => {
      // Clean comments and whitespace
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      
      // Simple parser simulation
      let weaponVal = null;
      let ammoVal = null;
      
      try {
        // Execute code in a scoped sandboxed evaluation
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              weapon: typeof weapon !== 'undefined' ? weapon : undefined,
              ammo: typeof ammo !== 'undefined' ? ammo : undefined
            };
          }
        `);
        const result = runFn(executionScope);
        weaponVal = result.weapon;
        ammoVal = result.ammo;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (weaponVal !== "Laser Beam") {
        return { success: false, error: "Please declare a variable named 'weapon' with value 'Laser Beam' (Check quotes/casing!)" };
      }
      if (ammoVal !== 100) {
        return { success: false, error: "Please declare a variable named 'ammo' with the exact number 100" };
      }
      return { success: true };
    },
    project: {
      name: "Cyber Inventory System",
      tech: "JavaScript Console App",
      desc: "An inventory system designed to track laser weapons, plasma shields, and fusion cell configurations."
    }
  },
  dataTypes: {
    level: 2,
    id: "dataTypes",
    title: "Mission 2: Cyber Data Types",
    youtubeId: "TylvO9KQ3p0",
    concept: "JavaScript has various data types including Strings, Numbers, Booleans, Objects, and Arrays. JavaScript is dynamically typed, meaning variables can hold different data types over time.",
    analogy1: "Think of data types like power outlets in a spaceship. You have plugs for liquids (water hose), electricity (cables), and fuel (gas lines). You can't plug a gas hose into an electrical socket! Similarly, you can't perform text calculations on a true/false boolean.",
    analogy2: "Think of data types like building materials. Strings are like wood planks (they hold text), Numbers are like metal steel beams (they hold structured quantities), and Booleans are like light switches (they are either fully ON or fully OFF).",
    question: "Create a boolean variable named <code>isShieldActive</code> set to <code>true</code>, and a string variable named <code>shieldName</code> set to <code>'Aegis Matrix'</code>.",
    defaultCode: `// Write your Javascript code below\n`,
    validate: (code) => {
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      let shieldActive = null;
      let nameVal = null;
      try {
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              isShieldActive: typeof isShieldActive !== 'undefined' ? isShieldActive : undefined,
              shieldName: typeof shieldName !== 'undefined' ? shieldName : undefined
            };
          }
        `);
        const result = runFn(executionScope);
        shieldActive = result.isShieldActive;
        nameVal = result.shieldName;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (shieldActive !== true) {
        return { success: false, error: "Please set 'isShieldActive' to boolean true" };
      }
      if (nameVal !== "Aegis Matrix") {
        return { success: false, error: "Please declare 'shieldName' set to 'Aegis Matrix'" };
      }
      return { success: true };
    },
    project: {
      name: "Aegis Shield Configurator",
      tech: "JavaScript Variables & Types",
      desc: "System console to monitor shield stability, name signatures, and reactive matrices."
    }
  },
  conditionals: {
    level: 3,
    id: "conditionals",
    title: "Mission 3: Logic Gates (Conditionals)",
    youtubeId: "IsG4Xa7o_N8",
    concept: "Conditionals control execution flows. <code>if</code>, <code>else if</code>, and <code>else</code> statements direct code logic down branch pathways depending on evaluation metrics.",
    analogy1: "Conditionals are like security guards scanning entry badges. If you have a VIP badge, the guard directs you to the executive lounge. Otherwise, if you have a standard badge, you enter the main hall. Otherwise, you get bounced out!",
    analogy2: "Conditionals are like train track switches. When the train arrives, a switch decides whether the train turns left (Track A) or right (Track B) depending on the signal lights.",
    question: "Write an <code>if/else</code> statement. Check if a variable named <code>batteryPower</code> is less than <code>20</code>. If so, return a variable named <code>status</code> set to <code>'Low'</code>. Otherwise, set <code>status</code> to <code>'Stable'</code>. Pre-declare batteryPower to 15.",
    defaultCode: `let batteryPower = 15;\nlet status = '';\n\n// Write if/else statement below\n`,
    validate: (code) => {
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      let statusVal = null;
      try {
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              status: typeof status !== 'undefined' ? status : undefined
            };
          }
        `);
        const result = runFn(executionScope);
        statusVal = result.status;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (statusVal !== "Low") {
        return { success: false, error: "Incorrect logic. When batteryPower is 15 (less than 20), 'status' must equal 'Low'" };
      }
      return { success: true };
    },
    project: {
      name: "Robot Power Monitor Grid",
      tech: "JavaScript Logic gates",
      desc: "Controls emergency power backups based on system battery levels."
    }
  },
  loops: {
    level: 4,
    id: "loops",
    title: "Mission 4: Assembly Lines (Loops)",
    youtubeId: "s9wW2PpJsmQ",
    concept: "Loops execute code blocks repeatedly. A <code>for</code> loop iterates a specific number of times, while a <code>while</code> loop runs until its condition evaluates to false.",
    analogy1: "Loops are like a factory worker stamping boxes on a conveyor belt. The boss says, 'Stamp exactly 10 boxes'. The worker stamps one, increments the counter, and repeats the process until the counter hits 10.",
    analogy2: "Loops are like doing push-ups in fitness training. Your coach commands: 'Keep doing push-ups until you have completed 10 reps'. You do one, count 'one', do another, count 'two', until you reach ten and stop.",
    question: "Create a variable named <code>nanobotCount</code> initialized to <code>0</code>. Write a <code>for</code> loop that runs 5 times, adding <code>2</code> to <code>nanobotCount</code> in each iteration.",
    defaultCode: `let nanobotCount = 0;\n\n// Write for loop below\n`,
    validate: (code) => {
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      let nanobots = null;
      try {
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              nanobotCount: typeof nanobotCount !== 'undefined' ? nanobotCount : undefined
            };
          }
        `);
        const result = runFn(executionScope);
        nanobots = result.nanobotCount;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (nanobots !== 10) {
        return { success: false, error: "The nanobotCount must equal 10 after 5 iterations of adding 2. Check loop boundaries!" };
      }
      return { success: true };
    },
    project: {
      name: "NanoAssembler Factory Controller",
      tech: "JavaScript Loops",
      desc: "Configures micro-assembly loops to generate carbon fiber nanobots."
    }
  },
  functions: {
    level: 5,
    id: "functions",
    title: "Mission 5: Cyber Blueprints (Functions)",
    youtubeId: "W6NZfCO5SIk",
    concept: "Functions are reusable blocks of code that perform actions and return output values. You define a blueprint once and invoke it multiple times with different parameters.",
    analogy1: "Functions are like juice makers. The juicer is the function itself. You feed it inputs (apples, oranges), it processes them inside, and outputs a delicious glass of fresh juice. The blueprint works for any fruit you throw in!",
    analogy2: "Functions are like calculator buttons. The '+' button is a pre-defined blueprint. When you press it, it takes two inputs, adds them, and flashes the sum on the screen. You don't rebuild the adding logic every time.",
    question: "Write a function named <code>calculateSum</code> that accepts two arguments (numbers) and returns their sum. Test it by calling it with numbers <code>5</code> and <code>7</code> and saving the result in a variable named <code>sumOutput</code>.",
    defaultCode: `// Write calculateSum function below\n`,
    validate: (code) => {
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      let sumResult = null;
      let calcFn = null;
      try {
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              calculateSum: typeof calculateSum !== 'undefined' ? calculateSum : null,
              sumOutput: typeof sumOutput !== 'undefined' ? sumOutput : undefined
            };
          }
        `);
        const result = runFn(executionScope);
        sumResult = result.sumOutput;
        calcFn = result.calculateSum;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (typeof calcFn !== "function") {
        return { success: false, error: "Please define a function named 'calculateSum'" };
      }
      if (sumResult !== 12) {
        return { success: false, error: "Please declare variable 'sumOutput' representing the call calculateSum(5, 7) yielding 12" };
      }
      return { success: true };
    },
    project: {
      name: "Matrix Weapon Calculator",
      tech: "JavaScript Function blueprints",
      desc: "A computational targeting system designed to sum plasma capacities."
    }
  },
  arrays: {
    level: 6,
    id: "arrays",
    title: "Mission 6: Storage Vaults (Arrays)",
    youtubeId: "9o4v6sI5vR0",
    concept: "Arrays are ordered lists of items. Each item occupies a slot corresponding to an index value, starting at index <code>0</code>.",
    analogy1: "Arrays are like pill organizers split into segments labeled Monday, Tuesday, Wednesday. Each box holds a dose. You fetch the pill by opening the exact day compartment you need.",
    analogy2: "Arrays are like train compartments linked together. The first cart is cart 0, the next is cart 1, and so on. You store passengers in each cart and call them by their cart index.",
    question: "Create an array named <code>roboTeam</code> containing three strings: <code>'Scout'</code>, <code>'Tank'</code>, <code>'Medic'</code>.",
    defaultCode: `// Write your array below\n`,
    validate: (code) => {
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      let team = null;
      try {
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              roboTeam: typeof roboTeam !== 'undefined' ? roboTeam : null
            };
          }
        `);
        const result = runFn(executionScope);
        team = result.roboTeam;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (!Array.isArray(team)) {
        return { success: false, error: "Please create an array named 'roboTeam'" };
      }
      if (team.length !== 3 || team[0] !== "Scout" || team[1] !== "Tank" || team[2] !== "Medic") {
        return { success: false, error: "Array must contain exactly 'Scout', 'Tank', and 'Medic' in order." };
      }
      return { success: true };
    },
    project: {
      name: "Tactical Squadron Coordinator",
      tech: "JavaScript Arrays",
      desc: "Manages squad deployment arrays, indexing team classifications."
    }
  },
  capstone: {
    level: 7,
    id: "capstone",
    title: "Final Battle: Mech Commander",
    youtubeId: "d9eS27E2Xps",
    concept: "You have arrived at the ultimate test. Combine variables, functions, and logic boundaries to command your Mech Warrior through a security matrix grid.",
    analogy1: "Think of this Capstone like launching a real spaceship. You have variables configuration, function booster activations, and safety switch checking. Bring them all together to complete the launch sequence!",
    analogy2: "Think of this final mission like conducting an orchestra. You have separate instrument arrays, variable volumes, and conditional solo bars. Harmonize them into a grand symphony!",
    question: "Initialize a variable <code>shieldEnergy</code> to <code>100</code>. Create a function <code>takeDamage(amount)</code> that subtracts <code>amount</code> from <code>shieldEnergy</code>. If <code>shieldEnergy</code> drops to <code>0</code> or below, return the string <code>'Destroyed'</code>, else return <code>'Active'</code>. Call <code>takeDamage(120)</code> and assign the result to <code>finalState</code>.",
    defaultCode: `// Write your capstone code below\n`,
    validate: (code) => {
      const clean = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim();
      let damageFn = null;
      let finalStateVal = null;
      try {
        const executionScope = {};
        const runFn = new Function('scope', `
          with(scope) {
            ${clean}
            return {
              takeDamage: typeof takeDamage !== 'undefined' ? takeDamage : null,
              finalState: typeof finalState !== 'undefined' ? finalState : null
            };
          }
        `);
        const result = runFn(executionScope);
        damageFn = result.takeDamage;
        finalStateVal = result.finalState;
      } catch (e) {
        return { success: false, error: e.message };
      }

      if (typeof damageFn !== "function") {
        return { success: false, error: "Please define a function 'takeDamage(amount)'" };
      }
      if (finalStateVal !== "Destroyed") {
        return { success: false, error: "Incorrect output. Calling takeDamage(120) when shield is 100 should reduce energy to -20 and return 'Destroyed'." };
      }
      return { success: true };
    },
    project: {
      name: "A.I. Core Battlemech System",
      tech: "JavaScript Full Stack Logic",
      desc: "Combines variables, condition checks, damage handlers, and interface states to pilot the ultimate battlemech."
    }
  }
};

// ==================== INITIALIZATION & ROUTING ====================

document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  initApplicationRouting();
  initAuthenticationFlows();
  initAvatarSelection();
  initDashboardSidebar();
  initCharts();
  initRoadmapNodes();
  initCodingArena();
  initRewardsSpin();
  initLeaderboard();
  initPortfolioResume();
  updateUIStats();
  
  // Render chosen avatar on initial load
  renderAvatarElement(STATE.avatarColor, document.getElementById("header-avatar-circle"));
});

// App-wide notification helper
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `app-toast ${type}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  
  // Slide in
  setTimeout(() => {
    toast.classList.add("visible");
  }, 100);
  
  // Remove after 3s
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Router between Landing, Auth, Avatar, Dashboard Views
function switchView(viewId) {
  const views = document.querySelectorAll(".view");
  views.forEach(v => {
    v.classList.remove("active");
    v.style.display = "none";
  });
  
  const targetView = document.getElementById(viewId);
  if (targetView) {
    if (viewId === "dashboard-layout") {
      targetView.style.display = "grid";
    } else {
      targetView.style.display = "flex";
    }
    setTimeout(() => {
      targetView.classList.add("active");
    }, 50);
  }
}

function initApplicationRouting() {
  // Landing Navigation Links
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Buttons triggers
  document.getElementById("btn-goto-login").addEventListener("click", () => {
    switchView("auth-view");
    toggleAuthTabs("tab-login");
  });

  document.getElementById("btn-goto-register").addEventListener("click", () => {
    switchView("auth-view");
    toggleAuthTabs("tab-register");
  });

  document.getElementById("btn-start-journey").addEventListener("click", () => {
    switchView("auth-view");
    toggleAuthTabs("tab-register");
  });

  // Watch Demo Video Modal
  const demoModal = document.getElementById("demo-modal");
  const watchDemoBtn = document.getElementById("btn-watch-demo");
  const closeDemoBtn = document.getElementById("btn-close-demo");
  const playSimBtn = document.getElementById("btn-play-sim-video");
  const subtitleBox = document.getElementById("sim-video-subtitles");

  watchDemoBtn.addEventListener("click", () => {
    demoModal.classList.add("active");
  });

  closeDemoBtn.addEventListener("click", () => {
    demoModal.classList.remove("active");
  });

  // Simulated Video Player
  playSimBtn.addEventListener("click", () => {
    playSimBtn.style.display = "none";
    showToast("Starting RoboQuest Video Simulator...", "success");
    
    // Simulate steps of subtitles
    const lines = [
      "Welcome to RoboQuest! The AI-Powered Gamified learning app.",
      "Explore high-fidelity visual coding worlds.",
      "Learn interactively with RoboGuide, your text-to-speech AI partner.",
      "Complete exercises, push code dynamically to GitHub, and earn rewards!",
      "Spin the lucky wheel, check daily login streaks, and download certified CVs."
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < lines.length) {
        subtitleBox.textContent = lines[step];
        step++;
      } else {
        clearInterval(interval);
        playSimBtn.style.display = "flex";
        subtitleBox.textContent = "Video walkthrough completed. Click to play again!";
        showToast("Demo video finished!", "success");
      }
    }, 3000);
  });
}

// ==================== AUTHENTICATION FLOWS (SIMULATED FIREBASE) ====================

function toggleAuthTabs(activeId) {
  const loginTab = document.getElementById("tab-login");
  const registerTab = document.getElementById("tab-register");
  const loginForm = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");

  if (activeId === "tab-login") {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  } else {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  }
}

function initAuthenticationFlows() {
  document.getElementById("tab-login").addEventListener("click", () => toggleAuthTabs("tab-login"));
  document.getElementById("tab-register").addEventListener("click", () => toggleAuthTabs("tab-register"));
  document.getElementById("link-goto-register").addEventListener("click", () => toggleAuthTabs("tab-register"));
  document.getElementById("link-goto-login").addEventListener("click", () => toggleAuthTabs("tab-login"));

  // Form password toggles
  document.getElementById("login-pass-toggle").addEventListener("click", () => {
    const input = document.getElementById("login-password");
    input.type = input.type === "password" ? "text" : "password";
  });

  document.getElementById("reg-pass-toggle").addEventListener("click", () => {
    const input = document.getElementById("reg-password");
    input.type = input.type === "password" ? "text" : "password";
  });

  // Simulated Submit Actions
  document.getElementById("form-login").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    STATE.nickname = email.split("@")[0];
    saveStateToStorage();
    showToast("Firebase Sign-In Successful!", "success");
    switchView("avatar-view");
  });

  document.getElementById("form-register").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    STATE.nickname = name;
    saveStateToStorage();
    showToast("Firebase Account Successfully Created!", "success");
    switchView("avatar-view");
  });

  // Google / GitHub POPUP Sign-In
  const googleBtns = [document.getElementById("btn-google-login"), document.getElementById("btn-google-register")];
  const githubBtns = [document.getElementById("btn-github-login"), document.getElementById("btn-github-register")];

  googleBtns.forEach(btn => {
    btn.addEventListener("click", () => triggerOAuthPopup("Google"));
  });

  githubBtns.forEach(btn => {
    btn.addEventListener("click", () => triggerOAuthPopup("GitHub"));
  });

  // Receive message from OAuth popup
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "OAUTH_SUCCESS") {
      STATE.nickname = event.data.username;
      saveStateToStorage();
      showToast(`Authenticated successfully via Firebase ${event.data.provider}!`, "success");
      switchView("avatar-view");
    }
  });
}

function triggerOAuthPopup(provider) {
  const width = 480;
  const height = 580;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  
  const popup = window.open("about:blank", "oauth_popup", `width=${width},height=${height},left=${left},top=${top}`);
  if (!popup) {
    showToast("Popup blocked by browser. Please enable popups.", "error");
    return;
  }

  // Inject beautiful styled picker into the popup window
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Firebase Auth - ${provider} Login</title>
      <meta charset="UTF-8">
      <style>
        body {
          background-color: #0b111e;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        .container {
          background-color: #121927;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 30px;
          width: 80%;
          max-width: 360px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .logo {
          font-size: 2.2rem;
          margin-bottom: 20px;
        }
        h2 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #00f2fe;
        }
        p {
          font-size: 0.85rem;
          color: #8b9bb4;
          margin-bottom: 25px;
        }
        .account-box {
          background: #0b111e;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 12px;
        }
        .account-box:hover {
          border-color: #00f2fe;
          background: #162238;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e94057;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
        }
        .details {
          text-align: left;
        }
        .name {
          font-size: 0.9rem;
          font-weight: bold;
        }
        .email {
          font-size: 0.75rem;
          color: #8b9bb4;
        }
        .cancel-btn {
          background: transparent;
          color: #e94057;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">${provider === "Google" ? "🎯" : "🐙"}</div>
        <h2>Sign in with ${provider}</h2>
        <p>Choose an account to proceed to RoboQuest Platform</p>
        
        <div class="account-box" id="acc-1">
          <div class="avatar" style="background:#00f2fe; color:#0c1020;">RC</div>
          <div class="details">
            <div class="name">RoboCoder Pro</div>
            <div class="email">robocoder.pro@gmail.com</div>
          </div>
        </div>

        <div class="account-box" id="acc-2">
          <div class="avatar" style="background:#e94057; color:#fff;">U</div>
          <div class="details">
            <div class="name">Unknown Explorer</div>
            <div class="email">explorer@gmail.com</div>
          </div>
        </div>

        <button class="cancel-btn" onclick="window.close()">Cancel</button>
      </div>

      <script>
        document.getElementById('acc-1').onclick = function() {
          window.opener.postMessage({
            type: 'OAUTH_SUCCESS',
            provider: '${provider}',
            username: 'RoboCoder'
          }, '*');
          window.close();
        };

        document.getElementById('acc-2').onclick = function() {
          window.opener.postMessage({
            type: 'OAUTH_SUCCESS',
            provider: '${provider}',
            username: 'UserExplorer'
          }, '*');
          window.close();
        };
      </script>
    </body>
    </html>
  `;
  popup.document.open();
  popup.document.write(htmlContent);
  popup.document.close();
}

// ==================== AVATAR SELECTION ====================

function initAvatarSelection() {
  const options = document.querySelectorAll(".avatar-option");
  options.forEach(opt => {
    opt.addEventListener("click", () => {
      options.forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      STATE.avatarColor = opt.getAttribute("data-color");
    });
  });

  document.getElementById("btn-confirm-avatar").addEventListener("click", () => {
    const nick = document.getElementById("avatar-nickname").value.trim();
    if (nick) {
      STATE.nickname = nick;
    }
    saveStateToStorage();
    
    // Switch View
    switchView("dashboard-layout");
    
    // Re-render avatar inside Dashboard elements
    renderAvatarElement(STATE.avatarColor, document.getElementById("header-avatar-circle"));
    renderAvatarElement(STATE.avatarColor, document.getElementById("coding-robot-avatar"));
    
    updateUIStats();
    showToast("Welcome to RoboQuest Dashboard!", "success");
    addActivityLog("🚀 Joined RoboQuest as " + STATE.nickname);
  });
}

// ==================== PROGRAMMATIC SVG AVATARS NATIVE RENDERING ====================

function renderAvatarElement(color, container) {
  if (!container) return;
  
  let hexColor = "#00f2fe"; // blue default
  if (color === "yellow") hexColor = "#f5af19";
  else if (color === "red") hexColor = "#ff4b2b";
  else if (color === "green") hexColor = "#38ef7d";
  else if (color === "purple") hexColor = "#8a2387";
  else if (color === "cyan") hexColor = "#00c6ff";

  container.innerHTML = `
    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
      <circle cx="50" cy="50" r="45" fill="#121b2d" stroke="${hexColor}" stroke-width="3"/>
      <rect x="30" y="30" width="40" height="30" rx="15" fill="#ffffff"/>
      <rect x="35" y="35" width="30" height="20" rx="10" fill="#000000"/>
      <circle cx="43" cy="45" r="4" fill="${hexColor}"/>
      <circle cx="57" cy="45" r="4" fill="${hexColor}"/>
      <path d="M40 70 C40 60, 60 60, 60 70 Z" fill="#ffffff"/>
    </svg>
  `;
}

// ==================== DASHBOARD PANEL SWITCHING & LOGS ====================

function initDashboardSidebar() {
  const menuBtns = document.querySelectorAll(".sidebar-menu .menu-btn");
  const panels = document.querySelectorAll(".panel");

  menuBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      menuBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const targetPanelId = btn.getAttribute("data-panel");
      panels.forEach(p => p.classList.remove("active"));
      
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
      
      // Perform sub-views initializations if needed
      if (targetPanelId === "dash-rewards-panel") {
        drawSpinWheel();
      }
    });
  });

  // Logout button
  document.getElementById("btn-logout").addEventListener("click", () => {
    STATE = { ...DEFAULT_STATE };
    saveStateToStorage();
    switchView("landing-view");
    showToast("Logged out successfully.", "info");
  });
}

function addActivityLog(text) {
  const list = document.getElementById("activities-feed-list");
  if (!list) return;
  const li = document.createElement("li");
  li.className = "feed-item";
  li.innerHTML = `
    <span class="feed-icon">💡</span>
    <div class="feed-details">
      <p class="feed-txt">${text}</p>
      <span class="feed-time">Just now</span>
    </div>
  `;
  list.insertBefore(li, list.firstChild);
  
  // Cap at 6 logs
  while (list.children.length > 6) {
    list.removeChild(list.lastChild);
  }
}

function updateUIStats() {
  // Update header counters
  const headerUsername = document.getElementById("header-username");
  if (headerUsername) headerUsername.textContent = STATE.nickname;

  const dashGreetingName = document.getElementById("dash-greeting-name");
  if (dashGreetingName) dashGreetingName.textContent = STATE.nickname;

  const statXpVal = document.getElementById("stat-xp-val");
  if (statXpVal) statXpVal.textContent = STATE.xp;

  const statCoinsVal = document.getElementById("stat-coins-val");
  if (statCoinsVal) statCoinsVal.textContent = STATE.coins;

  const statGemsVal = document.getElementById("stat-gems-val");
  if (statGemsVal) statGemsVal.textContent = STATE.gems;

  const statStreakVal = document.getElementById("stat-streak-val");
  if (statStreakVal) statStreakVal.textContent = STATE.streak;

  // Home metrics panels
  const homeStatMissions = document.getElementById("home-stat-missions");
  if (homeStatMissions) homeStatMissions.textContent = `${STATE.completedMissions.length} / 7`;

  const homeStatProjects = document.getElementById("home-stat-projects");
  if (homeStatProjects) homeStatProjects.textContent = STATE.pushedProjects.length;

  const homeStatCoins = document.getElementById("home-stat-coins");
  if (homeStatCoins) homeStatCoins.textContent = STATE.coins;

  // Leaderboard Row
  const leaderboardUserXp = document.getElementById("leaderboard-user-xp");
  if (leaderboardUserXp) leaderboardUserXp.textContent = `${STATE.xp} XP`;

  const userInlineName = document.querySelector(".user-inline-name");
  if (userInlineName) userInlineName.textContent = STATE.nickname;

  // Redraw charts since values modified
  drawUserGrowthChart();
}

// ==================== INTERACTIVE CANVAS CHARTS ====================

let growthCanvas = null;
let healthCanvas = null;

function initCharts() {
  growthCanvas = document.getElementById("userGrowthChart");
  healthCanvas = document.getElementById("systemHealthDonut");
  
  setTimeout(() => {
    drawUserGrowthChart();
    drawSystemHealthDonut();
  }, 100);
}

function drawUserGrowthChart() {
  if (!growthCanvas) return;
  const ctx = growthCanvas.getContext("2d");
  
  // Clear
  ctx.clearRect(0, 0, growthCanvas.width, growthCanvas.height);
  
  // Grid lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  const rows = 4;
  for (let i = 0; i <= rows; i++) {
    const y = 30 + (i * (growthCanvas.height - 70) / rows);
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(growthCanvas.width - 20, y);
    ctx.stroke();
  }

  // Draw months axis labels
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Now"];
  const xOffset = (growthCanvas.width - 70) / (months.length - 1);
  ctx.fillStyle = "#8b9bb4";
  ctx.font = "10px Inter";
  ctx.textAlign = "center";
  
  months.forEach((m, idx) => {
    const x = 40 + (idx * xOffset);
    ctx.fillText(m, x, growthCanvas.height - 15);
  });

  // Calculate points representing growth curve leading to the current user's XP
  const baseline = [100, 150, 120, 240, 200, 310];
  const userXPVal = STATE.xp;
  const points = [...baseline, userXPVal];
  
  // Find max for scaling
  const maxVal = Math.max(...points, 500) * 1.15;
  
  // Draw Area Gradient
  const gradArea = ctx.createLinearGradient(0, 0, 0, growthCanvas.height);
  gradArea.addColorStop(0, "rgba(0, 242, 254, 0.25)");
  gradArea.addColorStop(1, "rgba(138, 35, 135, 0)");
  
  ctx.beginPath();
  points.forEach((pt, idx) => {
    const x = 40 + (idx * xOffset);
    const y = growthCanvas.height - 40 - (pt / maxVal) * (growthCanvas.height - 70);
    if (idx === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.lineTo(40 + ((points.length - 1) * xOffset), growthCanvas.height - 40);
  ctx.lineTo(40, growthCanvas.height - 40);
  ctx.closePath();
  ctx.fillStyle = gradArea;
  ctx.fill();

  // Draw Path Line
  ctx.strokeStyle = "#00f2fe";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(0, 242, 254, 0.4)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  points.forEach((pt, idx) => {
    const x = 40 + (idx * xOffset);
    const y = growthCanvas.height - 40 - (pt / maxVal) * (growthCanvas.height - 70);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0; // reset

  // Draw Points circles
  ctx.fillStyle = "#ffffff";
  points.forEach((pt, idx) => {
    const x = 40 + (idx * xOffset);
    const y = growthCanvas.height - 40 - (pt / maxVal) * (growthCanvas.height - 70);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8a2387";
    ctx.stroke();
  });
}

function drawSystemHealthDonut() {
  if (!healthCanvas) return;
  const ctx = healthCanvas.getContext("2d");
  ctx.clearRect(0, 0, healthCanvas.width, healthCanvas.height);

  const cx = healthCanvas.width / 2;
  const cy = healthCanvas.height / 2;
  const radius = 45;

  // Background track
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Active arc (78% System Health)
  const grad = ctx.createLinearGradient(0, 0, healthCanvas.width, 0);
  grad.addColorStop(0, "#00f2fe");
  grad.addColorStop(1, "#38ef7d");

  ctx.strokeStyle = grad;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * 0.78));
  ctx.stroke();
}

// ==================== ROADMAP NODES CONTROLLER ====================

function initRoadmapNodes() {
  const nodes = document.querySelectorAll(".roadmap-node");
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      if (node.classList.contains("locked")) {
        showToast("Quest locked! Complete previous missions to unlock.", "error");
        return;
      }
      
      // Load selected topic to coding arena
      const topic = node.getAttribute("data-topic");
      loadCodingTopic(topic);
      
      // Switch view panel to Coding Arena panel
      document.querySelectorAll(".sidebar-menu .menu-btn").forEach(btn => {
        if (btn.getAttribute("data-panel") === "dash-coding-panel") {
          btn.click();
        }
      });
    });
  });

  updateRoadmapVisuals();
}

function updateRoadmapVisuals() {
  const count = STATE.completedMissions.length;
  // Node unlocks sequential progression
  for (let i = 1; i <= 7; i++) {
    const node = document.getElementById("node-" + i);
    if (!node) continue;
    
    const nodeLvl = parseInt(node.getAttribute("data-level"));
    if (nodeLvl <= count + 1) {
      node.classList.remove("locked");
      node.classList.add("active");
      
      // Label checks
      const statusLabel = node.querySelector(".node-status-lbl");
      if (nodeLvl <= count) {
        node.classList.add("completed");
        statusLabel.textContent = "Completed";
      } else {
        node.classList.remove("completed");
        statusLabel.textContent = "In Progress";
      }
      
      // Remove lock icon inside if present
      const circle = node.querySelector(".node-circle");
      if (circle && circle.querySelector(".node-lock")) {
        circle.innerHTML = `<span class="node-num">${i}</span>`;
      }
    } else {
      node.classList.add("locked");
      node.classList.remove("active");
      node.classList.remove("completed");
      const circle = node.querySelector(".node-circle");
      if (circle) circle.innerHTML = `<span class="node-lock">🔒</span>`;
    }
  }

  // Draw connecting lines gradient
  const activeLine = document.getElementById("roadmap-active-line");
  if (activeLine) {
    // Incrementally stroke connection based on progress percentage
    const percentage = Math.min((count / 6) * 100, 100);
    activeLine.style.strokeDashoffset = 1000 - (percentage * 10);
  }
}

// ==================== CODING ARENA BRAIN (TEXT-TO-SPEECH, CHECK-IN, INTERPRETER) ====================

let activeTopicKey = "variables";
let isAlternativeAnalogy = false;
let isAudioMuted = false;

function loadCodingTopic(key) {
  if (!SYLLABUS[key]) return;
  activeTopicKey = key;
  isAlternativeAnalogy = false;
  
  const data = SYLLABUS[key];
  document.getElementById("theory-title").textContent = data.title;
  document.getElementById("theory-text").innerHTML = data.concept + `<br><br><div class="analogy-card" style="border-left: 3px solid var(--color-cyan); padding-left: 15px; margin-top: 10px;"><strong>RoboGuide Analogy:</strong> <span id="current-analogy-txt">${data.analogy1}</span></div>`;
  document.getElementById("quest-question-prompt").innerHTML = `<strong>Current Mission Goal:</strong> ${data.question}`;
  document.getElementById("code-editor-textarea").value = data.defaultCode;

  // Clear Terminal
  document.getElementById("console-log-output").textContent = `> Loaded ${data.title}. Code editor ready.`;
  document.getElementById("btn-submit-code").disabled = true;
  document.getElementById("github-panel").style.display = "none";

  // Narration
  speakAnalogy(data.analogy1);
}

// Speech Synthesis function
function speakAnalogy(text) {
  if (isAudioMuted) return;
  
  // Stop current speech
  window.speechSynthesis.cancel();
  
  // Speech parameters setup
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, ""); // Strip potential HTML tags
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.1; // Smooth friendly tone
  
  // Attempt to select a smooth female/neutral voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Microsoft Zira") || v.lang === "en-US");
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  window.speechSynthesis.speak(utterance);
}

function initCodingArena() {
  // Voice Toggle click handler
  const btnVoice = document.getElementById("btn-toggle-voice");
  btnVoice.addEventListener("click", () => {
    isAudioMuted = !isAudioMuted;
    if (isAudioMuted) {
      btnVoice.classList.add("muted");
      document.getElementById("voice-icon").textContent = "🔇";
      window.speechSynthesis.cancel();
      showToast("RoboGuide audio muted.", "info");
    } else {
      btnVoice.classList.remove("muted");
      document.getElementById("voice-icon").textContent = "🔊";
      showToast("RoboGuide audio unmuted.", "success");
      // Re-trigger speech
      const data = SYLLABUS[activeTopicKey];
      if (data) {
        speakAnalogy(isAlternativeAnalogy ? data.analogy2 : data.analogy1);
      }
    }
  });

  // Replay speech btn
  document.getElementById("btn-replay-speech").addEventListener("click", () => {
    const data = SYLLABUS[activeTopicKey];
    if (data) {
      speakAnalogy(isAlternativeAnalogy ? data.analogy2 : data.analogy1);
    }
  });

  // YouTube Tutorial Popup Modal iframe loading
  document.getElementById("btn-popup-youtube").addEventListener("click", () => {
    const data = SYLLABUS[activeTopicKey];
    if (!data) return;
    
    // Spawns a floating modal directly enclosing YouTube Player
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    overlay.innerHTML = `
      <div class="modal-content video-modal">
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        <h3 class="modal-title">YouTube Reference Tutorial: ${data.title}</h3>
        <div class="video-container">
          <iframe width="100%" height="360" src="https://www.youtube.com/embed/${data.youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  });

  // Concept understanding check buttons feedback triggers
  const feedButtons = document.querySelectorAll(".cf-buttons button");
  feedButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-feedback");
      const data = SYLLABUS[activeTopicKey];
      if (!data) return;

      if (type === "full") {
        showToast("Awesome! Let's conquer the coding practice challenge on the right.", "success");
        addActivityLog("💡 Understood topic: " + data.title);
      } else {
        // Switch to alternative analogy and notify
        isAlternativeAnalogy = true;
        const analBox = document.getElementById("current-analogy-txt");
        if (analBox) {
          analBox.textContent = data.analogy2;
        }
        showToast("No problem! Let me explain with another everyday analogy.", "info");
        speakAnalogy(data.analogy2);
      }
    });
  });

  // Reset editor text
  document.getElementById("btn-reset-code").addEventListener("click", () => {
    const data = SYLLABUS[activeTopicKey];
    if (data) {
      document.getElementById("code-editor-textarea").value = data.defaultCode;
      document.getElementById("console-log-output").textContent = "> Sandbox code reset.";
    }
  });

  // Editor COPY PASTE DETECTOR event listeners
  const editorArea = document.getElementById("code-editor-textarea");
  editorArea.addEventListener("paste", (e) => {
    e.preventDefault(); // BLOCK PASTING ACTION Completely
    
    // Play Brahmins warning dialogue
    showTeluguMeme("copyPaste");
    addActivityLog("🚨 Copy-Paste alert triggered!");
  });

  // Run Test validator button
  document.getElementById("btn-run-code").addEventListener("click", () => {
    const code = editorArea.value;
    const data = SYLLABUS[activeTopicKey];
    if (!data) return;

    const logBox = document.getElementById("console-log-output");
    logBox.textContent = "> Compiling and executing test suite...\n";

    setTimeout(() => {
      const validation = data.validate(code);
      if (validation.success) {
        logBox.textContent += "✅ Test Cases Passed Successfully!\n";
        logBox.textContent += `Ready to submit ${data.title}.`;
        document.getElementById("btn-submit-code").disabled = false;
      } else {
        logBox.textContent += `❌ Validation Failed: ${validation.error}\n`;
      }
    }, 400);
  });

  // Submit Mission completed button
  document.getElementById("btn-submit-code").addEventListener("click", () => {
    const data = SYLLABUS[activeTopicKey];
    if (!data) return;
    
    const nodeLvl = data.level;
    // Add level index to completed array if not already present
    if (!STATE.completedMissions.includes(nodeLvl)) {
      STATE.completedMissions.push(nodeLvl);
      
      // Update statistics values
      STATE.xp += 150;
      STATE.coins += 50;
      STATE.tasksCompleted += 1;
      
      // Check Badge unlocks
      checkBadgeUnlocks();
    }

    saveStateToStorage();
    updateUIStats();
    updateRoadmapVisuals();
    
    // Enable GitHub Deployment panel
    document.getElementById("github-panel").style.display = "flex";
    document.getElementById("btn-submit-code").disabled = true;

    // Show Success Telugu Meme dialogue
    showTeluguMeme("success");
    addActivityLog("🏆 Conquered mission: " + data.title);
  });

  // Simulated Git Push to GitHub
  document.getElementById("btn-push-github").addEventListener("click", () => {
    const data = SYLLABUS[activeTopicKey];
    if (!data) return;

    const gitModal = document.getElementById("github-modal-popup");
    const terminalLogs = document.getElementById("git-terminal-logs");
    const barFill = document.getElementById("git-push-progress-fill");
    const closeBtn = document.getElementById("btn-close-git-modal");

    gitModal.classList.add("active");
    barFill.style.width = "0%";
    closeBtn.style.display = "none";
    
    terminalLogs.textContent = "$ git status\nOn branch main\nYour branch is up to date.\nChanges to be committed: index.js\n\n";

    // Progressive logs animation
    const logs = [
      "$ git add .",
      "$ git commit -m 'feat: complete " + data.title + " sandbox challenge'",
      "[main 8a2f39c] completed RoboQuest syllabus nodes",
      "$ git push -u origin main",
      "Connecting to GitHub remote gateway...",
      "Counting objects: 100% (5/5), done.",
      "Writing objects: 100% (3/3), 282 bytes, done.",
      "To github.com:" + STATE.nickname + "/RoboQuest-Deploy.git",
      " * [new branch]      main -> main",
      "Branch 'main' set up to track remote branch 'main' from 'origin'.",
      "\n🚀 REPOSITORY SUCCESSFULLY DEPLOYED TO GITHUB WEB DIRECTORY!"
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logs.length) {
        terminalLogs.textContent += logs[step] + "\n";
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
        
        // Progress bar increment
        const perc = ((step + 1) / logs.length) * 100;
        barFill.style.width = `${perc}%`;
        
        step++;
      } else {
        clearInterval(interval);
        closeBtn.style.display = "block";
        
        // Save project into portfolio
        const projName = data.project.name;
        const exists = STATE.pushedProjects.some(p => p.name === projName);
        if (!exists) {
          STATE.pushedProjects.push({
            name: projName,
            tech: data.project.tech,
            desc: data.project.desc,
            date: new Date().toLocaleDateString(),
            url: `https://github.com/${STATE.nickname}/${projName.toLowerCase().replace(/ /g, "-")}`
          });
          saveStateToStorage();
          updateUIStats();
          renderPortfolioProjectsList();
        }
        
        showToast("Project successfully uploaded to GitHub!", "success");
        addActivityLog("📁 Pushed " + projName + " to GitHub Repository");
      }
    }, 700);

    closeBtn.onclick = () => {
      gitModal.classList.remove("active");
    };
  });
}

// ==================== TELUGU MEME DISPLAY SYSTEMS ====================

function showTeluguMeme(category) {
  const dataset = MEMES[category];
  if (!dataset || dataset.length === 0) return;

  const randomIndex = Math.floor(Math.random() * dataset.length);
  const meme = dataset[randomIndex];

  const modal = document.getElementById("meme-modal-popup");
  const modalContainer = document.getElementById("meme-modal-card");
  const badge = document.getElementById("meme-badge-type");
  const teluguQuote = document.getElementById("meme-telugu-text");
  const englishQuote = document.getElementById("meme-english-text");
  const visualEmoji = document.getElementById("meme-visual-emoji");
  const details = document.getElementById("meme-scene-details");
  const ackBtn = document.getElementById("btn-acknowledge-meme");

  // Load Content
  badge.textContent = category === "copyPaste" ? "COPY-PASTE DETECTED 🚨" : "MISSION SUCCESSFUL 🏆";
  teluguQuote.textContent = meme.quoteTelugu;
  englishQuote.textContent = meme.quoteEnglish;
  visualEmoji.textContent = meme.emoji;
  details.textContent = meme.description;
  modalContainer.style.background = meme.gradient;

  if (category === "copyPaste") {
    ackBtn.textContent = "Okay, I Promise to Code 👨‍💻";
  } else {
    ackBtn.textContent = "Thokkukuntu Povaley! 🔥";
  }

  // Display
  modal.classList.add("active");

  ackBtn.onclick = () => {
    modal.classList.remove("active");
  };
  document.getElementById("btn-close-meme").onclick = () => {
    modal.classList.remove("active");
  };
}

// ==================== REWARDS & SPIN (CANVAS WHEEL PHYSICS) ====================

const WHEEL_SECTORS = [
  { label: "150 Coins", color: "#8a2387", value: { type: "coins", amount: 150 } },
  { label: "50 Gems", color: "#e94057", value: { type: "gems", amount: 50 } },
  { label: "100 XP Boost", color: "#f5af19", value: { type: "xp", amount: 100 } },
  { label: "Telugu Meme Box", color: "#11998e", value: { type: "meme", amount: 0 } },
  { label: "150 Coins", color: "#38ef7d", value: { type: "coins", amount: 150 } },
  { label: "20 Gems", color: "#00f2fe", value: { type: "gems", amount: 20 } }
];

let spinAngle = 0;
let isSpinning = false;

function drawSpinWheel() {
  const canvas = document.getElementById("luckySpinWheelCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const arc = (Math.PI * 2) / WHEEL_SECTORS.length;

  WHEEL_SECTORS.forEach((sec, idx) => {
    const angle = spinAngle + idx * arc;
    ctx.fillStyle = sec.color;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + arc);
    ctx.closePath();
    ctx.fill();

    // Text labels
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px Inter";
    ctx.textAlign = "right";
    ctx.translate(cx, cy);
    ctx.rotate(angle + arc / 2);
    ctx.fillText(sec.label, radius - 15, 4);
    ctx.restore();
  });

  // Inner center cover
  ctx.fillStyle = "#0c1020";
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#00f2fe";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function initRewardsSpin() {
  const spinBtn = document.getElementById("btn-spin-wheel");
  
  // Daily Streak Claim
  document.getElementById("btn-claim-streak").addEventListener("click", () => {
    const todayStr = new Date().toDateString();
    if (STATE.lastStreakClaim === todayStr) {
      showToast("Daily reward already claimed today!", "error");
      return;
    }
    
    // Check if streak was yesterday to increment, otherwise reset to 1
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (STATE.lastStreakClaim === yesterdayStr) {
      STATE.streak += 1;
    } else {
      STATE.streak = 1;
    }

    STATE.lastStreakClaim = todayStr;
    STATE.coins += 100;
    STATE.xp += 50;

    // Day drop logic: if streak hits 7, give diamond
    const dayIndex = STATE.streak % 7;
    const targetDay = dayIndex === 0 ? 7 : dayIndex;

    if (targetDay === 7) {
      STATE.gems += 15; // Give diamond equivalent gem drop
      showToast("7 Days Login Streak Conquered! Received 15 Gems diamond drop 💎!", "success");
    }

    saveStateToStorage();
    updateUIStats();
    updateStreakCalendar();
    showToast("Successfully claimed daily log reward! (+100 Coins, +50 XP)", "success");
    addActivityLog("🔥 Claimed daily login reward. Streak: " + STATE.streak);
  });

  // Wheel Spin trigger
  spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    if (STATE.spinCount <= 0) {
      showToast("No Spins remaining! Complete 5 tasks or projects to obtain a lucky spin.", "error");
      return;
    }

    isSpinning = true;
    STATE.spinCount -= 1;
    updateSpinBtnLabel();

    let spinVelocity = 0.4 + Math.random() * 0.3; // Initial angular speed
    const friction = 0.985; // slowdown speed
    
    const spinTimer = setInterval(() => {
      spinAngle += spinVelocity;
      drawSpinWheel();
      
      spinVelocity *= friction;
      
      if (spinVelocity < 0.002) {
        clearInterval(spinTimer);
        isSpinning = false;
        
        // Calculate which sector the indicator is pointing to (at top, -Math.PI / 2)
        const totalSectors = WHEEL_SECTORS.length;
        const sectorArc = (Math.PI * 2) / totalSectors;
        
        // Normalize angle to 0 - 2PI
        let normalizedAngle = (Math.PI * 2 - (spinAngle % (Math.PI * 2))) % (Math.PI * 2);
        // Compensate pointer position (top center points to -90 deg)
        let indicatorAngle = (normalizedAngle + Math.PI / 2) % (Math.PI * 2);
        
        const winningIndex = Math.floor(indicatorAngle / sectorArc) % totalSectors;
        const reward = WHEEL_SECTORS[winningIndex];

        // Process reward
        if (reward.value.type === "coins") {
          STATE.coins += reward.value.amount;
        } else if (reward.value.type === "gems") {
          STATE.gems += reward.value.amount;
        } else if (reward.value.type === "xp") {
          STATE.xp += reward.value.amount;
        }
        
        saveStateToStorage();
        updateUIStats();
        
        if (reward.value.type === "meme") {
          showTeluguMeme("success");
          showToast("Lucky Spin Won: Telugu Programming Meme Box!", "success");
        } else {
          showToast(`Lucky Spin Won: ${reward.label}!`, "success");
        }
        
        addActivityLog("🎡 Spun the Lucky Wheel and won: " + reward.label);
      }
    }, 15);
  });

  updateStreakCalendar();
  updateSpinBtnLabel();
}

function updateStreakCalendar() {
  const streakContainer = document.getElementById("streak-days-container");
  if (!streakContainer) return;
  const days = streakContainer.querySelectorAll(".streak-day");
  
  const dayIndex = STATE.streak % 7;
  const currentActiveIdx = dayIndex === 0 ? 7 : dayIndex;

  days.forEach((day, idx) => {
    const dayNum = idx + 1;
    day.classList.remove("completed");
    
    const statusSpan = day.querySelector(".sd-status");
    if (dayNum < currentActiveIdx) {
      day.classList.add("completed");
      statusSpan.textContent = "✅";
    } else if (dayNum === currentActiveIdx) {
      if (STATE.lastStreakClaim === new Date().toDateString()) {
        day.classList.add("completed");
        statusSpan.textContent = "✅";
      } else {
        statusSpan.textContent = "⏳";
      }
    } else {
      if (dayNum === 7) statusSpan.textContent = "💎";
      else statusSpan.textContent = "❌";
    }
  });

  // Open Mystery Chest reward status bar
  const chestProgressText = document.getElementById("chest-progress-text");
  const chestProgressFill = document.getElementById("chest-progress-fill");
  
  const count = STATE.tasksCompleted % 5;
  const rem = 5 - count;

  if (rem === 5 && STATE.tasksCompleted > 0) {
    if (chestProgressText) chestProgressText.textContent = "Treasure chest ready to unlock! Click on the chest.";
    if (chestProgressFill) chestProgressFill.style.width = "100%";
    
    // Bind click trigger once ready
    const chestBox = document.getElementById("chest-box-interactive");
    if (chestBox) {
      chestBox.innerHTML = "🎁✨";
      
      chestBox.onclick = () => {
        STATE.coins += 200;
        STATE.gems += 10;
        STATE.spinCount += 1;
        STATE.tasksCompleted = 0; // reset counter
        
        saveStateToStorage();
        updateUIStats();
        updateStreakCalendar();
        updateSpinBtnLabel();
        
        chestBox.innerHTML = "📭 Open";
        chestBox.onclick = null;
        
        showToast("Opened Mystery Chest! Won: +200 Coins, +10 Gems, +1 Lucky Spin", "success");
        addActivityLog("🎁 Opened a Mystery Treasure Chest!");
      };
    }
  } else {
    if (chestProgressText) chestProgressText.textContent = `Complete ${rem} more tasks to unlock`;
    const perc = (count / 5) * 100;
    if (chestProgressFill) chestProgressFill.style.width = `${perc}%`;
    const chestBox = document.getElementById("chest-box-interactive");
    if (chestBox) {
      chestBox.innerHTML = "🎁";
      chestBox.onclick = null;
    }
  }
}

function updateSpinBtnLabel() {
  const spinBtn = document.getElementById("btn-spin-wheel");
  if (spinBtn) {
    spinBtn.textContent = `Spin Now (${STATE.spinCount})`;
    spinBtn.disabled = STATE.spinCount <= 0;
  }
}

// ==================== BADGE ACCUMULATIONS CHECKER ====================

function checkBadgeUnlocks() {
  const completedCount = STATE.completedMissions.length;

  if (completedCount >= 1) {
    unlockBadgeVisual("badge-vars");
  }
  if (completedCount >= 2) {
    unlockBadgeVisual("badge-types");
  }
  if (completedCount >= 4) {
    unlockBadgeVisual("badge-loops");
  }
  if (STATE.pushedProjects.length >= 3) {
    unlockBadgeVisual("badge-git");
  }
  if (completedCount >= 7) {
    unlockBadgeVisual("badge-champion");
    
    // Unlock Certificate download trigger
    const printBtn = document.getElementById("btn-print-certificate");
    printBtn.disabled = false;
    
    const label = document.getElementById("cert-status-label");
    label.className = "cert-status-badge unlocked";
    label.textContent = "Unlocked (7/7 Missions Completed)";
  }
}

function unlockBadgeVisual(id) {
  const card = document.getElementById(id);
  if (card && card.classList.contains("locked")) {
    card.classList.remove("locked");
    // Append inner neon glow wrapper
    const glow = document.createElement("div");
    glow.className = "bc-glow";
    card.appendChild(glow);
    showToast(`🏆 Badge Unlocked: ${card.querySelector("h4").textContent}!`, "success");
  }
}

// ==================== LEADERBOARD DISPLAY DATA ====================

const MOCK_LEADERBOARD = [
  { name: "AlgorithmKing", color: "yellow", label: "Yellow", missions: 7, xp: 14800 },
  { name: "ByteBasher", color: "red", label: "Red", missions: 6, xp: 11200 },
  { name: "StackOgre", color: "green", label: "Green", missions: 5, xp: 9850 }
];

function initLeaderboard() {
  const tbody = document.getElementById("leaderboard-tbody-list");
  if (!tbody) return;

  // Render mock records list alongside actual user
  const renderList = () => {
    // Sort combined list
    const userRow = {
      name: `You (${STATE.nickname})`,
      color: STATE.avatarColor,
      label: STATE.avatarColor.charAt(0).toUpperCase() + STATE.avatarColor.slice(1),
      missions: STATE.completedMissions.length,
      xp: STATE.xp,
      isUser: true
    };
    
    const combined = [...MOCK_LEADERBOARD, userRow].sort((a, b) => b.xp - a.xp);
    
    tbody.innerHTML = "";
    
    combined.forEach((player, index) => {
      const rank = index + 1;
      const row = document.createElement("tr");
      row.className = `leaderboard-row ${player.isUser ? 'highlight-current' : ''}`;
      
      let avatarDotColor = "#00f2fe"; // blue
      if (player.color === "yellow") avatarDotColor = "#f5af19";
      else if (player.color === "red") avatarDotColor = "#ff4b2b";
      else if (player.color === "green") avatarDotColor = "#38ef7d";
      else if (player.color === "purple") avatarDotColor = "#8a2387";
      else if (player.color === "cyan") avatarDotColor = "#00c6ff";

      row.innerHTML = `
        <td>${rank}</td>
        <td>${player.name}</td>
        <td><span class="l-avatar-dot" style="background:${avatarDotColor};"></span> ${player.label}</td>
        <td>${player.missions} / 7</td>
        <td class="bold-xp">${player.xp} XP</td>
      `;
      tbody.appendChild(row);
    });
  };

  renderList();
  // Bind simple update trigger whenever view opens
  const leadBtn = document.querySelector(".sidebar-menu button[data-panel='dash-leaderboard-panel']");
  leadBtn.addEventListener("click", renderList);
}

// ==================== PORTFOLIO & CV GENERATOR (NATIVE DYNAMIC PREVIEW) ====================

function initPortfolioResume() {
  const printBtn = document.getElementById("btn-print-certificate");

  // Print Action
  printBtn.addEventListener("click", () => {
    // Set dynamic variables in the print template
    document.getElementById("cert-print-name").textContent = STATE.nickname;
    document.getElementById("cert-print-id").textContent = `RQ-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    document.getElementById("cert-date-text").textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    window.print();
  });

  // CV Live Builder keyup triggers
  const cvInputs = ["cv-full-name", "cv-title", "cv-email", "cv-skills"];
  cvInputs.forEach(id => {
    document.getElementById(id).addEventListener("input", updateCVPreview);
  });

  updateCVPreview();
  renderPortfolioProjectsList();
  
  // Check badge on load
  checkBadgeUnlocks();
}

function updateCVPreview() {
  const name = document.getElementById("cv-full-name").value;
  const title = document.getElementById("cv-title").value;
  const email = document.getElementById("cv-email").value;
  const skills = document.getElementById("cv-skills").value;

  const preview = document.getElementById("cv-preview-output");
  if (!preview) return;

  // Build list of completed projects HTML
  let projectsHtml = "";
  if (STATE.pushedProjects.length === 0) {
    projectsHtml = "<p style='font-size:0.75rem; color:#888;'>No capstone projects pushed yet. Push coding exercise repositories to build portfolio.</p>";
  } else {
    projectsHtml = `<div class="cv-projects-list">`;
    STATE.pushedProjects.forEach(p => {
      projectsHtml += `
        <div class="cvp-item">
          <div class="cvp-title-row">
            <span>${p.name}</span>
            <span>${p.date}</span>
          </div>
          <div style="font-size:0.75rem; color:#777; font-weight: 600;">${p.tech}</div>
          <div class="cvp-desc">${p.desc}</div>
        </div>
      `;
    });
    projectsHtml += `</div>`;
  }

  preview.innerHTML = `
    <div class="cv-preview-header">
      <div>
        <div class="cvh-name">${name}</div>
        <div class="cvh-title">${title}</div>
      </div>
      <div class="cvh-contacts">
        <div>Email: ${email}</div>
        <div>Badge Count: ${STATE.completedMissions.length} achievements</div>
        <div>Experience Rank: ${STATE.xp} XP</div>
      </div>
    </div>

    <div class="cv-section-title">Professional Skillsets</div>
    <div style="font-size:0.8rem; line-height:1.4; color:#444;">${skills}</div>

    <div class="cv-section-title">RoboQuest Capstone Projects</div>
    ${projectsHtml}
  `;
}

function renderPortfolioProjectsList() {
  const list = document.getElementById("portfolio-projects-list");
  if (!list) return;

  if (STATE.pushedProjects.length === 0) {
    list.innerHTML = `
      <div class="empty-projects-log">
        No active projects pushed yet. Solve Coding Arena challenges and push repositories!
      </div>
    `;
    return;
  }

  list.innerHTML = "";
  STATE.pushedProjects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-item-card";
    card.innerHTML = `
      <div class="pic-details">
        <span class="pic-name">${p.name}</span>
        <span class="pic-tech">${p.tech}</span>
      </div>
      <a href="${p.url}" target="_blank" class="btn-github-link">View Repo</a>
    `;
    list.appendChild(card);
  });
}
