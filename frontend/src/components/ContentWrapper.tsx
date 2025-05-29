const ContentWrapper: React.FC<{
  children: React.ReactNode;
  full?: boolean;
}> = ({ children, full = false }) => {
  return (
    <div
      className={`m-auto ${full ? "w-full" : "w-96/100 md:w-94/100 xl:w-9/10 2xl:w-86/100"}`}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
