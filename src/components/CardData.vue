<template>
    <div class="card" :key="item.data[0].nasa_id">
        <div class="card-image">
            <img :src="item.links[0].href || './assets/img/default-img.jpg'">
        </div>
        <div class="card-text">
            <div class="title">{{ item.data[0].title || 'Title' }}</div>
            <p>{{ item.data[0].description.length > 100 ? item.data[0].description.substr(0, 97) + '...' : item.data[0].description }}</p>
        </div>
        <div class="card-stats">
            <div class="stat left" :class="disabledLike && 'disabled'" @click="like">
                <div class="value">
                    <i class="fas fa-thumbs-up" :class="item.stats.isLike && 'liked'"></i>
                </div>
                <div class="type">{{ item.stats.isLike ? 'Unlike' : 'Like'}}</div>
            </div>
            <div class="stat border" :class="disabledEdit && 'disabled'" @click="edit">
                <div class="value"><i class="fas fa-edit"></i></div>
                <div class="type">Edit</div>
            </div>
            <div class="stat right" :class="disabledRemove && 'disabled'" @click="remove">
                <div class="value"><i class="fas fa-trash-alt" :class="item.stats.isRemove && 'liked'"></i></div>
                <div class="type">{{ item.stats.isRemove ? 'Undo' : 'Remove' }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        disabledLike: {
            type: Boolean,
            default: false
        },
        disabledEdit: {
            type: Boolean,
            default: false
        },
        disabledRemove: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    methods: {
        like() {
            if (!this.item.stats.isLike) {
                this.$store.commit("addLikedData", this.item);
                this.$nextTick(()=> {
                    this.item.stats.isLike = true;
                });
            } else {
                this.$store.commit("deleteLikedData", this.item);
                this.$nextTick(()=> {
                    this.item.stats.isLike = false;
                    this.$emit("unlike");
                });
            }
        },
        remove() {
            if (!this.item.stats.isRemove) {
                this.$store.commit("addRemovedData", this.item);
                if (this.$route.name === 'Liked_Data')
                    this.$store.commit("deleteLikedData", this.item);
                this.$nextTick(()=> {
                    this.item.stats.isRemove = true;
                    this.$emit("remove", this.item);
                });
            } else {
                this.$store.commit("deleteremovedData", this.item);
                if (this.item.stats.isLike)
                    this.$store.commit("addLikedData", this.item);
                this.$nextTick(()=> {
                    this.item.stats.isRemove = false;
                    this.$emit("undo");
                });
            }
        },
        edit() {
            this.$emit("edit", this.item);
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: grid;
    grid-template-columns: 300px;
    grid-template-rows: 210px 210px 80px;
    grid-template-areas: "image" "text" "stats";
    border-radius: 18px;
    background: #fff;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    transition: 0.5s ease;
    margin-bottom: 15px;
    .card-image {
        grid-area: image;
        img {
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            width: 100%;
            object-fit: cover;
            height: 210px;
        }
    }
    .card-text {
        max-height: 210px;
        overflow: auto;
        grid-area: text;
        margin: 25px;
        .title {
            color: red;
            font-size: 18px;
            padding-bottom: 15px;
        }
        p {
            color: grey;
            font-size: 15px;
            font-weight: 300;
        }
    }
    .card-stats {
        grid-area: stats;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        background: #2ecc71;
        .stat {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 10px;
            color: #fff;
            cursor: pointer;
            &.disabled {
                cursor: not-allowed;
                backdrop-filter: blur(50px);
            }
        }
        .type {
            font-size: 11px;
            font-weight: 300;
            text-transform: uppercase;
        }
        .value {
            font-size: 22px;
            font-weight: 500;
            .fas {
                &.liked {
                    color: #ff4b2b;
                }
            }
            &:hover .fas {
                color: #ff4b2b;
            }
        }
        .border {
            border-right: 1px solid rgb(172, 26, 87);
            border-left: 1px solid rgb(172, 26, 87);
        }
        .left {
            border-bottom-left-radius: 15px;
        }
        .right {
            border-bottom-right-radius: 15px;
        }
    }
    &:hover {
        transform: scale(1.05);
        box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    }
}
</style>