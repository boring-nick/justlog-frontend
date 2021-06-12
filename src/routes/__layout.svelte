<script lang="ts">
	import 'bootstrap-dark-5/dist/css/bootstrap-night.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
</script>

<header class="navbar navbar-dark bg-dark mb-2">
	<div class="container-fluid">
		<span class="navbar-brand mb-0 h1">justlog</span>
		<ul class="nav">
			<li class="nav-item">
				<a class="nav-link" href="/">Logs</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/settings">Settings</a>
			</li>
		</ul>
	</div>
</header>
<div class="container flex-grow-1 d-flex flex-column">
	<slot />
</div>
