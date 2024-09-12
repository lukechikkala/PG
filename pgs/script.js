let commandCount = 3;
let stateCount = 4;
let inputCount = 2;
let selectorCount = 2;

// Color options for the dropdown
const colorOptions = [
    {name: "Global.Transparent", hex: "#00000000"},
    {name: "Global.Transparent25", hex: "#00000040"},
    {name: "Global.Background", hex: "#00000080"},
    {name: "Global.Transparent50", hex: "#00000080"},
    {name: "Global.Shadow", hex: "#0000008D"},
    {name: "Global.Transparent75", hex: "#000000C0"},
    {name: "Global.Darkened", hex: "#000000FF"},
    {name: "Global.PartlySelectedPreset", hex: "#004800FF"},
    {name: "Global.SelectedPreset", hex: "#00D7FFFF"},
    {name: "Global.BackgroundSelectedInverted", hex: "#202020FF"},
    {name: "Global.BackgroundSelected", hex: "#2A2A30FF"},
    {name: "Global.Hover", hex: "#323232FF"},
    {name: "Global.Pressed", hex: "#797985FF"},
    {name: "Global.Inactive", hex: "#7A7A7DA0"},
    {name: "Global.PartlySelected", hex: "#804000FF"},
    {name: "Global.SelectedInverted", hex: "#80FF80FF"},
    {name: "Global.LabelText", hex: "#999999FF"},
    {name: "Global.Bright", hex: "#BEBEC0FF"},
    {name: "Global.SelectedEdge", hex: "#E1FFC2FF"},
    {name: "Global.Collected", hex: "#FF8000FF"},
    {name: "Global.UserChanged", hex: "#FF8022FF"},
    {name: "Global.InvalidGridPosition", hex: "#FF8080FF"},
    {name: "Global.Selected", hex: "#FFD700FF"},
    {name: "Global.Disabled", hex: "#FFFFFF50"}
];

// Function to populate color dropdown
function populateColorDropdown(selectId) {
    const dropdown = document.getElementById(selectId);
    colorOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.name;
        opt.textContent = option.name;
        opt.style.backgroundColor = option.hex;  // Use hex color as background
        dropdown.appendChild(opt);
    });
}

// Default values for commands, states, inputs, and selectors
const defaultCommands = [
    { order: 1, value: "0", name: "Cancel" },
    { order: 2, value: 1, name: "Help" },
    { order: 3, value: 2, name: "Ok" }
];

const defaultStates = [
    { order: 1, name: "State 1", state: true },
    { order: 2, name: "State 2", state: false },
    { order: 3, name: "State 3", state: true },
    { order: 4, name: "State 4", state: false }
];

const defaultInputs = [
    { order: 1, value: "DefaultValue 1", name: "Input 1", whiteFilter: "0123456789", blackFilter: "0123456789", maxTextLength: 10 },
    { order: 2, value: "DefaultValue 2", name: "Input 2", whiteFilter: "0123456789", blackFilter: "0123456789", maxTextLength: 10 }
];

const defaultSelectors = [
    { name: "Swipe Selector", selectedValue: 1, values: { "Dimmer": 1, "Position": 2, "Color": 3 }, type: "0" },
    { name: "Radio Selector", selectedValue: 1, values: { "Dimmer": 1, "Position": 2, "Color": 3 }, type: 1 }
];

// Initialize with default values and populate color dropdown
window.onload = function() {
    // Populate color dropdown
    populateColorDropdown('backColor');

    // Add default values for commands, states, inputs, and selectors
    defaultCommands.forEach((cmd, index) => addCommand(cmd, index + 1));
    defaultStates.forEach((st, index) => addState(st, index + 1));
    defaultInputs.forEach((inp, index) => addInput(inp, index + 1));
    defaultSelectors.forEach((sel, index) => addSelector(sel, index + 1));
    
    updateLuaCode();
};

// Add command
function addCommand(command = {}, order = null) {
    commandCount++;
    const row = `
        <tr id="command-${commandCount}">
            <td><input type="number" id="commandOrder-${commandCount}" value="${order || commandCount}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="commandName-${commandCount}" value="${command.name || ''}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="commandValue-${commandCount}" value="${command.value || ''}" oninput="updateLuaCode()"></td>
            <td><input type="button" class="remove-btn" value="Remove" onclick="removeElement('command-${commandCount}')"></td>
        </tr>
    `;
    document.getElementById('commands-container').insertAdjacentHTML('beforeend', row);
}

// Add state
function addState(state = {}, order = null) {
    stateCount++;
    const row = `
        <tr id="state-${stateCount}">
            <td><input type="number" id="stateOrder-${stateCount}" value="${order || stateCount}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="stateName-${stateCount}" value="${state.name || ''}" oninput="updateLuaCode()"></td>
            <td><input type="checkbox" id="stateStatus-${stateCount}" ${state.state ? 'checked' : ''} onclick="updateLuaCode()"></td>
            <td><input type="button" class="remove-btn" value="Remove" onclick="removeElement('state-${stateCount}')"></td>
        </tr>
    `;
    document.getElementById('states-container').insertAdjacentHTML('beforeend', row);
}

// Add input
function addInput(input = {}, order = null) {
    inputCount++;
    const row = `
        <tr id="input-${inputCount}">
            <td><input type="number" id="inputOrder-${inputCount}" value="${order || inputCount}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="inputName-${inputCount}" value="${input.name || ''}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="inputValue-${inputCount}" value="${input.value || ''}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="inputWhiteFilter-${inputCount}" value="${input.whiteFilter || ''}" oninput="updateLuaCode()"></td>
            <td><input type="text" id="inputBlackFilter-${inputCount}" value="${input.blackFilter || ''}" oninput="updateLuaCode()"></td>
            <td><input type="number" id="inputMaxLength-${inputCount}" value="${input.maxTextLength || ''}" oninput="updateLuaCode()"></td>
            <td><input type="button" class="remove-btn" value="Remove" onclick="removeElement('input-${inputCount}')"></td>
        </tr>
    `;
    document.getElementById('inputs-container').insertAdjacentHTML('beforeend', row);
}

// Add selector with nested table for values
function addSelector(selector = {}, order = null) {
    selectorCount++;
    const row = `
        <tr id="selector-${selectorCount}">
            <td><input type="text" id="selectorName-${selectorCount}" value="${selector.name || ''}" oninput="updateLuaCode()"></td>
            <td><input type="number" id="selectorValue-${selectorCount}" value="${selector.selectedValue || ''}" oninput="updateLuaCode()"></td>
            <td>
                <table class="nested-table" id="nestedValues-${selectorCount}">
                    <thead>
                        <tr><th>Key</th><th>Value</th><th>Remove</th></tr>
                    </thead>
                    <tbody id="nestedValuesBody-${selectorCount}">
                    ${Object.entries(selector.values || {}).map(([key, value], index) => `
                        <tr id="nestedValueRow-${selectorCount}-${index}">
                            <td><input type="text" value="${key}" oninput="updateLuaCode()"></td>
                            <td><input type="number" value="${value}" oninput="updateLuaCode()"></td>
                            <td><button type="button" class="remove-btn" onclick="removeElement('nestedValueRow-${selectorCount}-${index}')">Remove</button></td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>
                <button type="button" class="add-btn" onclick="addNestedValue(${selectorCount})">Add Value</button>
            </td>
            <td><input type="number" id="selectorType-${selectorCount}" value="${selector.type || ''}" oninput="updateLuaCode()"></td>
            <td><input type="button" class="remove-btn" value="Remove" onclick="removeElement('selector-${selectorCount}')"></td>
        </tr>
    `;
    document.getElementById('selectors-container').insertAdjacentHTML('beforeend', row);
}

// Add nested value row to the selector
function addNestedValue(selectorId) {
    const nestedValuesBody = document.getElementById(`nestedValuesBody-${selectorId}`);
    const index = nestedValuesBody.children.length;
    const row = `
        <tr id="nestedValueRow-${selectorId}-${index}">
            <td><input type="text" oninput="updateLuaCode()"></td>
            <td><input type="number" oninput="updateLuaCode()"></td>
            <td><button type="button" class="remove-btn" onclick="removeElement('nestedValueRow-${selectorId}-${index}')">Remove</button></td>
        </tr>
    `;
    nestedValuesBody.insertAdjacentHTML('beforeend', row);
}

// Remove element
function removeElement(id) {
    document.getElementById(id).remove();
    updateLuaCode();
}

// Generate Lua code dynamically
function updateLuaCode() {
    const title               = document.getElementById("title").value;
    const message             = document.getElementById("message").value;
    const icon                = document.getElementById("icon").value || "logo_small";
    const timeout             = document.getElementById("timeout").value;
    const backColor           = document.getElementById("backColor").value;
    const timeoutResultCancel = document.getElementById("timeoutResultCancel").value;
    const timeoutResultID     = document.getElementById("timeoutResultID").value;
    const titleTextColor      = document.getElementById("titleTextColor").value;
    const messageTextColor    = document.getElementById("messageTextColor").value;
    const message_align_h     = document.getElementById("message_align_h").value;
    const message_align_v     = document.getElementById("message_align_v").value;

    let commands = "";
    for (let i = 1; i <= commandCount; i++) {
        if (document.getElementById(`command-${i}`)) {
            const name = document.getElementById(`commandName-${i}`).value;
            const value = document.getElementById(`commandValue-${i}`).value;
            const order = document.getElementById(`commandOrder-${i}`).value;
            commands += `{ value = ${value}, name = "${name}", order = ${order} },\n    `;
        }
    }

    let states = "";
    for (let i = 1; i <= stateCount; i++) {
        if (document.getElementById(`state-${i}`)) {
            const name = document.getElementById(`stateName-${i}`).value;
            const state = document.getElementById(`stateStatus-${i}`).checked;
            const order = document.getElementById(`stateOrder-${i}`).value;
            states += `{ order = ${order}, name = "${name}", state = ${state} },\n    `;
        }
    }

    let inputs = "";
    for (let i = 1; i <= inputCount; i++) {
        if (document.getElementById(`input-${i}`)) {
            const name = document.getElementById(`inputName-${i}`).value;
            const value = document.getElementById(`inputValue-${i}`).value;
            const whiteFilter = document.getElementById(`inputWhiteFilter-${i}`).value;
            const blackFilter = document.getElementById(`inputBlackFilter-${i}`).value;
            const maxTextLength = document.getElementById(`inputMaxLength-${i}`).value;
            const order = document.getElementById(`inputOrder-${i}`).value;
            inputs += `{ order = ${order}, name = "${name}", value = "${value}", whiteFilter = "${whiteFilter}", blackFilter = "${blackFilter}", maxTextLength = ${maxTextLength} },\n    `;
        }
    }

    let selectors = "";
    for (let i = 1; i <= selectorCount; i++) {
        if (document.getElementById(`selector-${i}`)) {
            const name = document.getElementById(`selectorName-${i}`).value;
            const selectedValue = document.getElementById(`selectorValue-${i}`).value;
            const type = document.getElementById(`selectorType-${i}`).value;
            let nestedValues = '';
            const nestedTable = document.getElementById(`nestedValuesBody-${i}`);
            if (nestedTable) {
                nestedValues = Array.from(nestedTable.children).map((row) => {
                    const key = row.cells[0].children[0].value;
                    const value = row.cells[1].children[0].value;
                    return `[ "${key}" ] = ${value}`;
                }).join(', ');
            }
            selectors += `{ name = "${name}", selectedValue = ${selectedValue}, values = { ${nestedValues} }, type = ${type} },\n    `;
        }
    }

    const luaCode = `
local UserInput_Inputs = {
    ${inputs}}
local UserInput_States = {
    ${states}}
local UserInput_Selectors = {
    ${selectors}}
local UserInput_Commands = {
    ${commands}}

local UserInputs = MessageBox({
     title               = "${title}"
    ,backColor           = "${backColor}"
    ,timeout             = ${timeout}
    ,timeoutResultCancel = ${timeoutResultCancel}
    ,timeoutResultID     = ${timeoutResultID}
    ,icon                = "${icon}"
    ,titleTextColor      = "${titleTextColor}"
    ,messageTextColor    = "${messageTextColor}"
    ,message             = "${message}"
    ,message_align_h     = ${message_align_h}
    ,message_align_v     = ${message_align_v}
    ,states              = UserInput_States
    ,inputs              = UserInput_Inputs
    ,selectors           = UserInput_Selectors
    ,commands            = UserInput_Commands
})
`.trim();

    document.getElementById("luaOutput").textContent = luaCode;
    Prism.highlightElement(document.getElementById("luaOutput"));
}

function copyCode() {
    const codeOutput = document.getElementById("luaOutput");
    const textArea = document.createElement("textarea");
    textArea.value = codeOutput.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    
    // Get the button element
    const copyButton = document.getElementById("copyButton");
    
    // Change the button text and style to indicate the code is copied
    copyButton.textContent = "Copied!";
    copyButton.style.backgroundColor = "#4CAF50"; // Set background color to green
    copyButton.style.color = "white"; // Set text color to white

    // After 3 seconds, reset the button text and style
    setTimeout(function() {
        copyButton.textContent = "Copy to Clipboard";
        copyButton.style.backgroundColor = ""; // Reset to default background
        copyButton.style.color = ""; // Reset to default text color
    }, 3000); // Reset after 3 seconds
}
