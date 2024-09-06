/* gloabl chrome */
chrome.runtime.onInstalled.addListener(function (details) {
  //console.log("This is running");
  if (details.reason == chrome.runtime.OnInstalledReason.INSTALL) {
    //console.log("This");
    chrome.tabs.create({
      url: chrome.runtime.getURL("register/register.html"),
    });
  }
});
const getValue = async () => {
  var id;
  var password;
  const result = await chrome.storage.local.get(["lpuId", "lpuPassword"]);
  id = result.lpuId;
  password = result.lpuPassword;
  return { id, password };
};

const openPopup = () => {
  chrome.action.openPopup("popup/popup.html");
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "popup") {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup/popup.html"),
      type: "popup",
      width: 800,
      height: 800,
    });
  }
});

// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//   if (request.action == "popup") {
//     console.log("Here is the popup!");
//     chrome.action.openPopup("popup/popup.html");
//   }
// });

const Run = async () => {
  const { id, password } = await getValue();

  if (
    typeof id != "string" ||
    id.length == 0 ||
    typeof password != "string" ||
    password.length == 0
  ) {
    console.log("Not Registered");
    chrome.action.onClicked.addListener(() => {
      chrome.tabs.create({
        url: chrome.runtime.getURL("register/register.html"),
      });
    });
  } else {
    chrome.action.onClicked.addListener(() => {
      chrome.tabs.create({
        url: chrome.runtime.getURL("info/info.html"),
      });
    });
  }
};

Run();
