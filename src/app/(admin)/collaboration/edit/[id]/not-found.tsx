export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold">
          Collaboration not found
        </h1>
        <p className="text-sm text-muted-foreground">
          Hello 👋  
          The collaboration you’re looking for doesn’t exist or was removed.
        </p>
      </div>
    </div>
  );
}
