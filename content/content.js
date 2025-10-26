function sendMessage() {
    chrome.runtime.sendMessage({ action: "popup" });
    console.log("Popup message sent");
}

const INPUT_SELECTOR = "#jsena > table > tbody > tr > td > div.container > div > div.col-lg-4.login-field > div:nth-child(2) > input[type=text]";
const PASSWORD_SELECTOR = "#jsena > table > tbody > tr > td > div.container > div > div.col-lg-4.login-field > div:nth-child(3) > input[type=password]";

const autoLogin = async () => {
    const input = document.querySelector(INPUT_SELECTOR);
    const password = document.querySelector(PASSWORD_SELECTOR);
    const agreePolicy = document.querySelector("#agreepolicy");
    const loginBtn = document.querySelector("#loginbtn");

    if (!input || !password || !loginBtn) {
        console.error("Login elements not found. Stopping autoLogin.");
        return; 
    }

    const storageData = await chrome.storage.local.get(["lpuId", "lpuPassword"]);
    const id = storageData.lpuId;
    const pass = storageData.lpuPassword;

    input.value = id;
    password.value = pass;
    console.log(`Filled ID: ${id} and Password.`);
    
    if (agreePolicy) {
        agreePolicy.click();
        console.log("Agreed to policy.");
    }
    
    loginBtn.click();
    console.log("Login button clicked.");
};


function checkAndExecuteLogic() {
    const alertEl = document.querySelector("p.alert");

    if (alertEl && alertEl.innerHTML === "<strong>Wrong username/password</strong>") {
        console.log("Login Error detected on page.");
        sendMessage();         
        return; 
    }

    const input = document.querySelector(INPUT_SELECTOR);

    if (input) {
        console.log("Login form detected, running autoLogin.");
        autoLogin();
    } else {
        setTimeout(checkAndExecuteLogic, 250); 
    }
}

checkAndExecuteLogic();