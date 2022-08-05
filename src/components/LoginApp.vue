<template>
  <section>
    <div class="container shadow p-3 mb-5 bg-body rounded">
      <h1>Login</h1>
      <form class="row g-3 needs-validation" novalidate>
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example1">Email</label>
          <input
            type="email"
            id="form2Example1"
            class="form-control"
            required
          />
          <div class="valid-feedback">Looks good!</div>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="form2Example2">Senha</label>
          <input type="password" id="form2Example2" class="form-control" />
        </div>

        <!-- 2 column grid layout for inline styling -->

        <!-- Submit button -->
        <button type="button" class="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <!-- Register buttons -->
        <div class="text-center">
          <p>Ainda não tem cadastro? <a href="#!">Cadastrar</a></p>
          <p>or sign up with:</p>
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-google"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginApp",
};
</script>

<style scoped>
    .container {
        width: 30rem;
    }
   
</style>