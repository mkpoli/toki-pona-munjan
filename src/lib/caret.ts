import type { Action, ActionReturn } from 'svelte/action'

interface Attributes {
	'on:caretmove': (
		event: CustomEvent<{
			rect: DOMRect
			selection: {
				start: number
				end: number
			}
		}>
	) => void
}

export function caret(node: Element): ActionReturn<undefined, Attributes> {
	if (!(node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement)) {
		throw new Error('This directive only works with <input> and <textarea> elements')
	}

	const updateCursorXY = () => {
		const selectionPoint = node.selectionEnd ?? 0

		const { offsetLeft: inputX, offsetTop: inputY } = node
		const div = document.createElement('div')
		const copyStyle = getComputedStyle(node) as CSSStyleDeclaration

		for (const prop of Array.from(copyStyle)) {
			if (copyStyle.hasOwnProperty(prop)) {
				;(div.style as any)[prop] = copyStyle[prop as any]
			}
		}

		const swap = '.'
		const inputValue = node.tagName === 'INPUT' ? node.value.replace(/ /g, swap) : node.value
		const textContent = inputValue.substring(0, selectionPoint)
		div.textContent = textContent

		if (node.tagName === 'TEXTAREA') div.style.height = 'auto'
		if (node.tagName === 'INPUT') div.style.width = 'auto'

		const span = document.createElement('span')
		span.textContent = inputValue.substring(selectionPoint) || '.'
		div.appendChild(span)
		document.body.appendChild(div)
		const {
			offsetLeft: spanX,
			offsetTop: spanY,
			offsetWidth: spanWidth,
			offsetHeight: spanHeight
		} = span
		document.body.removeChild(div)

		const x = inputX + spanX
		const y = inputY + spanY
		const width = spanWidth
		const height = spanHeight

		const event = new CustomEvent('caretmove', {
			detail: {
				rect: new DOMRect(x, y, width, height),
				selection: {
					start: node.selectionStart ?? 0,
					end: node.selectionEnd ?? 0
				}
			}
		})

		node.dispatchEvent(event)
	}

	node.addEventListener('input', updateCursorXY)
	node.addEventListener('selectchange', updateCursorXY)
	node.addEventListener('keyup', updateCursorXY)
	node.addEventListener('click', updateCursorXY)
	window.addEventListener('resize', updateCursorXY)
	updateCursorXY()

	return {
		destroy() {
			node.removeEventListener('input', updateCursorXY)
			node.removeEventListener('selectchange', updateCursorXY)
			node.removeEventListener('keyup', updateCursorXY)
			node.removeEventListener('click', updateCursorXY)
			window.removeEventListener('resize', updateCursorXY)
		}
	}
}
