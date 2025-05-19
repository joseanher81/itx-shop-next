interface Props {
  message?: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="text-center text-red-600 py-4 bg-red-100 border border-red-300 rounded">
      {message || "Oops! Something went wrong."}
    </div>
  );
};

export default ErrorMessage;
