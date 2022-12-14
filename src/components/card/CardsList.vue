<template>
  <div class="row gutter-sm cards-list">
    <div class="charArray" id="charsList">
      <div class="jump-to q-body-1 q-my-xs">Jump to...</div>
      <span v-bind:class="{'bold': Object.keys(cards).includes(char) }" v-for="char in chars"
            v-scroll-to="{el:`.char${char.charCodeAt(0)}`, offset: -63}">{{char}}</span>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 card-block" v-for="(list, key) in cards">
      <h3 class="letter" :class="`char${key.charCodeAt(0)}`">{{key}}</h3>
      <div class="cards">
        <div v-for="card in list">
          <a v-if="card" :href="createViewUrl(card)" @click.prevent.stop="showCard(card.id)"> {{card.name}}
            <span v-if="card.shorthand[0]">(<span
              v-for="(shorthand, ind) in card.shorthand">{{shorthand}}<span
              v-if="ind !== card.shorthand.length - 1">, </span> </span>)</span></a>
              <Badge variant="success" v-for="tag in card.tags" :key="tag.id"> {{ tag.name }} </Badge>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'
    import Badge from '../Badge.vue';

    export default {
    props: {
        items: {
            required: true,
            type: Array
        },
        filterTagsIdList: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        tags() {
            const result = {};
            this.items.forEach(item => {
                if (!item.tags || item.tags.length === 0) {
                    return;
                }
                item.tags.forEach(tag => result[tag.id] = tag);
            });
            return Object.values(result);
        },
        chars() {
            let a = [], i = "a".charCodeAt(0), j = "z".charCodeAt(0);
            for (; i <= j; ++i) {
                a.push(String.fromCharCode(i));
            }
            a.push("#");
            return a;
        },
        cards() {
            const result = {}, other = [], items = this.items.sort((a, b) => {
                return ("" + a.name.toLowerCase()).localeCompare(b.name.toLowerCase());
            });
            items.forEach(item => {
                if (this.filterTagsIdList.length > 0) {
                    if (!this.isCardTag(item)) {
                        return;
                    }
                }
                let letter = item.name.charAt(0).toLocaleLowerCase();
                if (!letter.match(/[a-z]/)) {
                    return other.push(item);
                }
                if (result[letter] === undefined) {
                    result[letter] = [];
                }
                result[letter].push(item);
            });
            if (other.length > 0) {
                result["#"] = other;
            }
            return result;
        },
        options() {
            const options = this.tags.sort((a, b) => {
                return ("" + a.name.toLowerCase()).localeCompare(b.name.toLowerCase());
            });
            return options.map(item => {
                return { "label": item.name, "value": item.id };
            });
        },
        selectTagsLabel() {
            if (this.filterTagsIdList.length === 0) {
                return "No tags selected";
            }
            if (this.filterTagsIdList.length === 1) {
                return "1 tag selected";
            }
            return `${this.filterTagsIdList.length} tags selected`;
        }
    },
    mounted() {
        const el = document.getElementById("charsList"), sticky = el.offsetTop;
        window.onscroll = _ => {
            if (window.pageYOffset > sticky) {
                return el.classList.add("js-sticky");
            }
            el.classList.remove("js-sticky");
        };
    },
    methods: {
        ...mapActions({
            showCard: "modals/openCardsEditor"
        }),
        shorthand(list) {
            if (list.length === 0) {
                return "";
            }
            return list.map(i => `<em>${i}</em>`).join(", ");
        },
        createViewUrl(card) {
            return route("view_card", { id: card.id });
        },
        isCardTag(card) {
            if (!card.tags || card.tags.length === 0) {
                return false;
            }
            return card.tags.findIndex(item => this.filterTagsIdList.includes(item.id)) !== -1;
        }
    },
    components: { Badge }
}
</script>
<style lang="scss">

.darkmode {
    .cards div a {
       color: #fff;
    }
    .cards div a:hover {
        color: #2fab65;
    }
}
  .cards-list-item-title {
    color: #0c0c0c;
    position: absolute;
    left: 0;
    line-height: 1.5;
    font-size: 16px;
    transform: translateY(-50%);
    text-align: center;
    top: 50%;
    width: 100%;

    div {
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    .cards-list {
      justify-content: center;
    }
  }

  .letter {
    width: 50px;
    text-transform: uppercase;
    color: #5AD08E;
    border: 1px #5AD08E solid;
    border-radius: 100%;
    text-align: center;
    display: inline-block;
    position: absolute;
    margin: 5px;
  }

  .cards {
    display: inline-block;
    margin-left: 80px;
    line-height: 30px;

    a {
      text-decoration: none;
      color: #0c0c0c;
      font-size: 17px;
      display: block;
    }
  }

  .card-block {
    position: relative;
    margin-top: 20px;
  }

  .cards div a:hover {
    color: #006400;
  }

  .charArray {
    text-transform: uppercase;

    span {
      padding-right: 10px;
      color: #d0d1d2;
      font-size: 18px;
      cursor: default;
      display: inline-block;
    }
  }

  .filter-by-tag span {
    margin: 0 20px 10px 0;

    &.filter-tags {
      color: #95989D;
      font-size: 18px;
      cursor: pointer;
      display: inline-block;
      border: 2px solid;
      text-align: center;
      padding: 10px;
      border-top-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  .filter-by-tag span.active {
    border: 2px solid #5AD08E;
    color: #5AD08E;
  }

  .bold {
    font-weight: bold;
    cursor: pointer !important;
    color: #2fab65 !important;
  }

  .jump-to {
    display: block;
    color: #95989D !important;
    width: 95px !important;
    text-transform: none;
  }

  .js-sticky {
    background: #f7f7f7;
    position: fixed;
    top: 0;
    z-index: 100;
  }

  .js-sticky + .card-block {
    padding-top: 63px;
  }

  .filter-by-tag span:first-child {
    color: #95989D !important;
    width: 110px !important;
    text-transform: none;
  }

  .bold:hover {
    color: #07ab07 !important
  }

  .filter-by-tag {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px !important;
  }
</style>
