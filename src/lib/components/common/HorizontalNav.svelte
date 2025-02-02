<script>
    import {page} from "$app/stores";
</script>

<nav class="bg-surface w-full">
    <div class="mx-auto px-2 pl-20">
        <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="hidden sm:block">
                    <div class="flex space-x-4">
                        <a
                                href="/purpletv"
                                class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/purpletv'
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
                                aria-current={$page.url.pathname === '/purpletv' ? 'page' : undefined}
                        >
                            Purple TV
                        </a>
                        <a
                                href="/"
                                class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/'
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
                                aria-current={$page.url.pathname === '/' ? 'page' : undefined}
                        >
                            Purple Labs
                        </a>
<!--                        <a-->
<!--                                href="/social-impact"-->
<!--                                class="rounded-md px-3 py-2 text-sm font-medium {$page.url.pathname === '/social-impact'-->
<!--                                ? 'bg-gray-900 text-white'-->
<!--                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"-->
<!--                                aria-current={$page.url.pathname === '/social-impact' ? 'page' : undefined}-->
<!--                        >-->
<!--                            Social Impact-->
<!--                        </a>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>