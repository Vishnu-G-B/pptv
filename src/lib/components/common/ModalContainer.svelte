<script>
    import { browser } from '$app/environment';
    import {
        contactOpen, closeContact,
        timelineModal, closeTimeline,
        wowModalOpen, closeWow,
        lightboxVimeoId, closeLightbox,
        anyModalOpen
    } from '$lib/stores/modalStore.js';

    // ─── Scroll lock ───
    // Simple overflow:hidden approach — safe with GSAP (doesn't move the DOM)
    $: if (browser) {
        document.body.style.overflow = $anyModalOpen ? 'hidden' : '';
    }

    // ─── Keyboard handler ───
    function handleKeydown(e) {
        if (e.key !== 'Escape') return;
        if ($lightboxVimeoId)  { closeLightbox(); return; }
        if ($timelineModal)    { closeTimeline(); return; }
        if ($wowModalOpen)     { closeWow();      return; }
        if ($contactOpen)      { closeContact();  return; }
    }

    // ─── Team data for WOW modal ───
    const coreTeam = [
        { name: 'Shweta Parakh',       role: 'Founder, Director' },
        { name: 'Kriti Gandhi',         role: 'Co-Founder, Director' },
        { name: 'Sheila Bhattacharya',  role: 'Academic Head' },
        { name: 'Shivain Arora',        role: 'PPL Core Crew' },
        { name: 'Krishnam Gupta',       role: 'PPL Core Crew' },
        { name: 'Nilesh Pandey',        role: 'PPL Core Crew' },
        { name: 'Rigzen Angchok',       role: 'PPL Core Crew' },
        { name: 'Skarma Gyatso',        role: 'PPL Core Crew' },
        { name: 'Tanya Jain',           role: 'PPL Core Crew' },
        { name: 'Lucas Chan',           role: 'PPL Core Crew' },
        { name: 'Forum Shah',           role: 'Design Head' },
        { name: 'Anand Juvatkar',       role: 'Design Team' },
        { name: 'Asmi Parte',           role: 'Events Team' },
        { name: 'Vishnu Bhattacharya',  role: 'Web Team' },
        { name: 'Vaibhav Sharma',       role: 'Web Team' },
    ];

    const advisors = [
        { name: 'Kausar Syed',      role: 'Academic Advisor, Learn2Lead' },
        { name: 'Jitendra Mishra',  role: 'Filmmaker, Advisor, Cinema4Good' },
        { name: 'Bhavin Shah',      role: 'EW Foundation' },
        { name: 'Yash Nagarkoti',   role: 'Producer, Hooray Films' },
        { name: 'Ronak Vaya',       role: 'Tech Advisor, The Odin Tech' },
        { name: 'Manav Ahuja',      role: 'Film & Media' },
        { name: 'Urvaksh Khursetji', role: 'Finance Advisor' },
        { name: 'Roshni Lachwani',  role: 'Legal Advisor' },
        { name: 'Rixin Stanzin',    role: 'Film & Media' },
        { name: 'Brinda Thamman',   role: 'Film & Media' },
    ];

    // ─── Contact form (FormSubmit.co) ───
    // IMPORTANT: Replace with the real PPL email address.
    // On first submit, FormSubmit.co sends a confirmation email — click it once to activate.
    const FORMSUBMIT_EMAIL = 'vishnub2710@gmail.com';

    const projects = [
        'Academic Creators Lab',
        'Kidding Around Bharat',
        'ECA TV',
        'Project Gullak',
        'Swadeshplex / ONEderfull Watchlist',
        'Young India Filmmakers (YIF)',
        'General Enquiry',
    ];

    let form = { name: '', phone: '', email: '', project: '', message: '' };
    let honeypot = '';
    let formStatus = ''; // '' | 'sending' | 'success' | 'error'
    let formError = '';

    async function submitForm() {
        if (formStatus === 'sending') return;
        // Silently drop bot submissions that filled the honeypot
        if (honeypot) return;
        if (!form.name.trim() || !form.email.trim() || !form.project || !form.message.trim()) {
            formError = 'Please fill in all required fields.';
            return;
        }
        formError = '';
        formStatus = 'sending';
        try {
            const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name:     form.name,
                    email:    form.email,
                    phone:    form.phone || '—',
                    project:  form.project,
                    message:  form.message,
                    _subject: `PPL Website Enquiry — ${form.project}`,
                    _honey:   honeypot,
                    _template: 'table',
                })
            });
            const data = await res.json();
            if (data.success === 'true' || data.success === true) {
                formStatus = 'success';
                form = { name: '', phone: '', email: '', project: '', message: '' };
            } else {
                formStatus = 'error';
                formError = data.message || 'Something went wrong. Please try again.';
            }
        } catch {
            formStatus = 'error';
            formError = 'Network error — please check your connection and try again.';
        }
    }

    function resetForm() {
        formStatus = '';
        formError = '';
        honeypot = '';
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<!-- ═══════════════════════════════════════════════════════
     1. VIMEO LIGHTBOX
═══════════════════════════════════════════════════════ -->
{#if $lightboxVimeoId}
    <div
        class="ppl-modal-backdrop"
        on:click|self={closeLightbox}
        role="dialog" aria-modal="true" aria-label="Film player"
    >
        <div class="relative w-full max-w-4xl" style="aspect-ratio: 16/9;">
            <iframe
                class="absolute inset-0 w-full h-full rounded-xl"
                src="https://player.vimeo.com/video/{$lightboxVimeoId}?autoplay=1&loop=0&transparent=0&byline=0&title=0&portrait=0"
                title="Film player"
                frameborder="0"
                allow="autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        <button on:click={closeLightbox} class="ppl-modal-close-top" aria-label="Close player">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    </div>
{/if}

<!-- ═══════════════════════════════════════════════════════
     2. TIMELINE ITEM "READ MORE" MODAL
═══════════════════════════════════════════════════════ -->
{#if $timelineModal}
    {@const item = $timelineModal}
    <div
        class="ppl-modal-backdrop"
        on:click|self={closeTimeline}
        role="dialog" aria-modal="true" aria-label="{item.title} details"
    >
        <div class="ppl-modal-card">
            <!-- Sticky header -->
            <div class="ppl-modal-header">
                <div>
                    {#if item.logoUrl}
                        <img src={item.logoUrl} alt="logo" class="h-10 w-auto object-contain mb-2"/>
                    {/if}
                    {#if item.subtitle}
                        <p class="text-brand-orange text-xs uppercase tracking-widest font-bold mb-1">{item.subtitle}</p>
                    {/if}
                    <h3 class="text-xl md:text-2xl font-bold text-white leading-tight" style="font-family: Arial">
                        {item.title}
                    </h3>
                </div>
                <button on:click={closeTimeline} class="ppl-modal-close-btn" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <!-- Body -->
            <div class="px-6 md:px-10 py-8 flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    {#each (item.fullText || item.text || '').split('\n').filter(p => p.trim()) as para}
                        <p class="text-white/80 text-base leading-relaxed">{para}</p>
                    {/each}
                </div>
                {#if item.meta && item.meta.length > 0}
                    <div class="flex flex-row flex-wrap gap-3 pt-2">
                        {#each item.meta as m}
                            <div class="bg-white/10 rounded-full px-4 py-1">
                                <span class="text-xs text-brand-orange font-bold uppercase tracking-widest">{m.label}: </span>
                                <span class="text-xs text-white">{m.value}</span>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if item.supporters && item.supporters.length > 0}
                    <div class="border-t border-white/10 pt-6 flex flex-col gap-5">
                        {#each item.supporters as s}
                            <div>
                                <p class="text-brand-orange text-xs uppercase tracking-widest font-bold mb-2">{s.heading}</p>
                                {#each s.names as name}
                                    <p class="text-white/70 text-sm">{name}</p>
                                {/each}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<!-- ═══════════════════════════════════════════════════════
     3. WHAT MAKES US WOW — "KNOW MORE" MODAL
═══════════════════════════════════════════════════════ -->
{#if $wowModalOpen}
    <div
        class="ppl-modal-backdrop"
        on:click|self={closeWow}
        role="dialog" aria-modal="true" aria-label="About Purple People Labs"
    >
        <div class="ppl-modal-card">
            <div class="ppl-modal-header">
                <div>
                    <p class="text-brand-orange text-xs uppercase tracking-widest font-bold mb-1">Purple People Labs</p>
                    <h3 class="text-xl md:text-2xl font-bold text-white" style="font-family: Arial">
                        Our Founder &amp; Crew / Family
                    </h3>
                </div>
                <button on:click={closeWow} class="ppl-modal-close-btn" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="px-6 md:px-10 py-8 flex flex-col gap-8">
                <div class="flex flex-col gap-4">
                    <h4 class="text-brand-orange font-bold text-sm uppercase tracking-widest">Founder</h4>
                    <p class="text-white/80 text-base leading-relaxed">
                        <span class="text-white font-bold">Shweta Parakh – Founder, Director</span> is a teacher, filmmaker and entrepreneur. She travelled across India to 70+ cities and villages, with <em>a film school in her bag</em> to mentor and capture children's perspective of the world on life, relationships, dreams, love, hope and all the little things that matter as Short Films.
                    </p>
                    <p class="text-white/70 text-base leading-relaxed">
                        At 13 yrs, she started with a Limca Book Record for being a part of India's first inhouse tv channel run by children. She then went on to learn from 30 roles in film and media — journalist, RJ, television producer, film producer — with leading media companies: Times NIE, Radio ONE, Hungama TV, Zee TV, TV9 News, and finally found her purpose in edutainment led social impact with Purple People Labs.
                    </p>
                    <p class="text-white/70 text-base leading-relaxed">
                        Co-founder <span class="text-white font-bold">Kriti Gandhi</span> is a Hong Kong based journalist and producer with a keen interest in capturing impactful stories of real life heroes. Kriti aligned with the soul of Purple People Labs just like Shivain Arora and Krishnam Gupta who walked in as young filmmakers and grew as a family.
                    </p>
                </div>
                <div>
                    <h4 class="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">Core Crew</h4>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {#each coreTeam as m}
                            <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                <p class="text-white text-sm font-bold">{m.name}</p>
                                <p class="text-white/50 text-xs mt-0.5">{m.role}</p>
                            </div>
                        {/each}
                    </div>
                </div>
                <div>
                    <h4 class="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">Advisors &amp; Extended Family</h4>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {#each advisors as m}
                            <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                <p class="text-white text-sm font-bold">{m.name}</p>
                                <p class="text-white/50 text-xs mt-0.5">{m.role}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- ═══════════════════════════════════════════════════════
     4. CONTACT FORM MODAL
═══════════════════════════════════════════════════════ -->
{#if $contactOpen}
    <div
        class="ppl-modal-backdrop"
        on:click|self={closeContact}
        role="dialog" aria-modal="true" aria-label="Contact Purple People Labs"
    >
        <div class="ppl-modal-card max-w-2xl">
            <div class="ppl-modal-header">
                <div>
                    <p class="text-brand-orange text-xs uppercase tracking-widest font-bold mb-1">Get In Touch</p>
                    <h3 class="text-xl md:text-2xl font-bold text-white" style="font-family: Arial">
                        Let's Make A Difference Together
                    </h3>
                </div>
                <button on:click={closeContact} class="ppl-modal-close-btn" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <div class="px-6 md:px-10 py-8">
                {#if formStatus === 'success'}
                    <div class="flex flex-col items-center gap-4 py-8 text-center">
                        <div class="bg-brand-green/20 rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-white">Message Sent!</h3>
                        <p class="text-white/60">Thank you for reaching out. We'll get back to you soon.</p>
                        <button on:click={resetForm}
                            class="mt-2 text-brand-orange font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">
                            Send Another Message
                        </button>
                    </div>
                {:else}
                    <div class="flex flex-col gap-5">
                        <!-- Row 1: Name + Phone -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="flex flex-col gap-1.5">
                                <label for="mc-name" class="ppl-label">Name <span class="text-brand-orange">*</span></label>
                                <input id="mc-name" type="text" bind:value={form.name}
                                    placeholder="Your full name" class="ppl-input"/>
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <label for="mc-phone" class="ppl-label">Phone Number</label>
                                <input id="mc-phone" type="tel" bind:value={form.phone}
                                    placeholder="+91 00000 00000" class="ppl-input"/>
                            </div>
                        </div>
                        <!-- Row 2: Email -->
                        <div class="flex flex-col gap-1.5">
                            <label for="mc-email" class="ppl-label">Email <span class="text-brand-orange">*</span></label>
                            <input id="mc-email" type="email" bind:value={form.email}
                                placeholder="you@example.com" class="ppl-input"/>
                        </div>
                        <!-- Row 3: Project dropdown -->
                        <div class="flex flex-col gap-1.5">
                            <label for="mc-project" class="ppl-label">
                                What Project Are You Interested In? <span class="text-brand-orange">*</span>
                            </label>
                            <div class="relative">
                                <select id="mc-project" bind:value={form.project}
                                    class="w-full appearance-none ppl-input {form.project ? 'text-white' : 'text-white/30'}">
                                    <option value="" disabled selected class="bg-[#250025]">Select a project</option>
                                    {#each projects as p}
                                        <option value={p} class="bg-[#250025] text-white">{p}</option>
                                    {/each}
                                </select>
                                <div class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <!-- Row 4: Message -->
                        <div class="flex flex-col gap-1.5">
                            <label for="mc-message" class="ppl-label">Message <span class="text-brand-orange">*</span></label>
                            <textarea id="mc-message" bind:value={form.message}
                                placeholder="Tell us about yourself or what you have in mind…"
                                rows="5" class="ppl-input resize-none"></textarea>
                        </div>
                        <!-- Honeypot — invisible to humans, filled by bots -->
                        <input
                            type="text"
                            name="_honey"
                            bind:value={honeypot}
                            tabindex="-1"
                            autocomplete="off"
                            aria-hidden="true"
                            style="position:absolute;left:-9999px;opacity:0;height:0;width:0;pointer-events:none;"
                        />
                        <!-- Error -->
                        {#if formError}
                            <p class="text-red-400 text-sm">{formError}</p>
                        {/if}
                        <!-- Submit -->
                        <button on:click={submitForm} disabled={formStatus === 'sending'}
                            class="w-full py-4 rounded-xl font-bold text-base uppercase tracking-widest transition-all duration-200
                                   {formStatus === 'sending'
                                       ? 'bg-primary/50 text-white/50 cursor-not-allowed'
                                       : 'bg-primary text-white hover:bg-primary/80 active:scale-[0.98]'}">
                            {formStatus === 'sending' ? 'Sending…' : '#GoPurple — Send Message'}
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    /* ── Shared modal backdrop ── */
    :global(.ppl-modal-backdrop) {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    /* ── Modal card ── */
    :global(.ppl-modal-card) {
        background: #1a0020;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 1rem;
        width: 100%;
        max-width: 48rem;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        position: relative;
    }

    /* ── Modal header ── */
    :global(.ppl-modal-header) {
        position: sticky;
        top: 0;
        background: rgba(26, 0, 32, 0.97);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding: 1.25rem 1.5rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        z-index: 10;
    }

    @media (min-width: 768px) {
        :global(.ppl-modal-header) {
            padding: 1.25rem 2.5rem;
        }
    }

    /* ── Close button inside card ── */
    :global(.ppl-modal-close-btn) {
        margin-left: 1rem;
        flex-shrink: 0;
        color: rgba(255,255,255,0.4);
        cursor: pointer;
        transition: color 0.2s;
        margin-top: 0.125rem;
    }
    :global(.ppl-modal-close-btn:hover) {
        color: white;
    }

    /* ── Floating close button (for lightbox) ── */
    :global(.ppl-modal-close-top) {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255,255,255,0.1);
        color: white;
        border-radius: 9999px;
        padding: 0.5rem;
        cursor: pointer;
        transition: background 0.2s;
        z-index: 10;
    }
    :global(.ppl-modal-close-top:hover) {
        background: rgba(255,255,255,0.2);
    }

    /* ── Form inputs ── */
    :global(.ppl-label) {
        color: rgba(255,255,255,0.7);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
    }
    :global(.ppl-input) {
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 0.75rem;
        padding: 0.75rem 1rem;
        color: white;
        font-size: 0.875rem;
        width: 100%;
        transition: border-color 0.2s;
    }
    :global(.ppl-input:focus) {
        outline: none;
        border-color: #ff9900;
    }
    :global(.ppl-input::placeholder) {
        color: rgba(255,255,255,0.3);
    }

    /* ── Themed scrollbar for modal cards ── */
    :global(.ppl-modal-card)::-webkit-scrollbar {
        width: 5px;
    }
    :global(.ppl-modal-card)::-webkit-scrollbar-track {
        background: #1a0020;
        border-radius: 0 1rem 1rem 0;
    }
    :global(.ppl-modal-card)::-webkit-scrollbar-thumb {
        background: #660066;
        border-radius: 4px;
    }
    :global(.ppl-modal-card)::-webkit-scrollbar-thumb:hover {
        background: #ff9900;
    }
</style>
