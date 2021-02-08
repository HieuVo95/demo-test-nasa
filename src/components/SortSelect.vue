<template>
    <div class="dropdown">
        <div class="dropdown-select">
            <span class="select">{{ sortType || 'Select sort'}}</span>
            <i class="fas fa-sort-down"></i>
        </div>
        <div class="dropdown-list">
            <div
                v-for="i in typeSortList"
                :key="i.value"
                class="dropdown-list__item"
                :class="i.value === sortType && 'active'"
                @click="sortChange(i)"
            >
                {{ i.text }}
            </div>
        </div>
        <input class="d-none" type="text" v-model="sortType" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            sortType: this.sortCurrent || null,
            typeSortList: [
                {
                    text: 'Newest',
                    value: 'Newest'
                },
                {
                    text: 'Oldest',
                    value: 'Oldest'
                },
                {
                    text: 'a- z',
                    value: 'a- z'
                },
                {
                    text: 'z - a',
                    value: 'z - a'
                }
            ]
        };
    },
    methods: {
        sortChange(sort) {
            this.sortType = sort.value;
            this.$emit("sortChange", this.sortType);
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown {
    width: 200px;
    position: relative;
    &:hover {
        .dropdown-list {
            opacity: 1;
            visibility: visible;
        }
    }
    .dropdown-select {
        padding: 15px;
        border-radius: 4px;
        background-color: #fff;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        cursor: pointer;
    }
    .dropdown-list {
        border-radius: 4px;
        background-color: #fff;
        position: absolute;
        top: 110%;
        left: 0;
        right: 0;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s linear, visibility 0.2s linear;
        z-index: 2;
        .dropdown-list__item {
            padding: 15px;
            font-size: 18px;
            cursor: pointer;
            &.active, &:hover {
                background-color: #ecf0f1;
                color: #2c3e50;
            }
        }
    }
}
</style>