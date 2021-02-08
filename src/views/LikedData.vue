<template>
    <div>
        <h2>Total: {{ total || 0 }}</h2>
        <div class="list-data">
            <div class="row" v-if="items.length > 0">
                <CardData v-for="(item, index) in items" :key="index" :item="item" @edit="edit" @unlike="unlike(index)" @remove="removeData(...arguments, index)" />
            </div>
        </div>
        <EditForm :item="item" v-if="isOpenEdit" @save="save" @hide="isOpenEdit = false" />
    </div>
</template>

<script>
import CardData from "@/components/CardData"
import EditForm from "@/components/EditForm"

export default {
    components: {
        CardData,
        EditForm
    },
    computed: {
        likedData() {
            return this.$store.state.likedData;
        }
    },
    data() {
        return {
            items: [],
            total: 0,
            isOpenEdit: false,
            item: {}
        };
    },
    mounted() {
        if (this.likedData) {
            this.items = [...this.likedData];
            this.total = this.likedData.length || 0;
        }
    },
    methods: {
        removeData(item, index) {
            this.items.splice(index, 1);
            this.total -= 1;
        },
        unlike(index) {
            this.items.splice(index, 1);
            this.total -= 1;
        },
        edit(item) {
            this.item = item;
            this.isOpenEdit = true;
        },
        save(data, id) {
            this.items.map(o => {
                if (o.data[0].nasa_id === id) {
                    o.data[0].title = data.title;
                    o.data[0].description = data.description;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-flow: wrap;
}

@media screen and (max-width: 1000px) {
    .card {
        grid-template-columns: 400px;
    }
}
</style>