import type { SvelteComponentTyped } from 'svelte';
export declare const exitBeforeEnter: import("svelte/store").Writable<boolean>;
/**
 * The transition state of the modals
 */
export declare const transitioning: import("svelte/store").Writable<boolean | null>;
/**
 * A Svelte store containing the current modal stack
 */
export declare const modals: import("svelte/store").Writable<StoredModal[]>;
interface StoredModal {
    component: SvelteModalComponent<any> | LazySvelteModalComponent<any>;
    props?: Record<string, unknown>;
    callbacks?: {
        onBeforeClose?: () => boolean | void;
    };
}
/**
 * A Svelte store describing how the current modal came to be active ("push" or "pop").
 * This can be useful for transitions if they should animate differently based on the action.
 */
export declare const action: import("svelte/store").Writable<"push" | "pop" | null>;
/**
 * Closes all modals in the stack.
 *
 * If closing was prevented by the current modal, it returns false
 */
export declare function closeAllModals(): boolean;
/**
 * Closes the last `amount` of modals in the stack
 *
 * If closing was prevented by the current modal, it returns false
 */
export declare function closeModals(amount?: number): boolean;
/**
 * Closes the current modal component
 *
 * If closing was prevented by the current modal, it returns false
 */
export declare function closeModal(): boolean;
/**
 * Opens a new modal
 */
export declare function openModal<Props extends Record<string, any> = any>(component: SvelteModalComponent<Props, any, any> | LazySvelteModalComponent<Props, any, any>, props?: Omit<Props, 'isOpen'>, options?: {
    /**
     * This modal will replace the last modal in the stack
     */
    replace?: boolean;
}): void;
/**
 * Return false to prevent the current modal from being closed
 */
export declare function onBeforeClose(callback: () => boolean | void): void;
export type SvelteModalComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> = new (...args: any) => SvelteComponentTyped<Props, Events, Slots>;
export type LazySvelteModalComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> = () => Promise<{
    default: SvelteModalComponent<Props, Events, Slots>;
}>;
export {};
