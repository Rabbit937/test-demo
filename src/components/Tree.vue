<template>
  <el-scrollbar height="640px">
    <el-tree style="max-width: 640px" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick"
      accordion empty-text="没有数据" :data="treeData">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <img v-if="Number(data.LEVEL) === 0" class="icon-zhuanji"
            src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjc4MzQ0MzY0ODUyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyOTIzIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTkyMiA5MTAuNUgxMDJjLTIxLjkgMC0zOS42LTE3LjctMzkuNi0zOS42VjIyNC4zYzAtMjEuOSAxNy43LTM5LjYgMzkuNi0zOS42aDgyMGMyMS45IDAgMzkuNiAxNy43IDM5LjYgMzkuNnY2NDYuNmMwIDIxLjgtMTcuOCAzOS42LTM5LjYgMzkuNnoiIGZpbGw9IiNGRkEwMDAiIHAtaWQ9IjEyOTI0Ij48L3BhdGg+PHBhdGggZD0iTTUxMiAzNTQuOUg2Mi40VjE1My4xYzAtMjEuOSAxNy43LTM5LjYgMzkuNi0zOS42aDMwNy43YzE3LjUgMCAzMi45IDExLjQgMzcuOSAyOC4yTDUxMiAzNTQuOXoiIGZpbGw9IiNGRkEwMDAiIHAtaWQ9IjEyOTI1Ij48L3BhdGg+PHBhdGggZD0iTTg1OS43IDg2MS4zSDE2NC4zYy0yMS45IDAtMzkuNi0xNy43LTM5LjYtMzkuNnYtNTM3YzAtMjEuOSAxNy43LTM5LjYgMzkuNi0zOS42aDY5NS41YzIxLjkgMCAzOS42IDE3LjcgMzkuNiAzOS42djUzN2MwIDIxLjgtMTcuOCAzOS42LTM5LjcgMzkuNnoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjEyOTI2Ij48L3BhdGg+PHBhdGggZD0iTTkyMiA5MTAuNUgxMDJjLTIxLjkgMC0zOS42LTE3LjctMzkuNi0zOS42VjM1OS4xYzAtMjEuOSAxNy43LTM5LjYgMzkuNi0zOS42aDgyMGMyMS45IDAgMzkuNiAxNy43IDM5LjYgMzkuNnY1MTEuOGMwIDIxLjgtMTcuOCAzOS42LTM5LjYgMzkuNnoiIGZpbGw9IiNGRkNBMjgiIHAtaWQ9IjEyOTI3Ij48L3BhdGg+PHBhdGggZD0iTTg1Mi44IDMxOS41TDYxMi40IDczOC44bC0yMDkuOC0yNzlMMTQ3IDQ3MS4zbDk3LjUgMTMwLjEtOTcuNSA0LjQgMjI4LjIgMzA0LjZIOTIyYzIxLjkgMCAzOS42LTE3LjcgMzkuNi0zOS42VjQ2My4zTDg1Mi44IDMxOS41eiIgZmlsbD0iI0ZGQjgwNiIgcC1pZD0iMTI5MjgiPjwvcGF0aD48cGF0aCBkPSJNMzgyLjggNDgzLjFIMTY1LjFjLTEwLjkgMC0xOS44LTguOS0xOS44LTE5LjhzOC45LTE5LjggMTkuOC0xOS44aDIxNy43YzEwLjkgMCAxOS44IDguOSAxOS44IDE5LjhzLTguOSAxOS44LTE5LjggMTkuOHpNMzgyLjggNjE3LjZIMTY1LjFjLTEwLjkgMC0xOS44LTguOS0xOS44LTE5LjhzOC45LTE5LjggMTkuOC0xOS44aDIxNy43YzEwLjkgMCAxOS44IDguOSAxOS44IDE5LjggMCAxMS04LjkgMTkuOC0xOS44IDE5Ljh6IiBmaWxsPSIjRkZGOEUxIiBwLWlkPSIxMjkyOSI+PC9wYXRoPjxwYXRoIGQ9Ik04MzcuNCA3NjIuOWwtMTA3LTcwLjdjLTMuMy0yLjItNy42LTIuMi0xMC45IDBsLTEwNyA3MC43Yy02LjYgNC40LTE1LjQtMC40LTE1LjQtOC4zVjMxOC4xYzAtMTAuOSA4LjUtMTkuOCAxOC45LTE5LjhoMjE3LjhjMTAuNCAwIDE4LjkgOC45IDE4LjkgMTkuOHY0MzYuNWMwLjEgNy45LTguNyAxMi43LTE1LjMgOC4zeiIgZmlsbD0iI0Y0NDMzNiIgcC1pZD0iMTI5MzAiPjwvcGF0aD48L3N2Zz4="
            alt="" />

          <img v-else-if="Number(data.LEVEL) === 1" class="icon-zhuanji"
            src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjc4MzQ1NDcyMDkzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzMzM2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk3MC42NjY2NjcgMjEzLjMzMzMzM0g1NDYuNTg2NjY3YTEwLjU3MzMzMyAxMC41NzMzMzMgMCAwIDEtNy41NC0zLjEyNjY2Nkw0MjkuNzkzMzMzIDEwMC45NTMzMzNBNTIuOTg2NjY3IDUyLjk4NjY2NyAwIDAgMCAzOTIuMDggODUuMzMzMzMzSDk2YTUzLjM5MzMzMyA1My4zOTMzMzMgMCAwIDAtNTMuMzMzMzMzIDUzLjMzMzMzNHY3MDRhNTMuMzkzMzMzIDUzLjM5MzMzMyAwIDAgMCA1My4zMzMzMzMgNTMuMzMzMzMzaDg3NC42NjY2NjdhNTMuMzkzMzMzIDUzLjM5MzMzMyAwIDAgMCA1My4zMzMzMzMtNTMuMzMzMzMzVjI2Ni42NjY2NjdhNTMuMzkzMzMzIDUzLjM5MzMzMyAwIDAgMC01My4zMzMzMzMtNTMuMzMzMzM0eiBtMTAuNjY2NjY2IDYyOS4zMzMzMzRhMTAuNjY2NjY3IDEwLjY2NjY2NyAwIDAgMS0xMC42NjY2NjYgMTAuNjY2NjY2SDk2YTEwLjY2NjY2NyAxMC42NjY2NjcgMCAwIDEtMTAuNjY2NjY3LTEwLjY2NjY2NlYxMzguNjY2NjY3YTEwLjY2NjY2NyAxMC42NjY2NjcgMCAwIDEgMTAuNjY2NjY3LTEwLjY2NjY2N2gyOTYuMDhhMTAuNTczMzMzIDEwLjU3MzMzMyAwIDAgMSA3LjU0IDMuMTI2NjY3bDEwOS4yNTMzMzMgMTA5LjI1MzMzM0E1Mi45ODY2NjcgNTIuOTg2NjY3IDAgMCAwIDU0Ni41ODY2NjcgMjU2SDk3MC42NjY2NjdhMTAuNjY2NjY3IDEwLjY2NjY2NyAwIDAgMSAxMC42NjY2NjYgMTAuNjY2NjY3eiBtLTI5OC42NjY2NjYtMzA5LjMzMzMzNGEyMS4zMzMzMzMgMjEuMzMzMzMzIDAgMCAxLTIxLjMzMzMzNCAyMS4zMzMzMzRINTU0LjY2NjY2N3YxMDYuNjY2NjY2YTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEtNDIuNjY2NjY3IDBWNTU0LjY2NjY2N0g0MDUuMzMzMzMzYTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEgMC00Mi42NjY2NjdoMTA2LjY2NjY2N1Y0MDUuMzMzMzMzYTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEgNDIuNjY2NjY3IDB2MTA2LjY2NjY2N2gxMDYuNjY2NjY2YTIxLjMzMzMzMyAyMS4zMzMzMzMgMCAwIDEgMjEuMzMzMzM0IDIxLjMzMzMzM3oiIGZpbGw9IiM1QzVDNjYiIHAtaWQ9IjEzMzM3Ij48L3BhdGg+PC9zdmc+"
            alt="" />

          <img v-else class="icon-zhuanji"
            src="data:image/svg+xml;base64,PHN2ZyB0PSIxNjc4MzQ1OTI2Njc4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNDc1IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk3MC42NjY2NjcgODk2SDk2YTUzLjM5MzMzMyA1My4zOTMzMzMgMCAwIDEtNTMuMzMzMzMzLTUzLjMzMzMzM1YxMzguNjY2NjY3YTUzLjM5MzMzMyA1My4zOTMzMzMgMCAwIDEgNTMuMzMzMzMzLTUzLjMzMzMzNGgyOTYuMDhhNTIuOTg2NjY3IDUyLjk4NjY2NyAwIDAgMSAzNy43MTMzMzMgMTUuNjJsMTA5LjI1MzMzNCAxMDkuMjUzMzM0YTEwLjU3MzMzMyAxMC41NzMzMzMgMCAwIDAgNy41NCAzLjEyNjY2Nkg5NzAuNjY2NjY3YTUzLjM5MzMzMyA1My4zOTMzMzMgMCAwIDEgNTMuMzMzMzMzIDUzLjMzMzMzNHY1NzZhNTMuMzkzMzMzIDUzLjM5MzMzMyAwIDAgMS01My4zMzMzMzMgNTMuMzMzMzMzek05NiAxMjhhMTAuNjY2NjY3IDEwLjY2NjY2NyAwIDAgMC0xMC42NjY2NjcgMTAuNjY2NjY3djcwNGExMC42NjY2NjcgMTAuNjY2NjY3IDAgMCAwIDEwLjY2NjY2NyAxMC42NjY2NjZoODc0LjY2NjY2N2ExMC42NjY2NjcgMTAuNjY2NjY3IDAgMCAwIDEwLjY2NjY2Ni0xMC42NjY2NjZWMjY2LjY2NjY2N2ExMC42NjY2NjcgMTAuNjY2NjY3IDAgMCAwLTEwLjY2NjY2Ni0xMC42NjY2NjdINTQ2LjU4NjY2N2E1Mi45ODY2NjcgNTIuOTg2NjY3IDAgMCAxLTM3LjcxMzMzNC0xNS42MkwzOTkuNjIgMTMxLjEyNjY2N2ExMC41NzMzMzMgMTAuNTczMzMzIDAgMCAwLTcuNTQtMy4xMjY2Njd6IiBmaWxsPSIjNUM1QzY2IiBwLWlkPSIxMzQ3NiI+PC9wYXRoPjwvc3ZnPg=="
            alt="" />

          <span>{{ data.ANAME }}</span>
        </span>
      </template>
    </el-tree>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import type Node from "element-plus/lib/components/tree/src/model/node.js";

interface Props {
  treeData: any;
}

const defaultProps = {
  children: "CHILD",
};

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["handleNodeClick", "removeSelectedClass"]);

const handleNodeClick = (data: any, node: Node) => {
  removeSelectedClass();

  const el = document.querySelector(
    `.el-tree-node[data-key="${data.$treeNodeId}"] > .el-tree-node__content > .custom-tree-node`,
  );

  el?.classList.add("active");
  emit("handleNodeClick", {
    data: data,
    removeSelectedClass,
  });
};

const removeSelectedClass = () => {
  const selectedNodes = document.querySelectorAll(
    ".el-tree-node > .el-tree-node__content > .custom-tree-node",
  );
  selectedNodes.forEach((node) => {
    node.classList.remove("active");
  });
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  align-items: center;
  max-width: 185px;
  font-size: 12px;
  color: #333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .icon-zhuanji {
    width: 15px;
    margin-right: 4px;
    vertical-align: middle;
  }
}

.custom-tree-node.active,
.custom-tree-node:hover {
  color: #197afb;
  // background-color: #f3f9ff;
}

:deep(.el-tree-node__content) {
  height: 32px;
  line-height: 32px;
}
</style>
