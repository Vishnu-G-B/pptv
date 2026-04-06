<script>
    // ─── Web3Forms contact form ───
    // Sign up free at https://web3forms.com to get your access key.
    // Replace the placeholder below with your key — no backend needed.
    // Data is stored in your Web3Forms dashboard + emailed to you instantly.

    const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // ← replace this

    const projects = [
        'Academic Creators Lab',
        'Kidding Around Bharat',
        'ECA TV',
        'Project Gullak',
        'Swadeshplex / ONEderfull Watchlist',
        'Young India Filmmakers (YIF)',
        'General Enquiry',
    ];

    let form = {
        name: '',
        phone: '',
        email: '',
        project: '',
        message: '',
    };

    let status = ''; // 'sending' | 'success' | 'error'
    let errorMsg = '';

    async function handleSubmit() {
        if (status === 'sending') return;

        // Basic validation
        if (!form.name.trim() || !form.email.trim() || !form.project || !form.message.trim()) {
            errorMsg = 'Please fill in all required fields.';
            return;
        }

        errorMsg = '';
        status = 'sending';

        try {
            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `PPL Website Enquiry — ${form.project}`,
                from_name: form.name,
                name: form.name,
                phone: form.phone,
                email: form.email,
                project: form.project,
                message: form.message,
                botcheck: '', // honeypot
            };

            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                status = 'success';
                form = { name: '', phone: '', email: '', project: '', message: '' };
            } else {
                status = 'error';
                errorMsg = data.message || 'Something went wrong. Please try again.';
            }
        } catch (err) {
            status = 'error';
            errorMsg = 'Network error. Please check your connection and try again.';
        }
    }
</script>

<section id="contact" class="w-full bg-[#250025] py-20 px-6 md:px-16 lg:px-24">

    <!-- Heading -->
    <div class="max-w-5xl mx-auto mb-12 text-center">
        <p class="text-brand-orange text-xs uppercase tracking-widest font-bold mb-3">Get In Touch</p>
        <h2 class="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4" style="font-family: Arial">
            Let's Make A Difference Together
        </h2>
        <p class="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            Interested in partnering with us, bringing a program to your school, or just want to say hello? Drop us a message.
        </p>
    </div>

    <!-- Form card -->
    <div class="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">

        {#if status === 'success'}
            <!-- Success state -->
            <div class="flex flex-col items-center gap-4 py-8 text-center">
                <div class="bg-brand-green/20 rounded-full p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">Message Sent!</h3>
                <p class="text-white/60">Thank you for reaching out. We'll get back to you soon.</p>
                <button
                    on:click={() => { status = ''; }}
                    class="mt-2 text-brand-orange font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
                >
                    Send Another Message
                </button>
            </div>

        {:else}
            <div class="flex flex-col gap-5">

                <!-- Honeypot (hidden, prevents spam bots) -->
                <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off"/>

                <!-- Row 1: Name + Phone -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label for="cf-name" class="text-white/70 text-xs uppercase tracking-widest font-bold">
                            Name <span class="text-brand-orange">*</span>
                        </label>
                        <input
                            id="cf-name"
                            type="text"
                            bind:value={form.name}
                            placeholder="Your full name"
                            class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30
                                   text-sm focus:outline-none focus:border-brand-orange transition-colors duration-200"
                        />
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label for="cf-phone" class="text-white/70 text-xs uppercase tracking-widest font-bold">
                            Phone Number
                        </label>
                        <input
                            id="cf-phone"
                            type="tel"
                            bind:value={form.phone}
                            placeholder="+91 00000 00000"
                            class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30
                                   text-sm focus:outline-none focus:border-brand-orange transition-colors duration-200"
                        />
                    </div>
                </div>

                <!-- Row 2: Email -->
                <div class="flex flex-col gap-1.5">
                    <label for="cf-email" class="text-white/70 text-xs uppercase tracking-widest font-bold">
                        Email <span class="text-brand-orange">*</span>
                    </label>
                    <input
                        id="cf-email"
                        type="email"
                        bind:value={form.email}
                        placeholder="you@example.com"
                        class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30
                               text-sm focus:outline-none focus:border-brand-orange transition-colors duration-200"
                    />
                </div>

                <!-- Row 3: Project dropdown -->
                <div class="flex flex-col gap-1.5">
                    <label for="cf-project" class="text-white/70 text-xs uppercase tracking-widest font-bold">
                        What Project Are You Interested In? <span class="text-brand-orange">*</span>
                    </label>
                    <div class="relative">
                        <select
                            id="cf-project"
                            bind:value={form.project}
                            class="w-full appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm
                                   focus:outline-none focus:border-brand-orange transition-colors duration-200
                                   {form.project ? 'text-white' : 'text-white/30'}"
                        >
                            <option value="" disabled selected class="bg-[#250025]">Select a project</option>
                            {#each projects as proj}
                                <option value={proj} class="bg-[#250025] text-white">{proj}</option>
                            {/each}
                        </select>
                        <!-- Dropdown arrow -->
                        <div class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Row 4: Message -->
                <div class="flex flex-col gap-1.5">
                    <label for="cf-message" class="text-white/70 text-xs uppercase tracking-widest font-bold">
                        Message <span class="text-brand-orange">*</span>
                    </label>
                    <textarea
                        id="cf-message"
                        bind:value={form.message}
                        placeholder="Tell us about yourself or what you have in mind..."
                        rows="5"
                        class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30
                               text-sm focus:outline-none focus:border-brand-orange transition-colors duration-200 resize-none"
                    ></textarea>
                </div>

                <!-- Error message -->
                {#if errorMsg}
                    <p class="text-red-400 text-sm">{errorMsg}</p>
                {/if}

                <!-- Submit button -->
                <button
                    on:click={handleSubmit}
                    disabled={status === 'sending'}
                    class="w-full py-4 rounded-xl font-bold text-base uppercase tracking-widest transition-all duration-200
                           {status === 'sending'
                               ? 'bg-primary/50 text-white/50 cursor-not-allowed'
                               : 'bg-primary text-white hover:bg-primary/80 active:scale-[0.98]'}"
                >
                    {status === 'sending' ? 'Sending…' : '#GoPurple — Send Message'}
                </button>

                <p class="text-white/30 text-xs text-center">
                    Powered by <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" class="underline hover:text-white/50">Web3Forms</a>. Your data is never sold or shared.
                </p>
            </div>
        {/if}
    </div>
</section>
