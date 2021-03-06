<template>
  <div id="surroundings-output">
    <template v-if="worldExists">
      <div class="creatures-wrapper">
        Creatures:
        <div class="table-wrapper">
          <table class="surrounds-categories">
            <tbody>
              <tr v-for="(creatureData, index) in surroundings.creatures"
                  :key="`creature-${index}`"
                  @mouseenter="highlight(creatureData.creature)"
                  @mouseleave="highlight()">
                <td :style="getStyle(creatureData.creature.level)" class="symbol">
                  {{creatureData.creature.symbol}}
                </td>
                <td class="creature-name">
                  {{creatureData.creature.isDead() ? "dead" : ""}}
                  {{creatureData.creature.species.name}}
                </td>
                <td class="creature-level">
                  Level
                </td>
                <td :style="getStyle(creatureData.creature.level)">
                  {{creatureData.creature.level}}
                </td>
                <td class="direction">
                  (<span
                     :style="creatureData.dist ? '' : getStyle(creatureData.creature.level)"
                     >{{creatureData.dir}}</span>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="surrounding-items-wrapper">
        Items:
        <div class="table-wrapper">
          <div class="surrounds-categories">
            <div v-for="(item, i) in surroundings.items"
                 :key="`item-${i}`"
                 @mouseenter="highlight(null, item.locations)"
                 @mouseleave="highlight()"
                 @click.left="toggleExpanded(item)"
                 class="item-list-wrapper">
              <div class="flex-container">
                <span class="item-count">{{item.count}}</span>
                <span class="item-name">{{item.count === 1 ? item.name : item.plural}}</span>
              </div>
              <div v-for="(expanded, i) in item.expanded"
                   :key="`expanded-${i}`"
                   @mouseenter="highlight(null, expanded.loc)"
                   @mouseleave="highlight()"
                   v-show="expandedItem === item.name"
                   class="expanded-items">
                <span class="item-count">{{expanded.count}}</span>
                <span class="expanded-name">
                  {{expanded.count === 1 ? expanded.name : expanded.plural}}
                </span>
                <span class="item-value">{{expanded.totalValue}}</span>
                <span class="direction">({{expanded.dir}})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { levelColour } from "../game/utils/colours";

export default {
  computed: {
    surroundings() {
      return this.$store.getters.surroundings();
    },
    worldExists() {
      return this.$store.getters.worldExists;
    },
  },
  data() {
    return {
      expandedItem: "",
    };
  },
  methods: {
    getStyle(lvl) {
      return "color: " + levelColour(lvl);
    },
    highlight(entity, locations) {
      if (entity) {
        let highlit = {
          [entity.position.key]: {
            colour: entity.isDead() ? "#888" : levelColour(entity.level, 30),
            symbol: entity.symbol,
          },
        };
        this.$store.dispatch("highlight", highlit);
      } else if (locations) {
        this.$store.dispatch("highlight", locations);
      } else {
        this.$store.dispatch("clearHighlight");
      }
    },
    toggleExpanded(item) {
      if (item.name === this.expandedItem) {
        this.expandedItem = "";
      } else {
        this.expandedItem = item.name;
      }
    },
  },
};
</script>

<style>
#surroundings-output {
  color: var(--text-blur);
  background-color: var(--ui-darker);
  border-color: var(--ui-border);
  font-family: "Ubuntu Mono", monospace;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.table-wrapper::-webkit-scrollbar-track {
  background-color: #2b2b2b;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #404040;
}

.surrounds-categories {
  table-layout: fixed;
  padding: 0px;
  width: 100%;
  font-size: 14px;
  cursor: default;
}

.surrounds-categories tr:hover {
  background-color: var(--ui-border);
}

.surrounds-categories td {
  padding: 3px 4px;
}

.direction {
  text-align: right;
  text-transform: capitalize;
  width: 85px;
  margin-left: 10px;
}

.creatures-wrapper,
.surrounding-items-wrapper {
  /* margin: 16px 8px 20px 15px; */
  margin: 0px 8px 0px 15px;
  flex: 1 1 0;
  max-height: 48%;
}

.table-wrapper {
  margin: 6px 0px 16px;
  max-height: 85%;
  overflow-y: scroll;
}

.symbol {
  font-size: 20px;
  width: 14px;
}

.creature-name {
  font-size: 1.1em;
  text-transform: capitalize;
  width: 100px;
}

.creature-level {
  text-align: right;
  width: 40px;
}

.flex-container {
  display: flex;
  align-items: center;
}

.item-list-wrapper {
  cursor: pointer;
  padding: 2px 0px;
}

.item-name {
  font-size: 1.1em;
  width: 280px;
}

.item-count {
  color: white;
  flex: 0 0 25px;
}

.item-value {
  flex: 0 0 25px;
  color: yellow;
}

.expanded-items {
  align-items: baseline;
  background-color: #1e1e1e;
  display: flex;
  flex-wrap: nowrap;
  margin: 5px 0px;
  padding: 2px 0px 2px 10px;
  width: 95%;
}

.item-list-wrapper > div:first-of-type {
  margin-top: 3px;
}

.expanded-name {
  margin-right: auto;
}
</style>
