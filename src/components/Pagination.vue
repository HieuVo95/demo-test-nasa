<template>
    <div class="pagination-wrap">
        <div class="index-pagination">
            {{totalString || ''}}
        </div>
        <div class="pagination" v-show="totalPages > 1">
            <ul>
                <li
                    v-if="page > 1"
                    class="btn prev"
                    @click="changePage(page - 1)"
                >
                    <span><i class="fas fa-chevron-left"></i> Prev</span>
                </li>
                <template v-if="page > 2">
                    <li class="numb" @click="changePage(1)"><span>1</span></li>
                    <li v-if="page > 3" class="dots"><span>...</span></li>
                </template>
                <li
                    v-for="i in listDisplay" :key="i"
                    class="numb"
                    :class="{'active': page === i}"
                    @click="changePage(i)"
                >
                    <span>{{i}}</span>
                </li>
                <template v-if="page < totalPages - 1">
                    <li v-if="page < totalPages - 2" class="dots"><span>...</span></li>
                    <li class="numb" @click="changePage(totalPages)"><span>{{ totalPages }}</span></li>
                </template>
                <li
                    v-if="page < totalPages"
                    class="btn next"
                    @click="changePage(page + 1)"
                >
                    <span>Next <i class="fas fa-chevron-right"></i></span>
                </li>
            </ul>
        </div>
        <div class="sort-pagination">
            <SortSelect @sortChange="sortChange" />
        </div>
    </div>
</template>

<script>
import SortSelect from "@/components/SortSelect"
export default {
    props: {
        totalItems: {
            type: Number,
            required: true,
            default: 10
        },
        currentPage: {
            type: Number,
            required: true,
            default: 1
        },
        itemPerPage: {
            type: Number,
            default: 10
        }
    },
    components: {
        SortSelect
    },
    data() {
        return {
            page: this.currentPage || 1,
        };
    },
    computed: {
        totalPages() {
            let result = 0;
            result = Math.floor(this.totalItems / this.itemPerPage);
            if (this.totalItems % this.itemPerPage !== 0)
                result += 1;
            return result;
        },
        beforePages() {
            let result = this.page - 1;
            if (this.page === this.totalPages) {
                result -= 2;
            } else if (this.page === this.totalPages -1)
                result -= 1;
            return result;
        },
        afterPages() {
            let result = this.page + 1;
            if (this.page === 1) {
                result += 2;
            } else if (this.page === 2)
                result += 1;
            return result;
        },
        listDisplay() {
            let temp = []
            for(let i = this.beforePages; i <= this.afterPages; i++) {
                if (i > this.totalPages)
                    continue;
                if (i === 0)
                    i = i + 1;
                if (i > 0)
                    temp.push(i);
            }
            return temp;
        },
        totalString() {
            let result = '';
            if (this.itemPerPage * this.page <= this.totalItems) {
                result += `${(this.page - 1) * this.itemPerPage + 1} - ${this.itemPerPage * this.page}`;
            } else {
                result += `${(this.page - 1) * this.itemPerPage + 1} - ${this.totalItems}`;
            }
            return result;
        }
    },
    methods: {
        changePage(numb) {
            this.page = numb;
            this.$emit("changePage", numb);
        },
        sortChange(sort) {
            this.$emit("sortChange", sort);
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 15px 20px;
    margin: 15px 0;
    .index-pagination {
        margin-bottom: 15px;
        width: fit-content;
        height: 45px;
        font-size: 18px;
        padding: 10px;
        background: #fff;
        color: #717171;
        border-radius: 50px;
    }
    .sort-pagination {
        margin-bottom: 15px;
    }
    .pagination {
        margin-bottom: 15px;
        ul {
            display: flex;
            background: #fff;
            padding: 8px;
            border-radius: 50px;
            margin-bottom: 0;
            li {
                list-style: none;
                line-height: 45px;
                text-align: center;
                font-size: 18px;
                font-weight: 500;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.1s ease;
                color: #717171;
                &.numb {
                    border-radius: 50%;
                    height: 45px;
                    width: 45px;
                    margin: 0 3px;
                }
                &.btn {
                    padding: 0 20px;
                }
                &.prev {
                    border-radius: 25px 5px 5px 25px;
                }
                &.next {
                    border-radius: 5px 25px 25px 5px;
                }
                &.dots {
                    font-size: 22px;
                    cursor: default;
                }
                &.active, &.numb:hover, &.btn:hover {
                    color: #fff;
                    background: #7690da;
                }
            }
        }
    }
}
</style>