<template> 
    <header class="shadow p-3 mb-5 bg-body rounded">
        <img src="../assets/images/logo.png" alt="logo"/>
        <h2>Litoral eventos</h2>
        <div>
            <router-link to="/register">Register</router-link> |
            <router-link to="/login">Login</router-link> 
        </div>

    </header>
</template>

<script>

export default {
    name: 'HeaderApp',

}
</script>

<style scoped>

header {
    height: 5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
}
header img {
    height: 4rem;
    width:  4rem
}

header h2 {
    color: rgb(6, 5, 5);
    font-size: 2rem;
}

header a {
    text-decoration: none;
    color: blueviolet;
    font: 1.5rem;
}
header a:hover {
    font: 2rem;
    color: blueviolet;
}
</style>