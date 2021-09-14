import { OperationNode } from './operation-node'
import { freeze } from '../util/object-utils'
import { columnNode, ColumnNode } from './column-node'
import { DataTypeNode } from './data-type-node'
import { ValueNode } from './value-node'
import { RawNode } from './raw-node'

export interface AlterColumnNode extends OperationNode {
  readonly kind: 'AlterColumnNode'
  readonly column: ColumnNode
  readonly dataType?: DataTypeNode
  readonly dataTypeExpression?: RawNode
  readonly setDefault?: ValueNode | RawNode
  readonly dropDefault?: true
  readonly setNotNull?: true
  readonly dropNotNull?: true
}

export const dropColumnNode = freeze({
  is(node: OperationNode): node is AlterColumnNode {
    return node.kind === 'AlterColumnNode'
  },

  create(column: string): AlterColumnNode {
    return freeze({
      kind: 'AlterColumnNode',
      column: columnNode.create(column),
    })
  },
})
