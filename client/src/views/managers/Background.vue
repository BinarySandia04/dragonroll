<template>
    <picture>
        <source class="background" media="(prefers-color-scheme: dark)" srcset="img/background.png">
        <img class="background" alt="Shows a black logo in light color mode and a white one in dark color mode." src="img/background-light.png">
    </picture>
</template>

<style lang="scss" scoped>
.background {
    z-index: -1;
    position: absolute;
    bottom: 0px;
    right: 0px;
}
</style>