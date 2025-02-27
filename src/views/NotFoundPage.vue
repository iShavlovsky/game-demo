<template>
    <section>
        <div class="container">
            <h1 class="h1">
                {{ notFound.title }}
            </h1>
            <p class="body-m">
                {{ notFound.description }}
            </p>
        </div>
    </section>
</template>

<script lang="ts" setup>
const notFound = {
    title: 'Sorry, this page is not found.',
    description: 'The link you followed may be broken, or the page may have been removed.'
}
</script>
