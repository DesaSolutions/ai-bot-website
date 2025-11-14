(function () {
  // --------------------
  // CREATE CHAT BUTTON
  // --------------------
  const chatBtn = document.createElement("div");
  chatBtn.id = "desa-chat-bubble";
  chatBtn.innerHTML = "💬";
  chatBtn.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff914d, #ffb875);
    border-radius: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:30px;
    color:white;
    cursor:pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    z-index: 999999;
    animation: pulse 2s infinite;
  `;

  document.body.appendChild(chatBtn);

  // --------------------
  // CREATE CHAT WINDOW
  // --------------------
  const frame = document.createElement("iframe");
  frame.id = "desa-chat-window";
  frame.src = "https://desa-ai-bot-website.azurewebsites.net/widget.html";
  frame.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 25px;
    width: 360px;
    height: 520px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    display: none;
    z-index: 999999;
    background: white;
    overflow: hidden;
  `;

  document.body.appendChild(frame);

  // --------------------
  // BUTTON TOGGLE
  // --------------------
  chatBtn.addEventListener("click", () => {
    frame.style.display = frame.style.display === "none" ? "block" : "none";
  });

  // --------------------
  // PULSE ANIMATION
  // --------------------
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 10px rgba(255,145,77,0.4); }
      50% { transform: scale(1.08); box-shadow: 0 0 20px rgba(255,145,77,0.7); }
      100% { transform: scale(1); box-shadow: 0 0 10px rgba(255,145,77,0.4); }
    }
  `;
  document.head.appendChild(style);
})();
