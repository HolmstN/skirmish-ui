const Layout: React.FC = ({ children }) => {
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="pt-4">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
