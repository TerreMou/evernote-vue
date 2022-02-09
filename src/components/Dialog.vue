<template>
  <div v-if="visible">
    <div class="overlay" @click="onClickOverlay"/>
    <div class="wrapper">
      <div class="dialog">
        <header>
          <slot name="title"/>
          <span class="close"
                @click="close"/>
        </header>
        <main>
          <slot name="content"/>
        </main>
        <footer>
          <Button theme="link" @click.native="close">取消</Button>
          <Button @click.native="onOk">确认</Button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  components: {Button},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    ok: Function,
  },

  methods: {
    close() {
      this.$emit('update:visible', !this.visible);
    },
    onClickOverlay() {
      if (this.closeOnClickOverlay) {
        this.close();
      }
    },
    onOk() {
      if (this.ok && this.ok() !== false) {
        this.close();
      }
    },
  }
};

</script>

<style lang="less" scoped>
@radius: 4px;
@border-color: #d9d9d9;

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: fadeout(black, 50%);
  z-index: 110;
}

.wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 111;

  .dialog {
    background: white;
    border-radius: @radius;
    box-shadow: 0 0 3px fadeout(black, 50%);
    min-width: 28em;
    max-width: 90%;

    header {
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid @border-color;
      margin-bottom: 8px;

      .close {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        cursor: pointer;

        &::before,
        &::after {
          content: '';
          position: absolute;
          height: 1px;
          background: black;
          width: 100%;
          top: 50%;
          left: 50%;
        }

        &::before {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        &::after {
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }
    }

    main {
      padding: 12px 16px 0 16px;

      input {
        font-size: 14px;
        height: 32px;
        width: 100%;
        background: transparent;
        display: block;
        line-height: 32px;
        padding: .6em;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 8px;
        outline: none;
        margin: 16px 0;

      }
    }

    footer {
      text-align: right;
      padding: 8px 16px;
    }

  }
}

</style>
