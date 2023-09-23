<script lang="ts">
	export let inView: boolean[]

	const NAV_ITEMS = ['Home', 'Introduction', 'Converter', 'Wordlist']
</script>

<nav>
	<ul>
		{#each NAV_ITEMS as item, index}
			<a href={`#${item.toLowerCase()}`}>
				<li class:active={inView[index]} title={item}>
					<span>{item}</span>
				</li>
			</a>
		{/each}
	</ul>
</nav>

<style>
	nav {
		color: white;

		position: fixed;
	}

	ul {
		list-style-type: square;
	}

	li {
		transition: color 0.5s, transform 0.5s;
		transform-origin: left;
	}

	li.active {
		color: #00defb;
		transform: scale(1.2);
		/* font-size: 1.25em; */
	}

	li span {
		transition: opacity 1s;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	@media screen and (max-width: 1024px) {
		li span {
			opacity: 0;
		}
	}

	@media screen and (max-width: 768px) {
		nav {
			display: none;
		}
	}
</style>
