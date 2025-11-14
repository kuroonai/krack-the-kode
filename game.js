// Krack the Kode Game Logic
// Author: Kuroonai

class KrackTheKode {
    constructor() {
        this.settings = {
            codeLength: 4,
            maxTries: 10,
            soundEnabled: true,
            musicEnabled: true,
            allowDuplicates: false
        };
        
        this.gameState = {
            mode: null, // 'single' or 'two'
            currentPlayer: 1,
            secretCode: [],
            currentGuess: [],
            attempts: [],
            triesLeft: 10,
            undosLeft: 3,
            score: 0,
            baseScore: 0,
            startTime: null,
            isPlaying: false,
            player1Code: [],
            player2Code: [],
            player1Score: 0,
            player2Score: 0,
            player1Tries: 0,
            player2Tries: 0,
            player1Time: 0,
            player2Time: 0,
            player1Won: false,
            player2Won: false,
            player1Attempts: [],
            player2Attempts: []
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSettings();
        this.initAudio();
    }
    
    setupEventListeners() {
        // Settings listeners
        const codeLength = document.getElementById('codeLength');
        const maxTries = document.getElementById('maxTries');
        
        if (codeLength) {
            codeLength.addEventListener('input', (e) => {
                document.getElementById('codeLengthValue').textContent = e.target.value;
                this.settings.codeLength = parseInt(e.target.value);
                this.saveSettings();
            });
        }
        
        if (maxTries) {
            maxTries.addEventListener('input', (e) => {
                document.getElementById('maxTriesValue').textContent = e.target.value;
                this.settings.maxTries = parseInt(e.target.value);
                this.saveSettings();
            });
        }
        
        // Sound and music toggles
        const soundToggle = document.getElementById('soundToggle');
        const musicToggle = document.getElementById('musicToggle');
        
        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                this.settings.soundEnabled = e.target.checked;
                this.saveSettings();
            });
        }
        
        if (musicToggle) {
            musicToggle.addEventListener('change', (e) => {
                this.settings.musicEnabled = e.target.checked;
                this.saveSettings();
                if (e.target.checked && this.gameState.isPlaying) {
                    this.playBackgroundMusic();
                } else {
                    this.stopBackgroundMusic();
                }
            });
        }
        
        // Duplicate toggle
        const duplicateToggle = document.getElementById('allowDuplicates');
        if (duplicateToggle) {
            duplicateToggle.addEventListener('change', (e) => {
                this.settings.allowDuplicates = e.target.checked;
                this.saveSettings();
            });
        }
        
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (this.gameState.isPlaying && !isNaN(e.key) && e.key >= 0 && e.key <= 9) {
                this.addDigit(parseInt(e.key));
            } else if (e.key === 'Enter' && this.gameState.isPlaying) {
                this.submitGuess();
            } else if (e.key === 'Backspace' && this.gameState.isPlaying) {
                this.deleteDigit();
            }
        });
    }
    
    initAudio() {
        // Create audio context for dynamic music
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Placeholder for actual audio implementation
        // In production, you would load actual audio files
        this.sounds = {
            click: this.createClickSound(),
            success: this.createSuccessSound(),
            fail: this.createFailSound(),
            background: this.createBackgroundMusic()
        };
    }
    
    createClickSound() {
        return () => {
            if (!this.settings.soundEnabled) return;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }
    
    createSuccessSound() {
        return () => {
            if (!this.settings.soundEnabled) return;
            const notes = [523.25, 659.25, 783.99]; // C, E, G
            notes.forEach((freq, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                const startTime = this.audioContext.currentTime + (index * 0.1);
                gainNode.gain.setValueAtTime(0.3, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + 0.2);
            });
        };
    }
    
    createFailSound() {
        return () => {
            if (!this.settings.soundEnabled) return;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 200;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }
    
    createBackgroundMusic() {
        // Simplified background music generator
        let musicInterval;
        
        const playNote = () => {
            if (!this.settings.musicEnabled || !this.gameState.isPlaying) return;
            
            const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
            const note = scale[Math.floor(Math.random() * scale.length)];
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = note;
            oscillator.type = 'triangle';
            
            const intensity = this.gameState.triesLeft / this.settings.maxTries;
            gainNode.gain.setValueAtTime(0.05 * intensity, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 1);
        };
        
        return {
            start: () => {
                musicInterval = setInterval(playNote, 500);
            },
            stop: () => {
                clearInterval(musicInterval);
            }
        };
    }
    
    playBackgroundMusic() {
        if (this.settings.musicEnabled && this.sounds.background) {
            this.sounds.background.start();
        }
    }
    
    stopBackgroundMusic() {
        if (this.sounds.background) {
            this.sounds.background.stop();
        }
    }
    
    loadSettings() {
        const saved = localStorage.getItem('krackTheKodeSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.updateSettingsUI();
        }
    }
    
    saveSettings() {
        localStorage.setItem('krackTheKodeSettings', JSON.stringify(this.settings));
    }
    
    updateSettingsUI() {
        document.getElementById('codeLength').value = this.settings.codeLength;
        document.getElementById('codeLengthValue').textContent = this.settings.codeLength;
        document.getElementById('maxTries').value = this.settings.maxTries;
        document.getElementById('maxTriesValue').textContent = this.settings.maxTries;
        document.getElementById('soundToggle').checked = this.settings.soundEnabled;
        document.getElementById('musicToggle').checked = this.settings.musicEnabled;
        document.getElementById('allowDuplicates').checked = this.settings.allowDuplicates;
    }
    
    // Screen Navigation
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    showMainMenu() {
        this.stopBackgroundMusic();
        this.gameState.isPlaying = false;
        this.showScreen('mainMenu');
    }
    
    showSettings() {
        this.showScreen('settingsScreen');
    }
    
    showInstructions() {
        this.showScreen('instructionsScreen');
    }
    
    // Game Logic
    generateSecretCode() {
        const code = [];
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        for (let i = 0; i < this.settings.codeLength; i++) {
            if (this.settings.allowDuplicates) {
                code.push(Math.floor(Math.random() * 10));
            } else {
                const index = Math.floor(Math.random() * digits.length);
                code.push(digits.splice(index, 1)[0]);
            }
        }
        
        return code;
    }
    
    startSinglePlayer() {
        this.gameState = {
            ...this.gameState,
            mode: 'single',
            secretCode: this.generateSecretCode(),
            currentGuess: [],
            attempts: [],
            triesLeft: this.settings.maxTries,
            undosLeft: 3,
            score: this.gameState.baseScore || 0,
            startTime: Date.now(),
            isPlaying: true
        };

        // Hide player indicator in single player mode
        const playerIndicator = document.getElementById('currentPlayerIndicator');
        if (playerIndicator) {
            playerIndicator.style.display = 'none';
        }

        console.log('Secret code:', this.gameState.secretCode); // For debugging
        this.showScreen('gameScreen');
        this.updateGameUI();
        this.playBackgroundMusic();
    }
    
    startTwoPlayer() {
        this.gameState = {
            ...this.gameState,
            mode: 'two',
            currentPlayer: 1,
            player1Code: [],
            player2Code: [],
            player1Score: 0,
            player2Score: 0,
            player1Tries: 0,
            player2Tries: 0,
            player1Time: 0,
            player2Time: 0,
            player1Won: false,
            player2Won: false,
            player1Attempts: [],
            player2Attempts: [],
            isPlaying: false
        };

        this.showScreen('twoPlayerSetup');
        this.updatePlayerCodeDisplay(1);
    }
    
    addDigit(digit) {
        if (!this.gameState.isPlaying) return;
        
        if (this.gameState.currentGuess.length < this.settings.codeLength) {
            if (!this.settings.allowDuplicates && this.gameState.currentGuess.includes(digit)) {
                // Show error - digit already used
                this.shakeCurrentGuess();
                return;
            }
            
            this.gameState.currentGuess.push(digit);
            this.sounds.click();
            this.updateCurrentGuessDisplay();
        }
    }
    
    deleteDigit() {
        if (this.gameState.currentGuess.length > 0) {
            this.gameState.currentGuess.pop();
            this.sounds.click();
            this.updateCurrentGuessDisplay();
        }
    }
    
    clearGuess() {
        this.gameState.currentGuess = [];
        this.sounds.click();
        this.updateCurrentGuessDisplay();
    }
    
    submitGuess() {
        if (this.gameState.currentGuess.length !== this.settings.codeLength) {
            this.shakeCurrentGuess();
            return;
        }
        
        const result = this.evaluateGuess(this.gameState.currentGuess, this.gameState.secretCode);
        
        this.gameState.attempts.push({
            guess: [...this.gameState.currentGuess],
            result: result
        });
        
        this.gameState.triesLeft--;
        
        // Check for win
        if (result.every(r => r === 'correct')) {
            this.handleVictory();
        } else if (this.gameState.triesLeft === 0) {
            this.handleGameOver();
        } else {
            this.gameState.currentGuess = [];
            this.updateGameUI();
        }
    }
    
    evaluateGuess(guess, code) {
        const result = [];
        const codeCopy = [...code];
        const guessCopy = [...guess];
        
        // First pass: check for correct positions
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === code[i]) {
                result[i] = 'correct';
                codeCopy[i] = null;
                guessCopy[i] = null;
            }
        }
        
        // Second pass: check for present but wrong position
        for (let i = 0; i < guess.length; i++) {
            if (guessCopy[i] !== null) {
                const index = codeCopy.indexOf(guessCopy[i]);
                if (index !== -1) {
                    result[i] = 'present';
                    codeCopy[index] = null;
                } else {
                    result[i] = 'wrong';
                }
            }
        }
        
        return result;
    }
    
    undo() {
        if (this.gameState.undosLeft > 0 && this.gameState.attempts.length > 0) {
            this.gameState.attempts.pop();
            this.gameState.triesLeft++;
            this.gameState.undosLeft--;
            this.updateGameUI();
            this.sounds.click();
        }
    }
    
    calculateScore() {
        const basePoints = 1000;
        const triesBonus = this.gameState.triesLeft * 200;
        const timeElapsed = (Date.now() - this.gameState.startTime) / 1000;
        const timeBonus = Math.max(0, Math.floor(1000 - timeElapsed * 10));
        
        return this.gameState.score + basePoints + triesBonus + timeBonus;
    }
    
    handleVictory() {
        if (this.gameState.mode === 'two') {
            this.handleTwoPlayerVictory();
            return;
        }

        this.gameState.isPlaying = false;
        this.stopBackgroundMusic();
        this.sounds.success();

        const finalScore = this.calculateScore();
        const timeElapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);

        document.getElementById('crackedCode').textContent = this.gameState.secretCode.join('');
        document.getElementById('triesUsed').textContent = this.settings.maxTries - this.gameState.triesLeft;
        document.getElementById('timeElapsed').textContent = `${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`;
        document.getElementById('finalScore').textContent = finalScore;

        this.showScreen('victoryScreen');
    }

    handleGameOver() {
        if (this.gameState.mode === 'two') {
            this.handleTwoPlayerGameOver();
            return;
        }

        this.gameState.isPlaying = false;
        this.stopBackgroundMusic();
        this.sounds.fail();

        document.getElementById('revealedCode').textContent = this.gameState.secretCode.join('');
        this.showScreen('gameOverScreen');
    }
    
    playAgain() {
        this.gameState.baseScore = 0;
        this.startSinglePlayer();
    }
    
    continueWithScore() {
        this.gameState.baseScore = this.calculateScore();
        this.startSinglePlayer();
    }
    
    // UI Updates
    updateGameUI() {
        document.getElementById('currentScore').textContent = this.gameState.score;
        document.getElementById('triesLeft').textContent = this.gameState.triesLeft;
        document.getElementById('undoCount').textContent = `(${this.gameState.undosLeft})`;
        
        // Update life bar
        const lifePercent = (this.gameState.triesLeft / this.settings.maxTries) * 100;
        document.getElementById('lifeBarFill').style.width = `${lifePercent}%`;
        
        // Update undo button state
        const undoBtn = document.getElementById('undoBtn');
        undoBtn.disabled = this.gameState.undosLeft === 0 || this.gameState.attempts.length === 0;
        
        // Update attempts display
        this.updateAttemptsDisplay();
        this.updateCurrentGuessDisplay();
    }
    
    updateAttemptsDisplay() {
        const container = document.getElementById('attemptsContainer');
        container.innerHTML = '';
        
        this.gameState.attempts.forEach(attempt => {
            const row = document.createElement('div');
            row.className = 'attempt-row';
            
            attempt.guess.forEach((digit, index) => {
                const digitBox = document.createElement('div');
                digitBox.className = `digit-box ${attempt.result[index]}`;
                digitBox.textContent = digit;
                row.appendChild(digitBox);
            });
            
            container.appendChild(row);
        });
        
        container.scrollTop = container.scrollHeight;
    }
    
    updateCurrentGuessDisplay() {
        const display = document.getElementById('currentGuess');
        display.innerHTML = '';
        
        for (let i = 0; i < this.settings.codeLength; i++) {
            const digitBox = document.createElement('div');
            digitBox.className = 'guess-digit';
            
            if (i < this.gameState.currentGuess.length) {
                digitBox.textContent = this.gameState.currentGuess[i];
            } else {
                digitBox.classList.add('empty');
            }
            
            display.appendChild(digitBox);
        }
    }
    
    shakeCurrentGuess() {
        const display = document.getElementById('currentGuess');
        display.classList.add('shake');
        setTimeout(() => display.classList.remove('shake'), 300);
    }
    
    // Two Player Mode
    addPlayerCode(player, digit) {
        const code = player === 1 ? this.gameState.player1Code : this.gameState.player2Code;
        
        if (code.length < this.settings.codeLength) {
            if (!this.settings.allowDuplicates && code.includes(digit)) {
                return;
            }
            
            code.push(digit);
            this.sounds.click();
            this.updatePlayerCodeDisplay(player);
        }
    }
    
    deletePlayerCode(player) {
        const code = player === 1 ? this.gameState.player1Code : this.gameState.player2Code;
        if (code.length > 0) {
            code.pop();
            this.sounds.click();
            this.updatePlayerCodeDisplay(player);
        }
    }
    
    clearPlayerCode(player) {
        if (player === 1) {
            this.gameState.player1Code = [];
        } else {
            this.gameState.player2Code = [];
        }
        this.sounds.click();
        this.updatePlayerCodeDisplay(player);
    }
    
    updatePlayerCodeDisplay(player) {
        const display = document.getElementById(`player${player}Code`);
        const code = player === 1 ? this.gameState.player1Code : this.gameState.player2Code;
        
        display.innerHTML = '';
        for (let i = 0; i < this.settings.codeLength; i++) {
            const digitBox = document.createElement('div');
            digitBox.className = 'guess-digit';
            
            if (i < code.length) {
                digitBox.textContent = '•'; // Hide the actual digit
            } else {
                digitBox.classList.add('empty');
            }
            
            display.appendChild(digitBox);
        }
    }
    
    confirmPlayer1Code() {
        if (this.gameState.player1Code.length === this.settings.codeLength) {
            this.sounds.click();
            this.showScreen('twoPlayerSetup2');
            this.updatePlayerCodeDisplay(2);
        } else {
            alert(`Please enter a ${this.settings.codeLength}-digit code!`);
        }
    }

    confirmPlayer2Code() {
        if (this.gameState.player2Code.length === this.settings.codeLength) {
            this.sounds.click();
            // Both codes set, now start with Player 1's turn
            this.gameState.currentPlayer = 1;
            this.showTurnTransition(1);
        } else {
            alert(`Please enter a ${this.settings.codeLength}-digit code!`);
        }
    }

    showTurnTransition(player) {
        const playerName = player === 1 ? 'Player 1' : 'Player 2';
        document.getElementById('turnPlayerName').textContent = `${playerName}'s Turn`;
        this.showScreen('turnTransition');
    }

    startPlayerTurn() {
        // Set the secret code to the opponent's code
        this.gameState.secretCode = this.gameState.currentPlayer === 1
            ? [...this.gameState.player2Code]
            : [...this.gameState.player1Code];

        this.gameState.currentGuess = [];
        this.gameState.attempts = [];
        this.gameState.triesLeft = this.settings.maxTries;
        this.gameState.undosLeft = 3;
        this.gameState.startTime = Date.now();
        this.gameState.isPlaying = true;

        // Show player indicator in two-player mode
        const playerIndicator = document.getElementById('currentPlayerIndicator');
        const playerLabel = document.getElementById('currentPlayerLabel');
        playerIndicator.style.display = 'block';
        playerLabel.textContent = `Player ${this.gameState.currentPlayer}`;

        console.log(`Player ${this.gameState.currentPlayer} - Secret code:`, this.gameState.secretCode);
        this.showScreen('gameScreen');
        this.updateGameUI();
        this.playBackgroundMusic();
    }

    handleTwoPlayerVictory() {
        this.gameState.isPlaying = false;
        this.stopBackgroundMusic();
        this.sounds.success();

        const currentPlayer = this.gameState.currentPlayer;
        const timeElapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        const triesUsed = this.settings.maxTries - this.gameState.triesLeft;

        // Save current player's results
        if (currentPlayer === 1) {
            this.gameState.player1Tries = triesUsed;
            this.gameState.player1Time = timeElapsed;
            this.gameState.player1Won = true;
            this.gameState.player1Attempts = [...this.gameState.attempts];
        } else {
            this.gameState.player2Tries = triesUsed;
            this.gameState.player2Time = timeElapsed;
            this.gameState.player2Won = true;
            this.gameState.player2Attempts = [...this.gameState.attempts];
        }

        // Check if both players have played
        if (currentPlayer === 1) {
            // Player 1 finished, now it's Player 2's turn
            this.gameState.currentPlayer = 2;
            this.showTurnTransition(2);
        } else {
            // Both players finished, show final results
            this.showTwoPlayerResults();
        }
    }

    handleTwoPlayerGameOver() {
        this.gameState.isPlaying = false;
        this.stopBackgroundMusic();
        this.sounds.fail();

        const currentPlayer = this.gameState.currentPlayer;
        const timeElapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);

        // Save current player's results (they failed)
        if (currentPlayer === 1) {
            this.gameState.player1Tries = this.settings.maxTries;
            this.gameState.player1Time = timeElapsed;
            this.gameState.player1Won = false;
            this.gameState.player1Attempts = [...this.gameState.attempts];
        } else {
            this.gameState.player2Tries = this.settings.maxTries;
            this.gameState.player2Time = timeElapsed;
            this.gameState.player2Won = false;
            this.gameState.player2Attempts = [...this.gameState.attempts];
        }

        // Check if both players have played
        if (currentPlayer === 1) {
            // Player 1 finished, now it's Player 2's turn
            this.gameState.currentPlayer = 2;
            this.showTurnTransition(2);
        } else {
            // Both players finished, show final results
            this.showTwoPlayerResults();
        }
    }

    showTwoPlayerResults() {
        // Determine winner
        let winnerText = '';

        if (this.gameState.player1Won && !this.gameState.player2Won) {
            winnerText = '<h2 class="winner-text">🏆 Player 1 Wins! 🏆</h2><p>Player 2 failed to crack the code!</p>';
        } else if (this.gameState.player2Won && !this.gameState.player1Won) {
            winnerText = '<h2 class="winner-text">🏆 Player 2 Wins! 🏆</h2><p>Player 1 failed to crack the code!</p>';
        } else if (this.gameState.player1Won && this.gameState.player2Won) {
            // Both won, compare tries and time
            if (this.gameState.player1Tries < this.gameState.player2Tries) {
                winnerText = '<h2 class="winner-text">🏆 Player 1 Wins! 🏆</h2><p>Fewer tries used!</p>';
            } else if (this.gameState.player2Tries < this.gameState.player1Tries) {
                winnerText = '<h2 class="winner-text">🏆 Player 2 Wins! 🏆</h2><p>Fewer tries used!</p>';
            } else if (this.gameState.player1Time < this.gameState.player2Time) {
                winnerText = '<h2 class="winner-text">🏆 Player 1 Wins! 🏆</h2><p>Faster time!</p>';
            } else if (this.gameState.player2Time < this.gameState.player1Time) {
                winnerText = '<h2 class="winner-text">🏆 Player 2 Wins! 🏆</h2><p>Faster time!</p>';
            } else {
                winnerText = '<h2 class="winner-text">🤝 It\'s a Tie! 🤝</h2><p>Both players performed equally!</p>';
            }
        } else {
            // Both failed
            winnerText = '<h2 class="winner-text">💔 Both Players Failed 💔</h2><p>Better luck next time!</p>';
        }

        document.getElementById('winnerAnnouncement').innerHTML = winnerText;

        // Display stats
        const formatTime = (seconds) => {
            return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
        };

        document.getElementById('player1Tries').textContent = this.gameState.player1Tries;
        document.getElementById('player1Time').textContent = formatTime(this.gameState.player1Time);
        document.getElementById('player1Status').textContent = this.gameState.player1Won ? '✓ Cracked!' : '✗ Failed';

        document.getElementById('player2Tries').textContent = this.gameState.player2Tries;
        document.getElementById('player2Time').textContent = formatTime(this.gameState.player2Time);
        document.getElementById('player2Status').textContent = this.gameState.player2Won ? '✓ Cracked!' : '✗ Failed';

        this.showScreen('twoPlayerVictory');
    }
    
    // Sound Controls
    toggleSound() {
        this.settings.soundEnabled = !this.settings.soundEnabled;
        this.saveSettings();
    }
    
    pauseGame() {
        if (this.gameState.isPlaying) {
            this.gameState.isPlaying = false;
            this.stopBackgroundMusic();
            // Show pause menu (implementation needed)
        }
    }
}

// Initialize the game
const game = new KrackTheKode();
