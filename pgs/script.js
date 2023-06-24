/*

Function Names: Camel Case
Variable Names: Camel Case with underscores replacing spaces.


*/

function RedirectToHome()
{
    window.location.href = "../index.html";
}

function generateMessageBoxCode()
{
    var title                   = document.getElementById("title").value;
    var message                 = document.getElementById("message").value;
    var titleTextColor          = document.getElementById("titleTextColor").value;
    var messageTextColor        = document.getElementById("messageTextColor").value;
    var backColor               = document.getElementById("backColor").value;
    var icon                    = document.getElementById("icon").value;
    var timeout                 = +document.getElementById("timeout").value;
    var timeoutResultCancel     = document.getElementById("timeoutResultCancel");
    var timeoutResultID 	    = +document.getElementById("timeoutResultID").value;

    if ( timeoutResultCancel.checked )
    {
        timeoutResultCancel = "true"
    }
    else
    {
        timeoutResultCancel = "false"
    }

    var code = `MessageBox({
             title               = "${title}"
            ,message             = "${message}"
            ,titleTextColor      = "${titleTextColor}"
            ,messageTextColor    = "${messageTextColor}"
            ,backColor           = "${backColor}"
            ,icon                = "${icon}"
            ,timeout             = ${timeout}
            ,timeoutResultCancel = ${timeoutResultCancel}
            ,timeoutResultID     = ${timeoutResultID}
            });`;

    document.getElementById("generatedCode").textContent = code;
    document.getElementById("codeOutput").style.display = "block";
}

function validate_timeout()
{
    var timeoutinput            = document.getElementById( "timeout" );
    var timeoutvalue            = parseInt( timeoutinput.value );

    if ( isNaN( timeoutvalue ) || timeoutvalue < 0 || timeoutvalue > 60 )
    {
        timeoutinput.value      = "";
    }
}

function CopyToClipboard()
{
    var copyText                = document.getElementById( "generatedCode" );
    var codeText                = copyText.textContent;
    var textarea                = document.createElement( "textarea" );
    textarea.value              = codeText;

    document.body.appendChild( textarea );
    textarea.select();
    document.execCommand( "copy" );
    document.body.removeChild( textarea );
}

//--------------------------------------------------------------------------------------------------

function AddCommandField()
{
    var Command_Field       = document.getElementById( "commands" );
    var CommandValue        = document.getElementById("Commands_Value[]");
    var CommandName         = document.getElementById("Commands_Name[]");

    if ( CommandValue.value.length > 0 && CommandName.value.length > 0 )
    {
        var New_Input_Value             = document.createElement( "input"  );
        var New_Input_Name              = document.createElement( "input"  );
        var New_Remove_Button           = document.createElement( "button" );
        var line_break                  = document.createElement(   "br"   );

        New_Input_Value.type            = "text";
        New_Input_Value.id              = "Commands_Value[]";
        New_Input_Value.placeholder     = "Value";
        New_Input_Value.setAttribute( "oninput", "ValidateCommands()" );
        //-----------------------------------------
        New_Input_Name.type             = "text";
        New_Input_Name.id               = "Commands_Name[]";
        New_Input_Name.placeholder      = "Name";
        //-----------------------------------------
        New_Remove_Button.type          = "button";
        New_Remove_Button.id            = "RemoveButton";
        New_Remove_Button.style.display = "inline";
        New_Remove_Button.setAttribute("onclick", "removeCommandField(this)");
        // New_Remove_Button.value         = "-";
        New_Remove_Button.textContent   = "-";
        //-----------------------------------------
        Command_Field.appendChild( New_Input_Value   );
        Command_Field.appendChild( New_Input_Name    );
        Command_Field.appendChild( New_Remove_Button );
        Command_Field.appendChild( line_break        );
    }
    else
    {
        alert( "Enter at least one Command Value & Name" );
    }
}

//--------------------------------------------------------------------------------------------------

function removeCommandField(button)
{
    //--------------------------------------------------------------------------------------------------
    // This is a perfect code to reset the fields.
    // Use this when RemoveButton is pressed with first set of Value & Name filled in.
    // Command_Field.innerHTML           = `
    // <input type="text" id="Commands_Value[]" placeholder="Value" oninput="ValidateCommands()">
    // <input type="text" id="Commands_Name[]"  placeholder="Name">
    // <button type="button" id="RemoveButton" onclick="removeCommandField(this)" style="display: none;">-</button>
    // <br>
    // `;
    // Command_Field.innerHTML     = '<button type="button" id="RemoveButton" onclick="removeCommandField(this)" style="display: none;">-</button>';
    //--------------------------------------------------------------------------------------------------

    var This_Div                    = document.getElementById( "commands" )
    var Available_Commands          = This_Div.getElementsByTagName( "input" );
    var Available_Commands_count    = Available_Commands.length;
    console.log( "Number of input fields : ", Available_Commands_count );

    if ( Available_Commands_count == 2 )
    {
        console.log( "These are basic command fields, if you don't needs them, just don't use them." )
    }
    else
    {
        var commandField = button.parentNode;
        commandField.parentNode.removeChild(commandField);
    }
}

function ValidateCommands()
{
    var CommandValue        = document.getElementById("Commands_Value[]");
    var CommandName         = document.getElementById("Commands_Name[]");
    var RemoveButton_O        = document.getElementById("RemoveButton");

    CommandValue.addEventListener( "input", function()
    {
        if( CommandValue.value.length > 0 )
        {
            // Not sure why but the "Remove" button only appears after "Value" has more than 1 character.
            RemoveButton_O.style.display = "inline";
        }
    } );
}

/*
24.Jun.2023
Saturday
11:03

removeCommandField(button) deletes all the contents of "commands".
ValidateCommands() doesn't necessarily validate the current field.
*/