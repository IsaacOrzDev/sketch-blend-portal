'use client';

import { PostRecord } from '@/types';
import ImageGridItem from './image-grid-item';
import SourceDialog from './source-dialog';
import { useEffect, useState } from 'react';
import fetchService from '@/services/fetch-service';
import { Skeleton } from '../ui/skeleton';

interface Props {
  className?: string;
  items: Array<{
    record?: PostRecord;
    height: number;
  }>;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export default function PostsGrid(props: Props) {
  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostRecord | null>(null);
  const [items, setItems] = useState<
    Array<{
      items: Array<{
        record?: PostRecord;
        height: number;
      }>;
      height: number;
    }>
  >([]);

  const initGrid = () => {
    const grid = [
      {
        items: [] as Array<{
          record?: PostRecord;
          height: number;
        }>,
        height: 0,
      },
      { items: [], height: 0 },
      { items: [], height: 0 },
    ];
    props.items.forEach((item) => {
      const index = grid.findIndex(
        (row) => row.height === Math.min(...grid.map((row) => row.height))
      );
      grid[index].items.push(item);
      grid[index].height +=
        (item.record?.imageInfo?.height ?? 0) /
          (item.record?.imageInfo?.width ?? 250 / 250) +
          (item.record?.sourceImageInfo?.height ?? 0) /
            (item.record?.sourceImageInfo?.width ?? 250 / 250) ?? item.height;
    });
    setItems(grid);
  };

  useEffect(() => {
    initGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items.length]);

  return (
    <>
      <div
        className={`w-full lg:max-w-6xl gridContainer max-xl:px-4 max-lg:flex max-lg:flex-col ${props.className}`}
      >
        {items.map((col, index) => (
          <div key={index} className="grid subGrid">
            {col.items.map((item, index) => (
              <ImageGridItem
                key={index}
                height={item.height}
                {...item.record}
                onClickSource={() => {
                  if (item.record) {
                    setSelectedPost(item.record);
                    setSourceOpen(true);
                  }
                }}
                isOwner={props.isOwner}
                onClickDelete={() => props.onDelete?.(item.record?.id ?? '')}
              />
            ))}
          </div>
        ))}
        {props.loading && (
          <>
            <Skeleton className="w-full h-[250px] mb-4 rounded" />
            <Skeleton className="w-full h-[250px] rounded" />
            <Skeleton className="w-full h-[250px] rounded" />
            <Skeleton className="w-full h-[550px] rounded" />
            <Skeleton className="w-full h-[550px] rounded" />
            <Skeleton className="w-full h-[550px] rounded" />
          </>
        )}
      </div>
      <SourceDialog
        open={sourceOpen}
        record={selectedPost}
        onClose={() => setSourceOpen(false)}
      />
    </>
  );
}
