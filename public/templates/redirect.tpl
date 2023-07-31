<!DOCTYPE html>
<head>
   <title> Call JavaScript function on page load. </title>
</head>
   <body>
   <h2>My Awesome Custom Redirect Page</h2>
	<script type="text/javascript">
	function redirectFunction() {
		var url = window.location.href;
		var redirect = params.get("redirect");
		if(redirect){
			window.location.href = redirect;
		}
	}
	window.onload = redirectFunction;
   </script>
</body>
</html>