const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mb-3" />
      <span className="text-gray-500 text-sm">Loading...</span>
    </div>
  );
};

export default Loading;
