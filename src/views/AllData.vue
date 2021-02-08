<template>
    <div>
        <Search @search="searchData" />
        <h2>Total: {{ total || 0 }}</h2>
        <div class="list-data">
            <div class="d-flex flex-column" v-if="!loading && items.length > 0">
                <Pagination
                    :totalItems="total"
                    :currentPage="currentPage"
                    :itemPerPage="100"
                    @changePage="changePage"
                    @sortChange="sortChange"
                />
                <div class="row">
                    <CardData v-for="(item, index) in items" :key="index" :item="item" @edit="edit" @remove="removeData(...arguments, index)" />
                </div>
            </div>
            <Loading v-if="loading" />
            <div class="no-data" v-if="items.length === 0 && keyword && !loading">
                {{ `Sorry, no data with this keyword "${keyword}"`}}
            </div>
        </div>
        <EditForm :item="item" v-if="isOpenEdit" @save="save" @hide="isOpenEdit = false" />
    </div>
</template>

<script>
import Search from "@/components/Search"
import CardData from "@/components/CardData"
import EditForm from "@/components/EditForm"
import Loading from "@/components/Loading"
import Pagination from "@/components/Pagination"

export default {
    components: {
        Search,
        CardData,
        EditForm,
        Loading,
        Pagination
    },
    data() {
        return {
            items: [],
            total: 0,
            isOpenEdit: false,
            item: {},
            loading: false,
            currentPage: 1
        };
    },
    computed: {
        keyword() {
            return this.$store.state.keyword;
        }
    },
    mounted() {
        if (this.$route.query && this.$route.query.page) {
            if (!isNaN(this.$route.query.page))
                this.currentPage = Number(this.$route.query.page);
        }
        if (this.keyword && !this.$route.query.keyword) {
            this.$router.replace(`/all-data?keyword=${this.keyword}&page=1`);
        }
    },
    methods: {
        async searchData(keyword) {
            this.loading = true;
            const result = await this.$axios.get(`/search?q=${keyword}&page=${this.currentPage}&media_type=image&year_start=1920&year_end=2021`).catch(err => {
                console.log(err);
            });
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
            this.loading = false;
        },
        async changePage(page) {
            if (page)
                this.currentPage = page;
            await this.searchData(this.keyword);
            if (this.keyword) {
                this.$router.replace(`/all-data?keyword=${this.keyword}` + (page ? `&page=${page}`: ''));
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
    height: 100vh;
}
.list-data {
    position: relative;
    height: 15vh;
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