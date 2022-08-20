<script>
  export let src = undefined
  export let meta = undefined

  // suppress vite-plugin-svelte warning about unused props
  $: src, meta
</script>

<div class="root">
  <div class="container">
    <pre class="language-svelte"><slot name="code" /></pre>
    <div class="example-wrapper">
      <div class="example">
        <slot name="example" />
      </div>
    </div>
  </div>
</div>

<style>
  .root {
    margin: 0.5rem 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    border-bottom-left-radius: var(--example-border-radius, 0.25rem);
    border-bottom-right-radius: var(--example-border-radius, 0.25rem);
  }

  .example-wrapper {
    display: flex;
    justify-content: center;
    background: var(--example-background, #fafafa);
    border: var(--example-border, 1px solid #ddd);
    overflow: hidden;
    border-bottom: none;
    border-top-left-radius: var(--example-border-radius, 0.25rem);
    border-top-right-radius: var(--example-border-radius, 0.25rem);
  }

  .example {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 0;
    min-height: 3rem;
  }

  pre {
    margin: 0;
  }
</style>
