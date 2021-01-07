<template>
  <div class="login-wrapper" ref="wra" :style="wrastyle">
    <div class="login-wrapper-1" :style="wra1style">
      <div class="login-wrapper-2" :style="wra2style">
        <LoginEarth class="earth" @earth-mouse-move="mouseMoveHandle" />
        <header>
          <p>{{ config.title }}</p>
          <p>blog admin</p>
        </header>
        <div class="content">
          <div class="login-form">
            <p class="login-welcome">欢迎进入{{ config.title }} 请登录!</p>
            <el-form
              ref="ref_form"
              label-width="0px"
              :model="form"
              :rules="rules"
              id="login-el-form"
            >
              <el-form-item prop="username">
                <el-input
                  autofocus
                  v-model.trim="form.username"
                  class="login-input"
                >
                  <template #prefix>
                    <i class="el-icon-user">&#xe612;</i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item @keyup.enter="loginHandle" prop="password">
                <el-input
                  show-password
                  v-model.trim="form.password"
                  class="login-input"
                  type="password"
                >
                  <template #prefix>
                    <i class="el-icon-lock">&#xe612;</i>
                  </template>
                </el-input>
              </el-form-item>
              <el-button
                type="default"
                :loading="loginData.loading"
                class="login-btn"
                style="width: 100%"
                @click="loginHandle"
                >登 录</el-button
              >
            </el-form>
            <div class="tips">
              <a href="#/register">没有账号？前往注册</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";

import LoginEarth from "@/components/LoginEarth";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useSWR, SWR } from "@/hooks/useSWR";
import { login } from "@/api/login";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: { LoginEarth },
  setup() {
    const { getters, commit, dispatch } = useStore();
    const router = useRouter();
    const route = useRoute();
    const ref_form = ref(null);
    const ePosition = reactive({
      x: 0,
      y: 0,
    });
    const form = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    const loginData = SWR();
    const loginHandle = () => {
      ref_form.value.validate(async (valid) => {
        if (valid) {
          await useSWR(
            login({
              userName: form.username,
              password: form.password,
            }),
            loginData
          );
          const { result } = loginData;
          if (result) {
            commit("user/SET_TOKEN", result);
            await dispatch("user/GET_USERINFO");
            const { redirect } = route.query;
            if (redirect) {
              router.push({ path: redirect });
            } else {
              router.push({
                name: "Home",
              });
            }
          }
        } else {
          console.log("验证失败");
        }
      });
    };

    const mouseMoveHandle = (position) => {
      ePosition.x = position.x;
      ePosition.y = position.y;
    };

    const wrastyle = computed(() => {
      const appSize = getters["app/appSize"];
      const left = (ePosition.x / (appSize.w / 10)).toFixed();
      const right = (ePosition.y / (appSize.h / 10)).toFixed();
      return {
        backgroundPosition: `-${left}px -${right}px`,
      };
    });

    const wra1style = computed(() => {
      const appSize = getters["app/appSize"];
      const left = (ePosition.x / (appSize.w / 20)).toFixed();
      const right = (ePosition.y / (appSize.h / 20)).toFixed();
      return {
        backgroundPosition: `-${left}px -${right}px`,
      };
    });

    const wra2style = computed(() => {
      const appSize = getters["app/appSize"];
      const left = (ePosition.x / (appSize.w / 40)).toFixed();
      const right = (ePosition.y / (appSize.h / 40)).toFixed();
      return {
        backgroundPosition: `-${left}px -${right}px`,
      };
    });

    return {
      config,
      form,
      rules,
      loginData,
      loginHandle,
      mouseMoveHandle,
      wrastyle,
      wra1style,
      wra2style,
      ref_form,
    };
  },
});
</script>

<style lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: url("/imgs/login/bg.jpg");
  background-size: 120% 120%;
  background-position: -10px -10px;
  position: relative;

  .login-wrapper-1,
  .login-wrapper-2 {
    height: 100%;
    width: 100%;
  }

  .login-wrapper-1 {
    background-image: url("/imgs/login/bg1.png");
    background-size: 100% 100%;
    background-position: -20px -20px;
  }

  .login-wrapper-2 {
    background-image: url("/imgs/login/bg2.png");
    background-size: 110% 110%;
    padding: 20px;
    box-sizing: border-box;
    background-position: -20px -20px;
  }

  .content {
    padding-top: 135px;
    height: calc(100% - 135px);
    width: 100%;
  }

  header {
    width: 100%;
    padding-top: 28px;
    position: absolute;
    top: 0px;
    /*background: pink;*/

    p {
      color: white;
      text-align: center;

      &:first-child {
        font-size: 30px;
        margin-bottom: 7px;
        letter-spacing: 10px;
      }

      &:last-child {
        font-size: 15px;
        height: 70px;
        width: 50%;
        margin: 0 auto;
        background-image: url("../../public/imgs/login/light.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }

  .login-form {
    width: 340px;
    height: 250px;
    position: absolute;
    right: 109px;
    top: 50%;
    transform: translateY(-50%);

    .login-welcome {
      color: white;
      letter-spacing: 2px;
      padding-bottom: 18px;
    }

    #login-el-form {
      .login-input {
        &:first-child {
          height: 50px;
        }
        .el-input__prefix {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
        }

        .el-input__inner {
          height: 50px !important;
          background: none;
          border: 2px solid #fff;
          color: white;
          font-size: 15px;
          text-indent: 20px;
        }
      }

      button {
        height: 50px;
        background: none;
        border: 2px solid #fff;
        font-size: 20px;
        color: white;
      }

      button:hover {
        background-color: rgba(65, 74, 158, 0.5);
      }
    }

    .el-form-item {
      margin-bottom: 26px;
    }
    .tips {
      display: flex;
      justify-content: flex-end;
      padding: 10px 5px;
      a {
        font-size: 12px;
        color: rgb(177, 177, 177);
        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>