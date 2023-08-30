chrome.runtime.onMessage.addListener(function (message) {

  message = JSON.parse(message);

  if (message.type === "text") {
    console.log("collaedit-change");
    if (message.toggle) {

      localStorage.setItem("collaedit", JSON.stringify({
        ...JSON.parse(localStorage.getItem("collaedit")),
        text: true
      }))

      console.log("collaedit-on");
      document.body.contentEditable = "true";
      // document.designMode = "on"; 
    } else {
      localStorage.setItem("collaedit", JSON.stringify({
        ...JSON.parse(localStorage.getItem("collaedit")),
        text: false
      }))
      console.log("collaedit-off");
      document.body.contentEditable = "false";
      // document.designMode = "off";
    }
  }

  if (message.type === "openBlock") {
    console.log("collaedit-open-block");
    if (message.toggle) {
      localStorage.setItem("collaedit", JSON.stringify({
        ...JSON.parse(localStorage.getItem("collaedit")),
        open: true
      }))
      console.log("collaedit-open-block-on");

      document.body.querySelectorAll("a").forEach((element) => {
        const link = element.getAttribute("href");
        element.href = "javascript: console.log('画面遷移はCollaEditにより制限されています。');"
        element.shadow_href = link;
      })

      document.addEventListener("click", (event) => {
        window._ceditOpenBlock = true;
        if (window._ceditOpenBlock) {
          event.preventDefault();
        }
      });

      document.body.innerHTML += `
      <script collaedit-open-block>
      window._history = {...history};
      delete history
      </script>
      `

      // document.designMode = "on"; 
    } else {
      localStorage.setItem("collaedit", JSON.stringify({
        ...JSON.parse(localStorage.getItem("collaedit")),
        open: false
      }))
      console.log("collaedit-open-block-off");
      document.body.contentEditable = "false";
      // document.designMode = "off";

      window._ceditOpenBlock = false;

      document.body.querySelectorAll("a").forEach((element) => {
        const link = element.getAttribute("shadow_href");
        element.href = link;
      });

      document.querySelector("[collaedit-open-block]").innerHTML = `
      <script collaedit-open-block-remove>
        window.history = {...window._history};
      </script>
      `


    }
  }


  return !0;
}); // popupからのメッセージ受信