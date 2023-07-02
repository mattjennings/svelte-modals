/** @typedef {typeof __propDef.props}  ModalsProps */
/** @typedef {typeof __propDef.events}  ModalsEvents */
/** @typedef {typeof __propDef.slots}  ModalsSlots */
export default class Modals extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    backdrop: {};
    default: {};
    loading: {};
}> {
}
export type ModalsProps = typeof __propDef.props;
export type ModalsEvents = typeof __propDef.events;
export type ModalsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        backdrop: {};
        default: {};
        loading: {};
    };
};
export {};
