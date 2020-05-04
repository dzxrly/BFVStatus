<template>
    <div class="load-ani">
        <svg height="91" width="65">
            <!-- <polyline class="load-logoBG" fill="none" :stroke="logoColorBG" stroke-width="2"
            points="1,1 21,1 33,44 44,1 64,1 33,90 1,1"
            stroke-linecap="round" stroke-linejoin="round"></polyline> -->
            <polyline class="load-logo" fill="none" :stroke="logoColor" stroke-width="2"
            points="1,1 21,1 33,44 44,1 64,1 33,90 1,1"
            stroke-linecap="round" stroke-linejoin="round"></polyline>
        </svg>
        <h3 class="load-text">加载中...</h3>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      logoColor: '#409EFF',
      logoColorBG: '#909399'
    }
  }
}
</script>

<style scoped lang="stylus">
.load-ani {
    position fixed
    display flex
    justify-content center
    align-items center
    min-height 100vh
    width 100%
    flex-direction column
    background-color rgba(255, 255, 255, 0.8)
    z-index 9999
    pointer-events none
    .load-text {
        font-family Helvetica
        font-size 14px
        margin-top 10px
        animation load-text 2s infinite alternate
        -webkit-animation load-text 2s infinite alternate
    }
    .load-logo {
        animation load-logo 2s infinite alternate
        -webkit-animation load-logo 2s infinite alternate
        stroke-dasharray 325
        stroke-dashoffset 325
    }

    @keyframes load-logo {
        from {
            stroke-dashoffset 325
        }
        to {
            stroke-dashoffset 0
        }
    }

    @keyframes load-text {
        from {
            color rgba(64, 158, 255, 0.2)
        }
        to {
            color rgba(64, 158, 255, 1)
        }
    }
}
</style>
