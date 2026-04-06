import { writable, derived } from 'svelte/store';

// ─── Contact form modal ───
export const contactOpen = writable(false);

// ─── Timeline item "Read More" modal ───
// Set to an object with { title, subtitle, fullText, meta, supporters, logoUrl } to open
export const timelineModal = writable(null);

// ─── What Makes Us WOW "Know More" modal ───
export const wowModalOpen = writable(false);

// ─── Vimeo lightbox ───
// Set to a non-empty vimeo ID string to open, '' to close
export const lightboxVimeoId = writable('');

// ─── Derived: is ANY modal currently open? (used for scroll-lock) ───
export const anyModalOpen = derived(
    [contactOpen, timelineModal, wowModalOpen, lightboxVimeoId],
    ([$c, $t, $w, $l]) => $c || $t !== null || $w || $l !== ''
);

// ─── Convenience helpers ───
export function openContact()  { contactOpen.set(true); }
export function closeContact() { contactOpen.set(false); }

export function openTimeline(item)  { timelineModal.set(item); }
export function closeTimeline()     { timelineModal.set(null); }

export function openWow()   { wowModalOpen.set(true); }
export function closeWow()  { wowModalOpen.set(false); }

export function openLightbox(id)  { lightboxVimeoId.set(id); }
export function closeLightbox()   { lightboxVimeoId.set(''); }
