# Two-Player Mode Instructions

## How to Play Krack the Kode - Two Player Mode

### Overview
Two-player mode is a **local, pass-and-play** game mode where two players compete to see who can crack their opponent's code faster and more efficiently.

---

## Game Setup

### Starting the Game

1. **Open the game** in your web browser by opening `index.html`
2. Click **"Two Players"** from the main menu
3. Both players should be present at the same device

### Setting Up Codes

#### Player 1 Setup:
1. Player 2 should **look away** from the screen
2. Player 1 enters their secret code using the on-screen numpad
3. The code will be displayed as dots (•) to keep it hidden
4. Click **"Confirm Code"** when done

#### Player 2 Setup:
1. Player 1 should now **look away** from the screen
2. Player 2 enters their secret code using the on-screen numpad
3. The code will be displayed as dots (•) to keep it hidden
4. Click **"Start Game"** when done

---

## Playing the Game

### Turn Structure

The game proceeds in turns:

1. **Player 1's Turn:**
   - Player 2 should look away
   - Player 1 tries to crack Player 2's code
   - Click **"Start Turn"** when ready
   - Make guesses until either:
     - The code is cracked (all digits green), OR
     - All tries are used up

2. **Player 2's Turn:**
   - Player 1 should look away
   - Player 2 tries to crack Player 1's code
   - Click **"Start Turn"** when ready
   - Make guesses until either:
     - The code is cracked (all digits green), OR
     - All tries are used up

### Making Guesses

- Use the on-screen numpad or your keyboard (0-9) to enter digits
- Each guess must be exactly the configured code length (default: 4 digits)
- Click **"Submit Guess"** or press Enter
- Review the color-coded feedback:
  - 🟢 **Green** = Correct digit in correct position
  - 🟡 **Yellow** = Correct digit in wrong position
  - 🔴 **Red** = Digit not in the code

### Game Controls

- **Undo**: Use sparingly (3 undos per turn) to remove a previous guess
- **Clear**: Remove all digits from current guess
- **Backspace/Delete**: Remove the last digit
- **Submit**: Confirm your guess

---

## Winning the Game

### Victory Conditions

The game determines a winner based on:

1. **Did you crack the code?**
   - If only one player cracks the code → They win!
   - If both crack the code → Continue to next criteria
   - If neither cracks the code → Both lose

2. **Number of tries used** (if both cracked):
   - Fewer tries = Better score
   - If tied → Continue to next criteria

3. **Time taken** (if still tied):
   - Faster time = Better score
   - If still tied → It's a tie!

### Results Screen

After both players finish, you'll see:
- Winner announcement
- Each player's statistics:
  - Number of tries used
  - Time taken
  - Status (Cracked or Failed)

---

## Local Multiplayer Setup

### Same Device (Pass-and-Play)

**What you need:**
- One device (computer, tablet, or phone)
- Two players physically present
- The game loaded in a web browser

**How to play:**
1. Open `index.html` in any modern web browser
2. Pass the device between players during setup and gameplay
3. Honor system: Look away when it's not your turn!

### Same Network (Multiple Devices)

While the game doesn't have built-in networking, you can play on separate devices using a local server:

**Setup Instructions:**

1. **Install a local server** (if not already done):
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

   This will start a local server (usually on port 8080)

3. **Find your local IP address**:

   **On Windows:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

   **On Mac/Linux:**
   ```bash
   ifconfig
   ```
   Look for "inet" under your active connection (e.g., 192.168.1.100)

4. **Connect both devices**:
   - **Device 1 (Host)**: Open browser to `http://localhost:8080`
   - **Device 2 (Player 2)**: Open browser to `http://[HOST-IP]:8080`
     - Example: `http://192.168.1.100:8080`

5. **Important Notes**:
   - Both devices must be on the **same WiFi network**
   - Each player needs to complete their setup independently
   - **Coordination required**: Players need to coordinate who is Player 1 and Player 2
   - This is still local pass-and-play; the game state is NOT synchronized between devices
   - Each device runs independently, so players must manually track turns

### Alternative: Two Browser Windows

For a quasi-two-player experience on one computer:

1. Open two browser windows side-by-side
2. Load the game in both windows
3. Each player uses their own window
4. Manually coordinate turns

**Note:** This method requires trust, as each player can see the opponent's window.

---

## Game Settings

Before starting two-player mode, you can adjust:

- **Code Length**: 4-8 digits (default: 4)
- **Max Tries**: 6-15 attempts (default: 10)
- **Allow Duplicates**: Whether the code can have repeated digits
- **Sound Effects**: Enable/disable click and result sounds
- **Background Music**: Enable/disable ambient music

---

## Tips & Strategies

### For Code Setters:
- Use diverse digits to make guessing harder
- If duplicates are allowed, consider using them strategically
- Avoid obvious patterns (1234, 0000, etc.)

### For Code Crackers:
- Start with diverse guesses to eliminate possibilities
- Pay attention to yellow (present) digits - they're in the code!
- Use the process of elimination systematically
- Save undos for late-game corrections
- Work quickly - time is a tiebreaker!

---

## Troubleshooting

### Common Issues:

**Q: The other player can see my code!**
- A: Make sure they look away during your code entry. The dots (•) only hide the digits visually, not from prying eyes nearby.

**Q: Can we play online with a friend in another location?**
- A: Currently, no. This is a local multiplayer game only. You would need to be on the same local network or use screen sharing.

**Q: How do I connect to the same port address?**
- A: Follow the "Same Network (Multiple Devices)" instructions above. Use the host's IP address and port number (e.g., `http://192.168.1.100:8080`).

**Q: The game isn't working on my network**
- A: Check that:
  - Both devices are on the same WiFi network
  - Firewall isn't blocking the connection
  - You're using the correct IP address
  - The server is running (`npm start`)

**Q: Can we pause between turns?**
- A: Yes! The turn transition screen allows you to pause. Don't click "Start Turn" until you're ready.

---

## Technical Details

### Network Setup

If you want to host the game on your local network:

1. **Default Port**: 8080 (configured in package.json)
2. **Server Command**: `npm start` or `npx http-server -p 8080`
3. **Access URL**: `http://[YOUR-IP-ADDRESS]:8080`

### Finding Your IP Address

**Windows (Command Prompt):**
```cmd
ipconfig
```

**Mac/Linux (Terminal):**
```bash
ifconfig
# or
ip addr show
```

**Alternative (All platforms):**
- Windows: Settings → Network & Internet → WiFi → Properties
- Mac: System Preferences → Network
- Linux: Network Settings → Connection Information

### Port Forwarding (Advanced)

If you want to play over the internet (not recommended for security):
1. Configure port forwarding on your router for port 8080
2. Use your public IP address
3. **Warning**: Only do this if you understand the security implications!

---

## Game Variants

### Speed Mode
- Set Max Tries to minimum (6)
- Winner is determined primarily by time

### Endurance Mode
- Set Max Tries to maximum (15)
- Set Code Length to maximum (8)
- Ultimate challenge!

### Classic Mode
- Code Length: 4
- Max Tries: 10
- No Duplicates: OFF

---

## Have Fun!

Enjoy competing with your friends and family. May the best code-cracker win! 🎮🏆

---

**Game Created by**: Kuroonai
**Version**: 1.0 (Two-Player Mode Complete)
