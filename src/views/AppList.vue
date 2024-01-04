<template>
  <Page
    class="app-list"
    fill="neutral"
    hide-tab-bar
  >
    <Guide :template="$t('app.list.featured-guide')" />

    <AeCard fill="maximum">
      <ListItem
        v-for="(app, idx) in aeternityApps"
        :key="`list-item-aeternity-app-${idx}`"
        :title="app.name"
        :subtitle="app.path"
        :to="`/${app.path}`"
      >
        <img
          v-if="app.icon"
          slot="icon"
          :src="app.icon"
          :alt="app.name"
        >
        <LeftMore slot="right" />
      </ListItem>
    </AeCard>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import Page from 'aepp-base/src/components/Page.vue';
import Guide from 'aepp-base/src/components/Guide.vue';
import AeCard from 'aepp-base/src/components/AeCard.vue';
import ListItem from 'aepp-base/src/components/ListItem.vue';
import { LeftMore } from 'aepp-base/src/components/icons';
import aeternityAppsPaths from '../../public/apps.json';

export default {
  components: {
    Page, Guide, AeCard, ListItem, LeftMore,
  },
  computed: mapState({
    aeternityApps: (state, { pathToApp }) => aeternityAppsPaths.map((p) => pathToApp(p)),
  }),
};
</script>

<style lang="scss" scoped>
@use '~aepp-base/src/styles/functions';

.app-list {
  .ae-card {
    margin-bottom: functions.rem(24px);
  }

  .shortcuts {
    margin: functions.rem(20px) functions.rem(-10px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-gap: 30px 10px;
    justify-items: center;
  }
}
</style>
