import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import ActionMenu from './CellAction.vue'

export interface Category {
    id: string
    name: string
    createdAt: string
}

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },
    {
        accessorKey: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original
            return h('div', { class: 'relative' }, h(ActionMenu, {
                category
            }))
        },
    }
]