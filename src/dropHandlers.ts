import { addChildAt, removeChildAt } from './utils';
import {
	wrapperClass,
} from './constants';
import { ContainerProps } from './interfaces';
import { DropResult, OnDropCallback } from './exportTypes';

export function domDropHandler({ element, draggables }: ContainerProps) {
	return (dropResult: DropResult, onDrop: OnDropCallback) => {
		const { removedIndex, addedIndex } = dropResult;
		let removedWrapper = null;
		if (removedIndex !== null) {
			removedWrapper = removeChildAt(element, removedIndex);
			draggables.splice(removedIndex, 1);
		}

		if (addedIndex !== null) {
			const wrapper = window.document.createElement('div');
			wrapper.className = `${wrapperClass}`;
			removedWrapper && removedWrapper.firstElementChild && wrapper.appendChild(removedWrapper.firstElementChild);
			addChildAt(element, wrapper, addedIndex);
			if (addedIndex >= draggables.length) {
				draggables.push(wrapper);
			} else {
				draggables.splice(addedIndex, 0, wrapper);
			}
		}

		if (onDrop) {
			onDrop(dropResult);
		}
	};
}

export function normalDropHandler() {
	return (dropResult: DropResult, onDrop: OnDropCallback) => onDrop && onDrop(dropResult);
}

export function reactDropHandler() {
	const handler = () => {
		return (dropResult: DropResult, onDrop: OnDropCallback) => {
			if (onDrop) {
				onDrop(dropResult);
			}
		};
	};

	return {
		handler
	};
}
