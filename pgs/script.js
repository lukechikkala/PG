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
	var timeout                 = document.getElementById("timeout").value;
	var timeoutResultCancel     = document.getElementById("timeoutResultCancel");

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
            ,timeout             = "${timeout}"
            ,timeoutResultCancel = ${timeoutResultCancel}
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