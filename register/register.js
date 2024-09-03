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
    const pass = document.getElementById("LPUPASS");
    const toggle = document.getElementById("togglePassword");
    toggle.addEventListener("click", () => {
      if (pass.type == "password") {
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="15" height="15">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>`;
        // toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="15" height="15">
        //     <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        // </svg>`;
        pass.type = "text";
        console.log(pass.type);
      } else {
        toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="15" height="15">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>`;
        pass.type = "password";
        console.log(pass.type);
      }
    });
    const form = document.querySelector("form");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const idElement = document.getElementById("LPUID");
      const passwordElement = document.getElementById("LPUPASS");

      if (typeof (idElement.value == "string") && idElement.value.length != 0) {
        await chrome.storage.local.set({ lpuId: idElement.value }, () => {
          console.log(`Set Lpu ID `);
        });
      } else {
        alert("Please enter valid values.");
      }

      if (
        typeof passwordElement.value == "string" &&
        passwordElement.value.length != 0
      ) {
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
