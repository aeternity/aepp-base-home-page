<template>
  <Page
    class="app-details"
    fill="neutral"
    hide-tab-bar
    :left-button-to="{ name: 'app-list' }"
    left-button-icon-name="back"
  >
    <header>
      <img
        v-if="app.icon"
        :src="app.icon"
        :alt="app.name"
      >
      <div>
        <Guide><em>{{ app.name }}</em></Guide>
        <span v-if="app.author">
          {{ $t('app.list.by') }}
          <AeLink
            v-if="app.author_url"
            :to="app.author_url"
            @click="app.author_navigate_to"
          >{{ app.author }} »</AeLink>
          <template v-else>{{ app.author }}</template>
        </span>
      </div>
    </header>

    <AeCard
      v-if="app.categories || app.networks || app.description"
      fill="maximum"
    >
      <p>
        <span class="categories">{{ app.categories }}</span>
        <span class="networks">{{ app.networks }}</span>
      </p>
      <p>{{ app.description }}</p>
    </AeCard>

    <AeButton
      fill="secondary"
      :to="app.url"
      @click="app.navigateTo"
    >
      {{ $t('app.list.launch') }}
    </AeButton>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import { get, capitalize } from 'lodash-es';
import Page from 'aepp-base/src/components/Page.vue';
import Guide from 'aepp-base/src/components/Guide.vue';
import AeLink from 'aepp-base/src/components/AeLink.vue';
import AeCard from 'aepp-base/src/components/AeCard.vue';
import AeButton from 'aepp-base/src/components/AeButton.vue';

export default {
  components: {
    Page,
    Guide,
    AeLink,
    AeCard,
    AeButton,
  },
  computed: mapState({
    app(state, { pathToApp, getUrlSet }) {
      const app = pathToApp(this.$route.fullPath.slice(1));
      return {
        ...app,
        categories: get(app, 'categories', []).map((c) => capitalize(c)).join(', '),
        networks: get(app, 'aeternity_network_ids', [])
          .map((id) => ({ ae_mainnet: 'Mainnet', ae_uat: 'Testnet' }[id] || id))
          .join(' | '),
        author_navigate_to: app.author_url && getUrlSet(app.author_url).navigateTo,
      };
    },
  }),
};
</script>

<style lang="scss" scoped>
@use '~aepp-base/src/styles/functions';
@use '~aepp-base/src/styles/typography';
@use '~aepp-base/src/styles/variables';

.app-details {
  header {
    display: flex;

    > img {
      width: functions.rem(48px);
      height: functions.rem(48px);
      margin-right: functions.rem(12px);
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .guide {
        margin-bottom: 0;
      }

      span, span a {
        @extend %face-sans-s;
        color: variables.$color-neutral-negative-1;
        text-decoration: none;
      }
    }
  }

  .ae-card {
    margin-bottom: functions.rem(24px);
    padding: 0 functions.rem(16px);
    @extend %face-sans-s;
    color: variables.$color-neutral-negative-3;

    span {
      display: block;
    }

    .categories {
      font-weight: 500;
    }

    .networks {
      @extend %face-sans-xs;
      color: variables.$color-neutral-negative-1;
    }
  }
}
</style>
