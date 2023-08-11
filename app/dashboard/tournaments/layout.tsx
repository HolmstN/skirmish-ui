export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="pt-4">
        <h2 className="text-sky-800 dark:text-slate-300">Tournaments</h2>
        {props.children}
      </div>
    </div>
  );
}
