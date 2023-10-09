import React from 'react';
import { Card } from './ui/card';
import {  CardTitle } from './registry/card';
import { Plus } from 'lucide-react';

interface Props {
  title?: string | null;
  description?: string | null;
  onClick?: () => void;
}

export default function NewCanvasCard(props: Props) {
  return (
    <Card
      className="cursor-pointer hover:border-gray-300 hover:bg-gray-100 min-h-[200px]  max-h-[800px] p-4 flex flex-col"
      onClick={props.onClick}
    >
      <div className="flex-1 flex justify-center items-center">
        <Plus width="100px" height="100px" />
      </div>
      <CardTitle className="text-start">{props.title}</CardTitle>
    </Card>
  );
}
