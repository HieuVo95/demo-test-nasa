<template>
    <div>
        <div class="search-wrap">
            <div class="search-box">
                <input type="text" class="input" v-model="keyword" placeholder="Search for ... (e.g. 'Orion')" @keydown.enter="search()" />
                <div class="btn btn-search" :class="!keyword && 'disabled'" @click="search()">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: null
        };
    },
    computed: {
        keywordStore() {
            return this.$store.state.keyword;
        }
    },
    mounted() {
        if (this.$route.query && this.$route.query.keyword) {
            this.keyword = this.$route.query.keyword;
            this.$nextTick(() => {
                this.search();
            })
        } else if (this.keywordStore) {
            this.keyword = this.keywordStore;
            this.$nextTick(() => {
                this.search();
            })
        }

    },
    methods: {
        search() {
            if (this.keyword) {
                if (this.keyword !== this.$route.query.keyword || !this.$route.query.keyword) {
                    let path = this.$route.path;
                    this.$router.replace(path + `?keyword=${this.keyword}&page=1` );
                }
                this.$emit("search", this.keyword);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  width: 500px;
  margin: 30px auto;
  .search-box {
    position: relative;
    width: 500px;
    height: 60px;
    .input {
      border: 0;
      outline: none;
      color: #8b7d77;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      border-radius: 3px;
      font-size: 18px;
      padding-right: 80px;
      &:focus, &:hover {
          border: 3px solid #7690da;
      }
    }
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 100%;
      border-radius: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      background: #7690da;
      z-index: 1;
      cursor: pointer;
      &.btn-search .fas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 20px;
      }
      &:hover {
        background: #708bd2;
      }
    }
    .btn.disabled {
        cursor: not-allowed;
        background: #95a5a6;
        &:hover {
            background: #7f8c8d;
        }
    }
  }
}
</style>
