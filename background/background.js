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

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action == "run") {
    Run();
    //console.log("running script");
  }
});

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
