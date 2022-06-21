import { useLazyQuery, useQuery } from "@apollo/client"
import { Button, Toast, Tree } from "@douyinfe/semi-ui"
import type { TreeNodeData } from "@douyinfe/semi-ui/lib/es/tree"
import React, { useMemo, useState } from "react"

import { NAVIGATIONS } from "../../apis/schemas/navigation"
import { TAGS } from "../../apis/schemas/tag"
import type { Navigation } from "../../typings/navigation"
import { AppID } from "../../utils/app"

const Home = () => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([])
  const { data: tags } = useQuery(TAGS, {
    context: {
      appId: AppID.Boomart
    },
    onCompleted: () => {
      setTreeData(
        tags?.tags.items.map((tag) => ({
          label: tag.name,
          value: tag.id,
          key: tag.id.toString()
        })) || []
      )
    }
  })
  const [getNavigations] = useLazyQuery(NAVIGATIONS)

  /**
   * 异步加载树节点
   */
  const onLoadData = async (treeNode?: TreeNodeData) => {
    const res = await getNavigations().catch((error: Error) => {
      Toast.error(error.message)
      return null
    })

    if (!res) return

    setTreeData((prev) =>
      prev.map((tagNode) => {
        if (tagNode.value !== treeNode?.value) return tagNode

        return Object.assign({}, tagNode, {
          children: res.data.navigations.items.map((nav: Navigation) => ({
            label: nav.title,
            value: nav.id,
            key: nav.id.toString()
          })),
          isLeaf: true
        })
      })
    )
  }

  const style = {
    width: 260,
    height: 420,
    border: "1px solid var(--semi-color-border)"
  }

  return (
    <>
      <Tree treeData={treeData} style={style} loadData={onLoadData} />

      <div className="mt-3 flex">
        <div className="flex-1 mr-1">
          <Button block>收录</Button>
        </div>

        <div className="flex-1 ml-1">
          <Button block>注销</Button>
        </div>
      </div>
    </>
  )
}

export default Home
