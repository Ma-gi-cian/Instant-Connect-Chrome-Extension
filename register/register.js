function sendMessage() {
  chrome.runtime.sendMessage({ action: "run" });
}

const checkCredentials = async () => {
  const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
  const [PASS] = await Promise.all([chrome.storage.local.get("lpuPassword")]);

  let id = ID.lpuId;
  let pass = PASS.lpuPassword;
  const check = document.getElementById("check");
  if (typeof id == "string" && typeof pass == "string") {
    check.innerText =
      "Credentials Registered!! Thank your for using the Extension.";
    console.log("This is working");
    if (check.classList.contains("bg-red-600")) {
      check.classList.add("bg-green-600");
      console.log("Now adding");
      check.classList.remove("bg-red-600");
      console.log("Now removing");
    }
  } else {
    check.innerText = "Credentials Not Registered.";
  }
};
document.onreadystatechange = async function () {
  if (document.readyState == "complete") {
    const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
    const [PASS] = await Promise.all([chrome.storage.local.get("lpuPassword")]);

    const id = ID.lpuId;
    const password = PASS.lpuPassword;
    checkCredentials();
    const form = document.querySelector("form");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const idElement = document.getElementById("LPUID");
      const passwordElement = document.getElementById("LPUPASS");

      if (idElement.value != null) {
        await chrome.storage.local.set({ lpuId: idElement.value }, () => {
          console.log(`Set Lpu ID `);
        });
      } else {
        alert("Please enter valid values.");
      }

      if (passwordElement.value != null) {
        await chrome.storage.local.set(
          { lpuPassword: passwordElement.value },
          () => {
            console.log(`Set Lpu Password`);
          }
        );
      } else {
        alert("Please enter valid values.");
      }
      idElement.value = "";
      passwordElement.value = "";
      checkCredentials();
      sendMessage();
    });
  }
};
/*
async function RUN() {
  const [ID] = await Promise.all([chrome.storage.local.get("lpuId")]);
  const [PASS] = await Promise.all([chrome.storage.local.get("lpuPassword")]);
  const id = ID.lpuId;
  const password = PASS.lpuPassword;
  //console.log({ id: id, password: password });
  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const idElement = document.getElementById("LPUID");
    const passwordElement = document.getElementById("LPUPASS");

    if (idElement.value != null) {
      await chrome.storage.local.set({ lpuId: idElement.value }, () => {
        console.log(`Set Lpu ID `);
      });
    } else {
      alert("Please enter valid values.");
    }

    if (passwordElement.value != null) {
      await chrome.storage.local.set(
        { lpuPassword: passwordElement.value },
        () => {
          console.log(`Set Lpu Password`);
        }
      );
    } else {
      alert("Please enter valid values.");
    }
    idElement.value = "";
    passwordElement.value = "";
  });
}

RUN();
*/
