<template>
  <div id="login">
    <h1>{{ msg }}</h1>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"/>
          <div class="form">
            <h3>创建账户</h3>
            <div v-show="true" class="register">
              <input type="text" placeholder="用户名">
              <input type="password" placeholder="密码">
              <div class="button">创建账号</div>
            </div>
            <h3>登录</h3>
            <div v-show="false" class="login">
              <input type="text" placeholder="输入用户名">
              <input type="password" placeholder="密码">
              <div class="button">登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      msg: 'This is login page'
    };
  }
};
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #fff url(../assets/noteTaking.png) center center no-repeat;
    background-size: contain;
  }

  .form {
    width: 300px;
    border-left: 1px solid #ccc;

    h3 {
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      padding: 10px 20px;
      cursor: pointer;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      background-color: #6b9fc4;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

    .login, .register {
      padding: 10px 20px;
      border-top: 1px solid #eee;

      input {
        font-size: 14px;
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        margin-top: 10px;
      }

      input:focus {
        border: 2px solid lighten(#6b9fc4, 20%);
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }
}

</style>
