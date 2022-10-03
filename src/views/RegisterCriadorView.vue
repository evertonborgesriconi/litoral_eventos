<template>
  <section>
    <div class="row align-items-start">
      <div class="col">
        <h2>Cadastro de criador</h2>
        <div class="container-fluid">
          <div class="mb-3">
            <label class="form-label">Nome Completo</label>
            <input
              type="text"
              class="form-control"
              placeholder="Exemplo fulano de tal"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">CPF_CNPJ</label>
            <input
              type="text"
              class="form-control"
              placeholder="000.000.000-00"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Data Nascimento</label>
            <input
              type="date"
              class="form-control"
              placeholder="000.000.000-00"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Telefone</label>
            <input
              type="tel"
              class="form-control"
              placeholder="(00)00000-0000"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">EMAIL</label>
            <input
              type="email"
              class="form-control"
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" placeholder="" />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirma Senha</label>
            <input type="password" class="form-control" placeholder="" />
          </div>
          <div class="col-auto">
            <button type="submit" class="btn">
              Cadastrar-se
            </button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <img src="../assets/images/img2.png" alt="img1" />
        <div class="box">
          <h2>
            Você cadastrado com criador para poder divulgar a TODOS seus
            eventos!!
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
export default {
  name: "RegisterCriadorView",

  data() {
    return {};
  },
  methods() {},
};
</script>
<style scoped>
.col-6 {
  background-color: #18c07a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.col-6 img {
  height: 25rem;
  width: 30rem;
}

.col-6 .box {
  margin-top: 20px;
  margin-bottom: 35px;
  width: 100%;
}

.col-6 h2 {
  font-size: 2.5rem;
  color: #ffffff;
  padding-left: 6rem;
  padding-bottom: 4.6rem;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.col h2 {
  font-size: 2.5rem;
  color: #18c07a;
}

.col .col-auto{
    text-align: center;
}

.col .btn {
    background-color: #18c07a;
    color: #ffffff;
    border-radius: 50px 50px 50px 50px;
    margin-bottom: 10px;
 
}
</style>
    
