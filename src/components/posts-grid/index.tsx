'use client';

import ImageGridItem from './image-grid-item';
import SourceDialog from './source-dialog';
import { useState } from 'react';

interface Props {
  className?: string;
}

export default function PostsGrid(props: Props) {
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <>
      <div
        className={`w-full lg:max-w-6xl gridContainer max-xl:px-4 ${props.className}`}
      >
        <div className="grid subGrid">
          <ImageGridItem
            height={400}
            onClickSource={() => setSourceOpen(true)}
          />
          <ImageGridItem
            height={400}
            onClickSource={() => setSourceOpen(true)}
          />
          <ImageGridItem
            height={200}
            onClickSource={() => setSourceOpen(true)}
          />
          <ImageGridItem
            height={800}
            onClickSource={() => setSourceOpen(true)}
          />
        </div>
        <div className="grid subGrid">
          <ImageGridItem height={500} />
          <ImageGridItem height={800} />
          <ImageGridItem height={200} />
          <ImageGridItem height={100} />
          <ImageGridItem height={100} />
        </div>
        <div className="grid subGrid">
          <ImageGridItem height={400} />
          <ImageGridItem height={800} />
          <ImageGridItem height={600} />
        </div>
      </div>
      <SourceDialog open={sourceOpen} onClose={() => setSourceOpen(false)} />
    </>
  );
}
