(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "/api/chat"; // we will improve UI later
  iframe.id = "chat-widget-frame";

  document.body.appendChild(iframe);
})();
