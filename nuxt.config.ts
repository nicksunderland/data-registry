// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: ["bootstrap/dist/css/bootstrap.css", "bootstrap-icons/font/bootstrap-icons.css", "assets/css/styles.css"],
    vite: {
        server: {
            // specify a know port, so we can use it in docker invocations
            hmr: {
                clientPort: 24600,
                port: 24600,
            },
        },
    },
    runtimeConfig: {
        public: {
            apiSecret: "",
            apiBaseUrl: "",
            apiDrupalUrl: "",
            phenotypesUrl: "",
        },
    },
    modules: ["@nuxt/devtools", "@pinia/nuxt"],
    telemetry: false,
});
