<script>
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import XIcon from '@mattjennings/heroicons-svelte/outline/XIcon.svelte'
  import MenuIcon from '@mattjennings/heroicons-svelte/outline/MenuIcon.svelte'

  let isMenuOpen = false

  $: $page.path, (isMenuOpen = false)

  let links = [
    {
      href: '/',
      label: 'Intro'
    },
    {
      href: '/managing-your-modals',
      label: 'Managing your modals'
    },
    {
      href: '/transitions',
      label: 'Transitions'
    },
    {
      href: '/examples',
      label: 'Examples'
    },
    {
      href: '/api',
      label: 'API'
    }
  ]

</script>

{#if isMenuOpen}
  <div class="fixed inset-0 z-40 flex md:hidden" role="dialog" aria-modal="true">
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      aria-hidden="true"
      transition:fade
      on:click={() => (isMenuOpen = false)}
    />

    <div
      class="relative max-w-xs w-full bg-white pb-4 flex-1 flex flex-col"
      transition:fly={{
        x: -200,
        y: 0
      }}
    >
      <div class="absolute top-0 right-0 -mr-12 pt-2" transition:fade>
        <button
          on:click={() => (isMenuOpen = false)}
          class="unstyled ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <span class="sr-only">Close sidebar</span>
          <XIcon class="h-6 w-6 text-white" />
        </button>
      </div>

      <div class="mt-5 flex-1 h-0 overflow-y-auto">
        <nav class="px-2 space-y-1">
          <div class="flex justify-end">
            <a
              aria-label="github"
              href="https://github.com/mattjennings/svelte-modals"
              class="w-10 h-10"
            >
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                ><path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                /></svg
              >
            </a>
          </div>
          {#each links as { href, label }}
            <a {href} class:active={$page.path === href}>{label}</a>
          {/each}
        </nav>
      </div>
    </div>

    <div class="flex-shrink-0 w-14">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
{/if}

<!-- Static sidebar for desktop -->
<div class="hidden md:flex md:flex-shrink-0 h-screen sticky top-0">
  <div class="w-64 flex flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="border-r border-gray-200  pb-4 flex flex-col flex-grow overflow-y-auto">
      <div class="flex-grow mt-5 flex flex-col">
        <nav class="flex-1 bg-white px-2 space-y-1">
          <div class="flex justify-end">
            <a
              aria-label="github"
              href="https://github.com/mattjennings/svelte-modals"
              class="w-10 h-10"
            >
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                ><path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                /></svg
              >
            </a>
          </div>
          {#each links as { href, label }}
            <a {href} class:active={$page.path === href}>{label}</a>
          {/each}
        </nav>
      </div>
    </div>
  </div>
</div>

{#if !isMenuOpen}
  <div class="sm:hidden fixed bottom-0 right-4 z-10 flex-shrink-0 h-16 flex">
    <button
      on:click={() => (isMenuOpen = true)}
      class="unstyled bg-white rounded-full h-10 w-10 flex items-center justify-center shadow border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
    >
      <span class="sr-only">Open sidebar</span>
      <MenuIcon class="h-[1.25rem] w-[1.25rem]" />
    </button>
    <div />
  </div>
{/if}

<style>
  a {
    @apply text-gray-600 rounded-md py-2 px-2 flex items-center text-sm font-medium;
  }

  a.active {
    @apply text-gray-900 bg-gray-200;
  }

</style>
