(function () {
  // Create chat button
  const button = document.createElement("div");
  button.id = "chat-widget-button";
  button.innerHTML = "💬";
  document.body.appendChild(button);

  // Get website domain
  const site = encodeURIComponent(window.location.hostname);

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.id = "chat-widget-frame";
  iframe.src = "https://desa-ai-bot-website.azurewebsites.net/widget.html?site=" + site;
  iframe.style.display = "none";

  // Allow JavaScript + forms inside iframe
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");

  document.body.appendChild(iframe);

  // Toggle
  let isOpen = false;
  button.onclick = () => {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? "block" : "none";
  };
})();
