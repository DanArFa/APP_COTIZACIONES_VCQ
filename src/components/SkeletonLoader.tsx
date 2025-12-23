interface SkeletonLoaderProps {
  type?: 'card' | 'table-row' | 'text' | 'avatar' | 'input' | 'list-item';
  count?: number;
  width?: string;
  height?: string;
}

const skeletonAnimationClass = 'animate-pulse';

function SkeletonCard() {
  return (
    <div className={`${skeletonAnimationClass} glass-card`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3 flex-1">
          <div className="w-12 h-12 rounded-xl bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/5 rounded-lg w-1/3" />
            <div className="h-3 bg-white/5 rounded-lg w-1/2" />
          </div>
        </div>
        <div className="w-8 h-8 bg-white/5 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-white/5 rounded-lg w-full" />
        <div className="h-3 bg-white/5 rounded-lg w-5/6" />
      </div>
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <div className={`${skeletonAnimationClass} glass-table-row p-4 rounded-lg mb-3`}>
      <div className="flex gap-4">
        <div className="h-4 bg-white/5 rounded w-20" />
        <div className="h-4 bg-white/5 rounded flex-1" />
        <div className="h-4 bg-white/5 rounded w-24" />
        <div className="h-4 bg-white/5 rounded w-16" />
      </div>
    </div>
  );
}

function SkeletonText({ width = 'w-full', height = 'h-4' }) {
  return <div className={`${skeletonAnimationClass} bg-white/5 rounded-lg ${width} ${height}`} />;
}

function SkeletonAvatar() {
  return <div className={`${skeletonAnimationClass} w-12 h-12 rounded-xl bg-white/5`} />;
}

function SkeletonInput() {
  return <div className={`${skeletonAnimationClass} w-full h-12 rounded-xl bg-white/5`} />;
}

function SkeletonListItem() {
  return (
    <div className={`${skeletonAnimationClass} flex gap-3 p-4 rounded-xl bg-white/5 mb-3`}>
      <div className="w-10 h-10 rounded-lg bg-white/5" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/5 rounded w-1/3" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function SkeletonLoader({
  type = 'card',
  count = 1,
  width,
  height,
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div key={i}>
          {type === 'card' && <SkeletonCard />}
          {type === 'table-row' && <SkeletonTableRow />}
          {type === 'text' && <SkeletonText width={width} height={height} />}
          {type === 'avatar' && <SkeletonAvatar />}
          {type === 'input' && <SkeletonInput />}
          {type === 'list-item' && <SkeletonListItem />}
        </div>
      ))}
    </>
  );
}
