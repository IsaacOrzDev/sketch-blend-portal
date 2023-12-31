import BlurImage from '../blur-image';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { PictureInPicture2 } from 'lucide-react';

interface Props {
  height?: number;
  prompt?: string;
  imageUrl?: string;
  sourceImageUrl?: string;
  userInfo?: {
    name: string;
    imageUrl?: string | null;
  };
  imageInfo?: {
    width: number;
    height: number;
  };
  sourceImageInfo?: {
    width: number;
    height: number;
  };
  onClickSource?: () => void;
}

export default function ImageGridItem(props: Props) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* <Separator className="mb-2" /> */}
        {props.imageUrl && (
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full to-90% bg-gradient-to-t from-[#f9f7f5] via-transparent to-transparent z-10" />
            <BlurImage
              src={props.imageUrl}
              alt={props.prompt ?? ''}
              width={props.imageInfo?.width ?? 0}
              height={props.imageInfo?.height ?? 0}
            />
          </div>
        )}
        {!props.imageUrl && (
          <div className="relative" style={{ height: props.height }}>
            <BlurImage
              src={`http://placehold.it/250x${props.height}`}
              alt="testing"
              layout="fill"
            />
          </div>
        )}
        {props.sourceImageUrl && (
          <div className="relative">
            <BlurImage
              src={props.sourceImageUrl}
              alt={props.prompt ?? ''}
              width={props.sourceImageInfo?.width ?? 0}
              height={props.sourceImageInfo?.height ?? 0}
            />
          </div>
        )}
        <Separator />
        <div className="p-4 flex justify-between items-center bg-background">
          <div className="flex items-center mr-2">
            <span className="text text-md text-ellipsis">{props.prompt}</span>
          </div>
          <Button variant="outline" onClick={props.onClickSource}>
            <PictureInPicture2 />
          </Button>
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
