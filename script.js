const screens = document.querySelectorAll(".screen");

const opening = document.getElementById("opening");
const loading = document.getElementById("loading");
const unit = document.getElementById("unit");
const register = document.getElementById("register");
const menu = document.getElementById("menu");
const form = document.getElementById("form");
const success = document.getElementById("success");

// ---------- Opening ----------

const initializeBtn = document.getElementById("initializeBtn");

// ---------- Loading ----------

const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");

// ---------- Registration ----------

const playerName = document.getElementById("playerName");
const playerPort = document.getElementById("playerPort");

const continueBtn = document.getElementById("continueBtn");

// ---------- Menu ----------

const displayName = document.getElementById("displayName");
const displayPort = document.getElementById("displayPort");
const displayUnit = document.getElementById("displayUnit");

const changeBtn = document.getElementById("changeBtn");
const addBtn = document.getElementById("addBtn");
const hiatusBtn = document.getElementById("hiatusBtn");
const leaveBtn = document.getElementById("leaveBtn");

// ---------- Form ----------

const formTitle = document.getElementById("formTitle");
const formFields = document.getElementById("formFields");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// ---------- Success ----------

const menuReturn = document.getElementById("menuReturn");

// =======================================
// VARIABLES
// =======================================

let selectedUnit = "";
let requestType = "";

// =======================================
// FUNCTIONS
// =======================================

function showScreen(screen){

    screens.forEach(item=>{

        item.classList.remove("active");

    });

    screen.classList.add("active");

}

function updateProfile(){

    displayName.textContent =
    localStorage.getItem("name") || "";

    displayPort.textContent =
    localStorage.getItem("port") || "";

    displayUnit.textContent =
    localStorage.getItem("unit") || "";

}

// =======================================
// INITIALIZE
// =======================================

initializeBtn.addEventListener("click",()=>{

    showScreen(loading);

    let value = 0;

    progress.style.width = "0%";

    loadingText.textContent = "0%";

    const load = setInterval(()=>{

        value++;

        progress.style.width = value + "%";

        loadingText.textContent = value + "%";

        if(value >= 100){

            clearInterval(load);

            showScreen(unit);

        }

    },25);

});

// =======================================
// UNIT SELECTION
// =======================================

document.querySelectorAll(".unit-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        selectedUnit = button.dataset.unit;

        localStorage.setItem("unit",selectedUnit);

        showScreen(register);

    });

});

// =======================================
// REGISTRATION
// =======================================

continueBtn.addEventListener("click",()=>{

    const name = playerName.value.trim();

    const port = playerPort.value.trim();

    if(name === ""){

        alert("Please enter your Player Name.");

        playerName.focus();

        return;

    }

    if(port === ""){

        alert("Please enter your Player Port.");

        playerPort.focus();

        return;

    }

    localStorage.setItem("name",name);

    localStorage.setItem("port",port);

    updateProfile();

    showScreen(menu);

});

// =======================================
// MENU BUTTONS
// =======================================

changeBtn.addEventListener("click",()=>{

    requestType = "Change";

    buildChangeForm();

});

addBtn.addEventListener("click",()=>{

    requestType = "Add";

    buildAddForm();

});

hiatusBtn.addEventListener("click",()=>{

    requestType = "Hiatus";

    buildHiatusForm();

});

leaveBtn.addEventListener("click",()=>{

    requestType = "Leave";

    buildLeaveForm();

});

// =======================================
// BACK BUTTON
// =======================================

cancelBtn.addEventListener("click",()=>{

    showScreen(menu);

});

menuReturn.addEventListener("click",()=>{

    showScreen(menu);

});

function buildChangeForm(){

    formTitle.textContent = "CHANGE REQUEST";

    formFields.innerHTML = `

        <input
            id="newName"
            type="text"
            placeholder="New Name">

        <input
            id="newPort"
            type="text"
            placeholder="New Port">

        <select id="newUnit">

            <option value="">Select New Unit</option>

            <option value="STRATEVADE">
                STRATEVADE
            </option>

            <option value="EX-SCRUTE">
                EX-SCRUTE
            </option>

        </select>

        <textarea
            id="reason"
            placeholder="Reason"></textarea>

    `;

    showScreen(form);

}

// -------------------------
// ADD
// -------------------------

function buildAddForm(){

    formTitle.textContent = "ADD REQUEST";

    formFields.innerHTML = `

        <input
            id="accountName"
            type="text"
            placeholder="Account Name">

        <input
            id="accountLink"
            type="url"
            placeholder="Account Link">

        <input
            id="addedPort"
            type="text"
            placeholder="Additional Port">

    `;

    showScreen(form);

}

// -------------------------
// HIATUS
// -------------------------

function buildHiatusForm(){

    formTitle.textContent = "HIATUS REQUEST";

    formFields.innerHTML = `

        <textarea
            id="reason"
            placeholder="Reason"></textarea>

        <label>

            Start Date

        </label>

        <input
            id="startDate"
            type="date">

        <label>

            End Date

        </label>

        <input
            id="endDate"
            type="date">

    `;

    showScreen(form);

}

// -------------------------
// LEAVE
// -------------------------

function buildLeaveForm(){

    formTitle.textContent = "LEAVING REQUEST";

    formFields.innerHTML = `

        <textarea
            id="reason"
            placeholder="Reason"></textarea>

        <label>

            Leaving Date

        </label>

        <input
            id="leaveDate"
            type="date">

    `;

    showScreen(form);

}

const SCRIPT_URL ="https://script.google.com/macros/s/AKfycbyCrZuGOQx40ry5VC-ota-5lt-WDQGgBOxm8A4-vtXVwMK31vjCy488KXjQAf4-Xhdi-w/exec";

// ---------------------------
// Submit Button
// ---------------------------

submitBtn.addEventListener("click", submitRequest);

async function submitRequest(){

    let data = {

        name: localStorage.getItem("name"),
        port: localStorage.getItem("port"),
        unit: localStorage.getItem("unit"),

        request: requestType,

        newName: "",
        newPort: "",
        newUnit: "",

        accountName: "",
        accountLink: "",
        addedPort: "",

        hiatusStart: "",
        hiatusEnd: "",

        leaveDate: "",

        reason: ""

    };

    // ------------------------
    // CHANGE
    // ------------------------

    if(requestType === "Change"){

        data.newName = document.getElementById("newName").value.trim();
        data.newPort = document.getElementById("newPort").value.trim();
        data.newUnit = document.getElementById("newUnit").value;
        data.reason = document.getElementById("reason").value.trim();

        if(
            data.newName === "" ||
            data.newPort === "" ||
            data.newUnit === "" ||
            data.reason === ""
        ){

            alert("Please complete all fields.");

            return;

        }

    }

    // ------------------------
    // ADD
    // ------------------------

    if(requestType === "Add"){

        data.accountName = document.getElementById("accountName").value.trim();
        data.accountLink = document.getElementById("accountLink").value.trim();
        data.addedPort = document.getElementById("addedPort").value.trim();

        if(
            data.accountName === "" ||
            data.accountLink === "" ||
            data.addedPort === ""
        ){

            alert("Please complete all fields.");

            return;

        }

    }

    // ------------------------
    // HIATUS
    // ------------------------

    if(requestType === "Hiatus"){

        data.reason = document.getElementById("reason").value.trim();
        data.hiatusStart = document.getElementById("startDate").value;
        data.hiatusEnd = document.getElementById("endDate").value;

        if(
            data.reason === "" ||
            data.hiatusStart === "" ||
            data.hiatusEnd === ""
        ){

            alert("Please complete all fields.");

            return;

        }

    }

    // ------------------------
    // LEAVE
    // ------------------------

    if(requestType === "Leave"){

        data.reason = document.getElementById("reason").value.trim();
        data.leaveDate = document.getElementById("leaveDate").value;

        if(
            data.reason === "" ||
            data.leaveDate === ""
        ){

            alert("Please complete all fields.");

            return;

        }

    }

    // ------------------------
    // Send to Google Sheets
    // ------------------------

    try {

    submitBtn.disabled = true;
    submitBtn.textContent = "SUBMITTING...";

    const formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }

    const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: formData,
    redirect: "follow"
});

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {

        formFields.innerHTML = "";
        showScreen(success);

    } else {

        alert("Submission failed:\n" + result);

    }

} catch (error) {

    console.error(error);
    alert(error.message);

} finally {

    submitBtn.disabled = false;
    submitBtn.textContent = "SUBMIT";

}
}
// -------------------------
// Reset Request Type
// -------------------------

function resetRequest(){

    requestType = "";

}

// -------------------------
// Return to Menu
// -------------------------

function returnToMenu(){

    clearForm();

    resetRequest();

    updateProfile();

    showScreen(menu);

}

// -------------------------
// BACK Button
// -------------------------

cancelBtn.addEventListener("click",()=>{

    returnToMenu();

});

// -------------------------
// Success Screen
// -------------------------

menuReturn.addEventListener("click",()=>{

    returnToMenu();

});

// -------------------------
// Prevent Double Click
// -------------------------

submitBtn.addEventListener("dblclick",(e)=>{

    e.preventDefault();

});

// -------------------------
// Restore Profile
// -------------------------

window.addEventListener("load",()=>{

    if(

        localStorage.getItem("name") &&
        localStorage.getItem("port") &&
        localStorage.getItem("unit")

    ){

        updateProfile();

    }

});