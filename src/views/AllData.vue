<template>
    <div>
        <Search @search="searchData" />
        <h2>Total: {{ total || 0 }}</h2>
        <div class="list-data">
            <div class="row" v-if="items.length > 0">
                <CardData v-for="(item, index) in items" :key="index" :item="item" @edit="edit" @remove="removeData(...arguments, index)" />
            </div>
        </div>
        <EditForm :item="item" v-if="isOpenEdit" @save="save" @hide="isOpenEdit = false" />
    </div>
</template>

<script>
import Search from "@/components/Search"
import CardData from "@/components/CardData"
import EditForm from "@/components/EditForm"

export default {
    components: {
        Search,
        CardData,
        EditForm
    },
    data() {
        return {
            items: [],
            total: 0,
            isOpenEdit: false,
            item: {}
        };
    },
    computed: {
        keyword() {
            return this.$store.state.keyword;
        }
    },
    mounted() {
        if (this.keyword) {
            this.$router.replace(`/all-data?keyword=${this.keyword}`);
        }
    },
    methods: {
        async searchData(keyword) {
            const result = await this.$axios.get(`/search?q=${keyword}&page=1&media_type=image&year_start=1920&year_end=2021`);
            if (result && result.data) {
                result.data.collection.items.map(o => o.stats = {isLike: false, isRemove: false});
                this.items = result.data.collection.items;
                this.total = result.data.collection.metadata.total_hits || 0;
                this.$store.commit("setTotalAllData", this.total);
                if (this.$store.state.keyword !== keyword) {
                    this.$store.commit("setKeyword", keyword);
                    this.$store.commit("setAllData", result.data.collection.items);
                }
            }
        },
        removeData(item, index) {
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