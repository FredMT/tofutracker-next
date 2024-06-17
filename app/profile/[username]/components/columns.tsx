'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Heart, MessageCircle, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

export type Item = {
  item_id: number
  item_type: string
  item_poster: string
  item_title: string
  activity_id: string
  item_created_at: string
  hasLiked?: boolean
  list_type: string
  rating: number
  likes: number
  comments: number
}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'item_poster',
    header: () => <div className="text-left">Poster</div>,
    cell: ({ row }) => {
      return (
        <Link href={`/${row.getValue('item_type')}/${row.getValue('item_id')}`}>
          <img
            src={row.getValue('item_poster')}
            alt="poster"
            className="aspect-poster w-10 sm:w-12 md:w-14 lg:w-16"
          />
        </Link>
      )
    },
  },
  {
    accessorKey: 'item_title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-between">
          <Link
            href={`/${row.getValue('item_type')}/${row.getValue('item_id')}`}
          >
            <div>{row.getValue('item_title')}</div>
          </Link>
          <div className="flex cursor-pointer items-center gap-2">
            {String(row.getValue('likes')) !== '0' && (
              <div className="flex items-center gap-1">
                <div>
                  <Heart className="size-3" />
                </div>
                <div>{row.getValue('likes')}</div>
              </div>
            )}
            {String(row.getValue('comments')) !== '0' && (
              <div className="flex items-center gap-1">
                <div>
                  <MessageCircle className="size-3" />
                </div>
                <div>{row.getValue('comments')}</div>
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'list_type',
    header: 'List Type',
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className={`${
            row.getValue('list_type') === 'Watchlist'
              ? 'border-blue-300 bg-blue-50 text-blue-700'
              : 'border-purple-300 bg-purple-50 text-purple-700'
          }`}
        >
          {row.getValue('list_type')}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'item_type',
    header: 'Type',
  },
  {
    accessorKey: 'item_id',
    header: 'ID',
  },
  {
    accessorKey: 'likes',
    header: 'Likes',
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
  },
]
