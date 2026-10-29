<script lang="ts">
	import MdiClose from '~icons/material-symbols/close-rounded'
	import MdiCoffee from '~icons/mdi/coffee-outline'
	import MdiArrowRight from '~icons/mdi/arrow-right'
	import MdiEmail from '~icons/mdi/email-outline'
	import { sponsorLocales, type SponsorLocale } from './sponsor'

	// A Sponsor pill led by the author's face, and the dialog it opens: her portrait, why she
	// needs help, then three steps that end at the Ko-fi button.
	let dialog: HTMLDialogElement
	let pill: HTMLButtonElement
	let locale: SponsorLocale = sponsorLocales[0]

	function open() {
		dialog.showModal()
	}

	function onclose() {
		pill.focus()
	}

	// A click on the backdrop closes the dialog; one on its own scrollbar also targets the dialog,
	// so only a click outside its box counts.
	function outside(event: MouseEvent) {
		if (event.target !== dialog) return
		const box = dialog.getBoundingClientRect()
		const { clientX: x, clientY: y } = event
		if (x < box.left || x > box.right || y < box.top || y > box.bottom) dialog.close()
	}

	const heart =
		'M12 21s-8.5-5.1-8.5-11.3A4.7 4.7 0 0 1 12 6.9a4.7 4.7 0 0 1 8.5 2.8C20.5 15.9 12 21 12 21Z'
</script>

<button
	bind:this={pill}
	type="button"
	class="sponsor"
	aria-label="Sponsor"
	aria-haspopup="dialog"
	on:click={open}
>
	<span class="face" aria-hidden="true">
		<img src="/sponsor-face.webp" alt="" width="26" height="26" decoding="async" />
		<svg class="face-heart" viewBox="0 0 24 24"><path d={heart} /></svg>
	</span>
	<span class="label">Sponsor</span>
</button>

<!-- Esc closes the dialog natively; the click handler only serves pointer users on the backdrop. -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	class="sponsor-dialog"
	aria-labelledby="sponsor-title"
	on:close={onclose}
	on:click={outside}
>
	<header>
		<h2 id="sponsor-title" lang={locale.lang}>{locale.label}</h2>
		<div class="locales" role="group" aria-label="Language">
			{#each sponsorLocales as l (l.code)}
				<button
					type="button"
					class="locale"
					lang={l.lang}
					aria-pressed={l === locale}
					on:click={() => (locale = l)}>{l.name}</button
				>
			{/each}
		</div>
		<button class="dismiss" type="button" aria-label={locale.close} on:click={() => dialog.close()}>
			<MdiClose />
		</button>
	</header>
	<div class="sheet" lang={locale.lang}>
		<div class="hero" aria-hidden="true">
			<span class="portrait">
				<img src="/sponsor-portrait.webp" alt="" width="112" height="112" decoding="async" />
				<svg class="heart" viewBox="0 0 24 24">
					<path d={heart} />
					<ellipse
						class="shine"
						cx="7.6"
						cy="9.6"
						rx="1.5"
						ry="2.1"
						transform="rotate(-30 7.6 9.6)"
					/>
				</svg>
			</span>
			<span class="spark s1">✦</span><span class="spark s2">✦</span><span class="spark s3">✦</span>
		</div>
		<p class="lead">{locale.lead}</p>
		<p class="ask">{locale.ask}</p>
		<section class="how">
			<h3>{locale.howTo}</h3>
			<ol class="steps" role="list">
				{#each locale.steps as step}<li>{step}</li>{/each}
			</ol>
		</section>
		<a class="kofi" href="https://ko-fi.com/mkpoli" target="_blank" rel="noreferrer noopener">
			<span class="mark" aria-hidden="true"><MdiCoffee /></span>
			<span class="copy"><strong>Ko-fi</strong><small>{locale.kofi}</small></span>
			<span class="arrow" aria-hidden="true"><MdiArrowRight /></span>
		</a>
		<a class="company" href="mailto:mkpoli@mkpo.li?subject=Sponsorship%20on%20munjan.mkpo.li">
			<MdiEmail aria-hidden="true" />
			<span class="copy"><strong>{locale.company}</strong><small>{locale.companyHint}</small></span>
		</a>
		<p class="thanks">{locale.thanks}</p>
	</div>
</dialog>

<style>
	.sponsor,
	.sponsor-dialog {
		color-scheme: light dark;
		--sp-ink: light-dark(#c2185b, #ffb3cd);
		--sp-heart: light-dark(#ff4f88, #ff7aa6);
		--sp-line: light-dark(#ffc2d6, #6b2c47);
		--sp-soft: light-dark(#fff1f5, #2f1822);
		--sp-ring: light-dark(#fff, #3d1a2b);
		--sp-surface: light-dark(#fff, #1f1b22);
		--sp-text: light-dark(#2a2128, #f3ecf0);
		--sp-muted: light-dark(#6b5b66, #c4b6bf);
		--sp-hover: light-dark(#f6edf1, #2d2630);
	}

	.sponsor {
		position: fixed;
		inset-block-start: 1.2rem;
		inset-inline-end: 1.2rem;
		z-index: 10;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		min-height: 2.4rem;
		padding-block: 0;
		padding-inline: 0.35rem 1rem;
		border: 1px solid var(--sp-line);
		border-radius: 999px;
		background: linear-gradient(135deg, light-dark(#ffe6ef, #3d1a2b), light-dark(#fff0e0, #3a2318));
		color: var(--sp-ink);
		font: inherit;
		font-size: 0.55em;
		font-weight: bold;
		white-space: nowrap;
		text-shadow: none;
		cursor: pointer;
		box-shadow: 0 2px 8px rgb(0 0 0 / 0.25);
	}

	.sponsor:focus-visible,
	.dismiss:focus-visible,
	.locale:focus-visible,
	.kofi:focus-visible,
	.company:focus-visible {
		outline: 2px solid var(--sp-ink);
		outline-offset: 2px;
	}

	.face {
		position: relative;
		flex: none;
		width: 1.65rem;
		height: 1.65rem;
	}

	.face img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 0 1.5px var(--sp-ring), 0 0 0 2.5px var(--sp-line);
	}

	.face-heart {
		position: absolute;
		inset-inline-end: -4px;
		bottom: -3px;
		width: 12px;
		height: 12px;
		fill: var(--sp-heart);
		stroke: var(--sp-ring);
		stroke-width: 2.5;
		paint-order: stroke;
		overflow: visible;
		transform-origin: 50% 60%;
	}

	@media (max-width: 720px) {
		.sponsor {
			width: 2.4rem;
			padding: 0;
			justify-content: center;
		}

		.label {
			display: none;
		}
	}

	.sponsor-dialog {
		width: min(480px, calc(100vw - 32px));
		max-height: calc(100dvh - 32px);
		padding: 0;
		border: 1px solid var(--sp-line);
		border-radius: 16px;
		background: var(--sp-surface);
		color: var(--sp-text);
		font-size: 10px;
		text-shadow: none;
		box-shadow: 0 30px 90px rgb(0 0 0 / 0.45);
		overflow: auto;
	}

	.sponsor-dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
		backdrop-filter: blur(4px);
	}

	header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-block: 14px 0;
		padding-inline: 24px 14px;
	}

	h2 {
		flex: 1;
		margin: 0;
		font-size: 18px;
		text-align: start;
	}

	.locales {
		display: flex;
		gap: 2px;
		padding: 2px;
		border-radius: 999px;
		background: var(--sp-soft);
		border: 1px solid var(--sp-line);
	}

	.locale {
		padding: 3px 9px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--sp-muted);
		font: inherit;
		font-size: 12px;
		cursor: pointer;
	}

	.locale[aria-pressed='true'] {
		background: var(--sp-ink);
		color: var(--sp-surface);
		font-weight: bold;
	}

	.dismiss {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: transparent;
		color: var(--sp-muted);
		font-size: 20px;
		cursor: pointer;
	}

	.dismiss:hover {
		background: var(--sp-hover);
		color: var(--sp-text);
	}

	.sheet {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 4px 24px 22px;
		font-size: 15px;
	}

	.sheet p {
		margin: 0;
		max-width: none;
		text-align: start;
	}

	.hero {
		position: relative;
		display: grid;
		place-items: center;
		height: 136px;
		background: radial-gradient(closest-side, light-dark(#ffd9e5, #4a1e31), transparent);
	}

	.portrait {
		position: relative;
		width: 112px;
		height: 112px;
	}

	.portrait img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 0 4px var(--sp-surface), 0 0 0 6px var(--sp-line),
			0 10px 24px rgb(255 79 136 / 0.3);
	}

	.heart {
		position: absolute;
		inset-inline-end: -2px;
		bottom: 2px;
		width: 34px;
		height: 34px;
		fill: var(--sp-heart);
		stroke: var(--sp-surface);
		stroke-width: 2;
		paint-order: stroke;
		overflow: visible;
		transform-origin: 50% 60%;
		filter: drop-shadow(0 3px 6px rgb(255 79 136 / 0.35));
	}

	.heart .shine {
		fill: #fff;
		stroke: none;
		opacity: 0.6;
	}

	.spark {
		position: absolute;
		color: var(--sp-heart);
		opacity: 0.75;
	}

	.s1 {
		top: 22px;
		left: calc(50% - 84px);
		font-size: 14px;
	}

	.s2 {
		top: 12px;
		left: calc(50% + 66px);
		font-size: 10px;
	}

	.s3 {
		bottom: 20px;
		left: calc(50% - 76px);
		font-size: 11px;
	}

	.lead {
		font-size: 15px;
		line-height: 1.65;
	}

	.ask {
		font-size: 16px;
		font-weight: bold;
		line-height: 1.5;
		color: var(--sp-ink);
	}

	.how {
		padding: 12px 14px;
		border: 1px dashed var(--sp-line);
		border-radius: 14px;
		background: var(--sp-soft);
	}

	h3 {
		margin: 0 0 8px;
		font-size: 13.5px;
		color: var(--sp-ink);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: step;
	}

	.steps li {
		display: flex;
		align-items: baseline;
		gap: 8px;
		font-size: 14px;
		line-height: 1.45;
		counter-increment: step;
	}

	.steps li::before {
		content: counter(step);
		display: grid;
		flex: none;
		place-items: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--sp-ink);
		color: var(--sp-soft);
		font-size: 11px;
		font-weight: bold;
		line-height: 1;
		transform: translateY(-1px);
	}

	.kofi {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-block: 12px;
		padding-inline: 12px 18px;
		border-radius: 999px;
		background: linear-gradient(135deg, #d81b60, #b0124f);
		color: #fff;
		text-decoration: none;
		box-shadow: 0 6px 16px rgb(216 27 96 / 0.32);
	}

	.mark {
		display: grid;
		flex: none;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: rgb(255 255 255 / 0.22);
		font-size: 20px;
	}

	.arrow {
		display: grid;
		flex: none;
		font-size: 18px;
	}

	.arrow:dir(rtl) {
		transform: scaleX(-1);
	}

	.copy {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
	}

	.copy strong {
		font-size: 14px;
	}

	.copy small {
		font-size: 12.5px;
		line-height: 1.4;
	}

	.kofi .copy strong {
		font-size: 16px;
	}

	.company {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 8px 12px;
		border-radius: 12px;
		color: var(--sp-muted);
		text-decoration: none;
	}

	.company:hover {
		background: var(--sp-hover);
		color: var(--sp-text);
	}

	.company > :global(svg) {
		flex: none;
		margin-top: 2px;
		font-size: 16px;
	}

	.company .copy strong {
		font-size: 13.5px;
		color: var(--sp-text);
	}

	.thanks {
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--sp-muted);
		text-align: center !important;
	}

	@media (prefers-reduced-motion: no-preference) {
		.sponsor {
			transition: transform 180ms ease, box-shadow 180ms ease;
		}

		.sponsor:hover {
			transform: translateY(-1px);
			box-shadow: 0 4px 12px rgb(255 79 136 / 0.4);
		}

		.face-heart,
		.heart {
			animation: beat 2.8s ease-in-out infinite;
		}

		.sponsor:hover .face-heart,
		.sponsor:focus-visible .face-heart {
			animation: bounce 0.6s ease-in-out infinite;
		}

		.spark {
			animation: twinkle 2.4s ease-in-out infinite;
		}

		.s2 {
			animation-delay: 0.8s;
		}

		.s3 {
			animation-delay: 1.6s;
		}

		.sponsor-dialog[open] {
			animation: arrive 0.32s cubic-bezier(0.2, 0.8, 0.2, 1);
		}

		.kofi {
			transition: transform 180ms ease, box-shadow 180ms ease;
		}

		.kofi:hover {
			transform: translateY(-1px);
			box-shadow: 0 8px 22px rgb(216 27 96 / 0.42);
		}
	}

	@keyframes beat {
		0%,
		70%,
		100% {
			transform: scale(1);
		}
		78% {
			transform: scale(1.18);
		}
		86% {
			transform: scale(0.96);
		}
		93% {
			transform: scale(1.1);
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0) scale(1);
		}
		40% {
			transform: translateY(-2px) scale(1.18) rotate(-8deg);
		}
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.2;
			transform: scale(0.7);
		}
		50% {
			opacity: 0.9;
			transform: scale(1);
		}
	}

	@keyframes arrive {
		from {
			opacity: 0;
			transform: translateY(14px) scale(0.98);
		}
	}
</style>
