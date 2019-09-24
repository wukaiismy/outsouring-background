<template>
  <article-detail :is-edit="false"/>
</template>

<script>
import ArticleDetail from "../components/ArticleDetail";

export default {
  name: "menu1",
  components: { ArticleDetail },
  data() {
    return {
      URL: "/website/backstage/add_new/"
    };
  },
  methods: {}
};
</script>

