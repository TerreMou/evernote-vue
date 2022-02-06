<template>
  <div id="login">
    <h1>{{ msg }}</h1>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="form">
            <div class="logo"><h1>evernote</h1></div>
            <div v-show="true" class="register">
              <h3>用户名</h3>
              <input type="text">
              <h3>密码</h3>
              <input type="password">
              <div class="buttons">
                <Button theme="text">登录</Button>
                <Button>创建账号</Button>
              </div>
            </div>
            <div v-show="false" class="login">
              <h3>用户名</h3>
              <input type="text">
              <h3>密码</h3>
              <input type="password">
              <div class="buttons">
                <Button>登录</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button';

export default {
  name: 'Login',
  components: {Button},
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
  background: url("../assets/flower.jpg");
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
  padding: 40px 80px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 18px 0 rgb(85 56 107 / 48%);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .logo {
      margin-bottom: 56px;
    }

    .register, .login {
      width: 100%;
      color: #999;

      h3 {
        font-weight: normal;
        font-size: 16px;
        margin-bottom: 4px;
      }

      input {
        font-size: 16px;
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: .6em;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 8px;
        outline: none;
        margin-bottom: 16px;
      }

      input:focus {
        border: 1px solid rgba(0, 0, 0, .5);
      }
    }

    .register {
      .buttons {
        display: flex;
        justify-content: space-between;
        margin: 32px 0 16px 0;
      }
    }

    .login {
      .buttons {
        display: flex;
        justify-content: flex-end;
        margin: 32px 0 16px 0;
      }
    }
  }
}

</style>
