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

    var nodes = document.querySelectorAll('[id]');
var ids = {};
var totalNodes = nodes.length;

for(var i=0; i<totalNodes; i++) {
    var currentId = nodes[i].id ? nodes[i].id : "undefined";
    if(isNaN(ids[currentId])) {
        ids[currentId] = 0;
    }                 
    ids[currentId]++;
}

console.log(ids);

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
            ,commands = {{value = 1, name = "Ok"}, {value = 0, name = "Cancel"}}
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
    // count childeren off "commands"
    let numb = document.getElementById("commands").children.length;
    // Define the parent
    var parent = document.getElementById("commandsCopy");

    NodeList.prototype.forEach = Array.prototype.forEach;
    // Get the children from the parent node
    var children = parent.childNodes;
    // Go though the list of children
    children.forEach(function(item){
      // create var for the cloned node
      var cln = item.cloneNode(true);
      // Change the ID of the cloned Node
      var name = cln.id;
      //Give the line the correct number: Line0, Line1......
      for (let i = 0; i < 5; i++) {
        var id = document.getElementById(cln.id+i);
        if (id){}
        else{
            cln.id = cln.id+i;
            break;
        }
      }

      var childOfChild = cln.childNodes;
      for (var i = 0; i < childOfChild.length; i++) {
        if(childOfChild[i].id=="RemoveButton"){
            childOfChild[i].onclick = function() { removeCommandField(numb); };
        }else{
            childOfChild[i].id += numb;
        }
      }
      // Assign the clone to the document
      document.getElementById("commands").appendChild(cln);
    });
     // now we want to asign a number to the remove button within the node
    
       
}

//--------------------------------------------------------------------------------------------------

function removeCommandField(button)
{
    const element = document.getElementById('Line'+button);
    element.remove();
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