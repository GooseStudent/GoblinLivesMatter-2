export class GameOver {
  constructor(fieldElement) {
    this.fieldElement = fieldElement;
    this.messageElement = null;
  }

  show(score) {
    this.messageElement = document.createElement('div');
    this.messageElement.id = 'game-over-msg';
    this.messageElement.innerHTML = `
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        color: white;
        z-index: 10;
      ">
        <div style="font-size: 48px; margin-bottom: 10px;">💀</div>
        <div style="font-size: 32px; font-weight: bold; color: #ff4444;">GAME OVER</div>
        <div style="font-size: 20px; margin: 10px 0; color: #f6d300;">
          Счет: ${score}
        </div>
        <button onclick="location.reload()" style="
          padding: 12px 30px;
          background: #f6d300;
          color: #252525;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.2s;
        "
        onmouseover="this.style.transform='scale(1.05)'"
        onmouseout="this.style.transform='scale(1)'"
        >Играть снова</button>
      </div>
    `;
    
    this.fieldElement.style.position = 'relative';
    this.fieldElement.appendChild(this.messageElement);
  }

  hide() {
    if (this.messageElement) {
      this.messageElement.remove();
      this.messageElement = null;
    }
    this.fieldElement.style.position = '';
  }

  isVisible() {
    return this.messageElement !== null;
  }
}