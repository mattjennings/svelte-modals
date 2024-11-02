Types:

SvelteModalComponent -> ModalComponent
LazySvelteModalComponent -> LazyModalComponent

Components:

children slot -> modals snippet

Methods:
modals.open(Modal, { replace: true }) will throw an error if the modal is not in the stack (legacy openModal will log instead)

TO DECIDE:

should modals.close() return boolean? or object?
