import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { CardDescription, CardTitle } from './registry/card';
import { Button } from './ui/button';

interface Props {
  title?: string | null;
  description?: string | null;
  imageUrl: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export default function CanvasCard(props: Props) {
  return (
    <Card>
      <CardContent className="p-0 flex flex-col h-full">
        <CardHeader
          className="cursor-pointer hover:border-gray-300 hover:bg-gray-100 max-h-[800px] flex-1"
          onClick={props.onClick}
        >
          <img src={props.imageUrl} />
        </CardHeader>
        <div className="flex justify-between items-center p-4">
          <CardTitle className="text-start">{props.title}</CardTitle>
          <CardDescription className="text-start mt-2">
            {props.description}
          </CardDescription>
          <Button variant="outline" type="button" onClick={props.onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
