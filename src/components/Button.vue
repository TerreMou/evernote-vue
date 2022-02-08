<template>
  <button class="hugsy-button" :class="classes">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: "default"
    }
  },
  computed: {
    classes() {
      return {
        [`${this.theme}`]: this.theme,
        [`${this.size}`]: this.size,
      }
    }
  }
};
</script>

<style lang="less">
@border: #e5eef0;
@theme: #fff;
@default: #fb80a7;

@box-shadow: 0 1px 0 fade-out(black, 0.95);
@h: 36px;
@radius: 4px;

.hugsy-button {
  font-size: 16px;
  border: 1px solid @default;
  border-radius: 1.5rem;
  box-sizing: border-box;
  height: @h;
  padding: 10px 18px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background: @default;
  color: @theme;
  box-shadow: @box-shadow;
  transition: background 250ms;
  text-align: center;

  & + & {
    margin-left: 8px;
    margin-bottom: 8px;
  }

  &:hover, &:focus {
    background: darken(@default, 10%);
    border-color: darken(@default, 10%);
  }

  &:focus {
    outline: none
  }

  &::-moz-focus-inner {
    border: 0;
  }

  &.text {
    padding: 10px 2px;
    font-weight: normal;
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    color: @default;
    position: relative;

    &:hover::after, &:focus::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: @default;
    }
  }

  &.small {
    font-size: 12px;
    height: 24px;
  }

}

</style>
