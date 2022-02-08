<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="form">
            <div class="logo">
              <img src="../assets/hugsy.png" alt="">
            </div>

            <div v-show="registerVisible" class="register">
              <h3>用户名</h3>
              <input type="text" placeholder="支持字母、数字、下划线、汉字"
                     @input="validateUsername(register.username)"
                     v-model="register.username">
              <h3>密码</h3>
              <input type="password" placeholder="至少为 6 位字符"
                     @keyup.enter="onRegister"
                     @input="validatePassword(register.password)"
                     v-model="register.password">
              <p v-show="usernameIsError">{{ usernameMsg }}</p>
              <p v-show="passwordIsError">{{ passwordMsg }}</p>
              <p v-show="register.isError">{{ register.notice }}</p>
              <div class="buttons">
                <div class="buttons-text">
                  <span>已经拥有账户？</span>
                  <Button @click.native="showLogin" theme="text">登录</Button>
                </div>
                <Button @click.native="onRegister">创建账户</Button>
              </div>
            </div>

            <div v-show="loginVisible" class="login">
              <h3>用户名</h3>
              <input type="text"
                     @input="validateUsername(login.username)"
                     v-model="login.username">
              <h3>密码</h3>
              <input type="password"
                     @keyup.enter="onLogin"
                     @input="validatePassword(login.password)"
                     v-model="login.password">
              <p v-show="usernameIsError">{{ usernameMsg }}</p>
              <p v-show="login.isError">{{ login.notice }}</p>
              <div class="buttons">
                <div class="buttons-text">
                  <span>没有账户？</span>
                  <Button @click.native="showRegister" theme="text">创建账户</Button>
                </div>
                <Button @click.native="onLogin">登录</Button>
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
import Auth from '@/apis/auth';
import Bus from '@/helpers/bus';

Auth.getInfo().then(data => console.log(data));

export default {
  name: 'Login',
  components: {Button},
  data() {
    return {
      registerVisible: false,
      loginVisible: true,
      usernameIsError: false,
      passwordIsError: false,
      usernameMsg: '用户名长度为 1~15 位字符，支持字母、数字、下划线、汉字',
      passwordMsg: '密码长度需为 6~16 位字符',
      register: {
        username: '',
        password: '',
        isError: false,
        notice: '',
      },
      login: {
        username: '',
        password: '',
        isError: false,
        notice: '',
      },
    };
  },
  methods: {
    showLogin() {
      this.registerVisible = false;
      this.loginVisible = true;
    },
    showRegister() {
      this.registerVisible = true;
      this.loginVisible = false;
    },
    validateUsername(username) {
      this.usernameIsError = !/^[\w\u4e00-\u9fa5]{3,15}$/.test(username);
    },
    validatePassword(password) {
      this.passwordIsError = !/^.{6,16}$/.test(password);
    },
    onRegister() {
      Auth.register({
        username: this.register.username,
        password: this.register.password
      }).then(() => {
        this.register.isError = false;
        Bus.$emit('update:userInfo', {username: this.register.username});
        this.$router.push({path: '/notebooks'});
      }).catch(data => {
        this.register.isError = true;
        this.register.notice = data.msg;
      });
    },
    onLogin() {
      Auth.login({
        username: this.login.username,
        password: this.login.password
      }).then(() => {
          this.login.isError = false;
          Bus.$emit('update:userInfo', {username: this.login.username});
          this.$router.push({path: '/notebooks'});
        }
      ).catch(data => {
        this.login.isError = true;
        this.login.notice = data.msg;
      });
    },
  },
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

      > img {
        height: 52px;
      }
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

      .buttons {
        display: flex;
        justify-content: space-between;
        margin: 32px 0 16px 0;

        &-text {
          display: flex;
          align-items: center;
        }
      }

      p {
        color: #ff356a;
      }
    }
  }
}

</style>
