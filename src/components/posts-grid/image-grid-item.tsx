import BlurImage from '../blur-image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

interface Props {
  height: number;
  prompt?: string;
  imageUrl?: string;
  sourceImageUrl?: string;
  userInfo?: {
    name: string;
    imageUrl?: string | null;
  };
  isOwner?: boolean;
  onClickSource?: () => void;
  onClickDelete?: () => void;
}

export default function ImageGridItem(props: Props) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {props.sourceImageUrl && (
          <div className="relative" style={{ height: `${props.height}px` }}>
            <BlurImage
              src={props.sourceImageUrl}
              alt={props.prompt ?? ''}
              layout="fill"
            />
          </div>
        )}
        <Separator className="mb-2" />
        <div className="relative" style={{ height: `${props.height}px` }}>
          {!props.imageUrl && (
            <BlurImage
              src={`http://placehold.it/250x${props.height}`}
              alt="testing"
              layout="fill"
            />
          )}
          {props.imageUrl && (
            <BlurImage
              src={props.imageUrl}
              alt={props.prompt ?? ''}
              layout="fill"
            />
          )}
        </div>
        <div className="p-4 flex justify-between items-center bg-background">
          {!props.isOwner && (
            <>
              <div className="flex items-center">
                {/* <Avatar className="w-6 h-6 mr-2">
                  {props.userInfo?.imageUrl && (
                    <AvatarImage src={props.userInfo?.imageUrl} />
                  )}
                  <AvatarFallback className="text-xs">
                    {props.userInfo?.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text text-md">{props.userInfo?.name}</span> */}

                <span className="text text-md">{props.prompt}</span>
              </div>
              <Button variant="outline" onClick={props.onClickSource}>
                View Details
              </Button>
            </>
          )}
          {props.isOwner && (
            <>
              <div />
              <Button variant="outline" onClick={props.onClickDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

ImageGridItem.defaultProps = {
  userInfo: {
    name: 'Name',
    imageUrl: null,
  },
};
