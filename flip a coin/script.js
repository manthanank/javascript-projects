class CoinFlipper {
  constructor() {
    this.flipBtn = document.getElementById('flip-btn');
    this.resetBtn = document.getElementById('reset-btn');
    this.coinWrapper = document.getElementById('coin-wrapper');
    this.resultText = document.getElementById('result-text');
    this.resultDisplay = document.getElementById('result-display');
    this.headsCount = document.getElementById('heads-count');
    this.tailsCount = document.getElementById('tails-count');
    this.totalFlips = document.getElementById('total-flips');
        
    this.stats = {
      heads: 0,
      tails: 0,
      total: 0
    };
        
    this.isFlipping = false;
    this.currentSide = 'heads'; // Start with heads
        
    this.init();
  }
    
  init() {
    this.flipBtn.addEventListener('click', () => this.flipCoin());
    this.resetBtn.addEventListener('click', () => this.resetStats());
    this.loadStats();
    this.updateDisplay();
  }
    
  flipCoin() {
    if (this.isFlipping) return;
        
    this.isFlipping = true;
    this.flipBtn.disabled = true;
        
    // Determine result
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
        
    // Add flipping animation
    this.coinWrapper.classList.add('flipping');
        
    // Update result text during flip
    this.resultText.textContent = 'Flipping...';
    this.resultDisplay.className = 'result-display';
        
    setTimeout(() => {
      // Set final position based on result
      if (result !== this.currentSide) {
        const currentRotation = this.getCurrentRotation();
        const newRotation = currentRotation + 180;
        this.coinWrapper.style.transform = `rotateY(${newRotation}deg)`;
        this.currentSide = result;
      }
            
      // Update stats
      this.stats[result]++;
      this.stats.total++;
            
      // Show result
      this.showResult(result);
            
      // Remove animation class
      this.coinWrapper.classList.remove('flipping');
            
      // Re-enable button
      this.isFlipping = false;
      this.flipBtn.disabled = false;
            
      // Save stats
      this.saveStats();
      this.updateDisplay();
            
    }, 1000);
  }
    
  getCurrentRotation() {
    const transform = window.getComputedStyle(this.coinWrapper).transform;
    if (transform === 'none') return 0;
        
    const matrix = transform.match(/matrix.*\((.+)\)/);
    if (matrix) {
      const values = matrix[1].split(', ');
      const a = values[0];
      const b = values[1];
      return Math.round(Math.atan2(b, a) * (180/Math.PI));
    }
    return 0;
  }
    
  showResult(result) {
    this.resultText.textContent = `It's ${result.toUpperCase()}!`;
    this.resultDisplay.className = `result-display result-${result}`;
        
    // Add celebration effect
    this.addCelebrationEffect(result);
  }
    
  addCelebrationEffect(result) {
    // Create confetti-like effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.createParticle(result);
      }, i * 50);
    }
  }
    
  createParticle(result) {
    const particle = document.createElement('div');
    particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${result === 'heads' ? '#ffd700' : '#c0c0c0'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            animation: fall 2s ease-in forwards;
        `;
        
    document.body.appendChild(particle);
        
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
    
  updateDisplay() {
    this.headsCount.textContent = this.stats.heads;
    this.tailsCount.textContent = this.stats.tails;
    this.totalFlips.textContent = this.stats.total;
        
    // Update stats panel colors based on current leader
    const statItems = document.querySelectorAll('.stat-item');
    if (this.stats.heads > this.stats.tails) {
      statItems[0].style.background = 'linear-gradient(135deg, #ffd700, #f39c12)';
      statItems[2].style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
    } else if (this.stats.tails > this.stats.heads) {
      statItems[0].style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
      statItems[2].style.background = 'linear-gradient(135deg, #bdc3c7, #7f8c8d)';
    } else {
      statItems[0].style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
      statItems[2].style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
    }
  }
    
  resetStats() {
    if (confirm('Are you sure you want to reset all statistics?')) {
      this.stats = { heads: 0, tails: 0, total: 0 };
      this.resultText.textContent = 'Stats reset! Click to flip!';
      this.resultDisplay.className = 'result-display';
      this.saveStats();
      this.updateDisplay();
    }
  }
    
  saveStats() {
    localStorage.setItem('coinFlipperStats', JSON.stringify(this.stats));
  }
    
  loadStats() {
    const saved = localStorage.getItem('coinFlipperStats');
    if (saved) {
      this.stats = JSON.parse(saved);
    }
  }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 20}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new CoinFlipper();
});