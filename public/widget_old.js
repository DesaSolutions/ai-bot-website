(function () {
  // Create floating chat button
  const chatBtn = document.createElement("button");
  chatBtn.id = "chatButton";
  chatBtn.innerHTML = "💬";
  chatBtn.style.position = "fixed";
  chatBtn.style.bottom = "25px";
  chatBtn.style.right = "25px";
  chatBtn.style.width = "60px";
  chatBtn.style.height = "60px";
  chatBtn.style.borderRadius = "50%";
  chatBtn.style.background = "linear-gradient(135deg, #ff914d, #ffb875)";
  chatBtn.style.color = "#fff";
  chatBtn.style.fontSize = "28px";
  chatBtn.style.border = "none";
  chatBtn.style.cursor = "pointer";
  chatBtn.style.zIndex = "999999";
  document.body.appendChild(chatBtn);

  // Create chat window
  const frame = document.createElement("iframe");
  frame.id = "chat-widget-frame";
  frame.style.position = "fixed";
  frame.style.bottom = "100px";
  frame.style.right = "25px";
  frame.style.width = "350px";
  frame.style.height = "500px";
  frame.style.border = "none";
  frame.style.borderRadius = "12px";
  frame.style.boxShadow = "0 0 10px rgba(0,0,0,0.4)";
  frame.style.display = "none";
  frame.src = "https://desa-ai-bot-website.azurewebsites.net/widget.html";

  document.body.appendChild(frame);

  // Toggle open/close
  chatBtn.addEventListener("click", () => {
    frame.style.display = frame.style.display === "none" ? "block" : "none";
  });
})();
