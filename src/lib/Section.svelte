<script lang="ts">
	import { inview } from 'svelte-inview'
	import { createEventDispatcher } from 'svelte'
	import { fade, type TransitionConfig } from 'svelte/transition'
	import { cubicOut, cubicInOut } from 'svelte/easing'
	export let id: string
	export let style: string

	const dispatch = createEventDispatcher<{
		enter: void
		leave: void
	}>()

	let inView = false

	function fadeScale(
		node: Element,
		{ delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}
	): TransitionConfig {
		const style = getComputedStyle(node)
		const target_opacity = +style.opacity
		const transform = style.transform === 'none' ? '' : style.transform
		const sd = 1 - start
		const od = target_opacity * (1 - opacity)
		return {
			delay,
			duration,
			easing,
			css: (_t, u) => `
      transform: ${transform} scale(${1 - sd * u});
      opacity: ${target_opacity - od * u}
    `
		}
	}
</script>

<section
	{id}
	use:inview={{ rootMargin: '-30%' }}
	class:active={inView}
	{style}
	on:inview_enter={() => dispatch('enter')}
	on:inview_leave={() => dispatch('leave')}
	on:inview_change={({ detail }) => (inView = detail.inView)}
>
	{#if inView}
		<div
			in:fadeScale={{ duration: 850, delay: 0, start: 0.98, opacity: 0.5 }}
			out:fade={{ duration: 850 }}
		>
			<slot />
		</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-shadow: 0 0 2em rgba(0, 0, 0, 0.5), 0 0 0.5em rgba(0, 0, 0, 0.25),
			0 0 0.1em rgba(0, 0, 0, 0.1);
		padding: 0 2em;
	}
</style>
