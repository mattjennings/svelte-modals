<script>
  export let src = undefined
  export let meta = undefined

  // suppress vite-plugin-svelte warning about unused props
  $: src, meta
</script>

<div class="my-2">
  <div class="container">
    <pre class="language-svelte"><slot name="code" /></pre>
    <div class="example-wrapper shadow-sm">
      <div class="example">
        <slot name="example" />
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    @apply flex flex-col w-full overflow-hidden rounded;
  }

  .example-wrapper {
    @apply flex justify-center border-2 border-dashed border-[#19212e]/25 border-t-0 mb-1 rounded-b py-8;
  }

  .example {
    @apply flex justify-center items-center px-1;

    min-height: 3rem;
  }

  pre {
    margin: 0 !important;
    border-radius: 0 !important;
  }
</style>
