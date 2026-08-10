export default function Note({ children }) {
  return (
    <div className="border border-accent/40 bg-accent/10 text-text rounded-lg px-4 py-3 my-4 text-sm">
      {children}
    </div>
  );
}
