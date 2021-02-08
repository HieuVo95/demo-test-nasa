<template>
    <div
        id="EditForm"
        class="modal"
        tabindex="-1"
        role="dialog"
    >
        <div
            class="modal-dialog modal-dialog-centered"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-body">
                    <div
                        class="d-flex justify-content-between align-items-center"
                    >
                        <h4>{{ title }}</h4>
                        <a
                            v-if="isClose"
                            class="close-btn"
                            href="javascript:;"
                            @click="hide"
                        >
                            CLOSE
                        </a>
                    </div>
                    <ValidationProvider
                        ref="validateTitle"
                        v-slot="v"
                        name="titleData"
                        rules="required"
                        slim>
                        <div class="input-form mt-3">
                            <input type="text" placeholder="Input Title here.." v-model="titleData" :class="v.classes" maxlength="30" />
                        </div>
                    <div v-show="v.failedRules.required" class="text-error">This title cannot be empty.</div>
                    </ValidationProvider>
                    <ValidationProvider
                        ref="validateDescription"
                        v-slot="v"
                        name="description"
                        rules="required"
                        slim>
                        <div class="input-form mt-3">
                            <textarea rows="4" placeholder="Input description here.." v-model="description" :class="v.classes" />
                        </div>
                    <div v-show="v.failedRules.required" class="text-error">This description cannot be empty.</div>
                    </ValidationProvider>
                </div>
                <div class="modal-footer">
                    <button class="btn-submit" @click="saveData">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
export default {
    props: {
        title: {
            type: String,
            default: 'Edit data'
        },
        isClose: {
            type: Boolean,
            default: true
        },
        item: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            titleData: null,
            description: null,
            listData: []
        };
    },
    computed: {
    },
    mounted() {
        this.$nextTick(() => {
            this.show();
        });
        $(this.$el).on('hidden.bs.modal', e => {
            if (this.$el === e.target)
                this.$emit('hide');
        });
        this.titleData = this.item.data[0].title;
        this.description = this.item.data[0].description;
    },
    beforeDestroy() {
        this.hide();
    },
    methods: {
        show() {
            $(this.$el).modal('show');
        },
        hide() {
            $(this.$el).modal('hide');
        },
        async saveData() {
            const validateTitle = await this.$refs.validateTitle.validate();
            const validateDescription = await this.$refs.validateDescription.validate();
            if (!validateTitle.valid || !validateDescription.valid)
                return;
            this.$emit("save", { title: this.titleData, description: this.description }, this.item.data[0].nasa_id);
            this.$nextTick(() => {
                this.hide();
            })
        }
    }
};
</script>

<style lang="scss" scoped>
#EditForm {
    .modal-dialog {
        .modal-content {
            margin: auto;
            height: 100%;
            padding: 40px;
            padding-bottom: 20px;
        }
    }
    .modal-body {
        border-top: 1px solid #979797;
        padding: 20px 0;
        h4 {
            color: #606266;
        }
        .close-btn {
            color: #000000;
            text-decoration: none;
            &:hover {
                color: #ff4b2b;
                text-decoration: underline;
            }
        }
        .input-form {
            display: flex;
            justify-content: center;
            align-items: center;
            input {
                width: 100%;
                height: 3rem;
                border: 1px solid #d2d2d2;
                font-size: 1rem;
                outline: none;
                padding: 1rem;
                &:focus {
                    border: 2px solid #ff4b2b;
                }
            }
            textarea {
                width: 100%;
                border: 1px solid #d2d2d2;
                font-size: 1rem;
                outline: none;
                padding: 1rem;
                &:focus {
                    border: 2px solid #ff4b2b;
                }
            }
        }
    }
    .modal-footer {
        margin-top: 1rem;
        border-top: 1px solid #979797;
        padding: 20px 0 0 0;
        .btn-submit {
            margin: 0;
            border: none;
            border-radius: 0;
            background-color: #ff4b2b;
            color: #fff;
            font-size: 1rem;
            padding: 10px 25px;
            &.disabled {
                cursor: not-allowed;
                color: #656565;
                background-color: #f5f5f5;
            }
        }
    }
    .text-error {
        margin-top: 0.5rem;
        color: red;
        font-size: 0.8rem;
    }
}

</style>
