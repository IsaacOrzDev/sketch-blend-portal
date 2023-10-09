import React from 'react';
import { Card } from './ui/card';
import { CardDescription, CardTitle } from './registry/card';

interface Props {
  title?: string | null;
  description?: string | null;
  imageUrl: string;
  onClick?: () => void;
}

export default function CanvasCard(props: Props) {
  return (
    <Card
      className="cursor-pointer hover:border-gray-300 hover:bg-gray-100 max-h-[800px] p-4"
      onClick={props.onClick}
    >
      <img src={props.imageUrl} />
      <CardTitle className="text-start">{props.title}</CardTitle>
      <CardDescription className="text-start mt-2">
        {props.description}
      </CardDescription>
    </Card>
  );
}
