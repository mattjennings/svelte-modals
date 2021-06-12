<script>
	import '../app.css'
	import '../prism.css'
	import { ModalStack } from '$lib/index'
	import { fade } from 'svelte/transition'

	import { page } from '$app/stores'

</script>

<div class="container mx-auto max-w-4xl p-4">
	<main class="prose prose-sm sm:prose-lg">
		<slot />
	</main>
</div>
