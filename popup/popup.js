document.onreadystatechange = async () => {
  if (document.readyState == "complete") {
    const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
    const [PASS] = await Promise.all([chrome.storage.local.get("lpuPassword")]);

    const id = ID.lpuId;
    const pass = PASS.lpuPassword;

    const h = document.querySelector("p#message");
    h.innerText = `Current Id : ${id} and Current Password : ${pass}`;

    const a = document.querySelector("a#change");
    const url = chrome.runtime.getURL("info/info.html");
    a.setAttribute("href", url);
  }
};
