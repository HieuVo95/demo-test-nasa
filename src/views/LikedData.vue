<template>
    <div>
        <h2>Total: {{ total || 0 }}</h2>
        <div class="list-data">
            <div class="d-flex flex-column" v-if="items.length > 0">
                <div class="mb-3">
                    <SortSelect @sortChange="sortChange" />
                </div>
                <div class="row">
                    <CardData v-for="(item, index) in items" :key="index" :item="item" @edit="edit" @unlike="unlike(index)" @remove="removeData(...arguments, index)" />
                </div>
            </div>
            <div class="no-data" v-if="items.length === 0">
                {{ `Sorry, no data here`}}
            </div>
        </div>
        <EditForm :item="item" v-if="isOpenEdit" @save="save" @hide="isOpenEdit = false" />
    </div>
</template>

<script>
import CardData from "@/components/CardData"
import EditForm from "@/components/EditForm"
import SortSelect from "@/components/SortSelect"

export default {
    components: {
        CardData,
        EditForm,
        SortSelect
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
            item: {},
            currentPage: 1,
            displayList: []
        };
    },
    mounted() {
        if (this.$route.query && this.$route.query.page) {
            if (!isNaN(this.$route.query.page))
                this.currentPage = Number(this.$route.query.page);
        }
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
        },
        sortChange(sort) {
            switch(sort) {
                case 'Newest': {
                    this.items.sort((a, b) => this.compareTime(b, a));
                }
                    break;
                case 'Oldest': {
                    this.items.sort((a, b) => this.compareTime(a, b));
                }
                    break;
                case 'a- z': {
                    this.items.sort((a, b) => this.compareAlpha(a, b));
                }
                    break;
                case 'z - a': {
                    this.items.sort((a, b) => this.compareAlpha(b, a));
                }
                    break;
                default:
                    break;
            }
        },
        compareTime(a, b) {
            if ( a.data[0].date_created < b.data[0].date_created ){
                return -1;
            }
            if ( a.data[0].date_created > b.data[0].date_created ){
                return 1;
            }
            return 0;
        },
        compareAlpha(a, b) {
            if ( a.data[0].title < b.data[0].title ){
                return -1;
            }
            if ( a.data[0].title > b.data[0].title ){
                return 1;
            }
            return 0;
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
.no-data {
    padding: 50px 0;
    text-align: center;
    font-size: 23px;
    line-height: 23px;
    color: #e74c3c;
}

@media screen and (max-width: 1000px) {
    .card {
        grid-template-columns: 400px;
    }
}
</style>