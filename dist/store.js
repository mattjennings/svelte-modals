import { get, writable } from 'svelte/store';
export const exitBeforeEnter = writable(false);
/**
 * The transition state of the modals
 */
export const transitioning = writable(null);
/**
 * A Svelte store containing the current modal stack
 */
export const modals = writable([]);
/**
 * A Svelte store describing how the current modal came to be active ("push" or "pop").
 * This can be useful for transitions if they should animate differently based on the action.
 */
export const action = writable(null);
/**
 * Closes all modals in the stack.
 *
 * If closing was prevented by the current modal, it returns false
 */
export function closeAllModals() {
    const modalsLength = get(modals).length;
    const currentModal = get(modals)[modalsLength - 1];
    if (currentModal?.callbacks?.onBeforeClose) {
        if (currentModal?.callbacks?.onBeforeClose() === false) {
            return false;
        }
    }
    modals.set([]);
    return true;
}
/**
 * Closes the last `amount` of modals in the stack
 *
 * If closing was prevented by the current modal, it returns false
 */
export function closeModals(amount = 1) {
    const modalsLength = get(modals).length;
    const currentModal = get(modals)[modalsLength - 1];
    if (get(transitioning)) {
        return false;
    }
    if (currentModal?.callbacks?.onBeforeClose) {
        if (currentModal?.callbacks?.onBeforeClose() === false) {
            return false;
        }
    }
    if (get(exitBeforeEnter) && modalsLength > 0) {
        transitioning.set(true);
    }
    exitBeforeEnter.set(false);
    action.set('pop');
    pop(amount);
    return true;
}
/**
 * Closes the current modal component
 *
 * If closing was prevented by the current modal, it returns false
 */
export function closeModal() {
    return closeModals(1);
}
/**
 * Opens a new modal
 */
export function openModal(component, props, options) {
    if (get(transitioning)) {
        return;
    }
    action.set('push');
    if (get(exitBeforeEnter) && get(modals).length) {
        transitioning.set(true);
    }
    exitBeforeEnter.set(false);
    if (options?.replace) {
        modals.update((prev) => [...prev.slice(0, prev.length - 1), { component, props }]);
    }
    else {
        modals.update((prev) => [...prev, { component, props }]);
    }
}
/**
 * Return false to prevent the current modal from being closed
 */
export function onBeforeClose(callback) {
    modals.update((prev) => {
        const modal = prev[prev.length - 1];
        modal.callbacks = {
            ...modal.callbacks,
            onBeforeClose: callback
        };
        return prev;
    });
}
function pop(amount = 1) {
    modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)));
}
