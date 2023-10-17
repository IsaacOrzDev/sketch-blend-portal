import BlurImage from './blur-image';

interface Props {
  height: number;
}

export default function ImageGridItem(props: Props) {
  return (
    <div>
      <div className="relative" style={{ height: `${props.height}px` }}>
        <BlurImage
          src={`http://placehold.it/250x${props.height}`}
          alt="testing"
          layout="fill"
        />
      </div>
    </div>
  );
}
