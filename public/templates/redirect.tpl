<!DOCTYPE html>
<head>
   <title> Call JavaScript function on page load. </title>
</head>
   <body onload = "redirectFunction()" >
   <h2>My Awesome Custom Redirect Page</h2>
	<script type="text/javascript">
      let message = document.getElementById("message");
		function welcomeFunction() {
			var url = window.location.href;
			var redirect = params.get("redirect");
			if(redirect){
				window.location.href = redirect;
			}
		}
   </script>
</body>
</html>