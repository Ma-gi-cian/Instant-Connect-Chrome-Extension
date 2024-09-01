function sendMessage() {
  chrome.runtime.sendMessage({ action: "clearStorage" });
  console.log("Info send message");
}
document.onreadystatechange = async function (event) {
  if (document.readyState == "complete") {
    const button = document.getElementById("viewButton");
    const cred = document.getElementById("cred");
    const dialog = document.querySelector("dialog");
    button.addEventListener("click", async function (event) {
      if (cred.classList.contains("hidden")) {
        dialog.showModal();
      } else {
        cred.classList.add("hidden");
      }
    });
    const cancel = document.getElementById("dialogCancel");
    cancel.addEventListener("click", () => {
      dialog.close();
    });
    const cont = document.getElementById("dialogContinue");
    cont.addEventListener("click", async () => {
      cred.classList.remove("hidden");
      const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
      const [PASS] = await Promise.all([
        chrome.storage.local.get("lpuPassword"),
      ]);
      const currentId = ID.lpuId;
      const currentPassword = PASS.lpuPassword;
      cred.innerText = `[ Id : ${currentId}, Password : ${currentPassword} ]`;
      dialog.close();
    });
    const id = document.getElementById("LPUID");
    const pass = document.getElementById("LPUPASS");
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let IdText = id.value;
      let PassText = pass.value;
      chrome.storage.local.set({ lpuId: IdText });
      chrome.storage.local.set({ lpuPassword: PassText });
      id.value = "";
      pass.value = "";
      if (!cred.classList.contains("hidden")) {
        cred.classList.add("hidden");
      }
    });

    /*
    const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
    const [PASS] = await Promise.all([chrome.storage.local.get("lpuPassword")]);
    const currentId = ID.lpuId;
    const currentPassword = PASS.lpuPassword;
    cred.innerText = `Id : ${currentId} and Password : ${currentPassword}`;

    if (cred.classList.contains("hidden")) {
        cred.classList.remove("hidden");
        const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
        const [PASS] = await Promise.all([
          chrome.storage.local.get("lpuPassword"),
        ]);
        const currentId = ID.lpuId;
        const currentPassword = PASS.lpuPassword;
        cred.innerText = `[ Id : ${currentId}, Password : ${currentPassword} ]`;
      } else {
        cred.classList.add("hidden");
      }
    */
  }
};
