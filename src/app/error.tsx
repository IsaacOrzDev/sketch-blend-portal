'use client';

export default function Error({ error }: { error: Error; reset: () => void }) {
  return (
    <div id="__next">
      <div className="container mx-auto px-3 py-10">
        <h1 className="mb-2 font-bold">Error</h1>
        <div className="mb-2">{error.message}</div>
        {!!error.stack && (
          <div>
            <code>{error.stack}</code>
          </div>
        )}
      </div>
    </div>
  );
}
