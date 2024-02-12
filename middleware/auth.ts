export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    if (!user.value && to.path === '/notes') {
        console.log(user.value)
        return navigateTo('/')
    } else if (user.value && to.path === '/') {
        console.log(user.value)
        return navigateTo('/notes')
    }
})